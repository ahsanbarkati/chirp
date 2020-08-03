/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { gql, useMutation } from '@apollo/client'

export function Create({ data, label, onChange }) {

    const query = gql`
    mutation {
        addUser(input: [
          { name: "Ahsan", username:"ash", info:"Engineer", location: "Sa", createdAt: "2020", email:"ash@dgraph"},
        ]) {
          user {
            name
            username
            info
          }
        }
      }
        `;
    const [addChirp, { dataa }] = useMutation(query);

   const handleClick = () => {
       console.log('this is:', this);
       addChirp({ variables: { } });
       console.log(dataa)
    }

  return (
    <div style={{ width: 500 }}>
      <Autocomplete
        onChange={onChange}
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label={label} margin="normal" variant="outlined" />
        )}
        
      />
    <Button variant="contained" color="primary" size="large" onClick={handleClick}>
        Chirp
    </Button>

    </div>
  );
}