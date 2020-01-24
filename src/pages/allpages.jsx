import React, { Component } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectsContext from "../context/projectsContext";
import moment from "moment";
import ModalDelete from "../components/modalDelete/modalDelete";

class AllPages extends Component {
  static contextType = ProjectsContext;

  state = {
    showDeleteModal: false,
    selectedPage: null
  };
  handleModalDelete = id => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
    this.setState({ selectedPage: id });
  };
  confirmAction = () => {
    this.context.onDeletePage(this.state.selectedPage);
    this.setState({ showDeleteModal: false });
  };

  onEditPage = id => {
    this.context.onSelectPage(id);
    this.props.history.push("/project/editpage");
  };

  render() {
    const { selectedProject } = this.context;
    return (
      <div className="content">
        <div className="contentTop">
          <Row>
            <Col>
              <h2>Pages</h2>
            </Col>
            <Col xs={4} className="text-right">
              <Link to="/project/addnew" size="sm" className="btn btn-success">
                Create New Page
              </Link>
            </Col>
          </Row>
        </div>
        <div className="contentData mt-4">
          {selectedProject.pages.length > 0 && (
            <Table responsive="md" hover variant="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Date Created</th>
                  <th>Date Edited</th>
                  <th>Template Type</th>
                  <th>Author</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.pages.map(project => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>
                      {moment(project.dateCreated).format("YYYY//MM//DD")}{" "}
                    </td>
                    <td>
                      {moment(project.dateEdited).format("YYYY//MM//DD")}{" "}
                    </td>
                    <td>{project.templateType}</td>
                    <td>{project.author}</td>
                    <td>
                      <Button size={"sm"} variant="info" 
                      onClick={() => this.onEditPage(project.id)}
                      >
                        <i className="fa fa-pencil"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        size={"sm"}
                        variant="danger"
                        onClick={() => {
                          this.handleModalDelete(project.id);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <ModalDelete
          showModal={this.state.showDeleteModal}
          modalAction={this.handleModalDelete}
          onconfirm={this.confirmAction}
        />
      </div>
    );
  }
}

export default AllPages;
