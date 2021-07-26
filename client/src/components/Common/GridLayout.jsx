import React from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { PetProfileSmallCard } from "../../components"
import "../../styles/PetProfileLink.css"

export default function GridLayout({
    cardData = []
}) {
    return (
        <Container>
            <Row xs={2} md={4} lg={6}>
                {cardData.map((x) => {
                    return (
                        <Link key={x.animalid} to={`/pet-profile/${x.animalid}`} className={"link"}>
                            <PetProfileSmallCard key={x.animalid} animal={x} />
                        </Link>
                    );
                })}
            </Row>
        </Container>
    );
}