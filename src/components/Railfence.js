import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

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

        let cipher = "";
        for (let i = 0; i < key; i++) {
            for (let j = i; j < text.length; j += parseInt(key)) {
                cipher += text[j];
            }
        }
        setOutput(cipher);
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

        let decrypt = "";
        let range = Math.ceil(text.length / key);
        let rail = new Array(key)
        for (let i = 0; i < key; i++) {
            rail[i] = new Array(range).fill("\n");
        }
        for (let i =0;i<rail.length;i++) {
            for (let j=0;j<rail[0].length;j++) {
                if (rail[i][j] == undefined){
                    continue;
                }
                else{
                    rail[i][j] = text[i * rail[0].length + j];
                }
            }
        }

        for (let i=0;i<rail[0].length;i++){
            for (let j=0;j<rail.length;j++){
                if (rail[j][i] == "\n"){
                    continue;
                }
                else if(rail[j][i] == undefined){
                    continue;
                }
                else{
                    decrypt += rail[j][i];
                }
            }
        }
        setOutput(decrypt);

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

