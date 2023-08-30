import {
  Card,
  Grow,
  Fade,
  TextField,
  CardHeader,
  Input,
  Grid,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default function Caesar() {
  const [text, setText] = useState("");
  const [bits, setBits] = useState("");
  const [e, sete] = useState(65537);
  const [d, setD] = useState(0n);
  const [n, setN] = useState(0n);
  const [p, setP] = useState(0n);
  const [q, setQ] = useState(0n);
  const [phi, setPhi] = useState(0n);
  const [output, setOutput] = useState([]);
  const [decrypted, setDecrypted] = useState("");
  const [result, setResult] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setBits(event.target.value);
  };

  const decrypt = () => {
    setLoading(true); 
    axios
      .post("/decrypt/RSA/", { ciphertext: output, d: d, n: n })
      .then((response) => {
        setDecrypted(response.data);
        setResult(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setisShow(!isShow); // Set loading to false when request finishes
      });
  }

  const encrypt = () => {
    if (text == "") {
      swal({
        title: "Error",
        text: "Please enter a message to encrypt",
        icon: "error",
      });
      return;
    }
    if (bits == "") {
      swal({
        title: "Error",
        text: "Please enter a bit length",
        icon: "error",
      });
      return;
    }
    setLoading(true); 
    axios
      .post("/encrypt/RSA/", { input_str: text, size: bits, public_key: e })
      .then((response) => {
        setN(response.data.n);
        setPhi(response.data.phi);
        setP(response.data.p);
        setQ(response.data.q);
        setD(response.data.d);
        setOutput(response.data.ciphertext);
        setResult(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request finishes
      });
  };

  return (
    <div>
        <Grow in>
        <div className="container">
          <Card>
            <h1 className="mt-4 h1 d-flex justify-content-center">
              RSA - Rivest Shamir Adleman
            </h1>

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
              <MenuItem value={32}>32 Bits</MenuItem>
              <MenuItem value={64}>64 Bits</MenuItem>
              <MenuItem value={128}>128 Bits</MenuItem>
              <MenuItem value={256}>256 Bits</MenuItem>
              <MenuItem value={512}>512 Bits</MenuItem>
              <MenuItem value={1024}>1024 Bits</MenuItem>
              <MenuItem value={2048}>2048 Bits</MenuItem>
              <MenuItem value={4096}>4096 Bits</MenuItem>
            </Select>
            <TextField
              className=""
              onChange={(event) => {
                sete(event.target.value);
              }}
              fullWidth
              label="Enter The Value of e (Default: 65537)"
              id="fullWidth"
              type="number"
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
          </div>
          <div className="pb-2 flex-column d-flex justify-content-center text-center">
            <CardHeader title="Output" />
          </div>
          <div className="pb-2 pt-4 d-flex justify-content-center">
                  <Button
                    className="p-3 mx-2"
                    variant="outlined"
                    onClick={decrypt}
                    color={"success"}
                    disabled={!result}
                  >
                    {isShow ? "Hide Text" : "Decrypt and Show Text"}
                  </Button>
                </div>
                {isShow && (
                  <div className="pb-1 flex-column d-flex justify-content-center text-center">
                    <CardHeader title="Decrypted Message" />
                    <h5 className="h5 font-weight-bold">{decrypted}</h5>
                  </div>
                )}

          {loading ? (
              <div className="d-flex flex-column align-items-center mt-4">
                <CircularProgress />
                <br />
                <div className="mt-2 mb-4 pb-4">
                  {bits == "1024" && (
                    <p>Encrypting with 1024 Bits - 4 seconds average loading time</p>
                  )}
                  {bits == "2048" && (
                    <p>Encrypting with 2048 Bits - 50 seconds average loading time</p>
                  )}
                  {bits == "4096" && (
                    <p>Encrypting with 4096 Bits - 8.5 minutes average loading time</p>
                  )}
                </div>
              </div>
              
              
            ) : (
              result && (
            <div className="pb-5 flex-column d-flex justify-content-center text-center">
              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <CardHeader title="First Prime" />
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {p}
                </h5>
              </div>

              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <CardHeader title="Second Prime" />
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {q}
                </h5>
              </div>

              <CardHeader title="n (p*q)" />
              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {n}
                </h5>
              </div>

              <CardHeader title="phi [(p-1) * (q-1)]" />
              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {phi}
                </h5>
              </div>

              <CardHeader title="Public Key" />
              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {e}
                </h5>
              </div>

              <CardHeader title="Private Key" />
              <div className="mx-5 d-flex flex-column flex-wrap justify-content-center">
                <h5
                  style={{ "word-break": "break-all" }}
                  className="h5 font-weight-bold"
                >
                  {d}
                </h5>
              </div>

              <CardHeader title="Final Message Encryption" />
              <div>
                {output.map((item, index) => {
                  return (
                    <div key={index}>
                      <h5
                        className="mx-5"
                        style={{ "word-break": "break-all" }}
                      >
                        {item.toString()}
                      </h5>
                    </div>
                  );
                })}
              </div>
              </div>
               )
               )}
             </Card>
           </div>
         </Grow>
       </div>
     );
   }