import {
  Card,
  Grow,
  TextField,
  CardHeader,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import swal from 'sweetalert';
let math = require("mathjs");
let string = require("./utils/string");

export default function Caesar() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [keyMatrix, setKeyMatrix] = useState([
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15],
  ]);

  const inverse_matrix = () => {
    let determinant = math.det(keyMatrix);

    determinant = Math.round(determinant);

    let invDet = string.modInverse(determinant, 26);
    let invMat = math.inv(keyMatrix);

    invMat = math.multiply(determinant, invMat);
    invMat = math.round(invMat);
    invMat = math.multiply(invDet, invMat);
    invMat = math.mod(invMat, 26);
    return invMat;
  };

  const matrix_multiply = (matrix1, matrix2) => {
    let cipherMatrix = new Array(3);
    for (let i = 0; i < 3; i++) {
      cipherMatrix[i] = new Array(1).fill([0]);
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 1; j++) {
        cipherMatrix[i][j] = 0;
        for (let x = 0; x < 3; x++) {
          cipherMatrix[i][j] += matrix1[i][x] * matrix2[x][j];
        }
        cipherMatrix[i][j] = cipherMatrix[i][j] % 26;
      }
    }
    return cipherMatrix;
  };

  const convert_cipher_to_matrix = (function_cipher, pair) => {
    let cipher_matrix_func = [];
    let temp_func = [];

    if (function_cipher.length % pair !== 0) {
      for (let i = 0; i < pair - (function_cipher.length % pair); i++) {
        function_cipher += "X";
      }
    }

    for (let i = 0; i < function_cipher.length; i += pair) {
      for (let j = 0; j < pair; j++) {
        temp_func.push([function_cipher.charCodeAt(i + j) - 65]);
      }
    }

    for (let i = 0; i < function_cipher.length / pair; i++) {
      cipher_matrix_func.push(temp_func.slice(pair * i, pair * i + pair));
    }

    return cipher_matrix_func;
  };

  const decrypt_hill_cipher = (ciphertext_func, key) => {
    const key_inv = inverse_matrix(key);
    let plaintext = "";
    const n = ciphertext_func.length;
    const pair = convert_cipher_to_matrix(ciphertext_func, key.length);

    for (let mat of pair) {
      const result = matrix_multiply(key_inv, mat);
      plaintext += String.fromCharCode((result[0][0] % 26) + 65);
      plaintext += String.fromCharCode((result[1][0] % 26) + 65);
      plaintext += String.fromCharCode((result[2][0] % 26) + 65);
    }

    return plaintext;
  };

  const encrypt = () => {
    if (text.length == 0) {
      swal({
        title: "Error",
        text: "Please Enter The Text",
        icon: "error",
      });
        return;
    }

    const pair_size = keyMatrix.length;
    const cipher_text_matrix = convert_cipher_to_matrix(text.toUpperCase(), pair_size);
    let ciphertext = "";
    for (let matrix of cipher_text_matrix) {
      console.log(matrix);
      const cipher = matrix_multiply(keyMatrix, matrix);
      for (let i of cipher) {
        ciphertext += String.fromCharCode(i[0] + 65);
      }
    }
    setOutput(ciphertext);
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
    let decrypted_text = decrypt_hill_cipher(text.toUpperCase(), keyMatrix);
    setOutput(decrypted_text);
  };

  return (
    <Grow in>
      <div className="container">
        <Card>
          <h1 className="mt-4 h1 d-flex justify-content-center">Hill Cipher</h1>
            <div className="d-flex justify-content-center">
                <p>Padding Character: X</p>
                </div>
          <h3 className="mt-4 flex-column d-flex justify-content-center text-center">
            Key Matrix is
          </h3>
          <div className="flex-column d-flex justify-content-center text-center">
            <h5>6 24 1</h5>
            <h5>13 16 10</h5>
            <h5>20 17 15</h5>
          </div>

          <div className="p-5 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setText(event.target.value);
              }}
              fullWidth
              label="Enter The Text"
              id="fullWidth"
            />
          </div>
          <div className="pb-5 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={encrypt}
              color="success"
            >
              Encrypt
            </Button>
            <Button
              className="p-3 mx-2"
              variant="outlined"
              onClick={decrypt}
              color="error"
            >
              Decrypt
            </Button>
          </div>

          <div className="pb-5 flex-column d-flex justify-content-center text-center">
            <CardHeader title="Output" />
            <h3 className="mt-4 flex-column d-flex justify-content-center text-center">
                {output}
            </h3>
          </div>
        </Card>
      </div>
    </Grow>
  );
}
