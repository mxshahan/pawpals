import React, { useContext } from "react";
import { AuthContext } from './AuthContext';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/Header.css";
import { LoginSignUp, SettingModal } from "../components"
import axios from 'axios';
import * as Enum from './Common/Enum';
import * as Msgs from './Common/Messages';
import { useSnackbar } from 'notistack';

// TODO: add conditionals for if logged in, highlight selected tab, add login functionality

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

const logout = (context, enqueueSnackbar) => {
    axios.get('/auth/logout')
        .then(() => {
            context.setIsLoggedIn(false);
            context.setDataSet(false);
            enqueueSnackbar(Msgs.successLogout, {variant: Enum.Variant.success});
        })
        .catch(err => {
            console.log(err);
            enqueueSnackbar(Msgs.error500, {variant: Enum.Variant.error})
        });
}

export default function Header(props) {
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(AuthContext);

    // Currently our only display; creates full navbar
    const displayDesktop = () => {
        return (
            <Navbar sticky="top" bg="light" expand="lg">
                {pawPalsLogo}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" key='menuBtns'>
                        {getMenuButtons()}
                    </Nav>
                    <Nav key='displayLogin'>
                        {displayLogIn()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };

    const pawPalsLogo = (
        <Navbar.Brand href="/">PawPals</Navbar.Brand>
    );

    const login = (
        <LoginSignUp />
    );

    const settingDropDown = (name) => (
        <NavDropdown title={`Hello ${name}`} id="navbarScrollingDropdown">
            <SettingModal />
            <NavDropdown.Item onClick={() => logout(context, enqueueSnackbar)}>Logout</NavDropdown.Item>
        </NavDropdown>
    );

    // Create the Home, Browse, Favorite, and News/PR nav links
    const getMenuButtons = () => {
        return headersData.map(({ label, href, key }) => {
            // if we are not logged in do not render Favorites
            if (!context.isLoggedIn && key === 'favs'){ return <React.Fragment key={key}></React.Fragment>; }
            else if (context.userRole !== 2 && key === 'admin' ){ return <React.Fragment key={key}></React.Fragment>; }
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