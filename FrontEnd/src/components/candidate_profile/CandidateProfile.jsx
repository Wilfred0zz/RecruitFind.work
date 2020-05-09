import React, { Component } from 'react';

class CandidateProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            is_logged_in: true,

            candidate_current_position: "",
            candidate_description: "",
            candidate_highest_level_of_education: "",
            candidate_school: "",
            name_of_interest_1: "",
            name_of_interest_2: "",
            name_of_interest_3: "",
            interest_count: 1,

        }
    }

    fetchCandidateInfo = async () => {
        const response = await fetch('/api/fetchCandidateProfileInfo')

        const status = response.status;
        
        if(status >= 400){
            this.setState({
                is_logged_in: false
            })
            throw Error("There is an error in getting candidate porfile information");
        }
        else{
            const result = await response.json();
            console.log(result);
            // this.setState({

            // })
            // console.log("Candidate Profile Received");
        }
    }
  
    fetchCandidateExperiences = () => {
        
    }
  
    fetchCandidateSkills = () => {
  
    }
  
    fetchCandidateLinks = () => {
  
    }

    componentDidMount = async () => {
        try{
            await this.fetchCandidateInfo();
        } catch(error){
            console.log(error)
        }
    }

    render() {
        return(
            <div>
                Hello Candidate
            </div>
        )
    } 
}

export default CandidateProfile;
