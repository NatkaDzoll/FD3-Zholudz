"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

// ------------------- Классовый стиль -------------------------

// class RainbowFrame extends React.Component {
//   static propTypes = {
//     colors: PropTypes.array.isRequired,
//   };
//
// render() {
//   let colorFrame = this.props.colors.reduce((startEl, color) => {
//     return  <div style={{border:"solid 10px "+ color,  padding: "10px"}}>{startEl}</div>
//   },  this.props.children);
//
//   return(
//     <div className="RainbowFrame">{colorFrame}</div>
//
//  );
// }


// ----------------------- Функциональный стиль --------------------------
function RainbowFrame (props) {
    let colorFrame = props.colors.reduce((startEl, color) => {
      return  <div style={{border:"solid 10px "+ color,  padding: "10px"}}>{startEl}</div>
    },  props.children);

    return(
      <div className="RainbowFrame">{colorFrame}</div>
    );
}

RainbowFrame.propTypes = {
  colors: PropTypes.array.isRequired,
};

export default RainbowFrame;