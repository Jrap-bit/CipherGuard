import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

export default function Vigenere () {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [output, setOutput] = useState("");

    const modulus = function (n, m) {
        return ((n % m) + m) % m;
    }

    const key_generator = (text, key) => {
        let key_ = "";
        if (key.length < text.length) {
            for (let i = 0; i < text.length; i++) {
                key_ += key[i % key.length].toUpperCase();
            }
        }
        else{
            key_ = key.toUpperCase();
        }

        return key_;
    }

    const encrypt = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (key.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }
        let cipher = "";
        let key_ = key_generator(text, key);
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " "){
                cipher += " ";
            }
            else{
            let x = text.toUpperCase().charCodeAt(i);
            let y = key_.charCodeAt(i);
            let char = (parseInt(x) - 65) + (parseInt(y) - 65);
            cipher += String.fromCharCode((modulus(parseInt(char),26)) + 65);
            }
        }
        setOutput(cipher);
    }

    const decrypt = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
            return;
        }
        if (key.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
            return;
        }

        let decrypt_text = "";
        let key_ = key_generator(text, key);
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " "){
                decrypt_text += " ";
            }
            else{
            let x = text.toUpperCase().charCodeAt(i);
            let y = key_.charCodeAt(i);
            let char = (parseInt(x) - 65) - (parseInt(y) - 65);
            decrypt_text += String.fromCharCode((modulus(parseInt(char),26)) + 65);
            }
        }
        setOutput(decrypt_text);
    }

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Vigenere Cipher</h1>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
        <TextField className="mx-3" onChange={(event) => {
            setKey(event.target.value);
        }} label="Enter the Key" fullWidth/>
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

