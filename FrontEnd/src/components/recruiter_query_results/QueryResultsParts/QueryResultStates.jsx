import React, { createContext, useState } from "react";
export const MatchContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
    job_title: 'test title',
    job_description: 'test description',
    fetch_cand_prof: false,
    recruiter_contac: "",
    candidate_contact: '',
  });
  return (
    <MatchContext.Provider value={[state, setState]}>
      {props.children}
    </MatchContext.Provider>
  );
};
