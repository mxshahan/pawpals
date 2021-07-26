import React from "react";
import { Card } from "react-bootstrap";
import '../../styles/PetProfile.css'

export default function BasicCard({
    title = '',
    body = '',
    button = <></>,
    icon = <></>,
    image = '',
    className = {}
}) {
    return (
        <Card className={className.card}>
            {image && <div className={className.image} style={{ backgroundImage: "url(" + image + ")" }}></div>}
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                <div className='bodyContainer'>
                    {icon && icon}
                    {body && <Card.Text className='body'>{body}</Card.Text>}
                    {button && button}
                </div>
            </Card.Body>
        </Card>
    )
}