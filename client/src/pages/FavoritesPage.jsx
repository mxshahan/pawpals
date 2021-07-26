import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function FavoritesPage() {
const [favs, setFavs] = useState(false);
  useEffect(() => {
    getFavs();
  }, []);
const context = useContext(AuthContext);

function getFavs() {
  console.log('userID: ',context.userID);
  console.log('favs: ',favs);
  axios.get(`/api/getFavs/${context.userID}`)
    .then(response => {
      console.log(response.data);
      setFavs(response.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      { favs.length > 0 ? 'My favorite animals:' : 'No favorites yet' }
      {favs && <GridLayout cardData={favs} />}
    </div>
  )
}