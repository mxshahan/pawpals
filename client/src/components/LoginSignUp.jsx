import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from './AuthContext';
import { BasicModal } from "./Common";
import { LoginTabs } from "."
import { Nav, Button } from "react-bootstrap";
import axios from 'axios';
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
    console.log("handlelogin");
    setLoginModalOpen(true);
}

// handles modal close; passed to common modal component
const handleLoginClose = (setLoginModalOpen) => {
    console.log("handle login close");
    setLoginModalOpen(false);
}

export default function LoginSignUp() {
    const context = useContext(AuthContext);
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
        console.log(inputName, valueIn)
        setFields(prev => prev.map(s => {
            console.log(prev);
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

    // used to validate username when signing up (username must be unique)
    // to-do: handle this on backend
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
        // console.log(fields);
        // send new account creation info to API; get userID in response and keep track of the fact that we are logged in
        setLoginModalOpen(false);
        var username = fields[0].value;
        var pass;

        if (modalType === 'login'){
            pass = fields[1].value;
            console.log('handleLoginSave', username, pass);
            // keep track of the fact that we are logged in...get userId from API
            // axios to check if username/pass are correct
            // go to authRoutes.js
            axios.post('/auth/login', {username: username, password: pass})
                .then(res => {
                    console.log(res.data);
                    if(res?.data.statuscode === 401) {
                        // to-do: display msg to user
                        console.log(res.data.message);
                    }
                    else if(res?.data.statuscode === 200) {
                        // to-do: display success msg to user
                        console.log('.........\nmessage: ',res.data.message);
                        console.log(Msgs.successSignUp);
                        
                        // update context
                        context.setIsLoggedIn(true);
                        context.setUserName(res.data.user.username);
                        context.setUserID(res.data.user.userroleid);
                        context.setUserRole(res.data.user.userroleid);
                    }
                })
                .catch(() => {
                    // to-do: display msg to user
                    console.log(Msgs.error500);
                });
        } 
        
        else if (modalType === 'signup'){
            var email = fields[1].value;
            pass = fields[2].value;
            // var newid;  // to-do: handle this with log in
            if(Utils.validateEmail(email) && validateUsername(username, usernames)) {
                // only regular users sign up here
                axios.post(`/api/addUser/1/${username}/${pass}/${email}`)
                .then(res => {
                    console.log(Msgs.successSignUp);
                    console.log("new user id: ", res?.data[0].id);
                    // newid = res.data[0].id;

                    // reset form and validations
                    setIsValidEmail(false);
                    setIsValidPass(false);
                    setIsValidUsername(false);
                    setFields(prev => prev.map(s => {
                        return {...s, value:''}
                    }))
                })
                .catch(err => console.log(Msgs.unsuccessfulSignUp + err))
            }
            else {
                console.log(Msgs.invalidForm);
            }
        };
    }

    // username must be unique
    function validateUsername(name, usernames) {
        if(usernames.some(d => d.toLowerCase() === name.toLowerCase())) {
            console.log(Msgs.invalidUsername);
            return false;
        }
        return true;
    }

    // function Utils.validateEmail(email) {
    //     var patt = /^\S+@\S+\.\S+$/;
    //     if(email.match(patt)) return true;
    //     return false;
    // }

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
                handleClose={() => handleLoginClose(setLoginModalOpen)}
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