import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';

export default function FavoritesPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [favs, setFavs] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    getFavs();
  }, []);

  function getFavs() {
    axios.get(`/api/getFavs/${context.userID}`)
      .then(response => {
        // console.log(response.data);
        setFavs(response.data);
      })
      .catch(() => enqueueSnackbar(Msgs.error500, {variant: Enum.Variant.error}));
  }

  return (
    <div>
      { favs.length > 0 ? 'My favorite animals:' : 'No favorites yet' }
      {favs && <GridLayout cardData={favs} />}
    </div>
  )
}