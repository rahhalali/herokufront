import React, { useEffect ,useState} from 'react'
import { Fragment } from 'react';
import './Popup.css';
function Popup({trigger , value ,setTrigger}) {
   
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {
                        <Fragment key={value.id}>
                             <h2 style={{textAlign:"center"}}>User Profile Card</h2>
                             <div className="card">
                              <img src={"http://localhost:8000/"+value.file_path} alt="" style={{width:"100%"}} />
                              <h1 style={{margin:"7% 0%"}}>{value.firstname}<span>  {value.lastname}</span></h1>
                              <p style={{margin:"7% 0%"}}>{value.email}</p>
                              <p className="title" style={{margin:"7% 0%"}}>{value.phone_number}</p>
                              <p style={{margin:"7% 0%"}}> <span style={{fontWeight:"bold",fontSize:"20px"}}>Employeed-at :</span> {value.created_at.substr(0,10)}</p>
                             </div>
                        </Fragment>
                    
                        }
   
    
                <button onClick={()=>setTrigger(false)} className="close-btn">close</button>
            </div>
        </div>
    ):"";
}

export default Popup;
