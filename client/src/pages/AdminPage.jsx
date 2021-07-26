import React, {useState, useEffect} from 'react';
import { AdminCard } from '../components'
import axios from 'axios';

const dummyData = [
    {
        aname: 'Pluto',
        animalid: 1,
        type: 'Dog',
        gender: 'Male',
        availability: 'Pending', 
        image: 'https://astrologynewsservice.com/wp-content/uploads/2014/08/1240.png'
    },
    {
        aname: 'Scooby Doo',
        animalid: 2,
        type: 'Dog',
        gender: 'Male',
        availability: 'Available',  
        image: 'https://cdn11.bigcommerce.com/s-5ylnei6or5/images/stencil/1280x1280/products/1603/2662/2493_ScoobyDoo_MysteryIncorp_28__55588.1513992629.jpg?c=2'
    },
    {
        aname: 'Garfield',
        animalid: 3,
        type: 'Cat',
        gender: 'Male',
        availability: 'Available',  
        image: 'https://static.wikia.nocookie.net/garfield/images/9/9f/GarfieldCharacter.jpg/revision/latest/scale-to-width-down/642?cb=20180421131132'
    },
    {
        aname: 'Curious George',
        animalid: 4,
        type: 'Other',
        gender: 'Male',
        availability: 'Adopted',  
        image: 'https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2019/12/gold.jpg?resize=1250%2C702&ssl=1'
    },
]

//add in api call to get editable pets (all pets or only those owned by a person...?)

export default function AdminPage() {
    return (
        <div style={{marginTop: '30px'}}>
        {dummyData.map((animal) => {
            return (
                <AdminCard animal={animal}/>
            );
        })}
        </div>
    );
}
