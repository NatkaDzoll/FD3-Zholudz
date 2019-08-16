import React from 'react';

import './Page_Preview.css'

import ProtocolViewer from "../components/ProtocolViewer";
import {NavLink} from "react-router-dom";

class Page_Preview extends React.PureComponent {


  render() {
console.log(this.props)

    return (
      <React.Fragment>

        <div key="Menu" className="Protocol_control">
          <div className="Preview_title"><h2> Просмотр протокола </h2></div>

          <input className = 'Protocol_button saveBut' type="button" value="Сохранить" onClick={this.showAllClients} />

          <NavLink to="/protocolRedact" exact className='Protocol_button' previewlink = {this.props.match.params}> Назад </NavLink>

               </div>
        <div className="Preview_title"> <h2>Просмотр протокола</h2> </div>

<div className="ProtocolList_table">
        <div className="ProtocolInfo_box ">
          <ProtocolViewer/>
        </div>
</div>
      </React.Fragment>
    );

  }
}

export default Page_Preview;