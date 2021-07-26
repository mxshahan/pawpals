import axios from 'axios';

// sets the icon based on heartFull value
export function isFavorited(heartFull, setHeartFull, animalid, userId) {
    return (
        heartFull ? 
             <i onClick={(event) => {heartClick(event, heartFull, setHeartFull, animalid, userId)}} className="bi bi-heart-fill"></i> : 
             <i onClick={(event) => {heartClick(event, heartFull, setHeartFull, animalid, userId)}} className="bi bi-heart"></i>)
}

function heartClick(event, heartFull, setHeartFull, animalid, userId) {
    event.preventDefault(); // stops the heart click from taking us to the detail card on the browse page
    // call method first bc setting state takes time
    heartFull ? unfavorite(animalid, userId) : favorite(animalid, userId);
    setHeartFull(!heartFull);
}

function favorite(animalId, userId) {
    axios.post(`/api/addFav/${animalId}/${userId}`)
    .then()
    .catch(err => console.log(err));
}

function unfavorite(animalId, userId) {
    axios.delete(`/api/deleteFav/${animalId}/${userId}`)
    .then()
    .catch(err => console.log(err));
}