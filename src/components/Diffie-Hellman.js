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
import React, { useState } from "react";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default function Diffie_Hellman() {
  const [prime, setPrime] = useState(0);
  const [isPrime, setisPrime] = useState(true);
  const [rootList, setRootList] = useState([]);
  const [root, setRoot] = useState(0);
  const [alicePublic, setAlicePublc] = useState(0);
  const [bobPublic, setBobPublic] = useState(0);
  const [alicePrivate, setAlicePrivate] = useState(0);
  const [bobPrivate, setBobPrivate] = useState(0);
  const [aliceNumber, setAliceNumber] = useState(0);
  const [bobNumber, setBobNumber] = useState(0);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const primitive = () => {
    setLoading(true);
    axios
      .post("/encrypt/Diffie/generatePrimitive/", { prime: prime })
      .then((response) => {
        setisPrime(response.data.isPrime);
        setRootList(response.data.primitive_roots);
        if (!response.data.isPrime) {
          swal({
            title: "Error",
            text: "Please Enter A Prime Number",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request finishes
      });
  };

  const generate = () => {
    if (root == 0) {
      swal({
        title: "Error",
        text: "Please Select A Primitive Root",
        icon: "error",
      });
      return;
    }

    if (rootList.includes(parseInt(root))) {
      setLoading(true);
      axios
        .post("/encrypt/Diffie/generateKeys/", {
          prime: prime,
          primitive_root: root,
        })
        .then((response) => {
          setAliceNumber(response.data.alice_secret_num);
          setBobNumber(response.data.bob_secret_num);
          setAlicePublc(response.data.alice_public);
          setBobPublic(response.data.bob_public);
          setAlicePrivate(response.data.alice_shared_secret);
          setBobPrivate(response.data.bob_shared_secret);
          setResult(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      swal({
        title: "Error",
        text: "Please Select A Valid Primitive Root",
        icon: "error",
      });
    }
  };

  const loadMoreRoots = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Grow in>
      <div className="container">
        <Card>
          <h1 className="mt-4 h1 d-flex justify-content-center">
            Diffie Hellman Key Exchange
          </h1>

          <div className="p-5 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setPrime(event.target.value);
              }}
              fullWidth
              label="Enter a Prime Number"
              id="fullWidth"
              type="number"
            />
          </div>

          <div className="pb-5 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={primitive}
              color="success"
            >
              Generate Primitive Roots
            </Button>
          </div>
          <div className="pb-3 d-flex justify-content-center">
            <CardHeader title="Primitive Roots" />
          </div>
          {loading ? (
            <div className="d-flex flex-column align-items-center mt-4">
              <CircularProgress />
              <br />
            </div>
          ) : (
            <div className="pb-3 px-4 d-flex justify-content-center text-center">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {rootList
                  .slice(0, currentPage * 100)
                  .map((item, index) => (
                    <h5
                      key={index}
                      className="h5"
                      style={{ margin: "4px 8px" }}
                    >
                      {item}
                    </h5>
                  ))}
              </div>
            </div>
          )}
          {rootList.length > currentPage * 4 && (
            <div className="d-flex justify-content-center">
              <Button
                variant="outlined"
                onClick={loadMoreRoots}
                color="primary"
              >
                Load More Roots
              </Button>
            </div>
          )}

          <div className="p-5 d-flex justify-content-center">
            <TextField
              className="mx-3"
              onChange={(event) => {
                setRoot(event.target.value);
              }}
              label="Choose a Primitive Root"
              type="number"
            />
          </div>

          <div className="pb-5 d-flex justify-content-center">
            <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={generate}
              color="success"
            >
              Generate Keys
            </Button>
          </div>
          {result && (
            <Fade in={result}>
              <div className="pb-3 flex-column d-flex justify-content-center text-center">
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <CardHeader title="Selected Prime" />
                    <h5 className="h5">{prime}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <CardHeader title="Selected Primitive Root" />
                    <h5 className="h5">{root}</h5>
                  </Grid>
                </Grid>

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <CardHeader title="Alice's Secret Number" />
                    <h5 className="h5">{aliceNumber}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <CardHeader title="Bob's Secret Number" />
                    <h5 className="h5">{bobNumber}</h5>
                  </Grid>
                </Grid>

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <CardHeader title="Alice's Public Key" />
                    <h5 className="h5">{alicePublic}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <CardHeader title="Bob's Public Key" />
                    <h5 className="h5">{bobPublic}</h5>
                  </Grid>
                </Grid>

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <CardHeader title="Alice's Private Key" />
                    <h5 className="h5">{alicePrivate}</h5>
                  </Grid>
                  <Grid item xs={8}>
                    <CardHeader title="Bob's Private Key" />
                    <h5 className="h5">{bobPrivate}</h5>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          )}
        </Card>
      </div>
    </Grow>
  );
}
