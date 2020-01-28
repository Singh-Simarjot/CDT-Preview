import React, { Component } from "react";
import "./widgets.scss";
// import $ from "jquery";
// import ko from "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js";
import { Button, Form, Modal } from "react-bootstrap";

class MultipleImage extends Component {
  state = {};
  componentDidMount() {
    // $(function() {
    //   var viewModel = {};
    //   viewModel.fileData = ko.observable({
    //     dataURL: ko.observable()
    //     // base64String: ko.observable(),
    //   });
    //   viewModel.multiFileData = ko.observable({
    //     dataURLArray: ko.observableArray()
    //   });
    //   viewModel.onClear = function(fileData) {
    //     if (confirm("Are you sure?")) {
    //       fileData.clear && fileData.clear();
    //     }
    //   };
    //   viewModel.debug = function() {
    //     window.viewModel = viewModel;
    //     console.log(ko.toJSON(viewModel));
    //     debugger;
    //   };
    //   ko.applyBindings(viewModel);
    // });
  }
  render() {
    const {
      onSaveComponent,
      onModalChange,
      title,
      description,
      oncomponentInput
    } = this.props;
    return (
      <>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="title"
              onChange={e => oncomponentInput(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={e => oncomponentInput(e)}
              as="textarea"
              rows="2"
              name="description"
            />
          </Form.Group>
          <div className="widgetsDiv">
            {/* <label className="dropImg">
          <span>Drag Files or Click to Browse</span>
          <input
            className="dzu-input"
            type="file"
            accept="image/*"
            multiple="multiple"
          />
        </label> */}
            {/* <input type="file" multiple /> */}
            {/* <div className="container">
          <div className="well" data-bind="fileDrag: fileData">
            <div className="form-group row">
              <div className="col-md-6">
                <img
                  style="height: 125px;"
                  className="img-rounded  thumb"
                  data-bind="attr: { src: fileData().dataURL }, visible: fileData().dataURL"
                />
                <div data-bind="ifnot: fileData().dataURL">
                  <label className="drag-label">Drag file here</label>
                </div>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  data-bind="fileInput: fileData, customFileInput: {
              buttonClass: 'btn btn-success',
              fileNameClass: 'disabled form-control',
              onClear: onClear,
            }"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <h3>Multiple File Uploads</h3>
          <div className="well" data-bind="fileDrag: multiFileData">
            <div className="form-group row">
              <div className="col-md-6">
                <img
                  style="height: 100px; margin: 5px;"
                  className="img-rounded  thumb"
                  data-bind="attr: { src: dataURL }, visible: dataURL"
                />
                <div data-bind="ifnot: fileData().dataURL">
                  <label className="drag-label">Drag files here</label>
                </div>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  multiple
                  data-bind="fileInput: multiFileData, customFileInput: {
              buttonClass: 'btn btn-success',
              fileNameClass: 'disabled form-control',
              onClear: onClear,
            }"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-default" data-bind="click: debug">
            Debug
          </button>
        </div> */}
          </div>
          <Form.Group>
            <Form.Check
              id="addInternalNavigation"
              label={"Add Internal Navigation"}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onModalChange} variant="danger">
            Cancel
          </Button>
          <Button onClick={onSaveComponent} variant="success">
            Save
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default MultipleImage;
