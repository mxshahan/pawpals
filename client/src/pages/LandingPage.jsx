// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div>   
      {/* <img src="https://pawpalsapp.s3.us-east-2.amazonaws.com/images/pet_banner.jpg.jpg" alt="banner" className="img-fluid"  /> */}
      <img src="https://pawpalsapp.s3.us-east-2.amazonaws.com/images/paw_pals_banner_mascots.jpg" alt="banner" className="img-fluid"  />

	  

        <div className="container-fluid">
	  
	        <div className="row">
		        <div className="col-md-4">
              <br></br>
			        <h4>Requirements</h4>
					<p className="text-justify">We ask that you spend at least 30 minutes with the cat or dog you want to adopt. Please plan on spending more time to fully complete the adoption process.</p>
			        <p className="text-justify">You must be at least 18 years of age to adopt a pet.
			        </p>
					<p className="text-justify">Fill out our adoption application and meet with an adoption counselor.</p>
					<p className="text-justify">You must show a picture ID with a current address. If this isn't available, we will accept a picture ID with a current utility bill.

					</p>
			<p>
      <br></br>
			</p>
		</div>



		<div className="col-md-4">
    <br></br>
			<h4>
				Adoption Fee
			</h4>
			<p className="text-justify">There are no additional fees besdies the adoption fee.</p>
			<p className="text-justify">All dogs and cats are neutered or spayed upon arrival.</p>
			<p className="text-justify">If you need advice to help your pet get used to their new home, please do not hesitate to contact us. We have several animal behaviors specialist that will be more than happy to assist.
			</p>
		</div>


		<div className="col-md-4">
    <br></br>
			<h4>
				About our animals
			</h4>
			<p className="text-justify">All of our animals spend several weeks getting used to being around other pets.</p>
			<p className="text-justify">Most dogs go through a four week training course that helps me learn basic commands such as sit, stay and come.</p>
		</div>
	</div>
</div>

    </div>

  )
}
