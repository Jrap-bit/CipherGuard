import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Caesar from './components/Caesar';
import Playfair from './components/Playfair';
import Diffie_Hellman from './components/Diffie-Hellman';
import Hill from './components/Hill';
import Vigenere from './components/Vigenere';
import RSA from './components/RSA.jsx';
import DES from './components/DES';
import AES from './components/AES';
import ElGamal from './components/ElGamal';

import "@fontsource/roboto";
import {Tabs,Grow, Tab,Box,FormControlLabel,CssBaseline, IconButton} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Vernam from './components/Vernam';
import Railfence from './components/Railfence';



const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};


function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
    <CssBaseline />
    <div className={classes.root}>

      <h1 className="mt-5 mb-4 h1 d-flex justify-content-center">Encryption and Decryption Algorithms</h1>

      {/* Dark Mode Button */}

      <FormControlLabel className=" mb-3 d-flex justify-content-center" 
      control={ <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
        {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>} 
      label={isDarkTheme ? "Turn Lights On" : "Turn Lights Off"}/>

      <Tabs value={value} onChange={handleChange} aria-label="cipher tabs" centered> 
        <Tab label="Caesar Cipher" />
        <Tab label="Playfair Cipher" />
        <Tab label="Hill Cipher" />
        <Tab label="Vernam Cipher" />
        <Tab label="Railfence Cipher" />
        <Tab label="Vigenere Cipher" />
        <Tab label="RSA" />
        <Tab label="Diffie-Hellman" />
        <Tab label="DES" />
        <Tab label="AES" />
        <Tab label="ElGamal" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Caesar />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Playfair />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Hill />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Vernam />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Railfence />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Vigenere />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <RSA />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Diffie_Hellman />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <DES />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <AES />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <ElGamal />
      </TabPanel>
    </div>
    </ThemeProvider>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default App;
