// component to add a new candidate. 

import React, { Component } from "react";

export default class NewCandidate extends Component {

  constructor(props) {
    super();

    this.state = {
      name: "",
      party: "",
      photo: "",
      description: ""
    }

    this.onChange = this.onChange.bind(this);
  }


  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendData = (event) => {
    
    event.preventDefault();
    
    
    this.props.formData(this.state.name, this.state.party, this.state.photo, this.state.description);

}

  render() {
    return (
      <div>
       <form className="ui form" onSubmit={this.sendData}>
        <div className="field">
          <label>Candidate's Full name</label>
          <input
            type="text"
            name="name"
            onChange={this.onChange}
            placeholder="write the candidate name"
          />
        </div>

        <div className="field">
          <label>Candidate's political party</label>
          <input
            type="text"
            name="party"
            onChange={this.onChange}
            placeholder="write the candidate's party"
          />
        </div>
        <div className="field">
          <input type="text"
            name="photo"
            onChange={this.onChange}
            placeholder="write the photo location"
          />
        </div>
        <div className="field">
          <textarea
            name="description"
            onChange={this.onChange}
            placeholder="write a description"
          />
        </div>
        <input className="ui blue button" type="submit" value="add candidate" />
      </form>
      </div>
    )
  }

}