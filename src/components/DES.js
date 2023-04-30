import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
var CryptoJS = require("crypto-js");
import swal from 'sweetalert';


export default function Caesar () {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [outputList, setOutputList] = useState([]);
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

        const ciphertext = CryptoJS.DES.encrypt(text, key).toString();
        setOutput(ciphertext);
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
        const decryptedMessage = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        setOutput(decryptedMessage);
        if (decryptedMessage == "") {
            swal({
                title: "Error",
                text: "Wrong Key",
                icon: "warning",
              });
        }
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

