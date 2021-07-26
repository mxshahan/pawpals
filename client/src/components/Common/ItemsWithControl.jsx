import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

// creates various form items (input, dropdown, etc)
export default function ItemsWithControl({
    type,
    name = '',
    label = '',
    handleChange,
    value = ''
  }) {
        switch (type) {
            case 'input': 
                return (
                <>  
                    {label && <label>{label}</label>}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={name}
                            onChange={handleChange}
                            aria-label={name}
                            value={value}
                        />
                    </InputGroup>
                </>
                );
            default: 
                // do nothing
        }
  }