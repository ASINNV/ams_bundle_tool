import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

function apiCaller(path, initObj) {
  if (initObj !== undefined) {
    fetch(path, initObj)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller if block');
      })
  } else {
    fetch(path)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller else block');
      })
  }
}

class ClientInfo extends Component {

  // createProject() {
  //   const newProj = {
  //     name: 'April 19',
  //     total: 900
  //   };
  //
  //   apiCaller('/api/new-project', {
  //     method: 'POST',
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify(newProj)
  //   });
  // }

  componentDidMount() {
    apiCaller('/api/clients');
  }

  saveName() {
    let name = document.getElementById('client_name').value; // get value from client_name input field
    this.props.setClientName(name); // store client_name in state
  }

  render() {
    return (
        <div id="body-double-2">
          {/*<p className="buttons" onClick={this.createProject.bind(this)}>create new project</p>*/}
          <div>
            <label htmlFor="name">What is your name?</label>
            <input type="text" name="name" id="client_name" />
            <p className="buttons" onClick={this.saveName.bind(this)}>Submit</p>
          </div>
        </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    client: state.clientReducer,
    project: state.projectReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientName: (name) => {
      dispatch({
        type: "SET_CLIENT_NAME",
        payload: name
      });
    },
    setBundle: (number) => {
      dispatch({
        type: "SET_BUNDLE",
        payload: number
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);