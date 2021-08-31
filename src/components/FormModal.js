import React, { Component } from "react";
import { Modal,Button,Form } from "react-bootstrap";

export class FormModal extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.handleUpdat}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>title</Form.Label>
                <Form.Control type="text" name='title' Value={this.props.infoModal.title} />

                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='image_url' Value={this.props.infoModal.image_url} />

                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='description' Value={this.props.infoModal.description} />

                
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='toUSD' Value={this.props.infoModal.toUSD} />
                <Button variant="primary" type="submit">submit</Button>
              </Form.Group>
              

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FormModal;
