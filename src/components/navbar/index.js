import React, { useState } from "react";

import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../logout-button";
import LoginButton from "../login-button";

import clsx from "clsx";
import useStyles from "./navbar.style";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink as RouterNavLink } from "react-router-dom";

export function NavbarItem({type, href, onClick, text, iconName, width, height}) {
  return type === "text" ? (
    <a
      href={href}
      onClick={onClick}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Typography variant="h4">{text}</Typography>
    </a>
  ) : (
      <div onClick={onClick}>
        <img
          src={require(`../../assets/images/${iconName}`)}
          alt="icon"
          width={width}
          height={height}
        />
      </div>
    )
}

export function Navigbar({title, searchBar, children = [], color = "primary"}) {
  const classes = useStyles();
  const [closeBtn, setCloseBtn] = useState(false);

  const getSearchBar = (view) => {
    return searchBar ? (
      <div className={view === "web" ? classes.search : classes.searchToggle}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={searchBar.placeholder}
          onChange={searchBar.onChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    ) : null;
  };

  const getNavRightItems = (view) => {
    return children.map((item, index) => {
      return (
        
        <div
          className={view === "web" ? classes.ml2 : null}
          style={{ cursor: "pointer" }}
          key={index}
        >
          {item}
          
        </div>
      );
    });
  };

  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="fixed" className={clsx(classes.appBar, classes.appBarShift)} color={color}>
      <div className={classes.nav} >
        <div className={classes.navLeft}>
          <Typography variant="h6">{title}</Typography>
          {getSearchBar("web")}
        </div>

        <Nav className="justify-content-end">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Nav>

        <div className={classes.navRight}>{getNavRightItems("web")}</div>

        <div
          className={classes.toggleBtn}
          onClick={() => setCloseBtn(!closeBtn)}
        >
          <IconButton color="inherit">
            {!closeBtn ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </div>
      {closeBtn ? (
        <div className={classes.navLinks}>
          {searchBar ? (
            <div>
              {getSearchBar()}
              <br />
            </div>
          ) : null}
          {getNavRightItems()}
        </div>
      ) : null}
    </AppBar>
  );
}
