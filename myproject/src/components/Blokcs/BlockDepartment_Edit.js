import React from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {block_updateAC} from "../../redux/protocolAC";

class BlockDepartment_Edit extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({
      blockType: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      valueDepartment: PropTypes.string.isRequired,
    })
  };

  departmentChanged = (EO) => {
    let newblock = this.props.data
    let blockPos = this.props.dataProtocol.indexOf(this.props.dataProtocol.filter(el=> el.blockType === "DEPARTMENT")[0] )
    newblock = {...newblock, valueDepartment:EO.target.value};
    this.props.dispatch(block_updateAC(blockPos, newblock))
   };

  render(){


    let arrDisplay = this.props.dataDepartments.map((el) => {
      return <option key={el.code} value={el.code}>{el.name}</option>
    });

    return (
      <React.Fragment >
        <div key = "Department" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Кафедра
          </div>
          <div className="Protocol_Cell">
            <select className="textareaList"
                    name="Department"
                    defaultValue={this.props.data.valueDepartment}
                    onChange={this.departmentChanged}>
              <option label=" " hidden={true} > </option>
            {arrDisplay}
          </select>

          </div>
        </div>

      </React.Fragment>
    )
  }
}
const mapStateToProps = function (state) {
  return {
    id: state.protocol.lastId,
    dataProtocol: state.protocol.dataProtocol.protocolBlocks,
    dataDepartments: state.protocolsList.dataDepartments,
  };
};

export default connect(mapStateToProps)(BlockDepartment_Edit);
