import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    const [availabilities, setAvailabilities] = useState(1);
    const [breeds, setBreeds] = useState(1);
    const context = useContext(AuthContext);

    useEffect(() => {
        getAnimals();
        getDropdownInfo();
    }, []);


// front end
// btn click or enter the page
// api call to /api/getanimals


// back end
// routes to look for that api 
// controller with direction for the db
// db and get data

    function getAnimals() {
        // send -1 if no user bc postgres can't handle null for an int
        var userIdToString = context.userID === null ? -1 : context.userID;
        axios.get(`/api/getAnimalsWiFavs/${userIdToString}`)
        .then(response => {
            setAnimals(response.data);
            // console.log(response.data)
        }).catch(err =>console.log(err));
    }

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            // console.log(response.data);
            setAvailabilities(response.data);
        })
        axios.get(`/api/getBreeds`)
        .then(response => {
            // console.log(response.data);
            setBreeds(response.data);
        })
    }

    return (
        <div>
            {/* breeds dropdown  */}
            { animals.length === 0 ? <p>All our animals currently have homes!</p> : <p></p>}
            <GridLayout cardData={animals} />
        </div>
    )
}