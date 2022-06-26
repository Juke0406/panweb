import React, { Component } from "react";
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
import background from "../../images/background.jpg"
import icon from "../../images/icon.jpg"
import { handleData } from "../../Client_API"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : "",
            password: "",
            passwordShown: false
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    togglePassword = () => {
        let currentState = this.state.passwordShown;
        this.setState({
            passwordShown: !currentState
        })
    }

    registerAccount = () => {
        this.props.history.push("/registration")
    }

    forgetPassword = () => {
        this.props.history.push("/recovery")
    }

    onSubmit = (event) => {
        event.preventDefault();
        handleData("/login", "POST", ({ state : this.state }))
        .then(res => {
            if (res.status === 200) {
                this.props.history.push("/home_page")
            }
            else {
                this.setState({
                    err_msg: "Please check your username or password."
                });
                alert(this.state.err_msg)
                return res.text();
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error logging in please try again");
        });
    }
  
    render() {
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
                                    <Card className = "p-5">
                                        <CardBody>
                                            <Form onSubmit = {this.onSubmit}>
                                                <Row className = "justify-content-center">
                                                    <img src = {icon} style = {{ height: 200, paddingBottom: 10, marginTop: -10 }}/>
                                                </Row>
                                                <Row className = "justify-content-center">
                                                    <p className = "text-muted" style = {{ backgroundPosition: "center" }}> Sign in to your account </p>
                                                </Row>

                                                <InputGroup className = "mb-3">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type = "text" name = "username" value = { this.state.username } onChange = { this.handleInputChange } placeholder = "Username" autoComplete = "username" required />
                                                </InputGroup>
                                                
                                                <InputGroup className = "mb-3">
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText>
                                                            <i className = "icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type = { this.state.passwordShown ? "text" : "password" } name = "password" value = { this.state.password } onChange = { this.handleInputChange } placeholder = "Password" autoComplete = "current-password" required />
                                                    <InputGroupAddon addonType = "prepend">
                                                        <InputGroupText style = {{ backgroundColor: "white" }}>
                                                            <i className = "fa fa-eye" onClick = { this.togglePassword }></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>

                                                <Row className = "justify-content-center">
                                                    <Col xs = "6">
                                                        <Input type = "submit" value = "Login" color = "primary" className = "px-6" name = "Login" />
                                                    </Col>
                                                </Row>

                                                <Row className = "justify-content-center" style = {{ backgroundPosition: "center", marginTop: "15px" }}>
                                                    <p className = "text-muted"> New to PanWeb? </p>
                                                    &nbsp;
                                                    &nbsp;
                                                    <a style = {{ cursor: "pointer" }} onClick = { this.registerAccount }>
                                                        <u>
                                                            Sign Up! 
                                                        </u>
                                                    </a>
                                                </Row>

                                                <Row className = "justify-content-center" style = {{ backgroundPosition: "center", marginTop: "-15px", marginBottom: "15px" }}>
                                                    <a style = {{ cursor: "pointer" }} onClick = { this.forgetPassword }>
                                                        <u>
                                                            Forget Password?
                                                        </u>
                                                    </a>
                                                </Row>

                                                <Row className = "justify-content-center">
                                                    <p className = "text-muted" style = {{ backgroundPosition: "center", fontPosition: "center", marginBottom: -50 }}> Webpage solely built by YongJun. </p>
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
        );
    }
}

export default Login;