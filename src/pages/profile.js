import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Highlight from "../components/highlight";
import {Navigbar, NavbarItem} from '../components/navbar';
import {useAuth0} from "@auth0/auth0-react";
import {auth0Config} from "../App";
import {gql, useQuery} from "@apollo/client";
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DateRangeIcon from '@material-ui/icons/DateRange';
import Link from "@material-ui/core/Link";

const query = gql`
query searchUsers($username: String) {
  queryUser(filter: {username: {eq: $username}}, first: 1) {
    name
    username
    email
    profilePic
    info
    location
    pinned {
      text
      mentions {
        username
      }
      tags {
        name
      }
      comments {
        __typename
      }
      retweets {
        __typename
      }
      likedBy {
        __typename
      }
      createdAt
      createdBy {
        name
        username
        profilePic
      }
    }
    followedUsers {
      __typename
    }
    followers {
      __typename
    }
    createdAt
  }
}
`;

const Profile = ({match}) => {
    var username = match.params.username;
    if (username === undefined || username === "") {
        username = auth0Config.user.nickname
    }
    const {loading, error, data} = useQuery(query, {
      variables: {username}
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
    // const user = {
    //     "name": "Abhimanyu Singh Gaur",
    //     "username": "abhimanyu",
    //     "email": "abhimanyu@dgraph.io",
    //     "profilePic": "https://lh3.googleusercontent.com/a-/AOh14Giorf9cENbgU3oGUAMFq9C413wIzjC08HjzFvjt",
    //     "info": null,
    //     "location": null,
    //     "pinned": null,
    //     "followedUsers": [],
    //     "followers": [],
    //     "createdAt": "2020-08-05T09:09:39.36Z"
    // }
    // const hidden = (user.email === auth0Config.user.email)
    const hidden = false
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
            >
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    style={{backgroundColor: "#ccd6dd", height: 200, padding: 16}}
                >
                    <Avatar alt="profile pic" src={user.profilePic}
                            style={{top: 100, border: "solid white 4px", height: 200, width: 200}}/>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    style={{backgroundColor: "white", height: 100, padding: 16}}
                >
                    {hidden ? <span></span> : <Button variant="outlined" color="primary">Follow</Button> }
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{backgroundColor: "white", padding: 16}}
                >
                    <Typography variant={"h5"} component={"h5"} style={{fontWeight: "bold"}}>{user.name}</Typography>
                    <Typography variant={"caption"} component={"span"}>@{user.username}</Typography>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <DateRangeIcon></DateRangeIcon>
                        <Typography variant={"caption"} component={"span"}>{new Date(user.createdAt).toDateString()}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Link href={"/following"} variant={"body1"}>{user.followedUsers.length} Following</Link>
                        <Typography>&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                        <Link href={"/followers"} variant={"body1"}>{user.followers.length} Followers</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
