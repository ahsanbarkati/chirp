import React from "react";
import {Grid, Typography} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client'

import Content from '../components/content';
import {Navigbar} from '../components/navbar';
import {CenteredCard} from '../components/card';

const query = gql`{
  __schema {
    types {
      name
    }
  }
}`;

const Home = () => {
  const { loading, error, data } = useQuery(query);
  const history = useHistory();

  const handleClick = (event, value) => {
    console.log("Search called")
  }

  return <>
    <Navigbar title="Home" color="primary" />
    <Content>
      <Typography>
        This is Chirp
      </Typography>
    </Content>
  </>
}

function TypesList({loading, error, data}) {
  if (loading) { return <Typography>Loading...</Typography> }
  if (error) {
    return <Typography>
      Something Went Wrong. Did you remember to set the REACT_APP_GRAPHQL_ENDPOINT environment variable?
    </Typography>
  }
  return <Grid container spacing={3}>
    {data.__schema.types.map(type =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={type.name}>
        <Link to={`/types/${type.name}`}>
          <CenteredCard>{type}</CenteredCard>
        </Link>
      </Grid>
    )}
  </Grid>;
}

export default Home;
