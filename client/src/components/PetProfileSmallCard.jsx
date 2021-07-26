import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { BasicCard } from './Common';
import { isFavorited } from '../js-commons/petFavoriting';

export default function PetProfileSmallCard({
    animal = {}
}) {
    const [heartFull, setHeartFull] = useState(false);
    const context = useContext(AuthContext);

    useEffect(() => {
        // if the animal is favorited, make our heart icon a full icon
        if (animal?.favuserid != null){
            setHeartFull(true);
        }
    }, [animal]);

    const classNames = {
        card: 'petProfileCard',
        image: 'petProfileImage',
    }

    return (
        <BasicCard 
            key={animal?.animalid}
            title={animal?.aname} 
            body={animal?.availability} 
            icon={  context.isLoggedIn ?    // if no user is logged in, don't show an icon
                    isFavorited(heartFull, setHeartFull, animal.animalid, context.userID)
                    : null } 
            image={animal?.imageurl}
            className={classNames}
        />
    )
}