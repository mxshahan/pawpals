import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../components/AuthContext';
import { BasicCardListGroup, BasicCard } from '../components/Common';
import { useParams } from 'react-router-dom';
import { isFavorited } from '../js-commons/petFavoriting'
import '../styles/PetDetailsPage.css'
import axios from 'axios';
import * as Utils from '../components/Utils';

// only include the details in petDetailKeys variable for the small detail card
const petDetailKeys = ['aname', 'breed', 'atype', 'disposition', 'availability'];
const prepSmallDetailCard = (petDetails) => {
    let details = {};
    Object.keys(petDetails).map((key) => {
        if (petDetailKeys.includes(key)){
            if(key === 'aname') {
                return details['name'] = petDetails[key];    
            }
            else if(key === 'atype') {
                return details['type'] = petDetails[key];    
            }
            else if(key === 'disposition') {
                if(Utils.isNullOrEmpty(petDetails[key])) 
                    return null;
                else 
                    return details['type'] = petDetails[key];
            }
            return details[key] = petDetails[key];
        }
        return null;
    })
    return details;
}

export default function PetDetailsPage() {
    let { id } = useParams(); // get animal id from url param
    const [petDetails, setPetDetails] = useState({});
    const [heartFull, setHeartFull] = useState(false);
    const context = useContext(AuthContext);

    useEffect(() => {
        var userIdToString = context.userID === null ? -1 : context.userID;
        // console.log(userIdToString, id);
        function getPet() {
            axios.get(`/api/getAnimal/${userIdToString}/${id}`)
            .then(res => {
                setPetDetails(res.data[0]);
                if(res.data[0].favuserid != null) 
                    setHeartFull(true);
            })
            .catch(err => console.log(err));
        }
        getPet();
    }, []);

    return (
        <div className='petDetailPageContainer'>
            {/* large card with pet image and description */}
            <BasicCard 
                key={petDetails?.animalid}
                title={petDetails?.name} 
                body={petDetails?.description} 
                icon={  context.isLoggedIn ?    // if no user is logged in, don't show an icon
                        isFavorited(heartFull, setHeartFull, petDetails.animalid, context.userID)
                        : null }
                image={petDetails?.imageurl}
                className={{card: 'petDetailCardLarge', image: 'petDetailsImage'}}
            />

            {/* pet details small card */}
            <BasicCardListGroup 
                header = 'Pet Details'
                variant = 'flush'
                className = {{item: 'petDetailItem', card: 'petDetailCard', value: 'petDetailCardValue', header: 'petDetailCardHeader'}}
                listItems = {prepSmallDetailCard(petDetails)}
            />
        </div>
    )
}

    