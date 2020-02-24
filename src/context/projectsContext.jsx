import React, { Component } from "react";
import { toast } from "react-toastify";

import {
  getProjects,
  getProjectDetail,
  getPageDetail,
  createProject,
  deleteProject,
  updateProject,
  createPage,
  deletePage,
  createNav,
  updateNav
} from "../services/projects";

const Context = React.createContext();

export class ProjectsContext extends Component {
  state = {
    selectedProjectID: null,
    selectedPageID: null,
    allProjects: [],
    selectedProject: null,
    selectedPage: null,
    subPage: {
      id: "",
      title: "",
      dateCreated: "",
      dateEdited: "",
      author: "",
      widgets: [],
      isloading: false
    }
  };

  getAllProjects = async () => {
    try {
      await getProjects().then(response => {
        if (response.status === 200) {
          const allProjects = response.data;
          this.setState({ allProjects: allProjects, isloading: true });
        }
      });
    } catch (err) {}
  };

  onSelectProject = async id => {
    this.setState({ selectedProjectID: id });
  };
  handleProjectDetail = async id => {
    this.setState({ isloading: false });
    const selectedProject = this.state.selectedProject;
    var result;
    try {
      result = await getProjectDetail(id).then(response => {
        if (response.status === 200) {
          const selectedProject = response.data;
          this.setState(
            {
              selectedProjectID: selectedProject.id,
              selectedProject: selectedProject,
              isloading: true
            },
            () => {
              return selectedProject;
            }
          );

          return selectedProject;
        }
      });
    } catch (err) {}
    return result;
  };

  onSelectPage = async selectedPageID => {
    var result; 
    try {
      result =  await getPageDetail(selectedPageID).then(response => {
        if (response.status === 200) {
          const selectedPage = response.data;
          this.setState({
            selectedPage,
            selectedPageID: selectedPageID
          } ,() => {
            return selectedPage;
          });return selectedPage;
        }
      });
    } catch (err) {}
    return result;
  };

  handleSelectSubPage = id => {
    const subpage = this.state.selectedProject.pages.filter(
      item => item.id === id
    );
    this.setState({ subPage: subpage[0] });
  };

  addNewProject = async item => {
    try {
      await createProject(JSON.stringify(item)).then(response => {
        if (response.status === 200) {
          const result = response.data;
          item.id = result.data.projectId;
          const allProjects = [item, ...this.state.allProjects];
          toast.success("Project Added!");
          this.setState({ allProjects });
        }
      });
    } catch (err) {}
  };
  updateProject = async selectedProject => {
    await updateProject(selectedProject);
    this.setState({ selectedProject });
    toast.success("Project Updated!");
  };

  saveNewPage = async page => {
    // saveNewPage = async page => {
    const data = { projectID: this.state.selectedProjectID, page: page };
    const result = await createPage(JSON.stringify(data));
    page.id = result.data.PageId;

    const selectedProject = { ...this.state.selectedProject };
    selectedProject.pages = [page, ...selectedProject.pages];
    toast.success("Page  Added!");
    this.setState({ selectedProject });
  };

  editPage = selectedPage => {
    this.setState({ selectedPage });

    const selectedProject = { ...this.state.selectedProject };
    selectedProject.pages.filter(item =>
      item.id === selectedPage.id
        ? ((item.title = selectedPage.title),
          (item.templateType = selectedPage.templateType))
        : item
    );

    this.setState({ selectedProject });
    toast.success("Page Updated!");
  };

  markDraftPage = page => {
    const selectedPage = { ...this.state.selectedPage };
    const selectedProject = { ...this.state.selectedProject };
    selectedProject.pages.filter(item =>
      item.id === page.id ? (item.saved = !page.saved) : item
    );
    selectedPage.saved = !page.saved;
    this.setState({ selectedPage, selectedProject });
    toast.success(
      selectedPage.saved ? "Marked as Draft !" : "Page is Live Now !"
    );
  };

  // onDeleteProject = id => {
  //   const allProjects = this.state.allProjects.filter(item => item.id !== id);
  //   this.setState({ allProjects });
  // };
  onDeletePage = async id => {
    const selectedProject = this.state.selectedProject;
    const result = await deletePage(id);
    let pages = selectedProject.pages.filter(item => item.id !== id);
    selectedProject.pages = pages;
    this.setState({ selectedProject });
    toast.success("Page Deleted!");
  };

  onDeleteProject = async id => {
    const allProjects = this.state.allProjects;
    await deleteProject(id);
    let projects = allProjects.filter(item => item.id !== id);
    this.setState({ allProjects: projects });
    toast.success("Project Deleted!");
  };

  updateNavigation = async navigation => {
    const newNav = [
      {
        title: "Navigation Data",
        pageID: "1",
        id: "",
        linkType: "",
        linkUrl: "",
        children: [
          {
            id: "1_1",
            title: "Link 1",
            pageId: "",
            linkType: "CUSTOM"
          },
          {
            id: "1_2",
            title: "Link 2",
            pageId: "",
            linkType: "CUSTOM"
          },
          {
            id: "1_3",
            title: "Link 3",
            pageId: "",
            linkType: "CUSTOM"
          },
          {
            id: "1_4",
            title: "Link 4",
            pageId: "",
            linkType: "CUSTOM"
          }
        ]
      }
    ];

    const selectedProject = { ...this.state.selectedProject };
    if (selectedProject.navigation.length > 0) {
      await updateNav(JSON.stringify(navigation));
    } else {
      await createNav(JSON.stringify(navigation));
    }

    selectedProject.navigation = navigation;
    toast.success("Navigation Updated!");
    this.setState({ selectedProject });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onSelectProject: this.onSelectProject,
          getAllProjects: this.getAllProjects,
          onProjectDetail: this.handleProjectDetail,
          updateNavigation: this.updateNavigation,
          addNewProject: this.addNewProject,
          onUpdateProject: this.updateProject,
          editPage: this.editPage,
          onDeleteProject: this.onDeleteProject,
          onDeletePage: this.onDeletePage,
          onSelectPage: this.onSelectPage,
          onSaveNewPage: this.saveNewPage,
          markDraftPage: this.markDraftPage,
          onUploadFile: this.handleUploadFile,
          onSelectSubPage: this.handleSelectSubPage
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
