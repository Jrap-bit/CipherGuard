import {Card,Grow,TextField,CardHeader,Input,Grid,Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { random } from "mathjs";
import React, {useState} from 'react';
let string = require("./utils/string");
let primeFunc = require("./utils/prime");
var CryptoJS = require("crypto-js");
import swal from 'sweetalert';


export default function Caesar () {
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
    const [verifyArr, setVerifyArr] = useState([]);
    const [verifyResult, setVerifyResult] = useState(false);

    const [bits, setBits] = useState(4);


    const handleChange = (event) => {
        setBits(event.target.value);
      };

    function gcd(k, q) {
        if (q === 0) {
          return k;
        } else {
          return gcd(q, k % q);
        }
      }
      
      function choose_k(prime) {
        while (true) {
          const k = Math.floor(Math.random() * (prime - 1)) + 1;
          if (gcd(k, prime - 1) === 1) {
            return k;
          }
        }
      }

      function conv_message_to_arr(message) {
        const func_mess = message.toUpperCase();
        const message_arr = [];
        for (let i = 0; i < func_mess.length; i++) {
          message_arr.push(func_mess.charCodeAt(i) - 65);
        }
        return message_arr;
      }      

      function expmod( base, exp, mod ){
        if (exp == 0) return 1;
        if (exp % 2 == 0){
          return Math.pow( expmod( base, (exp / 2), mod), 2) % mod;
        }
        else {
          return (base * expmod( base, (exp - 1), mod)) % mod;
        }
      }
      
      const modulus = function (n, m) {
        return ((n % m) + m) % m;
    }

    const randomize = (lowerbound = 1, upperbound = Math.floor(Math.random() * (50000 - 1)) + 1000) => { 
        return Math.floor(Math.random() * (upperbound - lowerbound)) + lowerbound;
    }

    const sign = (m,prime,xA,generator) => {
        const k = choose_k(prime);
        const s1 = expmod(generator, k, prime);
        const inv_k = string.modInverse(k, prime - 1);
        const s2 = inv_k * modulus((m - (xA * s1)), prime - 1);
        return [s1, s2];

    }

    function verify(message, gen, prime, public_key, signArr, index) {
        let [s1, s2] = signArr[index];
        [s1, s2] = [parseInt(s1), parseInt(s2)];
        const v1 = expmod(gen, message, prime);
        const temp1 = Math.pow(public_key, s1);
        const temp2 = Math.pow(s1, s2);
        console.log(temp1);
        console.log(temp2);
        const v2 = modulus(temp1 * temp2, prime);
        return [v1, v2];
      }
    
    

    const encrypt = () => {

        if(text === ""){
            swal("Error!", "Please enter a message!", "error");
            return;
        }

        if (bits < 4 || bits > 16) {
            swal("Error!", "Please enter a valid number of bits!", "error");
            return;
        }

        let mess_arr = conv_message_to_arr(text);
        let prime = primeFunc.choosePrime(bits);
        let generator = randomize(1,prime);
        let xA = randomize(1,prime);
        let public_key = expmod(generator,xA,prime);

        setPrime(prime);
        setGenerator(generator);
        setPrivateKey(xA);
        setPublicKey(public_key);

        let sign_arr = [];
        for (let i = 0; i < mess_arr.length; i++) {
            let signature = sign(mess_arr[i],prime,xA,generator);
            sign_arr.push(signature);
        }
        setSignList(sign_arr);
        console.log(sign_arr);
    }

    const decrypt = () => {
        if(verifyText === ""){
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

        if(signInput.length !== verifyText.length){
            swal("Error!", "Please enter a valid signature!", "error");
            return;
        }


        let mess_arr = conv_message_to_arr(verifyText);
        let sign_arr = signInput.split(", ")
        for (let i = 0; i < sign_arr.length; i++) {
            sign_arr[i] = sign_arr[i].replace(/[\[\]']+/g,'')
            sign_arr[i] = sign_arr[i].split(",");
        }
        let index = 0;
        let verify_arr = [];
        let bool_arr = []

        for (let i = 0; i < mess_arr.length; i++) {
            let verify_result = verify(mess_arr[i],inputGenerator,inputPrime,inputPublicKey,sign_arr,index);
            verify_arr.push(verify_result);
            index++;
        }

        console.log(verify_arr);

        for (let i = 0; i < verify_arr.length; i++) {
            if(verify_arr[i][0] === verify_arr[i][1]){
                bool_arr.push(true);
        }
        else{
            bool_arr.push(false);
        }
    }   
    if(bool_arr.includes(false)){
        setVerifyResult(false);
    }
    else{
        setVerifyResult(true);
    }
        setVerifyArr(verify_arr);
    }

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">ElGamal Signature</h1>
        <p className="d-flex justify-content-center">Verification Works for extremely small numbers only*</p>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text To Sign" id="fullWidth" />
    
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
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Sign</Button>
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
                    <h5>[{item[0]},{item[1]}]{index === signList.length - 1 ? "" : ","}</h5>
            ))}
        </div>
        </div>
        
        <div className="px-5 pb-3 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setVerifyText(event.target.value);
                }} fullWidth label="Enter The Text To Verify" id="fullWidth" />
        </div>

        <div className="px-5 pb-3 d-flex justify-content-center">
        <TextField className="mr-3" onChange={(event) => {
                  setInputPrime(event.target.value);
                }} fullWidth label="Enter The Prime" id="fullWidth" type="number"/>

        <TextField className="mx-3" onChange={(event) => {
                  setInputGenerator(event.target.value);
                }} fullWidth label="Enter The Generator" id="fullWidth" type="number"/>


        <TextField className="ml-3" onChange={(event) => {
                  setInputPublicKey(event.target.value);
                }} fullWidth label="Enter The Public Key" id="fullWidth" type="number"/>
        </div>
        <div className="px-5 pb-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setSignInput(event.target.value);
                }} fullWidth label="Enter The Sign" id="fullWidth" />
        </div>
        
        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="outlined" onClick={decrypt} color="error">Verify</Button>
        </div>
        <div className="mx-5 pb-5 flex-column d-flex justify-content-center text-center">
            {verifyResult ? <h1 className="h1 font-weight-bold">Verified</h1> : <h1 className="h1 font-weight-bold">Not Verified</h1>}
        </div>

        </Card>
        </div>
        </Grow>
    )
}
