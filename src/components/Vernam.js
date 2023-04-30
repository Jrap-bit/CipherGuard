import {Card,Grow,TextField,CardHeader,Input, Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

export default function Vernam () {
    const [text, setText] = useState("");
    const [key, setKey] = useState(0);
    const [output, setOutput] = useState("");
    const [indexList, setIndexList] = useState([]);
    const [decryptedIndex, setDecryptedIndex] = useState("");

    const modulus = function (n, m) {
        return ((n % m) + m) % m;
    }

    const xor = (bit_1, bit_2) => {
        if (bit_1 === bit_2) {
            return "0";
        }
        return "1";
    }

    const match_length = (first, second) => {
        let new_first = "";
        let new_second = "";
        let first_length = first.length;
        let second_length = second.length;
        if (first_length < second_length) {
            for (let i = 0; i < (second_length - first_length); i++){
                new_first += "0";
            }
            new_first += first;
            new_second = second;
        }
        else {
            for (let i = 0; i < (first_length - second_length); i++){
                new_second += "0";
            }
            new_second += second;
            new_first = first;
        }
        return [new_first, new_second];
        }

    const xor_vernam = (char_1, char_2) => {
        let encrypted = "";
        for (let i = 0; i < char_1.length; i++) {
            encrypted += xor(char_1[i], char_2[i]);
        }
        return encrypted;
    }

    const keyGeneration = (text, key) => {
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
                text: "Please enter the text",
                icon: "error",
              });
            return
        }
        if (key.length == 0) {
            swal({
                title: "Error",
                text: "Please enter the key",
                icon: "error",
              });
            return 
        }
        let cipher = "";
        let indexes = []
        let key_ = keyGeneration(text, key);

        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                cipher += " ";
            }
            else{
                let char_1 = (text.toUpperCase().charCodeAt(i) - 65).toString(2);
                let char_2 = (key_.toUpperCase().charCodeAt(i) - 65).toString(2);
                [char_1, char_2] = match_length(char_1, char_2);
                let temp_cipher = parseInt(xor_vernam(char_1, char_2),2);
                if (temp_cipher >= 26) {
                    indexes.push(i);
                    temp_cipher = modulus(temp_cipher, 26);
                }
                cipher += String.fromCharCode(temp_cipher + 65);
            }
        
        setOutput(cipher);
        setIndexList(indexes);
    }
}

    const extra_matrix = () => {
        let matrix = [];
        let indexes = indexList;
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            if (parseInt(i) == parseInt(indexes[index])) {
                matrix.push(true);
                index++;
            }
            else{
                matrix.push(false);
            }
        }
        return matrix
}

    const decrypt = () => {
        if (text.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Text",
                icon: "error",
              });
              return
        }
        if (key.length == 0) {
            swal({
                title: "Error",
                text: "Please Enter The Key",
                icon: "error",
              });
                return
        }

        let cipher = "";
        let indexes = []
        let key_ = keyGeneration(text, key);
        let bool_mat = extra_matrix();

        for (var i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                cipher += " ";
            }
            else{
                let char_1 = (text.toUpperCase().charCodeAt(i) - 65).toString(2);
                let char_2 = (key_.toUpperCase().charCodeAt(i) - 65).toString(2);
                if (bool_mat[i]) {
                    char_1 = (parseInt(char_1, 2) + 26).toString(2);
                }
                [char_1, char_2] = match_length(char_1, char_2);
                let temp_cipher = parseInt(xor_vernam(char_1, char_2),2);
                if (temp_cipher >= 26) {
                    temp_cipher -= 26;
                }
                cipher += String.fromCharCode(temp_cipher + 65);
            }

        
        setOutput(cipher);
        setIndexList(indexes);
    }
}


    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Vernam Cipher</h1>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
                
        <TextField className="mx-3" onChange={(event) => {
            setKey(event.target.value);
        }} label="Enter The Key" fullWidth/>
        </div>
        <div className="pb-5 px-5 d-flex justify-content-center">
        <TextField className="mx-3" onChange={(event) => {
            setDecryptedIndex(event.target.value);
        }} label="Enter Index Values for Greater than 26 Results For Accurate Decryption Separated by Comma" fullWidth/>
        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Encrypt</Button>
        <Button className="p-3 mx-2" variant="outlined" onClick={decrypt} color="error">Decrypt</Button>
        </div>

        <div className="pb-5 flex-column d-flex justify-content-center text-center">
        <CardHeader title="Output" />
        <h3>{output}</h3>
        </div>


        <div className="d-flex justify-content-center">
        <CardHeader title="Index Values For Decryption" />

        </div>

        <div className="pb-5 d-flex justify-content-center">
        {
            indexList.map((index) => {
                return <h3>{index}&nbsp;&nbsp;</h3>
            })
        }
        </div>

        </Card>
        </div>
        </Grow>
    )
}

