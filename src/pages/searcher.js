import React, {useState} from 'react';
import {List, ListItem, Typography, Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {gql, useQuery} from '@apollo/client'
import {CenteredCard} from "../components/card";

export function Searcher() {

  const queryTweet = gql`
  query searchTweets($text:String, $first: Int!, $offset: Int!) {
    queryTweet(filter: {text: {anyoftext: $text}}, first: $first, offset: $offset) {
      text
      createdAt
      createdBy {
        name
        username
        profilePic
      }
    }
  }
    `;

  var done = false;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchText, setSearchText] = useState("");

  const text = searchText;
  const first = 10;
  const offset = 0;
  const {loading, error, data} = useQuery(queryTweet, {
    variables: {text, first, offset}
  });

  if(!loading){
    console.log("data", data);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log(anchorEl);
    console.log(searchText);
    setAnchorEl(null);
  };

  const handlePeople = () => {
    console.log("poeple");
    console.log(searchText);
    setAnchorEl(null);
  };

  const handleTweets = () => {
    console.log("tweets");
    console.log(searchText);
    done = true;
    setAnchorEl(null);
  };
  

  return (
    <Grid>
      <TextField id="Search People" onChange={e => setSearchText(e.target.value)} variant={"outlined"} multiline={true}></TextField>
      <div>
      {/* <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Search Options
      </Button> */}
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handlePeople}>People</MenuItem>
        <MenuItem onClick={handleTweets}>Tweets</MenuItem>
      </Menu>
    </div>
    {!loading? <div>
        {
            data?.queryTweet.map(tweet =>
            <Grid item xs={12} key={tweet?.text}>
            <CenteredCard tweet={tweet}></CenteredCard>
            </Grid>)
            }
        
      </div> : <span></span>}
    </Grid>
  );

  
}