import React from 'react';
import PropTypes from 'prop-types';
import departments from  '../dataDepartments'

import { protocol_redactAC, protocol_setAC} from "../redux/protocolAC";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {protocol_deleteAC} from "../redux/protocolsListAC";

// -------- ФУНКЦИЯ ПОЛУЧЕНИЯ ПОЛНОГО НАЗВАНИЯ КАФЕДРЫ ------------
const convertDepName = (code, departments)=> {
  departments.forEach((el) => {
    if(el.code === code){
      code = el.name;
    }
  });
  return code;
};


class Protocol extends React.PureComponent {

  static propTypes = {
    date: PropTypes.string.isRequired,  // получаем от родителя
    dep: PropTypes.string.isRequired,   // получаем от родителя
    num: PropTypes.number.isRequired,   // получаем от родителя
    prId:PropTypes.number.isRequired,   // получаем от родителя
  };


// ------- ФУНКЦИЯ ВЫЗОВА КАРТОЧКИ РЕДАКТИРОВАНИЯ ПРОТОКОЛА --------
  redactProtocol = ()=> {
   // console.log(this.props.prId)

   let idProtocol = this.props.prId;    // находим ID протокола
   // console.log((this.props.dataProtocol))
    let  dataProtocol = this.props.protocolsList.dataProtocolsList;           // ----- список всех протоколов
    if (idProtocol) {                                                         // ----- если ID протокола передан
      dataProtocol = dataProtocol.find(el => el.id === idProtocol);           // ----- то найти протокол в списке
      let lastSubNumber = dataProtocol.protocolBlocks[dataProtocol.protocolBlocks.length -1].subNumber;     // ----- считаем количество блоков Subject

      this.props.dispatch(protocol_setAC(1, dataProtocol, lastSubNumber)) // dataProtocol передать, но сначала найти его
    }
    else {
      this.props.dispatch(protocol_redactAC())
    }
    this.props.history.push("/protocolRedact/" + this.props.prId)
  };

  deleteProtocol = () => {
    let idProtocol = this.props.prId;    // находим ID протокола
    let index;
    this.props.protocolsList.dataProtocolsList.filter((el,i) => {
      if(el.id === idProtocol) {
         index = i
      }
      return null
    });
    this.props.dispatch(protocol_deleteAC(index))

  };

  render(){
    return (
      <React.Fragment>
        <tr className = 'ProtocolList_tr' //key = {this.props.client.id}
          //className = {this.props.itemClassName}
           >
          <td className = 'ProtocolList_td'>{this.props.num}</td>
          <td className = 'ProtocolList_td'>{this.props.date}</td>
          <td className = 'ProtocolList_td'>{convertDepName(this.props.dep, departments)}</td>
          <td className = 'ProtocolList_td'>

            <input  type = 'button'
                    className = 'edit__button'
                    onClick ={this.redactProtocol}
                    data-id ={this.props.prId}
                    value = 'Редактировать'/>
          </td>
          <td className = 'ProtocolList_td'>
            <input  type = 'button'
                    className = 'delete__button'
                    data-id ={this.props.prId}
                    onClick = {this.deleteProtocol}
                    value = 'Удалить'/>
          </td>
        </tr>

      </React.Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  // console.log(state.protocolsList)
  return {
    dataProtocol: state.protocol.dataProtocol.protocolBlocks,
    protocolsList: state.protocolsList, // подписаться для того что б найти нужный протокол и передать его в ProtocolRedact
  };
};

export default withRouter(connect(mapStateToProps)(Protocol));
export {convertDepName}

