import React from 'react';
import { Route } from 'react-router-dom';

import Page_Main from './Page_Main';
import Page_PrConstructor from './Page_ProtocolRedact';
import Page_Preview from "./Page_Preview";
import Page_ProtocolsList from "./Page_ProtocolsList";

class PagesRouter extends React.Component {

  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Main} />
        <Route path="/protocolsList" component={Page_ProtocolsList} />
        <Route path="/protocolRedact" exact component={Page_PrConstructor} />
        <Route path="/protocolCreate" exact component={Page_PrConstructor} />
        <Route path="/protocolRedact/:numb"  component={Page_PrConstructor}/>
        <Route path="/protocolPreview/:numb" component={Page_Preview}/>
      </div>
    );
  }
}

export default PagesRouter;
