import {
  Card,
  Grow,
  TextField,
  CardHeader,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default function Vernam() {
  const [text, setText] = useState("");
  const [dectext, setdecText] = useState("");
  const [key, setKey] = useState(0);
  const [deckey, setdecKey] = useState(0);
  const [output, setOutput] = useState("");
  const [decoutput, setdecOutput] = useState("");
  const [indexList, setIndexList] = useState([]);
  const [decryptedIndex, setDecryptedIndex] = useState("");

  const encrypt = () => {
    if (text.length == 0) {
      swal({
        title: "Error",
        text: "Please enter the text",
        icon: "error",
      });
      return;
    }
    if (key.length == 0) {
      swal({
        title: "Error",
        text: "Please enter the key",
        icon: "error",
      });
      return;
    }
    axios
      .post("/encrypt/vernam/", { input_str: text, key: key })
      .then((response) => {
        setOutput(response.data.encrypted_text);
        setIndexList(response.data.extra);
        console.log(response.data.extra);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const extra_matrix = () => {
    let matrix = [];
    let indexes = decryptedIndex.split(",");
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
    let extra_mat = extra_matrix();
   axios.post("/decrypt/vernam/", { input_str: dectext, key: deckey, extra: extra_mat })
   .then(response => {
         setdecOutput(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    }
    );
  };

  return (
    <Grow in>
      <div className="container">
        <Card>
          <h1 className="mt-4 h1 d-flex justify-content-center">
            Vernam Cipher
          </h1>
          <h2 className="mt-3 h2 d-flex justify-content-center">Encryption</h2>

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

            <TextField
              className="mx-3"
              onChange={(event) => {
                setKey(event.target.value);
              }}
              label="Enter The Key"
              fullWidth
            />
          </div>

          <div className="pb-3 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={encrypt}
              color="success"
            >
              Encrypt
            </Button>
            
          </div>

          <div className="pb-5 flex-column d-flex justify-content-center text-center">
            <CardHeader title="Output" />
            <h3>{output}</h3>
          </div>

          <div className="d-flex justify-content-center">
            <CardHeader title="Index Values For Decryption" />
          </div>

          <div className="pb-5 d-flex justify-content-center">
            {indexList.map((value, index) => {
              if (value) {
                return <h3 key={index}>{index}&nbsp;&nbsp;</h3>;
              }
              return null; // Return null for indices with false values
            })}
          </div>
          <h2 className="mt-3 mb-1 h2 d-flex justify-content-center">Decryption</h2>
          <div className="pt-4 p-5 pb-3 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setdecText(event.target.value);
              }}
              fullWidth
              label="Enter The Text"
              id="fullWidth"
            />

            <TextField
              className="mx-3"
              onChange={(event) => {
                setdecKey(event.target.value);
              }}
              label="Enter The Key"
              fullWidth
            />
          </div>
          <div className="pb-5 px-5 d-flex justify-content-center">
            <TextField
              className="mx-5"
              onChange={(event) => {
                setDecryptedIndex(event.target.value);
              }}
              label="Enter Index Values for Greater than 26 Results For Accurate Decryption Separated by Comma"
              fullWidth
            />
          </div>
          <div className="pb-3 d-flex justify-content-center">
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
            <h3>{decoutput}</h3>
          </div>
        </Card>
      </div>
    </Grow>
  );
}
