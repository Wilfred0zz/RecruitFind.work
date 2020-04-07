import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, animateScroll as scroll } from "react-scroll";


class Toolbar extends Component {
  render() {
    return (
    <div> 
      <table className = 'toolbar'>
          <th>RecruitFind</th> 
          <th>
            <Link
                activeClass="active"
                to="main"
                spy={true}
                smooth={true}
                offset={-70}
                duration= {500}
            >Home </Link>
          </th>
          <th>
            <Link
                activeClass="active"
                to="abtUs"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
            >About Us</Link>
          </th>
          <th>Contact</th>
          <th>Sign in</th>
          <th>Log in</th>
      </table>
    </div>
    )
  }
}

export default Toolbar;
