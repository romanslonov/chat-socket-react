import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';


class ContentContainer extends Component {
  render() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
}

export default ContentContainer;
