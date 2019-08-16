import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {block_updateAC} from "../../redux/protocolAC";

class BlockDate_Edit extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({   // --- получаем от родителя
      blockType: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      valueDate: PropTypes.string.isRequired,
    })
  }

  dataChanged = (EO) => {
    let newBlock = {...this.props.data}
    let blockPos = this.props.dataProtocol.indexOf(this.props.data )
    newBlock = {...newBlock, valueDate: EO.target.value};
    this.props.dispatch(block_updateAC(blockPos, newBlock))
  };

  render(){
  // console.log(this.props)
    return (
      <React.Fragment >
        <div key = "Date" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Дата
          </div>
          <div className="Protocol_Cell">
            <input className="textareaList"
                   type="date"
                   name="Date"
                   defaultValue={this.props.data.valueDate}
                   onBlur={this.dataChanged}
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

export default connect(mapStateToProps)(BlockDate_Edit);

