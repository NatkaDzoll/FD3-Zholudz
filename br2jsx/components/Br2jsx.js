"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css';

function Br2jsx (props) {
  let reg = /<br\s*\/*>/;
  let textArr = props.text.split(reg);

  let finalTextArr = textArr.map((el, i, arr) => {
      if (i !==  arr.length-1 ) {
        return <React.Fragment>{el}<br/></React.Fragment>
      }
      else {
        return <React.Fragment>{el}</React.Fragment>
      }
  });
  return(
    <div className="Br2jsx">{finalTextArr}</div>
  );
}

Br2jsx.propTypes = {
  text: PropTypes.array.isRequired,
};
export default Br2jsx;