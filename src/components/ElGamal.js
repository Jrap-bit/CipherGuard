import {
  Card,
  Grow,
  TextField,
  CardHeader,
  Input,
  Grid,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
let string = require("./utils/string");
let primeFunc = require("./utils/prime");
import swal from "sweetalert";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default function Caesar() {
  const [text, setText] = useState("");
  const [prime, setPrime] = useState(0);
  const [generator, setGenerator] = useState(0);
  const [privateKey, setPrivateKey] = useState(0);
  const [publicKey, setPublicKey] = useState(0);
  const [signList, setSignList] = useState([]);

  const [inputPrime, setInputPrime] = useState(0);
  const [inputGenerator, setInputGenerator] = useState(0);
  const [inputPublicKey, setInputPublicKey] = useState(0);

  const [verifyText, setVerifyText] = useState("");
  const [signInput, setSignInput] = useState([]);
  const [verifyResult, setVerifyResult] = useState(false);

  const [bits, setBits] = useState(4);

  const handleChange = (event) => {
    setBits(event.target.value);
  };

  const copyButton = (event) => {
    setInputPrime(prime);
    setInputGenerator(generator);
    setInputPublicKey(publicKey);
    setSignInput(signList.map((item) => `[${item[0]},${item[1]}]`).join(", ")); // Convert signList to a formatted string
  };

  const encrypt = () => {
    if (text === "") {
      swal("Error!", "Please enter a message!", "error");
      return;
    }

    if (bits < 4 || bits > 16) {
      swal("Error!", "Please enter a valid number of bits!", "error");
      return;
    }

    axios
      .post("/encrypt/Elgamal/", { input_str: text, size: bits })
      .then((response) => {
        setPrime(response.data.prime);
        setGenerator(response.data.generator);
        setPrivateKey(response.data.private_key);
        setPublicKey(response.data.public_key);
        setSignList(response.data.sign_arr);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const decrypt = () => {
    if (verifyText === "") {
      swal("Error!", "Please enter a message!", "error");
      return;
    }

    if (inputPrime === 0) {
      swal("Error!", "Please enter a valid prime number!", "error");
      return;
    }

    if (inputGenerator === 0) {
      swal("Error!", "Please enter a valid generator!", "error");
      return;
    }

    if (inputPublicKey === 0) {
      swal("Error!", "Please enter a valid public key!", "error");
      return;
    }

    if (signInput.length === 0) {
      swal("Error!", "Please enter a valid signature!", "error");
      return;
    }

    axios
      .post("/decrypt/Elgamal/", {
        ciphertext: verifyText,
        prime: inputPrime,
        gen: inputGenerator,
        public: inputPublicKey,
        sign_arr: signInput,
      })
      .then((response) => {
        setVerifyResult(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grow in>
      <div className="container">
        <Card>
          <h1 className="mt-4 h1 d-flex justify-content-center">
            ElGamal Signature
          </h1>

          <div className="p-5 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setText(event.target.value);
              }}
              fullWidth
              label="Enter The Text To Sign"
              id="fullWidth"
            />

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={bits}
              label="Bits"
              className="mx-3"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={4}>4 Bits</MenuItem>
              <MenuItem value={8}>8 Bits</MenuItem>
              <MenuItem value={16}>16 Bits</MenuItem>
            </Select>
          </div>

          <div className="pb-5 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={encrypt}
              color="success"
            >
              Sign
            </Button>
          </div>

          <div className="mx-5 pb-5 flex-column d-flex justify-content-center text-center">
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <CardHeader title="Prime Selected" />
                <h5 className="h5 font-weight-bold">{prime}</h5>
              </Grid>
              <Grid item xs={8}>
                <CardHeader title="Generator" />
                <h5 className="h5 font-weight-bold">{generator}</h5>
              </Grid>
            </Grid>

            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <CardHeader title="Private Key" />
                <h5 className="h5 font-weight-bold">{privateKey}</h5>
              </Grid>
              <Grid item xs={8}>
                <CardHeader title="Public Key" />
                <h5 className="h5 font-weight-bold">{publicKey}</h5>
              </Grid>
            </Grid>

            <CardHeader title="Signature" />
            <div className="d-flex justify-content-center text-center flex-wrap">
              {signList.map((item, index) => (
                <h5>
                  [{item[0]},{item[1]}]
                  {index === signList.length - 1 ? "" : ","}
                </h5>
              ))}
            </div>
          </div>

          <div className="px-5 pb-3 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setVerifyText(event.target.value);
              }}
              fullWidth
              label="Enter The Text To Verify"
              id="fullWidth"
            />
          </div>

          <div className="px-5 pb-3 d-flex justify-content-center">
            <TextField
              className="mr-3"
              value={inputPrime}
              onChange={(event) => {
                setInputPrime(event.target.value);
              }}
              fullWidth
              label="Enter The Prime"
              id="fullWidth"
              type="number"
            />

            <TextField
              className="mx-3"
              value={inputGenerator}
              onChange={(event) => {
                setInputGenerator(event.target.value);
              }}
              fullWidth
              label="Enter The Generator"
              id="fullWidth"
              type="number"
            />

            <TextField
              className="ml-3"
              value={inputPublicKey}
              onChange={(event) => {
                setInputPublicKey(event.target.value);
              }}
              fullWidth
              label="Enter The Public Key"
              id="fullWidth"
              type="number"
            />
          </div>
          <div className="px-5 pb-5 d-flex justify-content-center">
            <TextField
              className=""
              value={signInput}
              onChange={(event) => {
                setSignInput(event.target.value);
              }}
              fullWidth
              label="Enter The Sign"
              id="fullWidth"
            />
          </div>

          <div className="pb-5 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="outlined"
              onClick={decrypt}
              color="primary"
            >
              Verify
            </Button>
            <Button
              className="p-3 mx-2"
              variant="outlined"
              onClick={copyButton}
              color="primary"
            >
              Copy Generated Details
            </Button>
          </div>
          <div className="mx-5 pb-5 flex-column d-flex justify-content-center text-center">
            {verifyResult ? (
              <h1 className="h1 font-weight-bold">Verified</h1>
            ) : (
              <h1 className="h1 font-weight-bold">Not Verified</h1>
            )}
          </div>
        </Card>
      </div>
    </Grow>
  );
}
