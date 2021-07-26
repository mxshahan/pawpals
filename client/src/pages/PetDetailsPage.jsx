import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { BasicCardListGroup, BasicCard } from '../components/Common';
import { useParams } from 'react-router-dom';
import { isFavorited } from '../js-commons/petFavoriting'
import '../styles/PetDetailsPage.css'

const dummyPetDetails = {
    animalid: 1,
    name: 'Scooby Doo',
    breed: 'Mix',
    type: 'dog',
    disposition: ['Good with other animals', 'Testing two items'],
    availability: 'pending',
    description: 'Scooby wants a Scooby Snack!',
    imageurl: 'https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2019/12/gold.jpg?resize=1250%2C702&ssl=1',
    favuserid: 3
}

const petDetailKeys = ['name', 'breed', 'type', 'disposition', 'availability'];

// only include the details in petDetailKeys variable for the small detail card
const prepSmallDetailCard = (petDetails) => {
    let details = {};
    Object.keys(petDetails).map((key) => {
        if (petDetailKeys.includes(key)) {
            return details[key] = petDetails[key];
        }
    })
    return details;
}

export default function PetDetailsPage() {
    let { id } = useParams(); // get animal id from url param
    const [petDetails, setPetDetails] = useState(dummyPetDetails);
    const [heartFull, setHeartFull] = useState(false);
    const context = useContext(AuthContext);

    // add axios get pet details request here; remove example dummy details

    return (
        <div className='petDetailPageContainer'>
            {/* large card with pet image and description */}
            <BasicCard
                key={petDetails?.animalid}
                title={petDetails?.aname}
                body={petDetails?.description}
                // icon={isFavorited(heartFull, setHeartFull, petDetails.animalid, context.userID)} 
                icon={context.isLoggedIn ?    // if no user is logged in, don't show an icon
                    isFavorited(heartFull, setHeartFull, petDetails.animalid, context.userID)
                    : null}
                image={petDetails?.imageurl}
                className={{ card: 'petDetailCardLarge', image: 'petDetailsImage' }}
            />

            {/* pet details small card */}
            <BasicCardListGroup
                header='Pet Details'
                variant='flush'
                className={{ item: 'petDetailItem', card: 'petDetailCard', value: 'petDetailCardValue', header: 'petDetailCardHeader' }}
                listItems={prepSmallDetailCard(petDetails)}
            />
        </div>
    )
}

