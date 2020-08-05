import React from 'react';
import {Grid} from "@material-ui/core";
import {FollowerCard} from '../components/followerCard';
import {auth0Config} from "../App";
import {gql, useQuery} from "@apollo/client";
import Typography from "@material-ui/core/Typography";

const followersQuery = gql`
query searchUsers($username: String) {
  queryUser(filter: {username: {eq: $username}}, first: 1) {
    name
    username
    tweeted {
        __typename
    }
    followedUsers {
      name
      username
      info
      profilePic
    }
  }
}
`;

export function Following({match}) {
    var username = match.params.username;
    if (username === undefined || username === "") {
        username = auth0Config.user.nickname
    }
    const myEmail = auth0Config.user.email
    const {loading, error, data} = useQuery(followersQuery, {
        variables: {username, myEmail}
    });

    if (auth0Config.isLoading || loading) {
        return (
            <div>Loading</div>
        );
    }

    if (!auth0Config.isAuthenticated) {
        return (
            <div>Please login</div>
        );
    }

    if (error !== undefined) {
        return (
            <div>{error.toString()}</div>
        )
    }
    if (data == null) {
        return (
            <div>Something went wrong! Unable to fetch user data.</div>
        )
    }

    const user = data.queryUser[0]
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{padding: "0 20%"}}
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                style={{padding: "8"}}
            >
                <Typography variant={"h5"} component={"h5"} style={{fontWeight: "bold"}}>{user.name}</Typography>
                <Typography variant={"caption"} component={"span"}>@{user.username}</Typography>
                <Typography variant={"h4"} component={"h4"}>Following</Typography>
            </Grid>
            {user.followedUsers.map(user =>
                <FollowerCard user={user}></FollowerCard>
            )}
        </Grid>
    );
}