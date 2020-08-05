import React, {Suspense} from 'react';
import {Router, Route, Switch} from "react-router-dom";

import history from "./utils/history";
import Home from "./pages/home";
import Feed from "./pages/feed";
import Types from "./pages/types";
import Form from "./pages/form";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";

import {makeStyles} from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import {useAuth0} from "@auth0/auth0-react";

import './App.css';

import CssBaseline from "@material-ui/core/CssBaseline";

import {Sidebar, SidebarItem} from './components/sidebar';
import {Followers} from "./components/followers";
import {Searcher} from "./pages/searcher";
import {SearcherPeople} from "./pages/searcherpeople";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    }
}));

export var auth0Config = class {
    user
    isLoading
    isAuthenticated
};

function App() {
    const classes = useStyles();

    const {user, isLoading, isAuthenticated} = useAuth0();
    auth0Config.user = user;
    auth0Config.isLoading = isLoading;
    auth0Config.isAuthenticated = isAuthenticated;

    if (isLoading) {
        return (
            <div>Loading</div>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Sidebar>
                <SidebarItem label="Feed" icon={HomeIcon} link="/feed"/>
                <SidebarItem label="Profile" icon={PeopleIcon} link="/profile"/>
                <SidebarItem label="Search" icon={HomeIcon} link="/search"/>
                <SidebarItem label="Explore People" icon={HomeIcon} link="/searchpeople"/>
                {/* <SidebarItem label="Form Example" icon={PeopleIcon} link="/form"/> */}
                {/* <SidebarItem label="Settings" icon={SettingsIcon}>
        
          <SidebarItem label="Start" link="/not-implemented" />
          <SidebarItem label="Here" link="/not-implemented" />
        </SidebarItem> */}
            </Sidebar>
            <Router history={history}>
                <Suspense fallback={<div/>}>
                    <Switch>
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/feed" exact={true} component={Feed}/>
                        <Route path="/types/:typeId" exact={true} component={Types}/>
                        <Route path="/form" exact={true} component={Form}/>
                        <Route path="/profile/:username" component={Profile}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/search" component={Searcher}/>
                        <Route path="/searchpeople" component={SearcherPeople}/>
                        <Route path="/followers" component={Followers}/>


                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </Router>
        </div>
    )
}

export default App;
