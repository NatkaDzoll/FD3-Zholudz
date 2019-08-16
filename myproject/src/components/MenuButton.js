import React from 'react';
import PropTypes from 'prop-types';
import './MenuButton.css'

class MenuButton extends React.PureComponent {

  static propTypes = {
    getButton: PropTypes.func.isRequired,
    buttonComp: PropTypes.string.isRequired
  };

  render(){
    return (
      <React.Fragment>{this.props.getButton()}
      </React.Fragment>
    )
  }

}

export default MenuButton;