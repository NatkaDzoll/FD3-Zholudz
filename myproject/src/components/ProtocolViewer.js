import React from 'react';

import './Protocol.css';
import BlockDate_View from "./Blokcs/BlockDate_View";
import BlockNumber_View from "./Blokcs/BlockNumber_View";
import BlockDepartment_View from "./Blokcs/BlockDepartment_View";
import BlockTeachers_View from "./Blokcs/BlockTeachers_View";
import BlockSubject_View from "./Blokcs/BlockSubject_View";
import BlockAgenda_View from "./Blokcs/BlockAgenda_View";

import {connect} from "react-redux";
import {protocol_previewAC} from "../redux/protocolAC";

class ProtocolViewer extends React.PureComponent {
componentDidMount() {
  this.props.dispatch (protocol_previewAC())
}

  render(){

    let Blocks = {
      "DATE": {
        viewComp: BlockDate_View,
      },
      "NUMBER": {
        viewComp: BlockNumber_View,
      },
      "DEPARTMENT": {
        viewComp:BlockDepartment_View,
      },
      "TEACHERS": {
        viewComp: BlockTeachers_View,
      },
      "AGENDA": {
        viewComp: BlockAgenda_View,
      },
      "SUBJECT": {
        viewComp: BlockSubject_View,
      },
    };

  let protocol = this.props.protocolsList.find(el => el.id === 100);
    console.log(protocol)
    let BlocksView = this.props.dataProtocol.map((el, i) =>{
      let ViewComp = Blocks[el.blockType].viewComp;
      return <ViewComp key={i} {...el}/>;
    });

    return (
      <React.Fragment>
        <div key="Protocol_Table" className="Protocol_Table">
          {BlocksView}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    protocolsList: state.protocolsList.dataProtocolsList,
    dataProtocol: state.protocol.dataProtocol.protocolBlocks
  };
};

export default connect(mapStateToProps)(ProtocolViewer);
