import MUIDataTable from "mui-datatables"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Card, CardGroup, Col, Input, InputGroup, Row } from "reactstrap"
import { handleData } from "../../Client_API"
import "./Location_Generator.css"

function Location_Generator() {
    const [ wordCounts, setCount ] = useState(0)
    const [ selected, setSelected ] = useState(false)
    const [ selectedDigit, setDigit ] = useState(0)
    const [ newLocation, setNewLocation ] = useState("")
    const [ location, setLocation ] = useState("")
    const [ locations, setLocations ] = useState([
        "Singapore Zoo",
        "GTBT Two Domes",
        "GTBT SkyWalk",
        "Singapore Night Safari",
        "Singapore Flyers",
        "Trick Eye Museum",
        "SEA Aquarium",
        "River Wonders",
        "Science Center",
        "Bowling at 313",
        "Luge",
        "Adventure Cove",
        "ArtScience Museum",
        "National Gallery Singapore",
        "Kusu Island",
        "Snow City",
        "Dog Cafe at Bugis+",
        "Singapore City Gallery"
    ])
    const [ sentence, setSentence ] = useState("")
    const [ data, setData ] = useState([["", "", ""]])

    const history = useHistory()

    const handleInputChange = (e) => {
        let location = e.target.value

        setLocation(location)
        setCount(location.length)

        for (let i = 0; i < location.length; i++) {
            let currentCharacter = location.length[i]

            if (currentCharacter === " ") {
                setCount(wordCounts += 1)
            }
        }

        if (location.length === 0) {
            setCount(0)
        }
    }

    const onSubmit = () => {
        handleData("/location", "POST", { data: location })
        .then(res => {
            if (res.status === 200) {
                history.push("/location_generator")
            }
            else {
                alert("Error logging in location.")
            }
        })
    }

    const generate = () => {
        setSelected(true)
        let random = Math.floor(Math.random() * (locations.length + 1))
        setDigit(random)
        
        let index = locations.indexOf(locations[random])
        let spliced = locations.splice(index, 1)
        setNewLocation(spliced)
    }

    useEffect(() => {
        if (locations.length > 1) {
            setSentence("No locations logged.")
        }
    }, [locations.length])

    useEffect(() => {
        handleData("/locations", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false
        })
        .then(results => {
            if (results) {
                console.log(results)
                setData(results)
            }
        })
    }, [])

    return (
        <div>
            <Col>
                <Row>
                    <div className = "tableList">
                        <MUIDataTable
                            title = "List of Locations"
                            data = { data }
                            columns = {[ "No.", "Location", "Added On" ]}
                            options = {{
                                filterType: "checkbox",
                                responsive: "scroll",
                                selectableRows: "none",
                                rowsPerPage: 10
                            }}
                        />
                    </div>
                    <Col>
                        <div className = "tableList left">
                            <CardGroup style = {{ marginLeft: 10 }}>
                                <Card className = "p-1">
                                    <label style = {{ margin: "10px 0px 0px 10px"}}>
                                        Enter the location:
                                    </label>
                                    <InputGroup style = {{ padding: 10 }}>
                                        <Input
                                            type = "text"
                                            name = "location"
                                            placeholder = "Location..."
                                            onChange = { handleInputChange }
                                            value = { location }
                                            maxLength = "200"
                                        />
                                    </InputGroup>
                                    <Row style = {{ display: "block", marginBottom: 10 }}>
                                        <Button style = {{ marginLeft: 25 }} onClick = { onSubmit }> Done </Button>
                                        <span style = {{ float: "right", marginRight: 35, marginTop: 8 }}>
                                            { wordCounts }/200
                                        </span>
                                    </Row>
                                </Card>
                            </CardGroup>
                        </div>
                        <div className = "Location_Generator">
                            <h1> Location Generator </h1>
                            <p> Welcome to YJ's personal location generator! </p>
                            <p> Please click on "Generate" to start randomization. </p>
                            <p> There is a total of { locations.length } locations recorded. </p>
                            <button className = "generate" onClick = { generate }> Generate </button>
                            <div>
                                { locations.length > 0 ?
                                    <p>
                                        { selected ? 
                                            <p>
                                                The place selected is : { newLocation }
                                            </p> :
                                            <p>
                                                You have not selected a place!!
                                            </p>
                                        }
                                    </p> :
                                    <p>
                                        { sentence }
                                    </p>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default Location_Generator