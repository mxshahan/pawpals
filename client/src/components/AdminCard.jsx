import React, { useState, useEffect } from "react";
import { BasicHorizontalList } from './Common';
import { Form, Button } from "react-bootstrap";
import "../styles/AdminCard.css"

const itemKeys = {
    animalid: 'ID',
    type: 'Type',
    gender: 'Gender',
    availability: 'Availability',
    aname: 'Name',
}

//currently hardcoded...could get from database query
const availabilities = ['Available', 'Pending', 'Adopted'];

//need to add in edit functionality
const adminButton = <Button variant="primary" className='editButton'>Edit</Button>;

//when database updates, need radio AND displayed availability status to update
const updateStatus = (newStatus, setCurrentStatus) => {
    //add database update here
    //if successful, then...
    setCurrentStatus(newStatus);
};

const animalStatus = (currentStatus, setCurrentStatus) => {
    return (
        <Form className='statusForm'>
            <div key={`inline-radio`} className="mb-3">
                {availabilities.map((availability, index) => {
                    return (
                        <Form.Check
                        inline
                        label={availability}
                        name='radioGroup1'
                        type='radio'
                        value={availability}
                        checked={currentStatus === availability} //sets the selected radio button to whatever the current status is
                        id={`inline-radio-${index}`}
                        onChange={e => updateStatus(e.currentTarget.value, setCurrentStatus)}
                        />
                    )
                })}
            </div>      
        </Form>
    );
}

export default function AdminCard({
    animal = {}
}) {
    const [userID, setUserID] = useState(1);
    const [currentStatus, setCurrentStatus] = useState();

    // update component when "animal" data changes from parent
    useEffect(() => {
        setCurrentStatus(animal?.availability); //sets the currently selected radio button for pet
    }, [animal]);

    const classNames = {
        card: 'adminCard',
        image: 'adminImage',
    }

    return (
        <div className='adminCardContainer'>
            <BasicHorizontalList 
                key={animal?.animalid}
                image={animal?.image}
                itemKeys={itemKeys}
                items={animal}
                radio={animalStatus(currentStatus, setCurrentStatus)}
                button={adminButton}
                className={{field: 'adminCardFields', value: 'adminCardValue', 
                    listItem: 'adminListItem', listContainer: 'adminListContainer', image: 'adminImage', imageContainer: 'adminImageContainer', listGroup: 'adminListGroup'}}
            />
        </div>
    )
}