import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import { default as modalTypes } from '../main_page'

const MODAL_TYPES = {
  'contact': modalTypes.contactModal,
  'signup': modalTypes.signupModal
}

const mapStateToProps = state => ({
  ...state.modal
})

class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: props.modalProps.open
    }
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidUpdate(nextProps) {
    if (nextProps.modalProps.open !== this.props.modalProps.open) {
      this.setState({
        modalIsOpen: !nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.props.hideModal()
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    const SpecifiedModal = MODAL_TYPES[this.props.modalType]
    return (
      <div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          overlayClassName="modal fade show"
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-dialog-centered"
        >
          <SpecifiedModal
            closeModal={this.closeModal}
            {...this.props.modalProps}
          />
        </ReactModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(ModalContainer)
