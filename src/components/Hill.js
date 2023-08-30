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
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000'

export default function Caesar() {
  const [text, setText] = useState("");
  const [decText, setdecText] = useState("");
  const [output, setOutput] = useState("");
  const [matrixSize, setMatrixSize] = useState(3);
  const [encryptMatrix, setencryptMatrix] = useState([]);
  const [decmatrixSize, setdecMatrixSize] = useState(3);
  const [decryptMatrix, setdecryptMatrix] = useState([]);
  const [decOutput, setDecOutput] = useState([]); // [plaintext, key
  const [isValid, setIsValid] = useState(null);

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setMatrixSize(newSize);
    setencryptMatrix(new Array(newSize).fill().map(() => new Array(newSize).fill(0)));
    setIsValid(null);
  };
  const handleSizeChangeDec = (event) => {
    const newSize = parseInt(event.target.value);
    setdecMatrixSize(newSize);
    setdecryptMatrix(new Array(newSize).fill().map(() => new Array(newSize).fill(0)));
    setIsValid(null);
  };

  const handleMatrixChange = (event, row, col) => {
    const newValue = parseInt(event.target.value);
    const newMatrix = [...decryptMatrix];
    newMatrix[row][col] = newValue;
    setdecryptMatrix(newMatrix);
    setIsValid(null);
  };

  const copyMatrix = (event) => {
    const newMatrix = [...encryptMatrix];
    setdecryptMatrix(newMatrix);
    setIsValid(null);
  };

  const checkMatrixValidity = async () => {
    try {
      const response = await axios.post('/decrypt/hill/verify/', { decryptMatrix });
      setIsValid(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateMatrix = () => {
    axios.post('/encrypt/hill/generateMatrix/', {size: matrixSize})
      .then(response => {
        setencryptMatrix(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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

    axios.post('/encrypt/hill/', {plaintext: text, key_matrix: encryptMatrix})
    .then(response => {
      setOutput(response.data);
    }
    ).catch(error => {
      console.error('Error:', error);
    }
    );
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
    axios.post('/decrypt/hill/', {ciphertext: decText, key: decryptMatrix})
    .then(response => {
      setDecOutput(response.data);
    }
    ).catch(error => {
      console.error('Error:', error);
    }
    );
  };

  return (
    <Grow in>
      <div className="container">
        <Card>
          <h1 className="mt-4 h1 d-flex justify-content-center">Hill Cipher</h1>
          <h2 className="mt-3 h2 d-flex justify-content-center">Encryption</h2>
            <div className="d-flex justify-content-center">
                <p>Padding Character: X</p>
                </div>

        <h5 className="flex-column d-flex justify-content-center text-center">Size - 3x3</h5>
        <div className="mt-4 flex-column d-flex justify-content-center text-center align-items-center">


        <Button
              className="p-3 mx-2 my-4"
              variant="outlined"
              onClick={generateMatrix}
              color="success"
            >
              Generate Matrix
          </Button>
          <div className="mt-2">
        <h3 variant="subtitle1">Generated Matrix:</h3>
        <div>
          {encryptMatrix.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, columnIndex) => (
                <span className="h4" key={columnIndex}>{value}&nbsp;&nbsp;</span>
              ))}
            </div>
          ))}
        </div>
      </div>

        </div>

          <div className="p-5 pb-3 d-flex justify-content-center">
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
            <h3 className="mt-2 flex-column d-flex justify-content-center text-center">
                {output}
            </h3>
          </div>
        {/* Decryption */}
        <h2 className="mt-3 h2 d-flex justify-content-center">Decryption</h2>
        <h5 className="flex-column d-flex justify-content-center text-center">Size - 3x3</h5>
        <div className="mt-4 flex-column d-flex justify-content-center text-center align-items-center">
        {decryptMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row mt-4">
          {row.map((value, colIndex) => (
            <TextField
              key={colIndex}
              type="number"
              value={value}
              onChange={(event) => handleMatrixChange(event, rowIndex, colIndex)}
              variant="outlined"
              size="small"
              className="matrix-cell mx-4"
            />
          ))}
        </div>
      ))}
      <div className="mt-4">
      {isValid !== null && (
       <Typography variant="h5" style={{ color: isValid ? 'green' : 'red' }}>
       {isValid ? 'Matrix is valid for Hill cipher.' : 'Matrix is not valid for Hill cipher.'}
     </Typography>
      )}
      </div>
        <div className="pb-3 d-flex justify-content-center">
        <Button
              className="p-3 mx-2 my-4"
              variant="outlined"
              onClick={checkMatrixValidity}
              color="success"
            >
              Verify Matrix
          </Button>
          <Button
              className="p-3 mx-2 my-4"
              variant="outlined"
              onClick={copyMatrix}
              color="success"
            >
              Copy Encryption Matrix
          </Button>
        </div>
          </div>
        <div className="p-5 pt-1 pb-3 d-flex justify-content-center">
            <TextField
              className=""
              onChange={(event) => {
                setdecText(event.target.value);
              }}
              fullWidth
              label="Enter The Text"
              id="fullWidth"
            />
          </div>
          <div className="pb-3 d-flex justify-content-center">
          <Button
              className="p-3 mx-2"
              variant="contained"
              onClick={decrypt}
              color="error"
            >
              Decrypt
            </Button>
          </div>
          <div className="pb-5 flex-column d-flex justify-content-center text-center">
            <CardHeader title="Output" />
            <h3 className="mt-2 flex-column d-flex justify-content-center text-center">
                {decOutput}
            </h3>
          </div>
        </Card>
      </div>
    </Grow>
  );
}
