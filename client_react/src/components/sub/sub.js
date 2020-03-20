import React, { Component } from 'react';

class Sub extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>SubChat {this.props.match.params.id}</h1>
        <h2>{this.props.match.params.id == 4 && 'SOSAT'}</h2>
      </React.Fragment>
    );
  }
}

export default Sub;
