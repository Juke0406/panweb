import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { handleData } from './Client_API';

export default function withAuth(ComponentToProtect) {
	
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            handleData('/checkToken', 'GET')
            .then(res => {
                if (res.status === 200) return res.json()
                else return false
            })
            .then(result => {
                if (result) {
                    localStorage.setItem(`${window.location.host}-role`, result.admin_level);
                    this.setState({ loading: false });
                }
                else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => {
                console.log(err)
            });
        }


        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to = "/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}