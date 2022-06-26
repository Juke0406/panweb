import React, { Component } from "react"
import image from "../../images/b4f.png"
import image2 from "../../images/b2f.png"

import GoogleMapReact from "google-map-react"
import { handleData } from "../../Client_API"

function createMapOptions() {
  	return {
    	panControl: true,
      	mapTypeControl: true,
      	scrollwheel: false,
	  	zoomControl: false,
	  	draggable: false,
		disableDoubleClickZoom: true,
		clickableIcons: false,
    }
}

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: [1.379693, 103.761256],
            zoom: 16.5,
            API_KEY: "AIzaSyAbblfH2BvnnxW1dWZJX3vQmYAN4csUDDA",
            map: null,
            maps : null,
            markers: [],
            start: false,
            dates: "",
            message: "",
            messages: "",
            admin_level: 0
        }

        this.handleApiLoaded  = this.handleApiLoaded.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
		  
	handleApiLoaded = (map, maps) => {

	  	const markers = []

        markers.push(
            new maps.Marker({
                position: {
                    lat: parseFloat(1.3794),
                    lng: parseFloat(103.7570),
                },
                label: {
                    text: "YongJun",
                    color: "white",
                    fontSize: "10px"
                },
                icon: image,
                map,
            })
        )

        markers.push(
            new maps.Marker({
                position: {
                    lat: parseFloat(1.3776),
                    lng: parseFloat(103.7654),
                },
                label: {
                    text: "Clarinda",
                    color: "white",
                    fontSize: "10px"
                },
                icon: image2,
                map,
            })
        )

	  	this.setState({ markers: markers, map: map, maps: maps, start: true })

	}

    handleInputChange = (e) => {
        this.setState({ message: e.target.value })
    }

    onSubmit = () => {
        if (window.confirm(this.state.message)) {
            handleData("/message", "POST", { data: this.state.message })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push("/home_page")
                }
                else {
                    alert("Error publishing messages.")
                }
            })
        }
    }

    dateDiff = () => {
        let date1 = new Date("03/09/2021 00:00:00")
        let date2 = new Date()

        let timeDiff = date2.getTime() - date1.getTime()
        let dateDiff = timeDiff / (1000 * 3600 * 24) + 1

        this.setState({ dates: dateDiff.toFixed(0) })
    }

    fetchAdmin = () => {
        handleData("/admin_level", "GET")
        .then(res => res.json())
        .then((results) => {
            if (results) {
                this.setState({ admin_level: results.admin_level })
            }
        })
    }

    fetchMessage = () => {
        handleData("/messages", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.text()
            }
            else return false
        })
        .then(results => {
            if (results) {
                this.setState({ messages: results })
            }
        })
    }

  	componentDidMount() {
        this.dateDiff()
        this.fetchAdmin()
        this.fetchMessage()
    }
 
  	render() {

		var left = 80 + "px"
		var bottom = 261 + "px"

      	return (
	  		<div className = "animated fadeIn">
				<div className = "card-deck" >
                    {this.state.admin_level === "2" ? 
                        <div class = "card bg-white" style = {{ borderWidth: 1.5, marginRight: -5, maxHeight: 200, overflow: "auto" }}>
                            <textarea style = {{ border: "none", resize: "none", outline: "none", backgroundColor: "transparent", minHeight: 90, overflow: "auto", fontSize: 20 }} placeholder = "Message.." maxLength = "500" value = { this.state.message } onChange = { this.handleInputChange }/>
                            <button style = {{ borderWidth: 1.5, outline: "none", backgroundColor: "transparent", marginRight: 1, marginBottom: 1 }} onClick = { this.onSubmit }> Done </button>
                        </div> : 
                        <div class = "card bg-primary" style = {{ borderWidth: 1.5, marginRight: -5, maxHeight: 200, overflow: "auto" }}>
                            <div class = "card-body">
                                <h5 class = "card-title" style = {{ fontSize: 20 }}> Message: </h5>
                                <p class = "card-text text-center" style = {{ fontSize: 25, marginTop: -20, marginBottom: -15 }}> { this.state.messages } </p>
                            </div>
                        </div>
                    }
					<div class = "card bg-success" style = {{ borderWidth: 1.5, marginRight: -5 }}>
						<div class = "card-body text-center">
							<h5 class = "card-title" style = {{ fontSize: 20 }}> Number of days together. {`<3`} </h5>
							<p class = "card-text" style = {{ fontSize: 50, marginTop: -20, marginBottom: -15 }}> { this.state.dates } </p>
						</div>
					</div>
                </div>

                <div className = "card-deck" >
                    <div className = "card bg-transparent" style = {{ borderColor: "#2f353a", borderWidth: 1.5, marginTop: 20, marginBottom: 20 }}>
                        <div style = {{ height: "550px" }}>
                            <GoogleMapReact
                                options = {createMapOptions}
                                bootstrapURLKeys = {{ key: this.state.API_KEY }}
                                center = {this.state.center}
                                zoom = {this.state.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded = { ({ map, maps }) => this.handleApiLoaded(map, maps) }>
                                <div style = {{ left, bottom, position: "relative" }}>
                                </div>
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>
                <div className = "demo-solution demo-solution--flexbox">
                    <b>Legends:   
                        &nbsp;&nbsp;
                        <img src = {image} /> 
                        <span> YongJun's House </span>
                        &nbsp;
                        <img src = {image2} />
                        <span> Clarinda's House </span>
                    </b>
                </div>
			</div>
		)
  	}
  
}


export default Home