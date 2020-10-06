import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class CustomModal extends React.Component {
    state = {
        modal: true
    }
    
    toggle = () => {
        // this.setState({
        //     modal:!this.state.modal
        // })
        this.props.close()
    }
  render() {
      const {className,title, children,background} = this.props
    return (
      <Modal className={background} isOpen={this.props.show} toggle={this.toggle} >
        <ModalHeader  className={className}>{title}</ModalHeader>
        <ModalBody >
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>OK</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default CustomModal