import React, { useContext, useState, useEffect } from "react";


const AmazonContext = React.createContext();

export function useAmazonContext() {
  return useContext(AmazonContext);
}

export function AmazonContextProvider(props) {
  //Responsible for opening and closing the sub container
  const [subContainer, setSubContainer] = useState(false);
  //Responsible for storing the subContainers entries
  const [subContainerEntries, setSubContainerEntries] = useState(null);
  //Responsible for holding all of the data that goes into the navbar
  const [entryStore, setEntryStore] = useState(null);
  
  const [show,setShow]= useState("");
  const [stat,setStat]=useState([]);

  const [firstname, set] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [role_id, setRole_id] = useState("");
  const [file_path, setFile_path] = useState("");
  
  useEffect(() => {
   if(localStorage.getItem('login')){
    
     setShow(true);
   }else{
     setShow(false);
   }
  }, []);

  const value = {
    show,
    stat,
    set,
    setLastName,
    setEmail,
    setPhone,
    setTeam_id,
    setRole_id,
    setFile_path,
    firstname,
    lastname,
    email,
    phone,
    team_id,
    role_id,
    file_path,
    setStat,
    setShow,
    subContainer,
    setSubContainer,
    subContainerEntries,
    setSubContainerEntries,
    entryStore,
    setEntryStore,
  };

  return (
    
    <AmazonContext.Provider value={value}>
      {props.children}
    </AmazonContext.Provider>
  );
}
