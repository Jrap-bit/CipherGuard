import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
var CryptoJS = require("crypto-js");
import swal from 'sweetalert';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'


export default function Caesar () {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [output, setOutput] = useState("");

    const encrypt = () => {
        if (text == "") {

            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (key == "") {

            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }

        axios.post("/encrypt/DES/", { input_str: text, key: key })
        .then(response => {
            setOutput(response.data);
            if (response.data == ""){
                swal({
                    title: "Invalid Key",
                    text: "Enter 8, 16 or 24 characters as key",
                    icon: "error",
                  });
                return;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const decrypt = () => {
        if (text == "") {

            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (key == "") {

            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }
        axios.post("/decrypt/DES/", { input_str: text, key: key })
        .then(response => {
            setOutput(response.data);
            if (response.data == ""){
                swal({
                    title: "Invalid Key",
                    text: "Enter 8, 16 or 24 characters as key",
                    icon: "error",
                  });
                return;
            }
        }
        )
        .catch(error => {
            swal({
                title: "Invalid Key",
                text: "Enter the Correct Key",
                icon: "error",
              });
        }
        );
    }

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">DES - Data Encryption Standard</h1>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
    
        <TextField className="mx-3" onChange={(event) => {
            setKey(event.target.value);
        }} label="Enter the Key" type="text"/>
        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Encrypt</Button>
        <Button className="p-3 mx-2" variant="outlined" onClick={decrypt} color="error">Decrypt</Button>
        </div>

        <div className="pb-5 flex-column d-flex justify-content-center text-center">
        <CardHeader title="Output" />
        <h3>{output}</h3>
        </div>

        </Card>
        </div>
        </Grow>
    )
}

