import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Row
} from "reactstrap";
import { handleData } from "../../Client_API";

function Suggestion_Box() {
    let [ wordCounts, setCount ] = useState(0)
    const [ suggestion, setSuggestion ] = useState("")
    const [ suggestionText, setText ] = useState(null)
    const [ admin, setAdmin ] = useState(null)

    const history = useHistory()

    const onSubmit = () => {
        handleData("/suggestion", "POST", { suggestion })
        .then(res => {
            if (res.status === 200) {
                return true
            }
            else return false
        })
        .then(results => {
            if (results) {
                history.push("/suggestion")
            }
        })
    }

    const deleteEvent = (suggestion, id) => {
        if (window.confirm(`Are you sure to delete "${suggestion}"`)){
            handleData("/deleteSuggestion", "POST", { id })
            .then(res => {
                if (res.status === 200) {
                    return true
                }
                else return false
            })
            .then(results => {
                if (results) {
                    history.push("/suggestion")
                }
                else {
                    alert(`Error deleting "${ suggestion }"`)
                }
            })
        }
    }

    const wordCount = (e) => {
        let text = e.target.value

        setSuggestion(text)
        setCount(text.length)

        for (let i = 0; i < text.length; i++) {
            let currentCharacter = text.length[i]

            if (currentCharacter === " ") {
                setCount(wordCounts += 1)
            }
        }

        if (text.length === 0) {
            setCount(0)
        }
    }

    useEffect(() => {
        handleData("/admin_level", "GET")
        .then(res => res.json())
        .then((result) => {
            setAdmin(result.admin_level)
        })
    }, [])

    useEffect(() => {
        
        console.log(admin)
        let div = []

        handleData("/suggestions", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false
        })
        .then(results => {
            for (let i = 0; i < results.length; i++) {

                let datePart = results[i][3].match(/\d+/g)
                let year = datePart[0]
                let date = datePart[2]
                let month = datePart[1]
                let monthWord = ""

                if (month === "01") {
                    monthWord = "January"
                }
                if (month === "02") {
                    monthWord = "February"
                }
                if (month === "03") {
                    monthWord = "March"
                }
                if (month === "04") {
                    monthWord = "April"
                }
                if (month === "05") {
                    monthWord = "May"
                }
                if (month === "06") {
                    monthWord = "June"
                }
                if (month === "07") {
                    monthWord = "July"
                }
                if (month === "08") {
                    monthWord = "August"
                }
                if (month === "09") {
                    monthWord = "September"
                }
                if (month === "10") {
                    monthWord = "October"
                }
                if (month === "11") {
                    monthWord = "November"
                }
                if (month === "12") {
                    monthWord = "December"
                }

                div.push(
                    <Card style = { styles.text }>
                        {admin !== "0" ? <button style = {{ borderWidth: 0, backgroundColor: "white", width: 25, float: "right", position: "absolute", top: 0, right: 5 }} onClick = { () => deleteEvent(results[i][2], results[i][0]) }>
                            &#x2715; 
                        </button> :
                        "" }
                        <span>
                            {results[i][2]}
                        </span>
                        <span style = { styles.author }>
                            By {results[i][1]}, {date} {monthWord} {year}
                        </span>
                    </Card>
                )
            }

            setText(div)

        })
    }, [admin])

    const styles = {
        suggestionBox: {
            border: "1px solid #000000",
            borderRadius: 5,
            padding: 5,
            minHeight: 100,
            maxHeight: 700,
            width: "100%",
            fontSize: 20,
            overflow: "auto"
        },
        text: {
            textIndent: "5px",
            marginBottom: "5px"
        },
        author: {
            float: "right",
            fontStyle: "italic",
            fontSize: 14,
        },
        textBox: {
            border: "1px solid #000000",
            borderRadius: 5,
            padding: 10,
            minHeight: 150,
            width: "100%",
            fontSize: 20
        },
        wordCount: {
            float: "right",
            margin: "0px 5px 5px"
        },
        button: {
            width: "100%"
        }
    }

    return (
        <div>
            <Row>
                <Col style = { styles.suggestionBox }>
                    { suggestionText }
                </Col>
                {console.log(admin)}
                {admin === "0" ? 
                    <Col>
                        <div>
                            <textarea onChange = { wordCount } type = "text" placeHolder = "Type Your Suggestion Here..." maxLength = "500" style = { styles.textBox } required />
                            <span style = { styles.wordCount }>
                                { wordCounts }/500
                            </span>
                            <Button style = {styles.button} onClick = { onSubmit }>
                                Done
                            </Button>
                        </div>
                    </Col> :
                    ""
                }
            </Row>
        </div>
    )
}

export default Suggestion_Box;