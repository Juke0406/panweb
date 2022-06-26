import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    Input
} from "reactstrap";
import { handleData } from "../../Client_API";

function Dates() {
    const [ output, setOutput ] = useState(null);
    const [ events, setEvents ] = useState(0);
    const [ todayDate, setToday ] = useState("");
    const [ modal, setModal ] = useState(false);
    const [ row, setRow ] = useState(null);
    const [ input, setInput ] = useState({
        eventName: "",
        desc: "",
        date: ""
    });

    const togglePopup = () => setModal(!modal)
    const history = useHistory()

    const fetchEvent = () => {
        handleData("/events", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false
        })
        .then(results => {
            if (results) {

                let result = []

                for (let i = 0; i < results.length; i++) {
                    let today = new Date()
                    let eventDate = new Date(results[i][3])
                    let timeDiff = eventDate - today;
                    let dateDiff = timeDiff / (1000 * 3600 * 24);
                    if (dateDiff <= -1) {
                        deleteEventonStart(results[i][1])
                    }
                    else {
                        result.push(results[i])
                    }
                }

                setOutput(result)

            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    const submit = () => {
        if (events < 24) {
            handleData("/event", "POST", input)
            .then(res => {
                if (res.status === 200) {
                    return true
                }
                else return false
            })
            .then(results => {
                if (results) {
                    history.push("/dates")
                }
                else {
                    alert("Error registering a new Event!")
                }
            })
        }
        else {
            alert("Maximum amount of event registered.")
        }
    }

    const deleteEventonStart = (eventName) => {
        handleData("/deleteEvent", "POST", {eventName})
        .then(res => {
            if (res.status === 200) {
                return true
            }
            else return false
        })
        .then(results => {
            if (results) {
                history.push("/dates")
            }
            else {
                alert(`Error deleting ${eventName}!`)
            }
        })
    }

    const deleteEvent = (eventName) => {
        if (window.confirm(`Are you sure to delete ${eventName}`)){
            handleData("/deleteEvent", "POST", {eventName})
            .then(res => {
                if (res.status === 200) {
                    return true
                }
                else return false
            })
            .then(results => {
                if (results) {
                    history.push("/dates")
                }
                else {
                    alert(`Error deleting ${eventName}!`)
                }
            })
        }
    }

    useEffect(() => {
        let date = new Date()
        let today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        setToday(today)
    }, [todayDate])

    useEffect(() => {
        fetchEvent()
    }, [])

    useEffect(() => {

        let event = []
        let rows = []

        if (output) {

            setEvents(output.length)

            for (let i = 0; i < 10 && i < output.length; i++) {
                let today = new Date()
                let eventDate = new Date(output[i][3])
                let timeDiff = eventDate - today;
                let dateDiff = timeDiff / (1000 * 3600 * 24);
                if (dateDiff < 0) {
                    dateDiff = 0
                }
                else {
                    dateDiff = dateDiff
                }
    
                event.push(
                    <div style = {{ display: "flex" }}>
                        <div class = "card bg-white" style = {dateDiff === 0 ? { borderWidth: 1.5, marginRight: -5, marginTop: 5, marginBottom: 5, borderColor: "red" } : { borderWidth: 1.5, marginRight: -5, marginTop: 5, marginBottom: 5 }}>
                            <button style = {{ borderWidth: 0, backgroundColor: "white", width: 25, float: "right", position: "absolute", top: 0, right: 0 }} onClick = { () => deleteEvent(output[i][1]) }> &#x2715; </button>
                            <div class = "card-body text-center">
                                <h5 class = "card-title" style = {{ fontSize: 20, marginTop: -10 }}> { output[i][1] } {`<3`} </h5>
                                <p class = "card-text" style = {{ marginTop: -13, marginBottom: 5 }}> Description: { output[i][2] } </p>
                                <p class = "card-text" style = {{ fontSize: 40, marginTop: -13, marginBottom: -15 }}> { dateDiff.toFixed(0) > 1 ? `${dateDiff.toFixed(0)} DAYS` : `${dateDiff.toFixed(0)} DAY` } LEFT</p>
                                <p class = "card-text" style = {{ marginTop: 10, marginBottom: -15 }}> Date: <u> { output[i][3] } </u> </p>
                            </div>
                        </div>
                    </div>
                )

                if (i === output.length-1) {
                    rows.push(
                        <Row>
                            {event}
                        </Row>
                    )
                }
    
            }

            setRow(rows)

        }


    }, [output])

    
    return (
        <div className = "animated fadeIn">
            <div className = "card-deck">
                <div class = "card bg-transparent" style = {{ borderWidth: 0, marginRight: -10, maxWidth: "50%" }}>
                    <div class = "card-body">
                        <h5 class = "card-title" style = {{ fontSize: 25 }}> Today Date : </h5>
                        <p class = "card-text text-center" style = {{ fontSize: 50, marginTop: -55, marginBottom: -15 }}> { todayDate } </p>
                    </div>
                </div>
                <Button style = {{ borderColor: "black", width: "50%", marginLeft: 10 }} onClick = {togglePopup}>
                    <h5 style = {{ fontSize: 25 }}>
                        Create Event
                    </h5>
                </Button>

                <Modal isOpen = {modal} toggle = {togglePopup}>
                    <ModalHeader toggle = {togglePopup}> Create an event to mark! </ModalHeader>
                    <ModalBody>
                        <Row style = {{ margin: 10 }}>
                            <label for = "event">
                                Event Name
                            </label>
                            <InputGroup className = "mb-1">
                                <Input
                                    type = "text"
                                    name = "eventName"
                                    placeholder = "Enter Event Name"
                                    value = { input.eventName }
                                    onChange = { handleChange }
                                />
                            </InputGroup>
                        </Row>
                        <Row style = {{ margin: 10 }}>
                            <label for = "desc">
                                Description (Optional)
                            </label>
                            <InputGroup className = "mb-1">
                                <Input
                                    type = "text"
                                    name = "desc"
                                    placeholder = "Enter Description"
                                    value = { input.desc }
                                    onChange = { handleChange }
                                />
                            </InputGroup>
                        </Row>
                        <Row style = {{ margin: 10 }}>
                            <label for = "date">
                                Date
                            </label>
                            <InputGroup className = "mb-1">
                                <Input
                                    type = "date"
                                    name = "date"
                                    placeholder = "Enter Date"
                                    value = { input.date }
                                    onChange = { handleChange }
                                />
                            </InputGroup>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick = {submit}>
                            Done
                        </Button>
                        <Button onClick = {togglePopup}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className = "card-deck">
                <Col>
                    {row}
                </Col>
            </div>
        </div>
    )
}

export default Dates;