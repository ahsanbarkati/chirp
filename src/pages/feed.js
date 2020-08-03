import React from "react";
import {List, ListItem, Typography, Grid} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'

import Content from '../components/content';
import { Navigbar, NavbarItem } from '../components/navbar';
import { CenteredCard } from '../components/card';
import { Search } from "../components/search";
import { Create } from "../components/create";

const query = gql`
  query {
    queryUser {
      name
      info
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(query);
  const history = useHistory();

  const handleClick = (event, value) => {
    history.push(`/types/${value}`)
  }

  return <>
    <Navigbar title="Feed" color="primary" />
    <Content>
      {/* {!loading && !error ? <Search data={data.queryUser.name || []} label="Search your type here" onChange={handleClick} />: null} */}
      {!loading && !error ? <Create data={data.queryUser.name || []} label="Chirp now" onChange={handleClick} />: null}
      <TypesList loading={loading} error={error} data={data} />
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
    {data.queryUser.map(type =>
      <Grid item xs={12} key={type.name}>
        <CenteredCard name={type.name} data={type.info}></CenteredCard>
      </Grid>
    )}
  </Grid>;
}

export default Home;
