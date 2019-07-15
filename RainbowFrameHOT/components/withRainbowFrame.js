import React from 'react';
import './RainbowFrame.css';


let withRainbowFrame = colors =>  (Component) => props => {
  let colorFrame = colors.reduce((startEl, color) => {
    return <div style={{border: "solid 10px " + color, padding: "10px"}}>{startEl}</div>
  }, <Component>{props.children}</Component>); // передаем стартовый компонент это текст Hello!

      return <div className="RainbowFrame">{colorFrame}</div>
};

export {withRainbowFrame};
