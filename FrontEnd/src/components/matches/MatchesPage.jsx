import React from 'react';

const MatchesPage = (props) => {
  const { matches } = props;
  // this should now have an array of arrays
  // format for matches data is:
  const values = Object.values(matches);
  return (
    <div className='Matches'>
      {
        this.values.map((match, index) => {
          
        })
      }
    </div>
  )
}

export default Matches;
