import React, { Component } from 'react';
class ContentContainer extends Component {
  render() {
    return (
      <section className="pl-64 flex-grow">
        {this.props.children}
      </section>
    );
  }
}

export default ContentContainer;
