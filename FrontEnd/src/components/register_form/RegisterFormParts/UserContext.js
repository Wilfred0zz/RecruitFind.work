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
      personal_postal: '',
      personal_country: '',
      phone_number: '',
      gender:'',
      status: '', 
      confirmPassword: "",
      acceptTerms: false,
      isRegistered: false,
    },
    errors: {}
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
