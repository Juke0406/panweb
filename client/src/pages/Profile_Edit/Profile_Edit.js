import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row
} from "reactstrap";
import { handleData } from "../../Client_API";

class Profile_Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: "",
            telegram: "",
            dob: "",
            new_password : "",
            shownNew: "",
            errNew: "",
            confirm_new_password: "",
            shownConfirm: "",
            errConfirm: "",
        };

    }
  
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.validateInput(event)

    };

    validateInput = (event) => {
        let { name, value } = event.target;
        
        this.setState(prev => {
            const stateObj = { ...prev, [name === "new_password" ? "errNew": ""]: "", [name === "confirm_new_password" ? "errConfirm": ""]: "" }

            switch (name) {
                case "new_password":
                    if (!value) {
                        stateObj["errNew"] = "Please enter Password."
                    }
                    else
                    if (this.state.confirm_new_password && value !== this.state.confirm_new_password) {
                        stateObj["errConfirm"] = "Password and Confirm Password does not match.";
                    }
                    else {
                        stateObj["errConfirm"] = this.state.confirm_new_password ? "" : this.state.errConfirm;
                    }
                    break;
                
                case "confirm_new_password":
                    if (!value) {
                        stateObj["errConfirm"] = "Please enter Password."
                    }
                    else
                    if (this.state.new_password && value !== this.state.new_password) {
                        stateObj["errConfirm"] = "Password and Confirm Password does not match."
                    }
                    break;

                default:
                break;
            }

            return stateObj;
        })
    }
  
	componentDidMount() {
		this.fetchProfile();
	}

    fetchProfile() {
        handleData("/profile", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false
        })
        .then(results => {
            if (results) {

                let details = results[0][0]
                this.setState({
                    id: details.id,
                    username: details.username,
                    telegram: details.telegram,
                    dob: details.date_of_birth
                })
            }
            
        })
    }
   
    onSubmit = (event) => {
        event.preventDefault();
        handleData("/edit_profile", "POST", this.state)
        .then(res => {
            if (res.status === 200) {
                this.props.history.push("/login");
            }
        })
    };
  
    onSubmitPassword = (event) => {
        event.preventDefault();
        
        if (window.confirm("Are you sure to change password?")) {
            handleData("/change_password", "POST", this.state)
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push("/profile/edit");
                }
                return res.text();
            })
            .then(data => {
                alert(data);  
            });
        }
        
    };

    render() {
        return (
            <div className = "animated fadeIn">
                <Row>
                    <Col xs = "12" md = "6">
                        <Card>
                            <CardHeader>
                                <strong> Edit Profile </strong>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit = { this.onSubmit }>
                                    <FormGroup row>
                                        <Col md = "3">
                                            <Label htmlFor = "text-input"> Username </Label>
                                        </Col>
                                        <Col xs = "12" md = "9">
                                            <Input
                                                type = "text"
                                                autoComplete = "off"
                                                required
                                                value = { this.state.username }
                                                onChange = { this.handleInputChange }
                                                name = "username"
                                                placeholder = "Username"
                                            />
                                            <FormText color = "muted"> Username </FormText>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md = "3">
                                            <Label htmlFor = "text-input"> Telegram Chat ID </Label>
                                        </Col>
                                        <Col xs = "12" md = "9">
                                            <Input
                                                type = "text"
                                                autoComplete = "off"
                                                required
                                                value = { this.state.telegram }
                                                onChange = { this.handleInputChange }
                                                name = "telegram"
                                                placeholder = "Telegram Chat ID"
                                            />
                                            <FormText color = "muted"> Telegram Chat ID </FormText>
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Col md = "3">
                                            <Label htmlFor = "text-input"> Date of Birth </Label>
                                        </Col>
                                        <Col xs = "12" md = "9">
                                            <Input
                                                type = "date"
                                                autoComplete = "off"
                                                required
                                                value = { this.state.dob }
                                                onChange = { this.handleInputChange }
                                                name = "dob"
                                                placeholder = "Date of Birth"
                                            />
                                            <FormText color = "muted"> Date of Birth </FormText>
                                        </Col>
                                    </FormGroup>
                                    <Input
                                        type = "submit"
                                        value = "Save Changes"
                                        color = "primary"
                                        className = "px-4"
                                        name = "Save Changes"
                                    />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs = "12" md = "6">
                        <Card>
                            <CardHeader>
                                <strong> Change Password </strong>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit = { this.onSubmitPassword }>
                                <FormGroup row>
                                    <Col md = "3">
                                        <Label htmlFor = "text-input"> New Password </Label>
                                    </Col>
                                    <Col xs = "12" md = "9">
                                        <Input
                                            type = "password"
                                            autoComplete = "off"
                                            required
                                            onChange = { this.handleInputChange }
                                            onBlur = { this.validateInput }
                                            name = "new_password"
                                            placeholder = "New Password"
                                        />
                                        { this.state.errNew && <span className = "err"> { this.state.errNew } </span> } 
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md = "3">
                                        <Label htmlFor = "text-input"> Confirm New Password </Label>
                                    </Col>
                                    <Col xs = "12" md = "9">
                                        <Input
                                            type = "password"
                                            autoComplete = "off"
                                            required
                                            onChange = { this.handleInputChange }
                                            onBlur = { this.validateInput }
                                            name = "confirm_new_password"
                                            placeholder = "Confirm New Password"
                                        />
                                        { this.state.errConfirm && <span className = "err"> { this.state.errConfirm } </span> }
                                    </Col>
                                </FormGroup>
                                <Input
                                    type = "submit"
                                    value = "Change Password"
                                    color = "primary"
                                    className = "px-4"
                                    name = "Change Password"
                                />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile_Edit;
