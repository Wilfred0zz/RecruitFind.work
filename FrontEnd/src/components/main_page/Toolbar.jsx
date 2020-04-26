import React, { Component } from 'react'
// renaming of Link import so no conflict with Link import from react-router-dom
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

// in order to connect to the store
import { connect } from 'react-redux'
import ModalRoot from './ModalRoot'

import './static/css/template.css'
import './static/css/toolbar.css'

import { showModal, hideModal } from '../../store/actions/Modals/modal_action_creators'

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }))
  }
})

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
    this.closeModal = this.closeModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openContactModal = this.openContactModal.bind(this);
    this.openSignupModal = this.openSignupModal.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  closeModal() {
    this.props.hideModal()
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //This is dealing with the inputs
  showInput() {
    const { address } = this.state
    const message = address ? `Address: ${address}` : 'No address entered'
    this.props.showModal({
      open: true,
      title: 'Prompt Modal',
      message,
      closeModal: this.closeModal
    }, 'contact')
  }

  openContactModal() {
    this.props.showModal({
      open: true,
      title: 'Contact',
      message: 'IDK what our contact info is.',
      closeModal: this.closeModal
    }, 'contact')
  }

  openSignupModal() {
    this.props.showModal({
      open: true,
      title: 'Sign Up',
      fields: [{
        label: 'hello',
        name: 'First Name',
        placeholder: 'Enter your first name',
        showLabel: true
      }, {
        name: 'Last Name',
        placeholder: 'Enter your last name',
        showLabel: true
      }, {
        name: 'Email',
        placeholder: 'Enter your email',
        showLabel: true
      }, {
        name: 'Password',
        placeholder: 'Enter your password',
        showLabel: true
      }],
      onInputChange: this.onInputChange,
      confirmAction: this.showInput
    }, 'signup')
  }

  render() {
    return (
      <div className="app">
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
          <th>            
            <button onClick={this.openContactModal}>Contact</button>
          </th>
          <th>
            <button onClick={this.openSignupModal}>Signup</button>
          </th>
          <th>Log in</th>
      </table>
        <ModalRoot hideModal={this.props.hideModal} />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Toolbar)
