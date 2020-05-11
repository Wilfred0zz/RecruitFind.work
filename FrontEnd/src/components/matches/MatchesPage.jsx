import React from 'react';

const MatchesPage = (props) => {
  const { matches } = props;
  const values = Object.values(matches);
  // this should now have an array of arrays
  // format for matches data stored in "values" i think is, please double check:
  /**
   * ASK BACKEND PERSON WHY EAACH MATCH IS A ARRAY OF ONE BIG OBJECT, I THINK THE DATA CAN BE DIFFERENT AND JUST BE AN OBJECT
   *[ 
      [ 
        {  <--- NOTICE ITS AN ARRAY STORING ONE BIG OBJECT ------------
        "match_id": 31,                                                | 
        "match_status": "ACCEPTED",
        "query_info": [ "Developer", "coder", "80K", "5/11/2020" ],    |
        "recruiter_info": [ "mikey@gmail.com", "Mikey", "Hoe"],
        "skills": ["c++", "python", "c++"]                             | 
        } 
      ], < -------------------------------------------------------------

      [ 
        {
          "match_id": 30,
          "match_status": "ACCEPTED",
          "query_info": [ "Developer", "coder", "80K", "5/11/2020" ],
          "recruiter_info": [ "mikey@gmail.com", "Mikey", "Hoe" ],
          "skills": [ "c++", "python", "c++" ] 
        } 
      ],
    ]
   */
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
