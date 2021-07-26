import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';
import { BasicModal } from "../components/Common";
import { NavDropdown } from "react-bootstrap";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as Msgs from './Common/Messages';

const settingFields = [
    {
        name: "Change Password",
        type: "input",
        value: ""
    },
    {
        name: "Change Email",
        type: "input",
        value: ""
    }
]

const settingData = {
    title: 'Settings',
    saveTitle: 'Save',
    otherButton: 'Delete Account',
    fields: settingFields
}

const deleteData = {
    title: 'Are you sure?',
    saveTitle: 'Yes, Delete',
    otherButton: 'No, I made a mistake',
}

// handles the settings button click
const handleSettings = (setSettingModalOpen) => {
    setSettingModalOpen(true);
}

// handles modal close; passed to common modal component
const handleSettingClose = (setSettingModalOpen) => {
    setSettingModalOpen(false);
}

// handles when new username/pw/email is saved
const handleSettingsSave = (setSettingModalOpen, enqueueSnackbar) => {
    setSettingModalOpen(false);
    // handle submitting new data to api
    // get user data from input
    let email = 'new email';    // get from input
    let pass = 'new pass';      // get from input
    let userID = 10;        // get from sessions?
    if(email) {
        axios.put(`/api/updateUserEmail/${email}/${userID}`)
        .then(() => {
            enqueueSnackbar(Msgs.updatedEmail, { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        })
        .catch(err => {
            enqueueSnackbar('There was trouble updating your email!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        });
    }
    if(pass) {
        axios.put(`/api/updateUserPass/${pass}/${userID}`)
        .then(() => {
            enqueueSnackbar('Password successfully updated!', { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        })
        .catch(err => {
            enqueueSnackbar('There was trouble updating your password!', { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        });
    }
}

// handles deleting account (tested and works 7/19)
// to-do: logout, redirect to home, close message tab
const deleteAccount = (userID, enqueueSnackbar) => {
    axios.delete(`/api/deleteUser/${userID}`)
    // .then(console.log("confirmed"))
    .then(() => {
        enqueueSnackbar('account deleted', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    })    
    .catch(err => console.log(err));
}

const swapToDeleteModal = (setSettingModalOpen, setDeleteModalOpen) => {
    setSettingModalOpen(false);
    setDeleteModalOpen(true);
}

export default function SettingModal() {
    const context = useContext(AuthContext);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [fields, setFields] = useState([]);
    const [settingModalOpen, setSettingModalOpen] = useState(false);

    // for using snackbar
    const { enqueueSnackbar } = useSnackbar();

    // to-do: get user data (saved in sessions??) and pre-populate input
    // get new input; see LoginSignUp
    function handleChange(inputName, valueIn) {
        setFields(prev => prev.map(s => {
            console.log(prev);
            if(s.name === inputName) {
                return {...s, value:valueIn}
            }
            else return s;
        }))
    }

    // handles the settings button click
    const handleDelete = (setDeleteModalOpen) => {
        setDeleteModalOpen(true);
        deleteAccount(context.userID, enqueueSnackbar);
    }

    // handles modal close; passed to common modal component
    const handleClose = (setDeleteModalOpen) => {
        setDeleteModalOpen(false);
    }

    useEffect(() => {
        setFields(() => settingData.fields);
    }, []);
    
    return (
        <>
            {/* Setting Modal */}
            <BasicModal 
                show={settingModalOpen}
                handleClose={() => handleSettingClose(setSettingModalOpen)}
                handleSave={() => handleSettingsSave(setSettingModalOpen, enqueueSnackbar)}
                title={settingData?.title}
                handleChange={(e, v) => handleChange(e, v)}
                saveTitle={settingData?.saveTitle}
                fields={fields}
                otherButton={settingData?.otherButton}
                otherButtonCallback={() => swapToDeleteModal(setSettingModalOpen, setDeleteModalOpen)}
            />
            
            <NavDropdown.Item onClick={() => handleSettings(setSettingModalOpen)}>
                Settings
            </NavDropdown.Item>

            {/* Confirm Delete Modal */}
            <BasicModal 
                show={deleteModalOpen}
                handleClose={() => handleClose(setDeleteModalOpen)}
                handleSave={() => handleDelete(setDeleteModalOpen)}
                title={deleteData?.title}
                // handleChange={(e, v) => handleChange(e, v)}
                saveTitle={deleteData?.saveTitle}
                otherButton={deleteData?.otherButton}
                otherButtonCallback={() => handleClose(setDeleteModalOpen)}
            />
        </>
    );
}