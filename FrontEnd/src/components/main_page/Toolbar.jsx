import React, { Component } from 'react';
// renaming of Link import so no confluct with link import from react-router-dom
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

class Toolbar extends Component {
  render() {
    return (
    <div> 
      <table className = 'toolbar'>
          <th>RecruitFind</th> 
          <th>
            <ScrollLink
                activeClass="active"
                to="main"
                spy={true}
                smooth={true}
                offset={-70}
                duration= {500}
                >Home </ScrollLink>
          </th>
          <th>
            <ScrollLink
                activeClass="active"
                to="abtUs"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
            >About Us</ScrollLink>
          </th>
          <th>Contact</th>
          <th>Sign in</th>
          <th>Log in</th>
          <th><Link to = "/newpaths" >Path</Link></th>
      </table>
    </div>
    )
  }
}

export default Toolbar;
