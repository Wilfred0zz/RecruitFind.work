import React from 'react';
import QueryResultsProvider from './QueryResultsParts/QueryResultStates'
import QueryResultsModal from './QueryResultsParts/QueryResultsContent';


function RecruiterQueryResults(props) {
    return (
      <QueryResultsProvider>
          <QueryResultsModal/>
      </QueryResultsProvider>
    );
  }
  export default RecruiterQueryResults;
  