import React, { Component } from "react";
import her from "../../images/her.jpg"
import me from "../../images/me.jpg"
import "react-alice-carousel/lib/alice-carousel.css";
import "./heart.css"

class About extends Component {

    render() {
        return(
            <div className = "animated fadeIn">
                <div class = "coloumn">
                    <div class = "row">
                        <div class = "card-deck" style = {{ margin: "auto" }}>
                            <div class = "card bg-white">
                                <div class = "card-body">
                                    <div class = "row">
                                        <div>
                                            <img style = {{ marginRight: "auto", marginLeft: "auto", marginBottom: 10, display: "block" }} src = { me }/>
                                            <h3 class = "card-text" align = "center"> Tay Yong Jun"s details. </h3>
                                            <hr/>
                                            <ul>
                                                <li>
                                                    Studied in Teck Whye Primary School and graduated in 2014.
                                                </li>
                                                <li>
                                                    Studied in Regent Secondary School and graduated in 2019.
                                                </li>
                                                <li>
                                                    Studied in Singapore Polytechnic and graduated in 2022.
                                                </li>
                                                <li>
                                                    Awarded Diploma in Computer Engineering.
                                                </li>
                                            </ul>
                                            <p class = "card-text" align = "center"> Date of Birth: 4 <sup> th </sup> June 2002. </p>
                                            <p class = "card-text" align = "center"> Contact Number: +65 8133 1202 </p>
                                            <p class = "card-text" align = "center"> Email: 04jaytay@gmail.com </p>
                                            <p class = "card-text" align = "center"> Spouse: Clarinda Lee </p>
                                            <p class = "card-text" align = "center"> Birth Place : Singapore </p>
                                            <p class = "card-text" align = "center"> Location: Blk 157, Jalan Teck Whye, Singapore S680157, Unit Number 11-119 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "heart-shape" style = {{ margin: "auto" }}/>
                            <div class = "card bg-white">
                                <div class = "card-body">
                                    <div class = "row">
                                        <div>
                                            <img style = {{ marginRight: "auto", marginLeft: "auto", marginBottom: 10, display: "block" }} src = { her }/>
                                            <h3 class = "card-text" align = "center"> Clarinda Lee"s details. </h3>
                                            <hr/>
                                            <ul>
                                                <li>
                                                    Studied in Beacon Primary School and graduated in 2015.
                                                </li>
                                                <li>
                                                    Studied in West Spring Secondary School and graduated in 2020.
                                                </li>
                                                <li>
                                                    Studying in Rupublic Polytechnic.
                                                </li>
                                                <li>
                                                    Pursuing Diploma in Pharmaceutical Science
                                                </li>
                                            </ul>
                                            <p class = "card-text" align = "center"> Date of Birth: 3 <sup> rd </sup> December 2003. </p>
                                            <p class = "card-text" align = "center"> Contact Number: +65 9365 7422 </p>
                                            <p class = "card-text" align = "center"> Email: clarindalee721@gmail.com </p>
                                            <p class = "card-text" align = "center"> Spouse: Tay Yong Jun </p>
                                            <p class = "card-text" align = "center"> Birth Place : Singapore </p>
                                            <p class = "card-text" align = "center"> Location: Blk 166, Gangsa Road, Singapore S670166, Unit Number 11-48 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default About;