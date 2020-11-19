import React from 'react'
import {ListGroup, ListGroupItem, Button, Label, Input, Form, Col, Row} from 'reactstrap';
import {sendEmailPost} from '../services/api'



class ContactPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            message: '',
            disabled: false,
            emailSent: null
        }
    }

    handleSubmit = (e) => {
      e.preventDefault()

      //when the user send we change the disable to true so the user will not send the same email more than one
      this.setState({
        disabled: true
      })

      sendEmailPost(this.state.name, this.state.email, this.state.message).then(data => {
        if(data.success) {
          this.setState({
              disabled: false,
              emailSent: true
          });
        } else {
          this.setState({
              disabled: false,
              emailSent: false
          });
        }
      }).catch(err => {
        console.log(err);
        
        this.setState({
            disabled: false,
            emailSent: false
        });
    })
    }


    render() {
        return (
            <React.Fragment>
    
                  {/* <!-- Main content START --> className={this.props.loggedin === 'false' ? '' : 'd-none'}*/}
                  <div>
                    <div className="container-fluid">
                      <div className="row card">
                        <div className="col-12 col-sm-10 offset-sm-1">

                          {/* <!-- title START--> */}
                          <ListGroup role="tablist">
                            <div className="pl-0">
                              <Row className="justify-content-center py-5">
                                <Col xl={12} md={8} sm={12}>
                                  <h1 className="display-1 font-weight-bolder">Contact us</h1> 
                                </Col>
                              </Row>
                            </div>
                          </ListGroup>
                          {/* <!-- title END --> */}


                          {/* <!-- --> */}
                          <div className="info-holder info-ct">
                            <div data-toggle="popover-all"
                              data-content="Customized tabbed interface"
                              data-original-title="Tabs"
                              data-placement="top"
                              data-offset="0,48">
                            </div>
                          </div>
                          {/* <!-- title END --> */}


                          {/* <!-- content START --> */}
                            <div className="tab-content px-4 px-sm-0 py-sm-4 mt-4">
    
                            
                            <Form onSubmit={this.handleSubmit}>

                                {/* <!-- username pane START --> */}
                                <div className="form-group row">
                                  <Label htmlFor="full-name" className="ml-1">Full Name</Label>
                                  <Input id="full-name" name="name" type="text" value={this.state.name} onChange={(e) => {
                                   this.setState({name: e.target.value})
                                   }} />
                                </div>
                                {/* <!-- username pane END --> */}


                                {/* <!-- email pane START --> */}
                                <div className="form-group row">
                                  <Label htmlFor="email" className="ml-1">Email</Label>
                                  <Input id="email" name="email" type="email" value={this.state.email} onChange={(e) => {
                                   this.setState({email: e.target.value})
                                   }} />
                                </div>
                                {/* <!-- email pane END --> */}


                                {/* <!-- message pane START --> */}
                                <div className="form-group row">
                                  <Label htmlFor="message" className="ml-1">Message</Label>
                                  <textarea id="message" className="form-control" name="message" as="textarea"rows="3" value={this.state.message} onChange={(e) => {
                                   this.setState({message: e.target.value})
                                   }}></textarea>
                                </div>
                                {/* <!-- message pane END --> */}


                                {/* <!-- button send pane START --> */}
                                <Button className="d-inline-block" variant="primary" type="submit" disabled={this.state.disabled} style={{marginLeft : "-13px"}}>
                                  Send
                                </Button>



                                {/* show a message after sending the message */}
                                {this.state.emailSent === true && <p className="d-inline success-msg">Email Sent</p>}
                                {this.state.emailSent === false && <p className="d-inline err-msg">Email Not Sent</p>}

                                                                

                              </Form>
                            {/* <!-- button send pane END --> */}
                            <br />

{/* <!-- button go back START --> */}
<a href="/">
  <Button
    type="button "
    className="btn btn-primary"
    data-toggle="tooltip"
    data-placement="right"
    title="go Back"
    style={{marginLeft : "-13px"}}>
      <i className="fas fa-arrow-circle-left"></i>
  </Button>
</a>
{/* <!-- button go back END --> */}
                            </div>
                            {/* <!-- content END --> */}



                        </div>


                      </div>
                    </div>

                  </div>
                  {/* <!-- Main content END --> */}
            
            </React.Fragment>
        )
    }
    


}
export default ContactPage
