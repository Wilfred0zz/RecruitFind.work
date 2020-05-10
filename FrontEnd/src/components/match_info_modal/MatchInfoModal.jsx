import React from 'react';
import MatchContextProvider from "./MatchInfoModalParts/MatchInfoStates";
import MatchInfoModal from "./MatchInfoModalParts/MatchInfoContent";


function Register(props) {
    return (
      <MatchContextProvider>
          <MatchInfoModal/>
      </MatchContextProvider>
    );
  }
  export default Register;
  