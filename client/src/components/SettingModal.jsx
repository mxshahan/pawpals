import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';
import { BasicModal } from "../components/Common";
import { NavDropdown } from "react-bootstrap";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as Enum from './Common/Enum';
import * as Msgs from './Common/Messages';
import * as Utils from './Utils';

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

// handles deleting account (tested and works 7/19)
// to-do: logout, redirect to home, close message tab
const deleteAccount = (context, enqueueSnackbar) => {
    axios.delete(`/api/deleteUser/${context.userID}`)
    .then(() => {
        enqueueSnackbar(Msgs.accountDeleted, {variant: Enum.Variant.success});
    })    
    .catch(() => enqueueSnackbar(Msgs.error500, {variant: Enum.Variant.error}));
}

const swapToDeleteModal = (setSettingModalOpen, setDeleteModalOpen) => {
    setSettingModalOpen(false);
    setDeleteModalOpen(true);
}

export default function SettingModal() {
    const context = useContext(AuthContext);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [fields, setFields] = useState([]);
    const [settingModalOpen, setSettingModalOpen] = useState(false);

    // to-do: get user data (saved in sessions??) and pre-populate input
    // get new input; see LoginSignUp
    function handleChange(inputName, valueIn) {
        setFields(prev => prev.map(s => {
            // console.log(prev);
            if(s.name === inputName) {
                return {...s, value:valueIn}
            }
            else return s;
        }))
    }

    // handles the settings button click
    const handleDelete = async (setDeleteModalOpen) => {
        setDeleteModalOpen(true);
        await axios.get('/auth/logout');
        deleteAccount(context, enqueueSnackbar);
        context.setIsLoggedIn(false);
        context.setDataSet(false);        
    }

    // handles modal close; passed to common modal component
    const handleClose = (setDeleteModalOpen) => {
        setDeleteModalOpen(false);
    }

    // handles when new username/pw/email is saved
    const handleSettingsSave = (setSettingModalOpen, enqueueSnackbar, fields) => {
        setSettingModalOpen(false);
        let pass = fields[0].value;
        let email = fields[1].value;
        console.log(pass, email)

        // email
        if(!Utils.isNullOrEmpty(email)) {
            if(!Utils.validateEmail(email)) {
                enqueueSnackbar(Msgs.invalidEmail, {variant: Enum.Variant.error});
            }
            else {
                axios.put(`/api/updateUserEmail/${email}/${context.userID}`)
                .then(() => {
                    enqueueSnackbar(Msgs.updatedEmail, {variant: Enum.Variant.success});
                })
                .catch(() => {
                    enqueueSnackbar(Msgs.errorUpdateEmail, {variant: Enum.Variant.error});
                });                
            }
        }

        // password
        if(!Utils.isNullOrEmpty(pass)) {
            axios.put(`/api/updateUserPass/${pass}/${context.userID}`)
            .then(() => {
                enqueueSnackbar(Msgs.updatedPass, {variant: Enum.Variant.success});
            })
            .catch(err => {
                enqueueSnackbar(Msgs.errorUpdatePass, {variant: Enum.Variant.error});
            });                
        }
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
                handleSave={() => handleSettingsSave(setSettingModalOpen, enqueueSnackbar, fields)}
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
                saveTitle={deleteData?.saveTitle}
                otherButton={deleteData?.otherButton}
                otherButtonCallback={() => handleClose(setDeleteModalOpen)}
            />
        </>
    );
}