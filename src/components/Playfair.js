import {Card,Grow, TextField,CardHeader, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'

export default function Playfair () {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [result, setResult] = useState("");
    const [finalMat, setFinalMat] = useState([]);
    const [plaintext, setPlaintext] = useState("");
    const encrypt = () => {
        if (key === "") {
            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }

        if (text === "") {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }

        if (text.length < 2) {
            swal({
                title: "Error",
                text: "Text Length Must Be Greater Than 2",
                icon: "warning",
              });
            return;
        }

        if (key.length > 25) {
            swal({
                title: "Error",
                text: "Key Length Must Be Less Than 25",
                icon: "warning",
              });
            return;
        }

        if (text.length > 100) {
            swal({
                title: "Error",
                text: "Text Length Must Be Less Than 100",
                icon: "warning",
              });
            return;
        }

        if (key.includes(" ")) {
            swal({
                title: "Error",
                text: "Key Must Not Contain Spaces",
                icon: "warning",
              });
            return;
        }
        axios.post('/encrypt/playfair/', { key: key, plaintext: text })
        .then(response => {
            setResult(response.data.ciphertext);
            setFinalMat(response.data.matrix); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const decrypt = () => {
        if (key === "") {
            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }

        if (text === "") {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }

        if (text.length < 2) {
            swal({
                title: "Error",
                text: "Text Length Must Be Greater Than 2",
                icon: "warning",
              });
            return;
        }

        if (key.length > 25) {
            swal({
                title: "Error",
                text: "Key Length Must Be Less Than 25",
                icon: "warning",
              });
            return;
        }

        if (text.length > 100) {
            swal({
                title: "Error",
                text: "Text Length Must Be Less Than 100",
                icon: "warning",
              });
            return;
        }

        if (key.includes(" ")) {
            swal({
                title: "Error",
                text: "Key Must Not Contain Spaces",
                icon: "warning",
              });
            return;
        }
        axios.post('/decrypt/playfair/', { key: key, ciphertext: text })
        .then(response => {
            setResult(response.data.decrypted_text);
            setFinalMat(response.data.matrix);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    };

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Playfair Cipher</h1>
        <p className="small d-flex justify-content-center">Padding Letter - X</p>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
        <TextField fullWidth className="mx-3" onChange={(event) => {
            setKey(event.target.value);
        }} label="Enter The Key" type="text"/>
        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Encrypt</Button>
        <Button className="p-3 mx-2" variant="outlined" onClick={decrypt} color="error">Decrypt</Button>
        </div>

        <div className="pb-5 flex-column d-flex justify-content-center text-center">
        <CardHeader title="Matrix" />
        {finalMat.map((item) => {
            return (
            <div key={item}>
                <h4>{item}</h4>
            <br />
            </div>
            );
        })}
        <CardHeader title="Output" />
        <h4>{result}</h4>
        </div>

        </Card>
        </div>
        </Grow>
    )
}

