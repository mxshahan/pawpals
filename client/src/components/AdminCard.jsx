import React, { useState, useEffect } from "react";
import { BasicHorizontalList } from './Common';
import { Form, Button } from "react-bootstrap";
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';
import { findAvailability } from '../js-commons/getIntegerValues'
import "../styles/AdminCard.css"
import axios from 'axios';

const itemKeys = {
    animalid: 'ID',
    atype: 'Type',
    gender: 'Gender',
    aname: 'Name',
}

// change gender integer values to string
const cleanAnimalData = (data) => {
    data.gender = data.gender === 1 ? 'Male' : 'Female';
    return data;
}

//need to add in edit functionality
const adminButton = <Button variant="primary" className='editButton'>Edit</Button>;

export default function AdminCard({
    animal = {}
}) {
    const [currentStatus, setCurrentStatus] = useState();
    const [availabilities, setAvailabilities] = useState();
    const { enqueueSnackbar } = useSnackbar();

    // update component when "animal" data changes from parent
    useEffect(() => {
        setCurrentStatus(animal?.availability); //sets the currently selected radio button for pet

        // get possible availabilities from database
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        })
    }, [animal]);

    const classNames = {
        field: 'adminCardFields', 
        value: 'adminCardValue', 
        listItem: 'adminListItem', 
        listContainer: 'adminListContainer', 
        image: 'adminImage', 
        imageContainer: 'adminImageContainer', 
        listGroup: 'adminListGroup'
    }

    //when database updates, update the radio button selected, otherwise error
    const updateStatus = (newStatus) => {
        axios.put(`/api/updateAvailability/${findAvailability(newStatus, availabilities)}/${animal.animalid}`)
            .then(() => {
                enqueueSnackbar(Msgs.updatedAvailability, {variant: Enum.Variant.success});
                setCurrentStatus(newStatus);
            })
            .catch(() => {
                enqueueSnackbar(Msgs.errorUpdatedAvailability, {variant: Enum.Variant.error});
            });   
    };

    const animalStatus = () => {
        const cleanAvailabilities = availabilities?.map(({ id, availability }) => [id, availability]);
        return (
            <Form className='statusForm'>
                <div key={`inline-radio`} className="mb-3">
                    {cleanAvailabilities?.map((availability) => {
                        return (
                            <Form.Check
                            key={availability[1]}
                            inline
                            label={availability[1]}
                            name='radioGroup1'
                            type='radio'
                            value={availability[1]}
                            checked={currentStatus === availability[1]} //sets the selected radio button to whatever the current status is
                            id={`inline-radio-${availability[0]}`}
                            onChange={e => updateStatus(e.currentTarget.value)}
                            />
                        )
                    })}
                </div>      
            </Form>
        );
    }

    return (
        <div className='adminCardContainer' key={animal.animalid}>
            <BasicHorizontalList 
                keyid={animal?.animalid}
                image={animal?.imageurl}
                itemKeys={itemKeys}
                items={cleanAnimalData(animal)}
                radio={animalStatus(currentStatus, setCurrentStatus, availabilities)}
                button={adminButton}
                className={classNames}
            />
        </div>
    )
}