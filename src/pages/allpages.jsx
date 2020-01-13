import React, { Component } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Link} from "react-router-dom";
import ProjectsContext  from '../context/projectsContext';

class AllPages extends Component {
  static contextType = ProjectsContext;

  state = {};
  render() {

    const { pages} = this.context;
    return (
      <div className="content">
        <div className="contentTop">
          <Row>
            <Col>
              <h2>Pages</h2>
            </Col>
            <Col xs={4} className="text-right">
             <Link  to="/project/addnew"  size="sm" variant="success">
                Create New Page
              </Link>
            </Col>
          </Row>
        </div>
        <div className="contentData">
       {pages.length > 0 &&   <Table responsive="md" hover variant="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Date Created</th>
                    <th>Date Edited</th>
                    <th>Authour</th>
                  </tr>
                </thead>
                <tbody>
                <tr >
                      <td>sdf</td>
                      <td>sdf</td>
                      <td>sdf</td>
                      <td>sdfdsf</td>
                      <td>sdfd</td>
                    </tr>
                  {pages.map(project => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td>{project.dateCreated}</td>
                      <td>{project.dateEdited}</td>
                      <td>{project.authour}</td>
                    </tr>
                  ))}
                </tbody>
                  </Table> }
        </div>
      </div>
    );
  }
}

export default AllPages;