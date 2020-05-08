import React, { Component } from 'react';


class NewQueries extends Component{
    constructor(props){
        super(props);
        this.state = { 
    
        }
      }
      handleChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        }, ()=> console.log(this.state))
      } 
    render(){
        return(
            <div className="NewQuery">
                <form>
                    
                </form>
                
            </div>
        )
    }
}