import React from "react";
import {Grid, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client'

import Content from '../components/content';
import {Navigbar} from '../components/navbar';
import {CenteredCard} from '../components/card';
import {Create} from "../components/create";
import {auth0Config} from "../App";

const query = gql`
query home($email: String!) {
  getUser(email: $email) {
    followedUsers {
      tweeted {
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
    }
  }
}
`;

const Feed = () => {
  const email = auth0Config.user.email
  console.log("email: " + email)
  const { loading, error, data } = useQuery(query, {
    variables: {email}
  });
  const history = useHistory();

  const handleClick = (event, value) => {
    history.push(`/types/${value}`)
  }

  if(loading){
    return(
        <div>Loading</div>
    );
  }

  return <>
    <Navigbar title="Feed" color="primary" />
    <Content>
      {/* {!loading && !error ? <Search data={data.queryUser.name || []} label="Search your type here" onChange={handleClick} />: null} */}
      {!loading && !error ? <Create data={email} label="Chirp now" onChange={handleClick} />: null}
      <TypesList loading={loading} error={error} data={data} />
    </Content>
  </>
}

function TypesList({loading, error, data}) {
  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      {/*Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?*/}
      {error.toString()}
    </Typography>
  }
  return <Grid container spacing={3}>
    {data.getUser?.followedUsers?.map(user => {
      user.tweeted.map(tweet =>
          <Grid item xs={12} key={tweet.text}>
            <CenteredCard tweet={tweet}></CenteredCard>
          </Grid>)
        }
    )}
  </Grid>;
}

export default Feed;
