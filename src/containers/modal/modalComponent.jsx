import React, { Component } from "react";
import "./modalComponent.scss";
import { Button, Form, Modal } from "react-bootstrap";
class ModalComponent extends Component {
  render() {
    return (
      <Modal
        size={"md"}
        show={this.props.showModal}
        onHide={() => {
          this.props.onModalChange();
        }}
      >
        <Modal.Header closeButton>{this.props.titel}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titel</Form.Label>
              <Form.Control type="text" value={this.props.titel} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <label className="dropImg">
                <input type="file" />
                <span>Drag & Drop Image Here</span>
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Video</Form.Label>
              <label className="dropImg">
                <input type="file" />
                <span>Drag & Drop Video Here</span>
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control value={this.props.text} as="textarea" rows="4" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.showModal} variant="danger">
            Calcel
          </Button>
          <Button variant="success">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComponent;
