import React from 'react';
import {Grid} from "@material-ui/core";
import {FollowerCard} from '../components/followerCard';


export function Followers({user}) {
  return (
    <div>{user.followers.map(follower => 
      <Grid item xs={12} key={follower.name}>
      <FollowerCard user={follower}></FollowerCard>
      </Grid>)}
    </div>
  );
}