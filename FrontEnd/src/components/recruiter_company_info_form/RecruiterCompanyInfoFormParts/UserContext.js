import React, { createContext, useState } from "react";
export const UserContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
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
