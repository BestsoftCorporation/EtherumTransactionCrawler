import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


const columns = [
    {
        dataField: "to",
        text: "To",
        sort: true,
    },
    {
        dataField: "from",
        text: "From",
        sort: true,
    },
    {
        dataField: "value",
        text: "Value",
        sort: true,
    },

];


export default function Login() {
    const [address, setAddress] = useState("");
    const [start, setStart] = useState("");
    const [data, setData] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        try {

            axios.get('http://localhost:4001/transactionss?address=' + address + '&start=' + start)
                .then(function (response) {
                    setData(JSON.parse(JSON.stringify(response.data)));
                })
                .catch(function (error) {
                    console.log(error)
                });


        } catch (e) {
            //alert(e.message);
        }
    }


    return (
        <div className="Customers">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="Name">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.address)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="Phone">
                    <Form.Label>Start block</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={start}
                        onChange={(e) => setStart(e.target.start)}
                    />
                </Form.Group>


                <Button block size="lg" type="submit">
                    Show
                </Button>
            </Form>

            <BootstrapTable
                keyField="id"
                data={data}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory({})}
            />
        </div>
    );
}