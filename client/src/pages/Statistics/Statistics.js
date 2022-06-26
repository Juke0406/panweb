import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { Col, Row } from "reactstrap";
import { handleData } from "../../Client_API";

class Statistics extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                "S/N",
                "Username",
                "Date",
                "Time",
                "Log IN/OUT"
            ],
            data: [["", "", "", "", ""]],
			options: {
				filterType: "checkbox",
				responsive: "scroll",
				selectableRows: "none",
				rowsPerPage: 500
			},
            table_title: "Statistics"
        }
    }

    fetchStats() {
        handleData("/stats", "GET")
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            else return false;
        })
        .then(results => {
            if (results) {
                this.setState({ data: results })
            }
        })
    }

    componentDidMount() {
        this.fetchStats(this);
    }

    render(props) {
        return (
            <div className = "animated fadeIn">
                <Row>
                    <Col xs = "12" md = "12">
                        <MUIDataTable
							title = { this.state.table_title }
							data = { this.state.data }
							columns = { this.state.columns }
							options = { this.state.options }
                        />
                        <p/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Statistics;