import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import "../../styles/BasicHorizontalList.css"

export default function BasicHorizontalList({
    key = null,
    image = '',
    itemKeys = {},
    items = {},
    className = {},
    radio = <></>,
    button = <></>
}) {
    return (
        <div className={className.listContainer}>
            {image && <div className={className.imageContainer}><Image src={image} rounded className={className.image} /></div>}
            <ListGroup horizontal key={key} className={className.listGroup}>
                {Object.keys(itemKeys).map((key) => {
                    return (
                        <ListGroup.Item className={className.listItem}>
                            <div className={className.field}>{itemKeys[key]}</div>
                            <div className={className.value}>{items[key]}</div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            {radio}
            {button}
        </div>
    )
}