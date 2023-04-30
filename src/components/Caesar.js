import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

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

        let result = "";
        for (let i = 0; i < text.length; i++) {
            let c = text.charCodeAt(i);
            if (c >= 65 && c <= 90) {
                var shifted_val = c + shift - 65
                console.log(shifted_val)
                result += String.fromCharCode(((parseInt(c) + parseInt(shift) - 65) % 26) + 65);
            } else if (c >= 97 && c <= 122) {
                result += String.fromCharCode(((parseInt(c) + parseInt(shift) - 97) % 26) + 97);
            } else {
                result += text.charAt(i);
            }
        }

        setOutputList([result]);
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

        let result = "";
        for (let i = 0; i < text.length; i++) {
            let c = text.charCodeAt(i);
            if (c >= 65 && c <= 90) {
                result += String.fromCharCode(((parseInt(c) - 65 - parseInt(shift)) % 26 ) + 65);
            } else if (c >= 97 && c <= 122) {
                result += String.fromCharCode(((parseInt(c) - 97 - parseInt(shift)) % 26 ) + 97);
            } else {
                result += text.charAt(i);
            }
        }

        setOutputList([result]);
    
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
        var final = []
        for (let j = 1; j <= 26; j++) {
            let result = "";
            for (let i = 0; i < text.length; i++) {
                let c = text.charCodeAt(i);
                if (c >= 65 && c <= 90) {
                    result += String.fromCharCode((c - 65 - j + 26) % 26 + 65);
                } else if (c >= 97 && c <= 122) {
                    result += String.fromCharCode((c - 97 - j + 26) % 26 + 97);
                } else {
                    result += text.charAt(i);
                }
            }
            final.push(result)
        }

        setOutputList(final);
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

