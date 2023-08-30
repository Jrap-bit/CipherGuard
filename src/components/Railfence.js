import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'

export default function Railfence () {
    const [text, setText] = useState("");
    const [key, setKey] = useState(0);
    const [output, setOutput] = useState("");

    const encrypt = () => {
        if (key == 0) {
            swal({
                title: "Error",
                text: "Key cannot be 0",
                icon: "error",
              });
            return;
        }
        if (key == 1) {
            setOutput(text);
            return;
        }
        if (text == "") {
            swal({
                title: "Error",
                text: "Text cannot be empty",
                icon: "error",
              });
            return;
        }

        if (key > text.length) {
            swal({
                title: "Error",
                text: "Key cannot be greater than length of text",
                icon: "error",
              });
            return;
        }

        if (key < 0) {
            swal({
                title: "Error",
                text: "Key cannot be negative",
                icon: "error",
              });
            return;
        }

        axios.post('/encrypt/railfence/', { input_str: text, key: key })
            .then(response => {
                setOutput(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const decrypt = () => {
        if (key == 0) {
            swal({
                title: "Error",
                text: "Key cannot be 0",
                icon: "error",
              });
            return;
        }
        if (key == 1) {
            setOutput(text);
            return;
        }
        if (text == "") {
            swal({
                title: "Error",
                text: "Text cannot be empty",
                icon: "error",
              });
            return;
        }

        if (key > text.length) {
            swal({
                title: "Error",
                text: "Key cannot be greater than length of text",
                icon: "error",
              });
            return;
        }

        if (key < 0) {
            swal({
                title: "Error",
                text: "Key cannot be negative",
                icon: "error",
              });
            return;
        }

        if (key > text.length/2) {
            swal({
                title: "Error",
                text: "Key cannot be greater than half the length of text",
                icon: "error",
              });
            return;
        }

        axios.post('/decrypt/railfence/', { input_str: text, key: key })
            .then(response => {
                setOutput(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Railfence Cipher</h1>

        <div className="p-5 d-flex justify-content-center">

        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />

        <TextField className="mx-3" onChange={(event) => {
            setKey(event.target.value);
        }} label="Enter The Key" type="number"/>

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

