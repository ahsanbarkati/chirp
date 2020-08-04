/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { gql, useMutation } from '@apollo/client'

export function Create({ data, label, onChange }) {

    const query = gql`
        mutation addTweet ($input: AddTweetInput!){
          addTweet(input: [$input]) {
            numUids
          }
      }
        `;
    const [addChirp, { dataa }] = useMutation(query);

   const handleClick = () => {

      
      addChirp({ variables: {
        "input": {
          "text": "hello world #hello @mcl",
          "tags": [
            {
              "name": "hello"
            }
          ],
          "mentions": [
            {
              "username": "mcl"
            }
          ],
          "createdBy": {
            "username": "ash"
          },
          "createdAt": "2020-08-03"
        }
      } });
       console.log(dataa)
    }

  return (
    <div style={{ width: 1000 }}>
      <Autocomplete
        style={{ width: 600 , display: "inline-block" }}
        onChange={onChange}
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label={label} margin="normal" variant="outlined" />
        )}
        
      />
    <Button style={{ left:20 , top:30, width: 200, display:"inline-block" }} variant="contained" color="primary" size="large" onClick={handleClick}>
        Chirp
    </Button>

    </div>
  );
}