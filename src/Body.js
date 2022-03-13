import {Controlled as CodeMirror} from 'react-codemirror2'
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';


import 'codemirror/mode/javascript/javascript'
import { useState, useEffect } from "react";
import {  Grid,Button, TextField,InputAdornment,Card,Box,Typography, Container} from '@mui/material';
import styled from '@emotion/styled';



function Body(props){
    const { children, value, index, ...other } = props;
    

    const [url, setUrl] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("url");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });
   
    const [inputBox, setInputBox] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("inputBox");
        const initialValue = JSON.parse(saved);
        return initialValue || " ";
    });
    const [outBox, setOutBox] = useState(() => {
      // getting stored value
      const saved = sessionStorage.getItem("outBox");
      const initialValue = JSON.parse(saved);
      return initialValue || " ";
  });

    useEffect(() => {
        // storing input name
        sessionStorage.setItem("url", JSON.stringify(url));
      }, [url]);
      useEffect(() => {
        // storing input name
        sessionStorage.setItem("inputBox", JSON.stringify(inputBox));
      }, [inputBox]);
      useEffect(() => {
        // storing input name
        sessionStorage.setItem("outBox", JSON.stringify(outBox));
      }, [outBox]);
    



    const handleTextChange = (e) => {
        console.log(e.target.value)
        setUrl(e.target.value);
      };

      const handleSubmit = () => {
        console.log(inputBox);
        loadQuery();
      }
     async function loadQuery(){
      const query = inputBox;
      console.log(query);
      const response =await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })

      });
      const result = await response.json();
      const re=JSON.stringify(result)
      console.log(re)
      
     setOutBox(re);
     console.log(outBox)
      
     }
      
    return(
        <div hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
             {value === index && (<Box sx={{p:0,border: 1, position: "absolute",left: 0,right: 4,height:"100%"}}> <Typography  component={'div'}>
             <TextField fullWidth label="url" id="fullWidth" variant="outlined" onChange={(e)=>handleTextChange(e)} value={url}
            InputProps={{
            endAdornment: <InputAdornment position="end">
                <Button onClick= {()=>alert('Hello')} variant="contained" color="primary" style={{fontSize:10}}>
                  Run
                </Button>

            </InputAdornment>,
          }}
      />
      <Grid container sx={{ border: 3 , margin:0,height:500}} spacing={2} >
         <Grid item  lg={6} sm={6} md={6} xs={12}   > 
            <CodeMirror  id="myText"
                      value={inputBox}
                      
                      
                      onBeforeChange={(editor, data, inputBox) => {
                        setInputBox(inputBox);
                      }}

                    
                      options={{
                        lineNumbers: true,
                        lineWrapping:true,
                        theme:'material',
                        mode: 'graphql',
                       
                        
                      }} 
                    
                      

                  />
         </Grid>
          <Grid item  lg={6} sm={6} md={6} xs={12}  >
            <CodeMirror  
                        value={outBox}
                       
                      
                        options={{
                          cursorBlinkRate:-10,
                          lineWrapping:true,
                          theme:'material',
                          
                        }} 
                      
                        

                    />
          </Grid>
      
      </Grid>
     
        <Button  onClick= {handleSubmit} variant="contained" color="primary" >
          Run
        </Button>
      </Typography>
        </Box>
      )}
        </div>
    );
}

export default Body;