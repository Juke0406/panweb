import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Card, 
    CardBody, 
    CardGroup, 
    Col, 
    Container, 
    Form, 
    Input, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    Row 
} from "reactstrap";
import { handleData } from "../../Client_API";
import background from "../../images/background.jpg"
import icon from "../../images/icon.jpg"

function Registration() {
    const [ input, setInput ] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        dob: "",
        telegram: ""
    })

    const [ err, setErr ] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        dob: "",
        telegram: ""
    })

    const [ passwordShown, setPasswordShown ] = useState(false);
    const [ passwordShown1, setPasswordShown1 ] = useState(false);

    const history = useHistory();
 
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const togglePassword1 = () => {
        setPasswordShown1(!passwordShown1)
    }

    const validateInput = (e) => {
        let { name, value } = e.target;
        setErr(prev => {
            const stateObj = { ...prev, [name]: "" };
        
            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "dob":
                    if (!value) {
                        stateObj[name] = "Please enter your Date of Birth.";
                    }
                    break;
        
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

                case "telegram":
                    if (!value) {
                        stateObj[name] = "Please enter Telegram Chat ID."
                    }
                    break;
        
                default:
                break;
            }
        
            return stateObj;
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (input.username !== "" && 
            input.password !== "" && 
            input.confirmPassword !== "" && 
            input.dob !== "" && 
            input.telegram !== "")
        {
            history.push("/verification")
            handleData("/telegramVerification", "POST", { data: input })
        }
        else {
            alert("Please fill in all the blanks!")
        }
    }

    const loginPage = () => {
        history.push("/login")
    }

    return (
        <div style = {{  
            backgroundImage: `url(${background})`,
            backgroundPosition: "right bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            <div className = "app flex-row-reverse align-items-center">
                <Container >
                    <Row className = "justify-content-center">
                        <Col md = "14">
                            <CardGroup>
                                <Card className = "p-3" style = {{ width: 400, height: 900 }}>
                                    <CardBody>
                                        <Form onSubmit = {onSubmit}>
                                            <Row>
                                                <i 
                                                    className = "fa fa-reply" 
                                                    title = "Back to login" 
                                                    style = {{ color: "black", marginTop: -10, marginBottom: 30, cursor: "pointer" }}
                                                    onClick = {loginPage}
                                                >
                                                    &nbsp;
                                                    &nbsp;
                                                    <strong>
                                                        Back
                                                    </strong>
                                                </i>
                                            </Row>
                                            <Row className = "justify-content-center">
                                                <img src = {icon} style = {{ height: 200, paddingBottom: 10, marginTop: -30 }}/>
                                            </Row>
                                            <Row className = "justify-content-center">
                                                <p className = "text-muted" style = {{ backgroundPosition: "center" }}> Create your very own account. </p>
                                            </Row>

                                            <Row style = {{ marginBottom: err.username ? 0 : 21 }}>
                                                <label for = "username" style = {{ fontSize: 15 }}>
                                                    Username
                                                    <sup class = "required" title = "Required" style = {{ color: "red" }}> * </sup>
                                                </label>
                                                <InputGroup className = "mb-1">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type = "text"
                                                        name = "username"
                                                        placeholder = "Enter Username"
                                                        value = {input.username}
                                                        onChange = {onInputChange}
                                                        onBlur = {validateInput}
                                                        style = {{ borderColor: err.username ? "red" : "" }}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                {err.username && <span className = "err"> { err.username } </span>}
                                            </Row>

                                            <Row style = {{ marginBottom: err.dob ? 0 : 21 }}>
                                                <label for = "dob" style = {{ fontSize: 15 }}>
                                                    Date of Birth
                                                    <sup class = "required" title = "Required" style = {{ color: "red" }}> * </sup>
                                                </label>
                                                <InputGroup className = "mb-1">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type = "date"
                                                        name = "dob"
                                                        placeholder = "Enter D.O.B."
                                                        value = {input.dob}
                                                        onChange = {onInputChange}
                                                        onBlur = {validateInput}
                                                        style = {{ borderColor: err.dob ? "red" : "" }}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                {err.dob && <span className = "err"> { err.dob } </span>}
                                            </Row>

                                            <Row style = {{ marginBottom: err.password ? 0 : 21 }}>
                                                <label for = "password" style = {{ fontSize: 15 }}>
                                                    Password
                                                    <sup class = "required" title = "Required" style = {{ color: "red" }}> * </sup>
                                                </label>
                                                <InputGroup className = "mb-1">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type = {passwordShown ? "text" : "password"}
                                                        name = "password"
                                                        placeholder = "Enter Password"
                                                        value = {input.password}
                                                        onChange = {onInputChange}
                                                        onBlur = {validateInput}
                                                        style = {{ borderColor: err.password ? "red" : "" }}
                                                    >
                                                    </Input>
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText style = {{ backgroundColor: "white" }}>
                                                            <i className = "fa fa-eye" onClick = {togglePassword}></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {err.password && <span className = "err"> {err.password} </span>}
                                            </Row>

                                            <Row style = {{ marginBottom: err.confirmPassword ? 0 : 21 }}>
                                                <label for = "confirmPassword" style = {{ fontSize: 15 }}>
                                                    Confirm Password
                                                    <sup class = "required" title = "Required" style = {{ color: "red" }}> * </sup>
                                                </label>
                                                <InputGroup className = "mb-1">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type = {passwordShown1 ? "text" : "password"}
                                                        name = "confirmPassword"
                                                        placeholder = "Enter Confirm Password"
                                                        value = {input.confirmPassword}
                                                        onChange = {onInputChange}
                                                        onBlur = {validateInput}
                                                        style = {{ borderColor: err.confirmPassword ? "red" : "" }}
                                                    >
                                                    </Input>
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText style = {{ backgroundColor: "white" }}>
                                                            <i className = "fa fa-eye" onClick = {togglePassword1}></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {err.confirmPassword && <span className = "err"> {err.confirmPassword} </span>}
                                            </Row>

                                            <Row>
                                                <label for = "telegram" style = {{ fontSize: 15 }}>
                                                    Telegram Chat ID
                                                    <sup class = "required" title = "Required" style = {{ color: "red" }}> * </sup>
                                                </label>
                                                <InputGroup className = { err.telegram ? "mb-1" : "mb-4" }>
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "fa fa-envelope-o"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type = "text"
                                                        name = "telegram"
                                                        placeholder = "Enter Telegram Chat ID"
                                                        value = {input.telegram}
                                                        onChange = {onInputChange}
                                                        onBlur = {validateInput}
                                                        style = {{ borderColor: err.telegram ? "red" : "" }}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                {err.telegram && <span className = "err"> {err.telegram} </span>}
                                            </Row>

                                            <Row className = "justify-content-center">
                                                <Col xs = "6">
                                                    <Input type = "submit" value = "Create" color = "primary" className = "px-6" name = "Create" />
                                                </Col>
                                            </Row>

                                            <Row className = "justify-content-center">
                                                <p className = "text-muted" style = {{ backgroundPosition: "center", fontPosition: "center", marginTop: 15, marginBottom: -50 }}> Webpage solely built by YongJun. </p>
                                            </Row>
                                        </Form>
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

export default Registration;