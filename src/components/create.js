/* eslint-disable no-use-before-define */
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {gql, useMutation} from '@apollo/client'
import {Grid} from "@material-ui/core";

const query = gql`
mutation addTweet ($input: AddTweetInput!){
    addTweet(input: [$input]) {
        numUids
    }
}`;

export function Create({data, label, onChange}) {
    const [addChirp, {dataa}] = useMutation(query, {onError: error => console.log(error)});
    const [chirpText, setChirpText] = useState("");

    const handleClick = () => {
        console.log(data)
        addChirp({
            variables: {
                "input": {
                    "text": chirpText,
                    "tags": [
                        {
                            "name": "hello"
                        }
                    ],
                    // "mentions": [
                    //     // {
                    //     //     "username": "mcl"
                    //     // }
                    // ],
                    "createdBy": {
                        "email": data,
                    },
                    "createdAt": "2020-08-03"
                }
            }
        });
        console.log(dataa)
    }

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
        >
            <TextField id="chirpText" onChange={e => setChirpText(e.target.value)} variant={"outlined"} multiline={true}></TextField>
            <Button variant="contained" color="primary" size="large" onClick={handleClick}>
                Chirp
            </Button>
        </Grid>
        // <div style={{width: 1000}}>
        //     <TextField id="chirpText" variant={"outlined"} multiline={true}></TextField>
        //     {/*<Autocomplete*/}
        //     {/*    style={{width: 600, display: "inline-block"}}*/}
        //     {/*    onChange={onChange}*/}
        //     {/*    id="free-solo-demo"*/}
        //     {/*    freeSolo*/}
        //     {/*    options={data.map((option) => option.name)}*/}
        //     {/*    renderInput={(params) => (*/}
        //     {/*        <TextField {...params} label={label} margin="normal" variant="outlined"/>*/}
        //     {/*    )}*/}
        //
        //     {/*/>*/}
        //     <Button style={{left: 20, top: 30, width: 200, display: "inline-block"}} variant="contained" color="primary"
        //             size="large" onClick={handleClick}>
        //         Chirp
        //     </Button>
        //
        // </div>
    );
}