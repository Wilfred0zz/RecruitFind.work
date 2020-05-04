import React, { createContext, useState } from "react";
export const UserContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
    user: {
      //mandatory information
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      personal_street_address: '',
      personal_city: '',
      personal_state: '',
      personal_postal: 0,
      personal_country: '',
      phone_number: '',
      gender:'',
      status: "candidate", 
      confirmPassword: "",
    },
     
    company:{
      //Company information
      company_name: '',
      recruiter_position: '',
      company_street_address: '',
      company_state: '',
      company_city: '',
      company_postal: 0,
      company_country: '',

      acceptTerms: false,
    },
    errors: {}
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
