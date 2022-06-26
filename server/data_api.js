const cors = require("./node_modules/cors")
const express = require("./node_modules/express")
const bodyParser = require("./node_modules/body-parser")
const cookieParser = require("./node_modules/cookie-parser")
const path = require("path")
const jwt = require("./node_modules/jsonwebtoken")
const bcrypt = require("./node_modules/bcrypt")
const moment = require("./node_modules/moment-timezone")
const async = require("./node_modules/async")
const crypto = require("crypto")
const app = express()

const { 
    FetchUsers,
    FetchCookie,
    FetchLogs,
    FetchEvents,
    FetchSuggestion,
    FetchLocations,
    FetchMessages,
    InsertUsers,
    InsertCookies,
    InsertLogs,
    InsertEvent,
    InsertSuggestion,
    InsertLocation,
    DeleteEvents,
    DeleteSuggestion,
    UpdateUsers,
    UpdateMessage,
} = require("./app_api_db")
const { telegramBot } = require("./bot")

const TelegramBot = require("./node_modules/node-telegram-bot-api")
const token = `5040172328:AAFB9tuMRZRXXCsd8Px3y6Fx1BKIE6ExsEg`
const saltRounds = 10
const secret = "asecretstring"

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`Example app listening on ports ${port}!`))

const bot = new TelegramBot(token, { polling: true })
let globalVar = {
    username: '',
    dob: '',
    password: '',
    confirmPassword: '',
    telegramID: ''
}

app.use(cors())
app.use(bodyParser.urlencoded({
	extended: false
})) 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, "../../client/build")))

const withAuth = (req, res, next) => {

 	const token = 
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token

 	if (!token) {
		res.status(401).end()
 	} 
	else {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).end()
			} 
			else {
				req.username = decoded.username
                req.admin_level = decoded.admin_level
				next()
			}
		})
 	}

}

app.post("/telegramVerification", (req, res) => {
    globalVar.username = req.body.data.username
    globalVar.password = req.body.data.password
    globalVar.confirmPassword = req.body.data.confirmPassword
    globalVar.dob = req.body.data.dob
    globalVar.telegramID = req.body.data.telegram
})

app.post("/verification", (req, res) => {
    const code = req.body.x

    bot.sendMessage(globalVar.telegramID, `The verification code is ${code}`)
})

app.get("/verify", (req, res) => {
    let new_password_crypt
    
    FetchUsers("username", globalVar.username, (results) => {
        if (results.status === 200) {
            res.status(401).send("Username existed!")
            res.end()
        }
        else {
            if (globalVar.password === globalVar.confirmPassword) {
                bcrypt.hash(globalVar.password, saltRounds, (err, hashedPassword) => {
                    if (err) {
                        console.log(err)
                        res.status(401).send("Password not accepted!")
                        res.end()
                    }
                    else {
                        new_password_crypt = hashedPassword
                        InsertUsers(globalVar.username, globalVar.dob, new_password_crypt, globalVar.telegramID, (results) => {
                            if (results.status === 200) {
                                res.status(results.status).send(results.message)
                                res.end()
        
                                globalVar = {
                                    username: '',
                                    dob: '',
                                    password: '',
                                    confirmPassword: '',
                                    telegramID: ''
                                }
                            }
                            else {
                                res.status(results.status).send(results.message)
                                res.end()
                            }
                        })
                    }
                })
            }
        }
    })

})

app.post("/user_telegram", (req, res) => {

    const telegram = req.body.input.telegram

    FetchUsers("telegram", telegram, (results) => {
        if (results.status === 200) {
            let chars = "0123456789abcdefghijklmnopqrstuvwxyz!#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            let passwordLength = 10
            let password = ""

            for (let i = 0; i < passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length)
                password += chars.substring(randomNumber, randomNumber + 1)
            }

            bot.sendMessage(telegram, password)
            res.status(results.status).send(password)
            res.end()
        }
        else {
            res.sendStatus(results.status)
            res.end()
        }
    })

})

app.post("/reset_password", (req, res) => {
    
    const telegram = req.body.input.telegram
    const newPassword = req.body.input.password
    const confirmPassword = req.body.input.confirmPassword
    let new_password_crypt

    if (newPassword === confirmPassword) {
        bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.log(err)
                res.status(401).send("Password not accepted!")
                res.end()
            }
            else {
                new_password_crypt = hashedPassword
                UpdateUsers("change_password", telegram, new_password_crypt, "0", "0", (results) => {
                    if (results.status === 200) {
                        res.status(results.status).send(results.message)
                        res.end()
                    }
                    else {
                        res.status(results.status).send(results.message)
                        res.end()
                    }
                })
            }
        })
    }
    else {
        res.status(401).send("Passwords do not match.")
        res.end()
    }
    
})

