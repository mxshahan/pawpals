import React, { useContext } from "react";
import { AuthContext } from './AuthContext';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/Header.css";
import { LoginSignUp, SettingModal } from "../components"
import axios from 'axios';
import * as Msgs from './Common/Messages';

// TODO: add conditionals for if logged in, highlight selected tab, add login functionality
// TODO: pull user name from database

// added key to get rid of error msgs
const headersData = [
    {
      label: "Home",
      href: "/",
      key: "home"
    },
    {
      label: "Browse",
      href: "/browse",
      key: "browse"
    },
    {
      label: "Favorites",
      href: "/favorites",
      key: "favs"
    },
    {
      label: "News/PR",
      href: "/news",
      key: "news"
    },
    {
        label: "Pet Profiles Admin",
        href: "/admin",
        key: "admin"
      },
];

export default function Header(props) {
    // Currently our only display; creates full navbar
    const displayDesktop = () => {
        console.log("loggedIn: ",context.isLoggedIn);
        return (
            <Navbar sticky="top" bg="light" expand="lg">
                {pawPalsLogo}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {getMenuButtons()}
                    </Nav>
                    <Nav >
                        {displayLogIn()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };

    // gets context (global variable)
    const context = useContext(AuthContext);

    const pawPalsLogo = (
        <Navbar.Brand href="/">
        <img src="https://pawpalsapp.s3.us-east-2.amazonaws.com/images/new_logo.JPG" alt="logo"/>
        </Navbar.Brand>
    );

    const login = (
        <LoginSignUp />
    );

    function  logout() {
        console.log('logging out');
        axios.get('/auth/logout')
            .then(res => {
                context.setIsLoggedIn(false);
                context.setDataSet(false);
                console.log(Msgs.successLogout);
            })
            .catch(err => console.log(err));
    }

    const settingDropDown = (name) => (
        <NavDropdown title={`Hello ${name}`} id="navbarScrollingDropdown">
            <SettingModal />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
    );

    // Create the Home, Browse, Favorite, and News/PR nav links
    const getMenuButtons = () => {
        return headersData.map(({ label, href, key }) => {
            // if we are not logged in do not render Favorites
            if (!context.isLoggedIn && key === 'favs'){ return <></>; }
            else if (!context.isAdmin && key === 'admin' ){ return <></>; }
            else {
                return (
                    <Nav.Link href={href} key={key}>{label}</Nav.Link>
                );
            }
        });
    };

    // decide whether we display sign in or the person's name (if they are signed in)
    const displayLogIn = () => {
        if (context.isLoggedIn){
            return settingDropDown(context.userName);
        }
        else {
            return login;
        }
    }
    
    return (
        <header>
                {displayDesktop()}
        </header>
    );
}