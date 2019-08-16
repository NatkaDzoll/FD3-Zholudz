import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {block_updateAC} from "../../redux/protocolAC";

class BlockNumber_Edit extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({
      blockType: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      valueNumber: PropTypes.string.isRequired,
    })

    };

  valueNumberChanged = (EO) => {

    let newblock = {...this.props.data}
    let blockPos = this.props.dataProtocol.indexOf(this.props.data )

    newblock = {...newblock, valueNumber:EO.target.value};

    this.props.dispatch(block_updateAC(blockPos, newblock))

  };
  render(){
   // console.log(this.props)
    return (
      <React.Fragment>
        <div key = "Number" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Номер протокола
          </div>
          <div className="Protocol_Cell">
            <input className="textareaList"
                   type="number"
                   name="Number"
                   defaultValue={this.props.data.valueNumber}
                   onBlur={this.valueNumberChanged}
          />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    lastId: state.lastId,
    dataProtocol: state.protocol.dataProtocol.protocolBlocks,
  };
};

export default connect(mapStateToProps)(BlockNumber_Edit);
