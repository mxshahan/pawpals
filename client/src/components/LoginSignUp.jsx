import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from './AuthContext';
import { BasicModal } from "./Common";
import { LoginTabs } from "."
import { Nav, Button } from "react-bootstrap";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import * as Enum from './Common/Enum';
import * as Msgs from './Common/Messages';
import * as Utils from './Utils';

const loginFields = [
    {
        name: "Username",
        type: "input",
        value: ""
    },
    {
        name: "Password",
        type: "input",
        value: ""
    }
]

const signupFields = [
    {
        name: "Username",
        type: "input",
        value: ""
    },{
        name: "Email",
        type: "input",
        value: ""
    },
    {
        name: "Password",
        type: "input",
        value: ""
    }
]

const data = {
    login: {
        title: 'Member Login',
        saveTitle: 'Login',
        fields: loginFields
    },
    signup: {
        title: 'Member Signup',
        saveTitle: 'Sign Up',
        fields: signupFields
    }
}

// handles the login button click (opens modal)
const handleLogin = (setLoginModalOpen) => {
    setLoginModalOpen(true);
}

// handles modal close; passed to common modal component
const handleLoginClose = (setLoginModalOpen) => {
    setLoginModalOpen(false);
}

export default function LoginSignUp() {
    const context = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [title, setTitle] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [fields, setFields] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPass, setIsValidPass] = useState(false);

    function handleChange(inputName, valueIn) {
        // set form input values
        setFields(prev => prev.map(s => {
            if(s.name === inputName) {
                return {...s, value:valueIn}
            }
            else return s;
        }))

        // validate
        if(modalType === 'signup') {
            if(inputName === 'Email') {
                if(Utils.validateEmail(valueIn)) setIsValidEmail(true);
                else setIsValidEmail(false);
            }
            else if(inputName === 'Username') {
                if(valueIn !== null && valueIn !== '') setIsValidUsername(true);
                else setIsValidUsername(false);
            }
            else {
                if(valueIn !== null && valueIn !== '') setIsValidPass(true);
                else setIsValidPass(false);
            }
        }
    }

    function getAllUsernames() {
        axios.get('/api/getAllUsernames')
        .then(res => {
            var names = [];
            res.data.map(r => names.push(r.username));
            setUsernames(names);
        })
        .catch(err => console.log(err));
    }

    // handles when login is completed
    function handleSave(setLoginModalOpen, modalType, fields, usernames) {
        // send new account creation info to API; get userID in response and keep track of the fact that we are logged in
        setLoginModalOpen(false);

        if (modalType === 'login') {
            login(fields);
        } else {
            signup(fields, usernames);
        };
    }

    // update context after signing up or logging in
    function updateContext(user) {
        context.setIsLoggedIn(true);
        context.setUserName(user.username);
        context.setUserID(user.id);
        context.setUserRole(user.userroleid);
    }

    // function login(fields, usernames) {
    function login(fields) {
        var username = fields[0]?.value;
        var pass = fields[1]?.value;

        // axios to check if username/pass are correct
        // go to authRoutes.js
        axios.post('/auth/login', {username: username, password: pass})
            .then(res => {
                if(res?.data.statuscode === 401) {
                    enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                }
                else if(res?.data.statuscode === 200) {
                    // console.log('.........\nmessage: ',res.data);
                    enqueueSnackbar(Msgs.successLogin, {variant: Enum.Variant.success});
                    
                    updateContext(res.data.user);
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar(Msgs.error500, {variant: Enum.Variant.error});
            });
    }

    function signup(fields, usernames) {
        var username = fields[0]?.value;
        var email = fields[1]?.value;
        var pass = fields[2]?.value;
        var roleID = 1;

        if(!Utils.validateUsername(username, usernames)) {
            enqueueSnackbar(Msgs.invalidUsername, {variant: Enum.Variant.error});
        }
        else if(!Utils.validateEmail(email)) {
            enqueueSnackbar(Msgs.invalidEmail, {variant: Enum.Variant.error});
        }
        else {
            var params = {
                role: roleID, 
                username: username, 
                password: pass, 
                email: email
            };
            // only regular users sign up here
            axios.post('/auth/signup', params)
            .then(res => {
                if(res?.data.statuscode === 401) {
                    enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                }
                else if(res?.data.statuscode === 200) {
                    enqueueSnackbar(Msgs.successSignUp, {variant: Enum.Variant.success});
                    updateContext(res.data.user);
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar(Msgs.unsuccessfulSignUp, {variant: Enum.Variant.error});
            })
        }
    }

    // will perform the following actions on render when modalType variable changes
    useEffect(() => {
        setTitle(data[modalType]?.title);
        setSaveTitle(data[modalType]?.saveTitle);
        setFields(() => data[modalType]?.fields);
        getAllUsernames();
      }, [modalType]);

    return (
        <>
            <BasicModal 
                show={loginModalOpen}
                handleClose={() => handleLoginClose(setLoginModalOpen,isValidEmail, isValidPass, isValidUsername)}
                handleSave={() => handleSave(setLoginModalOpen, modalType, fields, usernames)}
                title={title}
                handleChange={(e, v) => handleChange(e, v)}
                saveTitle={saveTitle}
                fields={fields}
                isValidEmail={isValidEmail}
                isValidUsername={isValidUsername}
                isValidPass={isValidPass}
                tabs={<LoginTabs setModalType={setModalType} tabClass='signupTab'/>}
            />
            
            <Nav className="ml-auto">
                <Button variant="primary" onClick={() => handleLogin(setLoginModalOpen)}>Login</Button>
            </Nav>
        </>
    );
}