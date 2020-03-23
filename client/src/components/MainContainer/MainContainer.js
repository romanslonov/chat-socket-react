import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
class MainContainer extends Component {
  render() {
    return (
      <main className="min-h-screen flex">
        {this.props.children}
      </main>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MainContainer
);
