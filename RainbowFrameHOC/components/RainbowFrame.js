"use strict";

import React from 'react';
import {Fragment} from 'react'

import {withRainbowFrame} from './withRainbowFrame'


function RainbowFrame () {

  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
  let FramedFragment= withRainbowFrame(colors)(Fragment);
    return(
      <FramedFragment>
        Hello!
      </FramedFragment>)
}

export default RainbowFrame;
