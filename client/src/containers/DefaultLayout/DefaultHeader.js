import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
import PropTypes from 'prop-types';
import { handleData } from '../../Client_API';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
	
	constructor(props) {
		super(props)
		this.state = { username: "" };
	}

	componentDidMount() {
		handleData("/username", 'GET')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                username: result.username
            });
        },
        (error) => {
            console.log(error);
        })
    }
  
    render() {

        return (
            <React.Fragment>
                <AppSidebarToggler className = "d-lg-none" display = "md" mobile />
                <AppSidebarToggler className = "d-md-down-none" display = "lg" />

                <Nav className = "d-md-down-none" navbar>
                    <NavItem className = "px-3" style = {{ fontSize: 18 }}>
                        Welcome { this.state.username }!
                    </NavItem>
                </Nav>
                <Nav className = "ml-auto" navbar>
                    <AppHeaderDropdown direction = "down">
                        <DropdownToggle nav>
                            <strong> 
                                { this.state.username }
                            </strong>
                            <img src = { '../../assets/img/avatars/person.png' } className = "img-avatar" alt = "admin@eziot.com"/>
                        </DropdownToggle>
                        <DropdownMenu right style = {{ right: 'auto' }}>
                            <DropdownItem onClick = { e => this.props.routeProfile(e) }>
                                <i className="fa fa-user"> </i>
                                Profile
                            </DropdownItem>
                            <DropdownItem onClick = { e => this.props.SignOut(e) }>
                                <i className = "fa fa-lock"> </i>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;