app.get("/checkToken", withAuth, (req, res) => {

	const token = 
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token

    FetchCookie(token, (results) => {
        if (results.status === 200) {
            res.status(results.status).send({ admin_level: req.admin_level })
            res.end()
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

app.post("/login", (req, res) => {

    const username = req.body.state.username
    const password = req.body.state.password
    let date = moment.tz(moment(), "Asia/Singapore").format("YYYY-MM-DD")
    let time = moment.tz(moment(), "Asia/Singapore").format("HH:mm:ss")
	
	if (username && password) {
        FetchUsers("username", username, (results) => {
            if (results.status === 200) {

                let username = results.data[0][0].username
                let db_pass = results.data[0][0].password
                let admin_level = results.data[0][0].admin_level
    
                bcrypt.compare(password, db_pass, (error, result) => {
                    if (!error) {
                        if (result) {
                            InsertLogs(username, date, time, "Log In", (results) => {
                                if (results.status === 200) {
                                    const payload = {
                                        username,
                                        admin_level
                                    }
                                    const token = jwt.sign(payload, secret, {
                                        expiresIn: "168h"
                                    })
                                    res.cookie("token", token, {
                                        httpOnly: true
                                    }).sendStatus(200)
                                }
                                else {
                                    res.status(results.status).send(results.data)
                                    res.end()
                                }
                            })
                        }
                        else {
                            console.log(error)
                            res.status(401).send("Password Incorrect!")
                            res.end()
                        }
                    }
                    else {
                        console.log(error)
                        res.status(401).send("Password Incorrect!")
                        res.end()
                    }
                })

            }
            else {
                res.status(results.status).send("No such user!")
                res.end()
            }

        })
	}
	else {
		res.status(406).send("Username Or Password NOT Filled!")
	}

})

app.get("/username", withAuth, (req, res) => {
	
	const json = { "username": req.username }

   	res.json(json)

})

app.get("/admin_level", withAuth, (req, res) => {

    const json = { "admin_level": req.admin_level }

    res.json(json)

})

app.post("/message", withAuth, (req, res) => {

    const message = req.body.data

    UpdateMessage(message, (results) => {
        if (results.status === 200) {
            bot.sendMessage(772859792, "A message is awaiting for you! Head over to the website to view it.")
            res.status(results.status).send(results.message)
            res.end()
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

app.get("/messages", withAuth, (req, res) => {

    FetchMessages((results) => {
        if (results.status === 200) {
            res.status(results.status).send(results.data[0][0].message)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.get("/stats", withAuth, (req, res) => {

    let username
    let data = []

    if (req.username === "Admin") {
        username = "0"
    }
    else {
        username = req.username
    }

    FetchLogs(username, (results) => {
        if (results.status === 200) {
            for (let i = 0; i < results.data[0].length; i++) {
                
                let row = results.data[0][i]
                let data_arr = [ i+1, row.username, row.date, row.time, row.details ]
                data.push(data_arr)

            }

            res.status(results.status).send(data)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.post("/suggestion", withAuth, (req, res) => {

    const username = req.username
    const suggestion = req.body.suggestion
    let date = moment.tz(moment(), "Asia/Singapore").format("YYYY-MM-DD")

    InsertSuggestion(username, suggestion, date, (results) => {
        if (results.status === 200) {
            res.status(results.status).send(results.message)
            res.end()
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

app.get("/suggestions", withAuth, (req, res) => {

    let data = []

    FetchSuggestion((results) => {
        if (results.status === 200) {
            for (let i = 0; i < results.data[0].length; i++) {
                
                let row = results.data[0][i]
                let data_arr = [ row.id, row.username, row.suggestion, row.date ]
                data.push(data_arr)

            }

            res.status(results.status).send(data)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.post("/deleteSuggestion", withAuth, (req, res) => {

    const id = req.body.id

    DeleteSuggestion(id, (results) => {
        if (results.status === 200) {
            res.status(results.status).send(results.message)
            res.end()
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

app.post("/location", withAuth, (req, res) => {

    const location = req.body.data
    const username = req.username
    let date = moment.tz(moment(), "Asia/Singapore").format("YYYY-MM-DD")

    InsertLocation(location, date, username, (results) => {
        if (results.status === 200) {
            res.sendStatus(results.status)
            res.end()
        }
        else {
            res.sendStatus(results.status)
            res.end()
        }
    })

})

app.get("/locations", withAuth, (req, res) => {

    const username = req.username
    let data = []

    FetchLocations(username, (results) => {
        if (results.status === 200) {

            for (let i = 0; i < results.data[0].length; i++) {
                
                let row = results.data[0][i]
                let data_arr = [ i+1, row.locations, row.added_on ]
                data.push(data_arr)
            }

            res.status(results.status).send(data)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.post("/event", withAuth, (req, res) => {

    const eventName = req.body.eventName
    const desc = req.body.desc
    const date = req.body.date
    const username = req.username

    FetchEvents("eventName", eventName, (results) => {
        if (results.status === 200) {
            res.sendStatus(409)
            res.end()
        }
        else {
            InsertEvent(eventName, desc, date, username, (results) => {
                if (results.status === 200) {
                    res.sendStatus(results.status)
                    res.end()
                }
                else {
                    res.sendStatus(results.status)
                    res.end()
                }
            })
        }
    })

})

app.get("/events", withAuth, (req, res) => {

    const username = req.username
    let data = []

    FetchEvents("username", username, (results) => {
        if (results.status === 200) {
            for (let i = 0; i < results.data[0].length; i++) {
                
                let row = results.data[0][i]
                let data_arr = [ i+1, row.eventName, row.description, row.date ]
                data.push(data_arr)

            }

            res.status(results.status).send(data)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.post("/deleteEvent", withAuth, (req, res) => {

    const eventName = req.body.eventName

    DeleteEvents(eventName, (results) => {
        if (results.status === 200) {
            res.status(results.status).send(results.message)
            res.end()
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

app.get("/profile", withAuth, (req, res) => {

    const username = req.username

    FetchUsers("username", username, (results) => {
        if (results.status === 200) {
            res.status(results.status).send(results.data)
            res.end()
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })
    
})

app.post("/edit_profile", withAuth, (req, res) => {

    const id = req.body.id
    const username = req.body.username
    const telegram = req.body.telegram
    const dob = req.body.dob

    FetchUsers("username", username, (results) => {
        if (results.status === 204) {
            UpdateUsers("change_details", id, username, telegram, dob, (results) => {
                if (results.status === 200) {
                    res.status(results.status).send(results.message)
                    res.end()
                }
                else {
                    res.status(results.status).send(results.message)
                    res.end()
                }
            })
        }
        else {
            res.status(results.status).send(results.data)
            res.end()
        }
    })

})

app.post("/change_password", withAuth, (req, res) => {

    const new_password = req.body.new_password
    const confirm_new_password = req.body.confirm_new_password
    const telegram = req.body.telegram
    let new_password_crypt

    if (new_password === confirm_new_password) {
        bcrypt.hash(new_password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.log(err)
                res.status(401).send("Password not accepted!")
                res.end()
            }
            else {
                new_password_crypt = hashedPassword
                UpdateUsers("change_password", telegram, new_password_crypt, "0", "0", (results) => {
                    if (results.status === 200) {
                        res.status(results.status).send(results.message)
                        res.end()
                    }
                    else {
                        res.status(results.status).send(results.message)
                        res.end()
                    }
                })
            }
        })
    }
    else {
        res.status(401).send("Passwords do not match.")
        res.end()
    }
})

app.get("/logout", withAuth, (req, res) => {
	
	const token = 
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token
    let date = moment.tz(moment(), "Asia/Singapore").format("YYYY-MM-DD")
    let time = moment.tz(moment(), "Asia/Singapore").format("HH:mm:ss")

    FetchCookie(token, (results) => {
        if (results.status === 200) {
            InsertCookies(token, (results) => {
                if (results.status === 200) {
                    InsertLogs(req.username, date, time, "Log Out", (results) => {
                        if (results.status === 200) {
                            res.sendStatus(results.status)
                        }
                        else {
                            res.sendStatus(results.status)
                            res.end()
                        }
                    })
                }
                else {
                    res.status(results.status).send(results.message)
                    res.end()
                }
            })
        }
        else {
            res.status(results.status).send(results.message)
            res.end()
        }
    })

})

telegramBot(bot)

process.on("SIGINT", () => {

	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)")
	process.exit()

})