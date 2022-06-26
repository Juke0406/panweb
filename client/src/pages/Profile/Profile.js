import React, { Component } from "react"
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Button
} from "reactstrap"
import { handleData } from "../../Client_API"

class Profile extends Component {

	constructor(props) {

		super(props)
		this.state = {
            username: "",
            age: 0,
            telegram: "",
            dob: "",
		}
		
		this.routeEditProfile = this.routeEditProfile.bind(this)

	}

    fetchAccountDetails() {
        handleData("/profile", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false
        })
        .then(results => {
            if (results) {

                let today = new Date();
                let details = results[0][0]
                let datePart = details.date_of_birth.match(/\d+/g)
                let year = datePart[0]

                this.setState({
                    username: details.username,
                    age: today.getFullYear() - year,
                    telegram: details.telegram,
                    dob: details.date_of_birth
                })
            }
        })
    }
  
	routeEditProfile() {
		this.props.history.push('/profile_Edit')
	}
  
	componentDidMount() {
        this.fetchAccountDetails()
	}
	
	render() {
		return (
			<div className = "animated fadeIn">
                <Row>
                    <Col xs = "12" md = "6">
                        <Card>
                            <CardHeader>
                                <strong> Personal Informations </strong>
                            </CardHeader>
                            <CardBody>
                                <Row>
									<Col xs = "6">
                                        Username:
									</Col>
                                    <Col xs = "3">
                                        { this.state.username }
                                    </Col>
                                </Row>
                                <p/>
                                <Row>
									<Col xs = "6">
                                        Age:
									</Col>
                                    <Col xs = "3">
                                        { this.state.age }
                                    </Col>
                                </Row>
                                <p/>
                                <Row>
									<Col xs = "6">
                                        Telegram Chat ID:
									</Col>
                                    <Col xs = "3">
                                        { this.state.telegram }
                                    </Col>
                                </Row>
                                <p/>
                                <Row>
									<Col xs = "6">
                                        Date of Birth:
									</Col>
                                    <Col xs = "3">
                                        { this.state.dob }
                                    </Col>
                                </Row>
                                <p/>
                                <Button block color = "primary" onClick = { this.routeEditProfile }>
                                    Edit Profile
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</div>
		)
	}

}

export default Profile