import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'

export default function Caesar () {
    const [text, setText] = useState("");
    const [shift, setShift] = useState(0);
    const [outputList, setOutputList] = useState([]);

    

    const encrypt = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (shift == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Shift Value",
                icon: "error",
              });
            return;
        }
        axios.post('/encrypt/caesar/', { input_str: text, shift: shift })
        .then(response => {
            setOutputList([response.data.encrypted_text]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const decrypt = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (shift == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Shift Value",
                icon: "error",
              });
            return;
        }
        axios.post('/decrypt/caesar/', { input_str: text, shift: shift })
        .then(response => {
            setOutputList([response.data.decrypted_text]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const bruteforce = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        axios.post('/decrypt/caesar/bruteforce/', { input_str: text })
        .then(response => {
            setOutputList(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    };

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Caesar Cipher</h1>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
        <TextField className="mx-3" onChange={(event) => {
            setShift(event.target.value);
        }} label="Shift Value" type="number"/>
        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Encrypt</Button>
        <Button className="p-3 mx-2" variant="outlined" onClick={decrypt} color="error">Decrypt</Button>
        <Button className="p-3 mx-2" variant="outlined" onClick={bruteforce} color="error">Bruteforce Decrypt</Button>
        </div>

        <div className="pb-5 flex-column d-flex justify-content-center text-center">
        <CardHeader title="Output" />
        {outputList.map((item, key) => {
            return (
            <div key={key}>
                <h3>{item}</h3>
            <br />
            </div>
            );
        })}
        </div>

        </Card>
        </div>
        </Grow>
    )
}

