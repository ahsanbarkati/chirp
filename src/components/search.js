/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export function Search({ data, label, onChange }) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        onChange={onChange}
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label={label} margin="normal" variant="outlined" />
        )}
      />
     <Box mt={4}>
            <Button variant="contained" color="primary" size="large">
              Action
            </Button>
     </Box>
    </div>
    
  );
}