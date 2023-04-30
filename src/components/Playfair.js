import {Card,Grow, TextField,CardHeader, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

export default function Playfair () {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [result, setResult] = useState("");
    const [finalMat, setFinalMat] = useState([]);
    const [plaintext, setPlaintext] = useState("");

    const matrix_creation = (enc_key) => {
        enc_key = enc_key.toUpperCase();
        let matrix = Array(5).fill().map(()=>Array(5).fill())
        let letters_used = [];
        let letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i=0;i<enc_key.length;i++) {
            if (!letters_used.includes(enc_key[i])) {
                letters_used.push(enc_key[i]);
            }
        }
        for (let i=0;i<letters.length;i++) {
            if (!letters_used.includes(letters[i])) {
                if (letters[i] === "J") {
                    continue;
                }
                else{
                letters_used.push(letters[i]);
                }
            }
        }
        let k = 0;
        for (let i=0;i<5;i++) {
            for (let j=0;j<5;j++) {
                matrix[i][j] = letters_used[k];
                k++;
            }
        }
        return matrix;
    }

    const letter_pairs = (text) => {
        let pairs = [];
        text = text.toUpperCase();
        text = text.replace(/ /g, "");
        text = text.replace(/J/g, "I");

        for (let i=0;i<text.length;i+=1) {
            if (text[i-1] === text[i]) {
                text = text.slice(0,i) + "X" + text.slice(i);
            }
        }
        if (text.length % 2 !== 0) {
            text += "X";
        }
        for (let i=0;i<text.length;i+=2) {
            pairs.push(text.slice(i,i+2));
        }
        return pairs;
    }

    const find_location = (matrix, letter = "") => {
        let loc = [];
        for (let i=0;i<5;i++) {
            for (let j=0;j<5;j++) {
                if (matrix[i][j] === letter) {
                    loc.push(i);
                    loc.push(j);

                    return loc;
                }
            }
        }
    }


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


        let mat = matrix_creation(key);
        let pairs = letter_pairs(text);
        let result = "";
        let loc1 = []
        let loc2 = []
        for (let i=0;i<pairs.length;i++) {
            loc1 = find_location(mat, pairs?.[i]?.[0]);
            loc2 = find_location(mat, pairs?.[i]?.[1]);
            if (loc1[0] === loc2[0]) {
                result += mat[loc1[0]][modulus((loc1[1]+1),5)];
                result += mat[loc2[0]][modulus((loc2[1]+1),5)];
            }
            else if (loc1[1] === loc2[1]) {
                result += mat[modulus((loc1[0]+1),5)][loc1[1]];
                result += mat[modulus((loc2[0]+1),5)][loc2[1]];
            }
            else {
                result += mat[loc1[0]][loc2[1]];
                result += mat[loc2[0]][loc1[1]];
            }
        }
        setResult(result);
        setFinalMat(mat);
    };

    const modulus = function (n, m) {
        return ((n % m) + m) % m;
    }

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

        let mat = matrix_creation(key);
        let pairs = letter_pairs(text);
        let result = "";
        let loc1 = []
        let loc2 = []
        for (let i=0;i<pairs.length;i++) {
            loc1 = find_location(mat, pairs?.[i]?.[0]);
            loc2 = find_location(mat, pairs?.[i]?.[1]);
            if (loc1[0] === loc2[0]) {
                result += mat[loc1[0]][modulus((loc1[1]-1),5)];
                result += mat[loc2[0]][modulus((loc2[1]-1),5)];
            }
            else if (loc1[1] === loc2[1]) {
                result += mat[modulus((loc1[0]-1),5)][loc1[1]];
                result += mat[modulus((loc2[0]-1),5)][loc2[1]];
            }
            else {
                result += mat[loc1[0]][loc2[1]];
                result += mat[loc2[0]][loc1[1]];
            }
        }
        setResult(result);
        setFinalMat(mat);
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

