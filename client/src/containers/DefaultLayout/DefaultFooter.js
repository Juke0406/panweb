import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
    constructor(props) {
	    super(props);
        this.state = {
            time : null,
            intervaltimeId : null
        }
        this.updateTime = this.updateTime.bind(this);
    }
    
    componentDidMount() {
        let intervalId = setInterval(this.updateTime, 1000);
        this.setState({
            intervaltimeId: intervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervaltimeId);
    }
    
    updateTime() {
        let today = new Date();
        let date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
        let time = `${ today.getHours() < 10 ? `0${today.getHours()}` : today.getHours() }:${ today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes() }:${ today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds() }`;
        let dateTime = `${date} ${time}`;
        this.setState({ time: dateTime });
    }
  
    render() {

        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <span> YongJun's Website </span>
                <span className = "ml-auto"> { this.state.time } </span>
            </React.Fragment>
        );
    }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;