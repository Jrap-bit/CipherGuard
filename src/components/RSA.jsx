import {Card,Grow,Fade, TextField,CardHeader,Input,Grid,Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {useState} from 'react';
import swal from 'sweetalert';
let primeFunc = require("./utils/prime");
const BN = require('bn.js');

export default function Caesar () {
    const [text, setText] = useState("");
    const [bits, setBits] = useState("");
    const [e, sete] = useState(65537);
    const [d, setD] = useState(0);
    const [n, setN] = useState(0);
    const [p, setP] = useState(0);
    const [q, setQ] = useState(0);
    const [phi, setPhi] = useState(0)
    const [output, setOutput] = useState([]);
    const [result, setResult] = useState(false);

    const handleChange = (event) => {
        setBits(event.target.value);
      };    
    
    const encrypt = () => {
        if (text == ""){
          swal({
            title: "Error",
            text: "Please enter a message to encrypt",
            icon: "error",
          });
            return;
        }
        if (bits == ""){
          swal({
            title: "Error",
            text: "Please enter a bit length",
            icon: "error",
          });
            return;
        }

        let ciphertext = []
        let p = primeFunc.choosePrime(bits);
        let q = primeFunc.choosePrime(bits);
        setP(p);
        setQ(q);
        p = parseInt(p);
        q = parseInt(q);
        let n = p * q;
        setN(n);
        let phi = (p - 1) * (q - 1);
        setPhi(phi);
        let d = calc_d(e,phi);
        setD(d);
        for (let i=0;i<text.length;i++){
            let char = parseInt(text.charCodeAt(i) - 65);
            let encrypted = expmod(char,e,n);
            ciphertext.push(encrypted);
        }
        setOutput(ciphertext);
        setResult(true);
    }

    const modulus = function (n, m) {
        return ((n % m) + m) % m;
    }

    const calc_d = (e,phi) => {
        let t1 = 0;
        let t2 = 1;
        let r1 = phi;
        let r2 = e;
        while (r2 > 0){
            let q = Math.floor(r1/r2);
            let r = modulus(r1,r2);
            r1 = r2;
            r2 = r;
            let t = t1 - q * t2;
            t1 = t2;
            t2 = t;
        }
        if (r1 == 1){
            return modulus(t1,phi);
        }
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

      // Generating Prime Numbers - Does not work in JS apparently

    // const rabin_miller = (prime_cand) => {
    //     let even = prime_cand - 1;
    //     let num_of_2 = 0;
    //     while (even%2 == 0){
    //         even = even/2;
    //         num_of_2 += 1;
    //     }
    //     for (let i=0;i<10;i++){
    //         let a = Math.floor(Math.random() * (prime_cand - 2)) + 2;
    //         let x = expmod(a,even,prime_cand);
    //         if (x == 1){
    //             return true;
    //         }
    //         for (let j=0;j<num_of_2 - 1;j++){
    //             x = expmod(a,Math.pow(2,j) * even,prime_cand);
    //             if (x == 1){
    //                 return true;
    //             }
    //             if (x == prime_cand - 1){
    //                 return true;
    //             }
    //         }
    //         return false;
    //         }
    //     }

    // const prime_gen = (n) => {
    //     let first_primes_list = [2, 3, 5, 11, 7, 13, 17, 19, 23, 29,
    //         31, 37, 41, 43, 47, 53, 59, 61, 67,
    //         71, 73, 79, 83, 89, 97, 101, 103,
    //         107, 109, 113, 127, 131, 137, 139,
    //         149, 151, 157, 163, 167, 173, 179,
    //         181, 191, 193, 197, 199, 211, 223,
    //         227, 229, 233, 239, 241, 251, 257,
    //         263, 269, 271, 277, 281, 283, 293,
    //         307, 311, 313, 317, 331, 337, 347, 349]
        
    //     while (true){
    //         const n_bit_prime = Math.floor(Math.random() * (2 ** n - 2 ** (n - 1) - 1)) + 2 ** (n - 1) + 1;
    //         for (let i=0;i<first_primes_list.length;i++){
    //             if (n_bit_prime == first_primes_list[i]){
    //                 return n_bit_prime;
    //             }
    //             if (n_bit_prime % first_primes_list[i] == 0){
    //                 break;
    //             }
    //             else{
    //                 return n_bit_prime;
    //             }
    //         }
    //     }
    // }
    
    // const getPrime = () => {
    //     let n = bits;
    //     let choices = [2,3]
    //     if (n == 2){
    //         let index = Math.floor(Math.random() * choices.length);
    //         return choices[index];
    //     }
    //     while (true){
    //         let prime_candidate = prime_gen(n);
    //         if (!rabin_miller(prime_candidate)){
    //             continue;
    //         }
    //         else{
    //             return prime_candidate;
    //         }
    //     }
    // }

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">RSA - Rivest Shamir Adleman</h1>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="" onChange={(event) => {
                  setText(event.target.value);
                }} fullWidth label="Enter The Text" id="fullWidth" />
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
        </Select>
        <TextField className="" onChange={(event) => {
                  sete(event.target.value);
                }} fullWidth label="Enter The Value of e (Default: 65537)" id="fullWidth" type="number"/>
        </div>


        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={encrypt} color="success">Encrypt</Button>
        </div>
        <div className="pb-4 flex-column d-flex justify-content-center text-center">
        <CardHeader title="Output" />
        </div>

        { result &&
        <div className="pb-5 flex-column d-flex justify-content-center text-center">

        <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <CardHeader title="First Prime" />
        <h5 className="h5 font-weight-bold">{p}</h5>
        </Grid>
        <Grid item xs={8}>
        <CardHeader title="Second Prime" />
        <h5 className="h5 font-weight-bold">{q}</h5>
        </Grid>
        </Grid>

        <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <CardHeader title="n (p*q)" />
        <h5 className="h5 font-weight-bold">{n}</h5>
        </Grid>
        <Grid item xs={8}>
        <CardHeader title="phi [(p-1) * (q-1)]" />
        <h5 className="h5 font-weight-bold">{phi}</h5>
        </Grid>
        </Grid>

        <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <CardHeader title="Public Key" />
        <h5 className="h5 font-weight-bold">{e}</h5>
        </Grid>
        <Grid item xs={8}>
        <CardHeader title="Private Key" />
        <h5 className="h5 font-weight-bold">{d}</h5>
        </Grid>
        </Grid>


        <CardHeader title="Final Message Encryption" />
        <div>

        {output.map((item, index) => {
            return (
                <div key={index}>
                    <h5>{item}</h5>
                </div>
            )
        })
    }
        </div>
        </div>}
        { bits >= 32 && 
        
        <div className="pb-3 flex-column d-flex justify-content-center text-center">
          <p className=" font-size-small font-weight-light">*As Javascript Can't Handle These Many Bits, The Results May Be Inaccurate*</p>
        </div>
  } 
        </Card>
        </div>
        </Grow>
    )
    }

