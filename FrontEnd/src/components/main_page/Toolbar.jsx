import React, { Component } from 'react';
import {Scroll} from "react-scroll";
import {Route, Switch, Link} from "react-router-dom";

const ScrollLink = Scroll.ScrollLink
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
