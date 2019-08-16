import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {block_deleteAC, block_updateAC} from "../../redux/protocolAC";

class BlockSubject_Edit extends React.PureComponent {

   static propTypes = {
    data: PropTypes.shape({
      blockType: PropTypes.string.isRequired,
      id: PropTypes.number,

      subData: PropTypes.shape({
        informationFrom: PropTypes.string.isRequired,
        textDecision: PropTypes.string.isRequired,
        textSubject: PropTypes.string.isRequired,
        topicSubject: PropTypes.string.isRequired,
      })
    })
  };

  valueChanged = (EO) => {
     let newblock = this.props.data;
    let blockPos = this.props.dataProtocol.indexOf(this.props.dataProtocol.filter(el=> el.subNumber === this.props.data.subNumber)[0]  )
    newblock = {...newblock,  subData: {...newblock.subData, [EO.target.name]:EO.target.value}}
    this.props.dispatch(block_updateAC(blockPos, newblock))
  };

  deleteFieldSubjects = () =>{
    let block = this.props.dataProtocol.filter(el=> el.id === this.props.data.id)[0]
    this.props.dispatch(block_deleteAC(block.id))
  };

  render(){
console.log(this.props)
    return (
      <React.Fragment>
        <div key={this.props.id} className="Protocol_Row">
          <div className="Protocol_HeadCell">СЛУШАЛИ ВОПРОС</div>

          <div className="Protocol_Row">Тема: <input className="textareaList"
                                                     type="text"
                                                     name="topicSubject"
                                                     defaultValue={this.props.data.subData.topicSubject}
                onBlur={this.valueChanged}
          /></div>

          <div className="Protocol_Row">
                    <textarea className="textareaList"
                              name="textSubject"
                              defaultValue={this.props.data.subData.textSubject}
                              onBlur={this.valueChanged}/>
          </div>
          <div className="Protocol_Row"> Решили:
            <textarea className="textareaList"
                      name="textDecision"
                      defaultValue={this.props.data.subData.textDecision}
                      onBlur={this.valueChanged}/>
          </div>
          <input type="button" value="Х" name="Subjects"
                 onClick={this.deleteFieldSubjects}/>
        </div>
         </React.Fragment>
    )
  }

}
const mapStateToProps = function (state) {
  return {
    id: state.protocol.lastId,
    dataProtocol:state.protocol.dataProtocol.protocolBlocks,
    protocol: state.protocol,
  };
};

export default connect(mapStateToProps)(BlockSubject_Edit);
