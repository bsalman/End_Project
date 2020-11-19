import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ConfirmModal extends React.Component {
    
    
    toggle = () => {
        
        this.props.close()
    }

    confirm = () => {
      this.props.onConfirm(this.props.payload)
    }


  render() {
    // console.log(this.props);
      const {className,title, children} = this.props
    return (
      <Modal isOpen={this.props.show} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle} className={className}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={this.confirm}>yes</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ConfirmModal