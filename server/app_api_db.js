const mysql = require("./node_modules/mysql")

const config_database = {
	host : "us-cdbr-east-05.cleardb.net",
	user : "b71f61472ce546",
	password: "af268902",
	database: "heroku_996369f45d2662d",
}

function FetchCookie(param1, callback) {

	let sql = "CALL FetchCookie(?)"
    const connection = mysql.createConnection(config_database)
	connection.query(sql, [ param1 ], (error, results) => {
		if (!error) {
			if (results[0].length > 0) {
                callback({
                    status: 401,
                    message: "Unauthorized: Invalid token"
                })
			}
			else {
                callback({
                    status: 200,
                    message: "Authorized!"
                })
			}
		}
		else {
			console.log(error)
            callback({
                status: 502,
                message: "Unable to connect to database!"
            })
		}	
	})

	connection.end()

}

function FetchUsers(param1, param2, callback) {

    let sql = "CALL FetchUsers(?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2 ], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function FetchLogs(param1, callback) {

    let sql = "CALL FetchLogs(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function FetchEvents(param1, param2, callback) {

    let sql = "CALL FetchEvents(?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2 ], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function FetchSuggestion(callback) {

    let sql = "CALL FetchSuggestion()"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function FetchLocations(param1, callback) {

    let sql = "CALL FetchLocations(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function FetchMessages(callback) {

    let sql = "CALL FetchMessages()"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [], (error, results) => {
        if (!error) {
            if (results[0].length > 0) {
                callback({
                    status: 200,
                    data: results
                })
            }
            else {
                callback({
                    status: 204,
                    data: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                data: ""
            })
        }
    })

    connection.end()

}

function InsertUsers(param1, param2, param3, param4, callback) {

    let sql = "CALL InsertUsers(?, ?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3, param4 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function InsertCookies(param1, callback) {

    let sql = "CALL InsertCookies(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function InsertLogs(param1, param2, param3, param4, callback) {

    let sql = "CALL InsertLogs(?, ?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3, param4 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function InsertEvent(param1, param2, param3, param4, callback) {

    let sql = "CALL InsertEvent(?, ?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3, param4 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function InsertSuggestion(param1, param2, param3, callback) {

    let sql = "CALL InsertSuggestion(?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function InsertLocation(param1, param2, param3, callback) {

    let sql = "CALL InsertLocation(?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function DeleteEvents(param1, callback) {

    let sql = "CALL DeleteEvents(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function DeleteSuggestion(param1, callback) {

    let sql = "CALL DeleteSuggestion(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error) => {
        if (!error) {
            callback({
                status: 200,
                message: "Success"
            })
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: "Error"
            })
        }
    })

    connection.end()

}

function UpdateUsers(param1, param2, param3, param4, param5, callback) {

    let sql = "CALL UpdateUsers(?, ?, ?, ?, ?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1, param2, param3, param4, param5 ], (error, results) => {
        if (!error) {
            if (results.affected !== 0) {
                callback({
                    status: 200,
                    message: true
                })
            }
            else {
                callback ({
                    status: 204,
                    message: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: false
            })
        }
    })

    connection.end()

}

function UpdateMessage(param1, callback) {

    let sql = "CALL UpdateMessage(?)"
    const connection = mysql.createConnection(config_database)
    connection.query(sql, [ param1 ], (error, results) => {
        if (!error) {
            if (results.affected !== 0) {
                callback({
                    status: 200,
                    message: true
                })
            }
            else {
                callback ({
                    status: 204,
                    message: false
                })
            }
        }
        else {
            console.log(error)
            callback({
                status: 409,
                message: false
            })
        }
    })

    connection.end()

}

module.exports.FetchCookie = FetchCookie
module.exports.FetchUsers = FetchUsers
module.exports.FetchLogs = FetchLogs
module.exports.FetchEvents = FetchEvents
module.exports.FetchSuggestion = FetchSuggestion
module.exports.FetchLocations = FetchLocations
module.exports.FetchMessages = FetchMessages

module.exports.InsertUsers = InsertUsers
module.exports.InsertCookies = InsertCookies
module.exports.InsertLogs = InsertLogs
module.exports.InsertEvent = InsertEvent
module.exports.InsertSuggestion = InsertSuggestion
module.exports.InsertLocation = InsertLocation

module.exports.DeleteEvents = DeleteEvents
module.exports.DeleteSuggestion = DeleteSuggestion

module.exports.UpdateUsers = UpdateUsers
module.exports.UpdateMessage = UpdateMessage