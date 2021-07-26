import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "../styles/Tab.css"

const onTabChange = (k, setKey, setModalType) => {
    setKey(k);
    setModalType(k); //updates parent props to repopulate modal with new tab's data
}

export default function LoginTabs(
    props,
    ) {
    const [key, setKey] = useState('login');
    
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => onTabChange(k, setKey, props.setModalType)} //update the selected tab when new tab is selected
            style={{flexDirection:'row'}}
        >
            <Tab eventKey="login" title="Login" tabClassName={props.tabClass}>
            </Tab>
            <Tab eventKey="signup" title="Sign Up" tabClassName={props.tabClass}>
            </Tab>
        </Tabs>
    );
}