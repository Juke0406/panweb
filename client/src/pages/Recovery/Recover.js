import React, { useState } from "react"
import {
    Card, 
    CardBody, 
    CardGroup, 
    Col, 
    Container, 
    Input, 
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row 
} from "reactstrap"
import { useHistory } from "react-router-dom"
import background from "../../images/background.jpg"
import icon from "../../images/icon.jpg"
import { handleData } from "../../Client_API"

function Recovery() {
    const [ input, setInput ] = useState({
        telegram: "",
        password: "",
        confirmPassword: "",
        code: ""
    })
    const [ err, setErr ] = useState({
        password: "",
        confirmPassword: ""
    })
    const [ code, setCode ] = useState("")
    const [ passwordShown, setPasswordShown ] = useState(false)
    const [ passwordShown1, setPasswordShown1 ] = useState(false)
    const [ correctCode, setCorrectCode ] = useState(false)

    const history = useHistory()

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const togglePassword1 = () => {
        setPasswordShown1(!passwordShown1)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        validateInput(e)
    }

    const validateInput = (e) => {
        const { name, value } = e.target
        setErr(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
        
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } 
                    else 
                    if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } 
                    else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : err.confirmPassword;
                    }
                    break;
        
                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } 
                    else 
                    if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;
        
                default:
                break;
            }

            return stateObj
        })
    }

    const onSubmit = () => {
        handleData("/user_telegram", "POST", { input })
        .then(res => {
            if (res.status === 200) {
                return res.text()
            }
            else return false
        })
        .then(results => {
            if (results) {
                setCode(results)
            }
            else {
                alert("Incorrect Telegram Chat ID")
            }
        })
    }

    const onSubmitCode = () => {
        if (input.code === code) {
            setCorrectCode(true)
        }
        else {
            setCorrectCode(false)
            alert("Incorrect Code!")
        }
    }

    const onSubmitPassword = () => {
        handleData("/reset_password", "POST", { input })
        .then(res => {
            if (res.status === 200) {
                history.push("/login")
            }
            else {
                alert("Error changing Password. Try again later.")
            }
        })
    }
    
    const loginPage = () => {
        history.push("/login")
    }

    const registerAccount = () => {
        history.push("/registration")
    }

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
                                <Card className = "p-5" style = {{ width: 380, height: 600 }}>
                                    <CardBody>
                                        <Row className = "justify-content-center">
                                            <img src = {icon} style = {{ height: 200, paddingBottom: 10, marginTop: -10 }}/>
                                        </Row>
                                        <Row className = "justify-content-center">
                                            <p style = {{ backgroundPosition: "center", fontSize: 18 }}> <strong> Reset Password </strong> </p>
                                        </Row>

                                        {code !== "" ? <div>
                                            {correctCode ? <div>
                                                <Row className = "justify-content-center">
                                                    <p className = "text-muted" style = {{ backgroundPosition: "center", textAlign: "center" }}> Reset your password </p>
                                                </Row>

                                                <InputGroup className = "mb-3">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input 
                                                        type = {passwordShown ? "text" : "password"}
                                                        name = "password" 
                                                        value = { input.password || "" } 
                                                        onChange = { handleInputChange } 
                                                        placeholder = "Password" 
                                                        autoComplete = "telegram" 
                                                        required 
                                                    />
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText style = {{ backgroundColor: "white" }}>
                                                            <i className = "fa fa-eye" onClick = { togglePassword }></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {err.password && <span className = "err"> {err.confirmPassword} </span>}

                                                <InputGroup className = "mb-3">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input 
                                                        type = {passwordShown1 ? "text" : "password"}
                                                        name = "confirmPassword" 
                                                        value = { input.confirmPassword || "" } 
                                                        onChange = { handleInputChange } 
                                                        onBlur = { validateInput }
                                                        placeholder = "Confirm Password" 
                                                        autoComplete = "telegram" 
                                                        required 
                                                    />
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText style = {{ backgroundColor: "white" }}>
                                                            <i className = "fa fa-eye" onClick = { togglePassword1 }></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {err.confirmPassword && <span className = "err"> {err.confirmPassword} </span>}

                                                <Row className = "justify-content-center">
                                                    <Col>
                                                        <Input type = "submit" value = "Reset Password" color = "primary" className = "px-6" name = "Reset Password" style = {{ width: 243, marginBottom: 10 }} onClick = { onSubmitPassword }/>
                                                    </Col>
                                                </Row>
                                            </div> :
                                            <div> 
                                                <Row className = "justify-content-center">
                                                    <p className = "text-muted" style = {{ backgroundPosition: "center", textAlign: "center" }}> Enter code sent to you. </p>
                                                </Row>

                                                <InputGroup className = "mb-3">
                                                    <Input type = "text" name = "code" value = { input.code || "" } onChange = { handleInputChange } placeholder = "Enter code" required />
                                                </InputGroup>

                                                <Row className = "justify-content-center">
                                                    <Col>
                                                        <Input type = "submit" value = "Enter" color = "primary" className = "px-6" name = "Enter" style = {{ width: 243, marginBottom: 10 }}  onClick = { onSubmitCode }/>
                                                    </Col>
                                                </Row>
                                            </div>}
                                        </div> : 
                                        <div>
                                            <Row className = "justify-content-center">
                                                <p className = "text-muted" style = {{ backgroundPosition: "center", textAlign: "center" }}> Enter your Telegram Chat ID below and we"ll send you a link to reset your password. </p>
                                            </Row>

                                            <InputGroup className = "mb-3">
                                                <Input type = "text" name = "telegram" value = { input.telegram || "" } onChange = { handleInputChange } placeholder = "Enter your Telegram Chat ID" autoComplete = "telegram" required />
                                            </InputGroup>

                                            <Row className = "justify-content-center">
                                                <Col>
                                                    <Input type = "submit" value = "Enter" color = "primary" className = "px-6" name = "Enter" style = {{ width: 243, marginBottom: 10 }}  onClick = { onSubmit }/>
                                                </Col>
                                            </Row>
                                        </div>}

                                        <Row className = "justify-content-center" style = {{ backgroundPosition: "center", marginBottom: 40 }}>
                                            <a style = {{ cursor: "pointer" }} onClick = { loginPage }>
                                                <u>
                                                    Log In
                                                </u>
                                            </a>
                                            &nbsp;
                                            OR
                                            &nbsp;
                                            <a style = {{ cursor: "pointer" }} onClick = { registerAccount }>
                                                <u>
                                                    Sign Up
                                                </u>
                                            </a>
                                        </Row>

                                        <Row className = "justify-content-center">
                                            <p className = "text-muted" style = {{ backgroundPosition: "center", fontPosition: "center", marginBottom: -50 }}> Webpage solely built by YongJun. </p>
                                        </Row>
                                    </CardBody>
                                </Card> 
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
                <Container />
                <Container />
                <Container />
            </div>
        </div>
    )
}

export default Recovery