import React, { Component } from 'react';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';


class NewQueries extends Component{
    constructor(props){
        super(props);
        this.state = { query_title: "",
        query_description: "",
        query_payment: "",
        query_date: "",
        desired_skill_1: "",
        desired_skill_2: "",
        desired_skill_3: "",
        desired_skill_4: "",
        desired_skill_5: "",
        desired_skill_6: "",
        desired_skill_7: "",
        desired_skill_8: "",
        desired_skill_9: "",	
        desired_skill_10: ""
        }
      }
      onChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        },  console.log(this.state))
      }
      
      onSubmit = async(event) =>{
        event.preventDefault();
        try {
          const response = await fetch('/api/query', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(this.state)
            });
        
          const status = response.status;   
          const result = await response.json();
    
          if (status === 400 || status === 500) {
            alert(result.error);
          } else {
            console.log(result.status_info);
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    render(){
      const{query_title, query_description, query_payment, query_date, query_skill_1, query_skill_2, query_skill_3, query_skill_4, query_skill_5, query_skill_6, query_skill_7, query_skill_8, query_skill_9, query_skill_10} =this.state
      
      return(
        <div className="NewQuery">
          <NavigationBarRecruiter/>
          <div>
              <form onSubmit={this.onSubmit} >
                  <label htmlFor ="query_title"> Title</label>
                  <input type="text" onChange={this.onChange} value={query_title} name="query_title" />  
                  <label htmlFor ="query_description">Description</label>
                  <input type="text" onChange={this.onChange} value={query_description} name="query_description" />
                  <label htmlFor ="query_payment">Payment </label>
                  <input type="text" onChange={this.onChange} value={query_payment} name="query_payment" />
                  <label htmlFor ="query_date">Date </label>
                  <input type="text" onChange={this.onChange} value={query_date} name="query_date" />
                  <label htmlFor ="query_skill_1"> Skill</label>
                  <input type="text" onChange={this.onChange} value={query_skill_1} name="query_skill_1" />
                  <label htmlFor ="query_skill_2"> Skill</label>
                  <input type="text" onChange={this.onChange} value={query_skill_2} name="query_skill_2" />
                  <label htmlFor ="query_skill_3">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_3} name="query_skill_3" />
                  <label htmlFor ="query_skill_4">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_4} name="query_skill_4" />
                  <label htmlFor ="query_skill_5">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_5} name="query_skill_5" />
                  <label htmlFor ="query_skill_6">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_6} name="query_skill_6" />
                  <label htmlFor ="query_skill_7">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_7} name="query_skill_7" />
                  <label htmlFor ="query_skill_8">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_8} name="query_skill_8" />
                  <label htmlFor ="query_skill_9">Skill </label>
                  <input type="text" onChange={this.onChange} value={query_skill_9} name="query_skill_9" />
                  <label htmlFor ="query_skill_10">Skill</label>
                  <input type="text" onChange={this.onChange} value={query_skill_10} name="query_skill_10" />
                  <button>Submit</button>
              </form>
            </div>
        </div>
      )
   }
}

export default NewQueries;