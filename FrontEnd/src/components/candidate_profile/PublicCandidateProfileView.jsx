// import React from 'react';
// import { useParams } from 'react-router-dom';


// function PublicCandidateProfileView(props) {

//   return (
//     <div className='candidate_profile'>
//       <div className='no_edit_candidate_profile'>
//         <label>First Name: </label>
//         <p>{this.state.first_name}</p>

//         <label>Last Name:</label>
//         <p>{this.state.last_name}</p>

//         <label>Email: </label>
//         <p>{this.state.email}</p>
        
//         <label>Position: </label>
//         <span>{this.state.candidate_current_position}</span>
//         <br/>
//         <label>Description: </label>
//         <span>{this.state.candidate_description}</span>
//         <br/>
//         <label>School: </label>
//         <span>{this.state.candidate_school}</span>
//         <br/>
//         <label>Interests: </label>
//         <br/>
//         {
//           this.state.name_of_interest_1.length > 1
//           ? <span>{this.state.name_of_interest_1} </span>
//           : null
//         }
//         {
//           this.state.name_of_interest_2.length > 1
//           ? <span>{this.state.name_of_interest_2} </span>
//           : null
//         }
//         {
//           this.state.name_of_interest_3.length > 1
//           ? <span>{this.state.name_of_interest_3}</span>
//           : null
//         }
//       </div>
//       <br/>
//       <div className='no_edit_candidate_links'>
//         <label>Links:</label>
//         {this.state.profileLinks.map((links, index) => {
//           return(
//           <div key={`link ${index+1}`}>
//             <label>{this.state[`type_of_link_${index+1}`]} - </label>
//             <span>{this.state[`link_${index+1}`]}</span>
//           </div>
//         )})}
//       </div>
//       <br/>
//       <div className='no_edit_candidate_experiences'>
//         <label>Experiences: </label>
//         {this.state.experiences.map((experience, index) => {
//             return (
//               <div key={index+1}>
//                 <span>Experience {index+1}</span>
//                 <br/>
//                 <label>Position: </label>
//                 <span>{this.state[`role_title_${index+1}`]}</span> 
//                   <br/>
//                 <label>Decription</label>
//                 <span>{this.state[`description_${index+1}`]}</span>
//                   <br/>
//                 <label>Start Date: </label>
//                 <span>{this.state[`start_date_${index+1}`]}</span>
//                   <br/>
//                 {this.renderViewEndDate(index+1)}
//               </div>
//             ) 
//           })
//         }
//       </div>
//       <br/>
//       <div className='no_edit_candidate_skills'>
//         <label>Skills: </label>
//         {this.state.skills.map((skill, index) =>{
//           return <span key={index}> {this.state.skills[`${index}`]}</span>
//         })}
//         <br/>
//       </div>
//     </div>
//   )
// }

// export default PublicCandidateProfileView;