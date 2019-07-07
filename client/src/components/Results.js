import React, { Component } from 'react'

export default class Results extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Number of candidates in this election: {this.props.candidatesCount}
      </div>
    )
  }
}
