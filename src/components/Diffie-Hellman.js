import {Card,Grow,Fade, TextField,CardHeader,Input,Grid,Button} from "@mui/material";
import React, {useState} from 'react';
import swal from 'sweetalert';

export default function Diffie_Hellman () {
    const [prime, setPrime] = useState(0);
    const [rootList, setRootList] = useState([]);
    const [root, setRoot] = useState(0);
    const [alicePublic, setAlicePublc] = useState(0);
    const [bobPublic, setBobPublic] = useState(0);
    const [alicePrivate, setAlicePrivate] = useState(0);
    const [bobPrivate, setBobPrivate] = useState(0);
    const [aliceNumber, setAliceNumber] = useState(0);
    const [bobNumber, setBobNumber] = useState(0);
    const [result, setResult] = useState(false);



    const primeCheck = (n) => {
        let first_primes_list = [2, 3, 5, 11, 7, 13, 17, 19, 23, 29,
            31, 37, 41, 43, 47, 53, 59, 61, 67,
            71, 73, 79, 83, 89, 97, 101, 103,
            107, 109, 113, 127, 131, 137, 139,
            149, 151, 157, 163, 167, 173, 179,
            181, 191, 193, 197, 199, 211, 223,
            227, 229, 233, 239, 241, 251, 257,
            263, 269, 271, 277, 281, 283, 293,
            307, 311, 313, 317, 331, 337, 347, 349]
        if (first_primes_list.includes(n)) {
            return true;
        }
        if (n < 2) {
            return false;
        }
        if (n % 2 == 0) {
            return false;
        }
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    
    }

    const primefactors = (s) => {
        let factors = [];
        let c = 2;
        for (let i=2; i<s; i++){
            if (s % i == 0){
                factors.push(i);
                s = s / i;
            }
            else{
                c++;
            }
        }
        return factors;
    }

    const primitive = () => {
        if (prime == 0){
            swal({
                title: "Error",
                text: "Please Enter A Prime Number",
                icon: "error",
              });
            return;
        }

        if (!primeCheck(prime)){
            swal({
                title: "Error",
                text: "Please Enter A Valid Prime Number",
                icon: "error",
              });
            return;
        }

        let s = prime - 1;
        let factors = primefactors(s);
        let primitiveroots = [];
        for (let i=2; i<prime; i++){
            let flag = 0;
            for (let j=0; j<factors.length; j++){
                if (Math.pow(i, s/factors[j]) % prime == 1){
                    flag = 1;
                    break;
                }
            }
            if (flag == 0){
                primitiveroots.push(i);
            }
        }
        setRootList(primitiveroots);
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
      

    const generate = () => {

        if (root == 0){
            swal({
                title: "Error",
                text: "Please Select A Primitive Root",
                icon: "error",
              });
            return;
        }

        if (rootList.includes(parseInt(root))) {
            let Xa = Math.floor(Math.random() * (prime-1) + 1);
            let Xb = Math.floor(Math.random() * (prime-1) + 1);

            setAliceNumber(Xa);
            setBobNumber(Xb);


            let Ya = expmod(root,Xa,prime);
            let Yb = expmod(root,Xb,prime);

            setAlicePublc(Ya);
            setBobPublic(Yb);

            let Ka = expmod(Yb,Xa,prime);
            let Kb = expmod(Ya,Xb,prime);

            setAlicePrivate(Ka);
            setBobPrivate(Kb);

            if (Ka == Kb){
                setResult(true);
            }
            else{
                setResult(false);
            }
        }
        else{
            swal({
                title: "Error",
                text: "Please Select A Valid Primitive Root",
                icon: "error",
              });
        }
    }
        

    return (
        <Grow in>
        <div className="container"> 
        <Card>
        <h1 className="mt-4 h1 d-flex justify-content-center">Diffie Hellman Key Exchange</h1>

        <div className="p-5 d-flex justify-content-center">

        <TextField className="" onChange={(event) => {
                  setPrime(event.target.value);
                }} fullWidth label="Enter a Prime Number" id="fullWidth" type="number" />

        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={primitive} color="success">Generate Primitive Roots</Button>
        </div>
        <div className="pb-3 d-flex justify-content-center">
        <CardHeader title="Primitive Roots" />
        </div>
        <div className="pb-3 d-flex justify-content-center text-center">
        {rootList.map((item) => {
            return (
            <div>
                <h5 className="h5">{item}&nbsp;&nbsp;&nbsp;</h5>
            </div>
            );
        })}
        </div>

        <div className="p-5 d-flex justify-content-center">
        <TextField className="mx-3" onChange={(event) => {
            setRoot(event.target.value);
        }} label="Choose a Primitive Root" type="number"/>
        </div>

        <div className="pb-5 d-flex justify-content-center">
        <Button className="p-3 mx-2" variant="contained" onClick={generate} color="success">Generate Keys</Button>
        </div>
        { result &&
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
        
}

        </Card>
        </div>
        </Grow>
    )
}

