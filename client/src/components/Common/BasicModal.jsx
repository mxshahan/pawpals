import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ItemsWithControl } from "../Common"
import "../../styles/BasicModal.css"

// the Modal generates a warning aboud the use of findDOMNode. This is a bootstrap issue. See ticket here: https://github.com/react-bootstrap/react-bootstrap/issues/5075

export default function BasicModal({
  show = false, // bool value to handle whether modal is open or closed
  handleClose = () => {}, //function that will trigger when modal is closed. 
  handleSave = () => {}, //function that trigers when modal "submit" is pressed
  title = '',
  body = '',
  closeTitle = '',
  saveTitle = '',
  otherButton = '',
  otherButtonCallback = () => {}, //function that triggers when other button is pressed
  fields = [],
  handleChange = () => {},
  isValidEmail = false,
  isValidUsername = false,
  isValidPass = false,
  tabs = <></>,
  }) {
    return (
      <Modal 
        show={show} 
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {tabs && tabs}
        {/* Conditionally renders the title on Modal if title is passed */}
        {title && <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>}
        {/* Conditionally renders the body within Modal if body is passed */}
        {body && <Modal.Body>{body}</Modal.Body> }
        {/* Render the various inputs/dropdowns needed */}
        <div className='modalFields'>
          {fields && fields.map((x) => {
            // console.log(x, x.value);
            return (
              <ItemsWithControl 
                key={x.name}
                name={x.name}
                type={x.type}
                value={x.value}
                // every time the user enters a character it updates the state value
                handleChange={e => {
                  handleChange(e.target.placeholder, e.target.value);
                }}
              />
            );
          })}
        </div>
        <Modal.Footer>
        {otherButton && <Button variant="danger" onClick={otherButtonCallback}>
            {otherButton}
          </Button>}
          {closeTitle && <Button variant="secondary" onClick={handleClose}>
            {closeTitle}
          </Button>}
          {saveTitle && <Button variant="primary" disabled={(!isValidEmail || !isValidUsername || !isValidPass) && title==='Member Signup'} onClick={handleSave}>
            {saveTitle}
          </Button>}
        </Modal.Footer>
      </Modal>
    );
  }