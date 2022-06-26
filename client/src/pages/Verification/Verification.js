import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Input,
    InputGroup,
    Row
} from "reactstrap";
import background from "../../images/background.jpg"
import QR from "../../images/QR.jpg"
import { handleData } from "../../Client_API";
import { useHistory } from "react-router-dom";

function Verification() {
    const [ code, setCode ] = useState("")
    const [ random, setRandom ] = useState("")
    const [ counter, setCounter ] = useState(0)
    const [ first, setTries ] = useState(true)

    const history = useHistory();

    const checkCode = (event) => {
        event.preventDefault();
        if (code == random) {
            handleData("/verify", "GET")
            .then(results => {
                if (results.status === 200) {
                    history.push("/login")
                }
                else {
                    alert("Unable to register now. Please try again later.")
                }
            })
        }
        else {
            alert("Wrong Code!")
        }
    }

    const onInputChange = (e) => {
        const value = e.target.value;
        setCode(value)
    }

    const generateCode = () => {
        let x = Math.floor(100000 + Math.random() * 900000)
        setRandom(x)
        setCounter(30)
        handleData("/verification", "POST", { x: x })
    }

    const denyResend = () => {
        alert("Please wait for the timer.")
    }

    const sendCode = () => {
        let x = Math.floor(100000 + Math.random() * 900000)
        setRandom(x)
        setCounter(30)
        setTries(false)
        handleData("/verification", "POST", { x: x })
        alert("An telegram message has been sent to you for verification.")
    }

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer)
    }, [counter])
    
    return (
        <div style = {{
            backgroundImage: `url(${background})`,
            backgroundPosition: "right bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            <div className = "app flex-row-reverse align-items-center">
                <Container>
                    <Row className = "justify-content-center">
                        <Col md = "14">
                            <CardGroup>
                                <Card className = "p-3">
                                    <CardBody>
                                            <p style = {{ textAlign: "center", fontSize: 20, marginTop: -10 }}> <strong> VERIFICATION! </strong> </p>
                                            <img src = {QR} style = {{ marginRight: 8 }}/>
                                            <InputGroup className = "mb-1 justify-content-center" style = {{ width: 200, marginLeft: 65 }}>
                                                <Input
                                                    type = "text"
                                                    name = "code"
                                                    placeholder = "Enter your verification code here!"
                                                    value = {code}
                                                    onChange = {onInputChange}
                                                />
                                            </InputGroup>

                                            <Row className = "justify-content-center" style = {{ marginTop: 10, marginLeft: 45 }}>
                                                <Col>
                                                    <Button outline color = "secondary" style = { code.length > 0 ? { color: "black" } : { color: "grey" }} onClick = {checkCode}> Submit </Button>
                                                </Col>
                                                <Col>
                                                {first ? 
                                                    <Button  outline color = "secondary" style = {{ marginLeft: -42, position: "fixed", color: "grey" }} onClick = {sendCode}>
                                                        Send Code
                                                    </Button> : 
                                                    <Button outline color = "secondary" style = { counter === 0 ? { marginLeft: -42, position: "fixed", color: "black" } : { marginLeft: -42, position: "fixed", color: "muted" }} onClick = {counter === 0 ? generateCode : denyResend}> 
                                                        Resend ({counter < 10 ? "0" : ""}{counter})
                                                    </Button>
                                                }
                                                </Col>
                                            </Row>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
                <Container/>
                <Container/>
            </div>
        </div>
    )
}

export default Verification