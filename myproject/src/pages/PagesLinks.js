import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './pencil_color_blue.ico';
import './PagesLinks.css';
import {protocol_createAC} from "../redux/protocolAC";
import {connect} from "react-redux";

class PagesLinks extends React.Component {

  newProtocol = () => {
    this.props.dispatch (protocol_createAC(1))
  }

  render() {

    return (
     <React.Fragment>

       <img className="PageLink_Logo" src={logo} alt={'logo'}/>
        <NavLink to="/"
                 exact
                 className="PageLinkMain">
          <div >ProtocolNaTi</div>
        </NavLink>

        <NavLink to="/protocolsList"
                 className="PageLink"
                 activeClassName="ActivePageLink">
          <div className="PageButton">Список <br/> протоколов</div>
        </NavLink>

        <NavLink to="/protocolRedact"
                 className="PageLink"
                 activeClassName="ActivePageLink"
                 onClick={this.newProtocol}>
          <div className="PageButton">Редактор<br/>протоколов</div>
        </NavLink>

       {/*<NavLink to="/protocolCreate"
                className="PageLinkPreview"     // Видима только когда активна!
                activeClassName="ActivePageLinkPreview">
         <div className="PageButton">Редактировать<br/>протокол</div>
       </NavLink>*/}

         <NavLink to="/protocolPreview"
                  className="PageLinkPreview"     // Видима только когда активна!
                  activeClassName="ActivePageLinkPreview">
           <div className="PageButton">Просмотр<br/>протокола</div>
         </NavLink>

     </React.Fragment>
    );
  }
}

export default connect()(PagesLinks);

