import React, {useContext, useState, useEffect} from 'react';
import { AdminCard } from '../components'
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';

//add in api call to get editable pets (all pets or only those owned by a person...?)

export default function AdminPage() {
    const [animals, setAnimals] = useState([]);
    const context = useContext(AuthContext);
    
    useEffect(() => {
        getAnimals();
    }, []);

    function getAnimals() {
        // send -1 if no user bc postgres can't handle null for an int
        var userIdToString = context.userID === null ? -1 : context.userID;
        axios.get(`/api/getAnimalsWiFavs/${userIdToString}`)
        .then(response => {
            setAnimals(response.data);
        }).catch(err =>console.log(err));
    }

    return (
        <div>
            {/* search functionality */}

            {/* add new pet button */}
            <Link to="/admin/add-pet" className="btn btn-primary">Add New Pet</Link>
            {/* pet cards */}
            <div style={{marginTop: '30px'}}>
                {animals.map((animal) => {
                    return (
                        <AdminCard animal={animal} key={animal?.animalid}/>
                    );
                })}
            </div>
        </div>
    );
}
