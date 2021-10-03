import React from 'react';
import {useAmazonContext} from '../Context/AmazonContext';

function HamburgerButton(props) {
    const { show ,setShow} = useAmazonContext();

   

    return (
        <>
        {
            show ? ( <div className="hamburger-btn" onClick={props.click}>
            &#9776; 
        </div>) : ""
        }
       
        </>
    );
}

export default HamburgerButton;