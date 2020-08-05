/* eslint-disable no-use-before-define */
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {gql, useMutation} from '@apollo/client'
import {Grid} from "@material-ui/core";
import {auth0Config} from "../App";

const query = gql`
mutation addTweet ($input: AddTweetInput!){
    addTweet(input: [$input]) {
        numUids
    }
}`;

function myFunction(tweet) {
    var res = tweet.split(" ");
    var mentions = []
    var tags = []
    for (var i = 0; i < res.length; i++) {
        if (res[i].charAt(0) === '#') {
            tags.push({"name": res[i]})
        }
        if (res[i].charAt(0) === '@') {
            mentions.push({"email": res[i].substring(1)+"@dgraph.io"})
        }
    }
    return {tags, mentions}
}

export function Create({data, label, onChange}) {
    const [addChirp, {dataa}] = useMutation(query, {onError: error => console.log(error)});
    const [chirpText, setChirpText] = useState("");

    const handleClick = () => {
        console.log(data)
        const {tags, mentions} = myFunction(chirpText)
        addChirp({
            variables: {
                "input": {
                    "text": chirpText,
                    "tags": tags,
                    "mentions": mentions,
                    "createdBy": {
                        "email": auth0Config.user.email,
                    },
                    "createdAt": new Date().toISOString()
                }
            }
        });
        window.location.reload()
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