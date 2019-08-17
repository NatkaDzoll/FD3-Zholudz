import React from 'react';

import './Page_ProtocolsList.css'
import {connect} from "react-redux";
import Protocol from "../components/Protocol";
import {  protocol_list_sortAC} from "../redux/protocolsListAC";
import {protocol_createAC} from "../redux/protocolAC";

class Page_ProtocolsList extends React.PureComponent {

   componentDidMount() {

     if (this.props.data.status === 4) {
       const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
       let updatePassword = Math.random();
       let JSONProtocol = JSON.stringify(this.props.data.dataProtocolsList);

       // отдельно создаём набор POST-параметров запроса LOCKGET
       let spLock = new URLSearchParams();
       spLock.append('f', 'LOCKGET');
       spLock.append('n', 'ZHOLUD_PR_PROTOCOLS');
       spLock.append('p', updatePassword);

       // отдельно создаём набор POST-параметров запроса UPDATE
       let sp = new URLSearchParams();
       sp.append('f', 'UPDATE');
       sp.append('n', 'ZHOLUD_PR_PROTOCOLS');
       sp.append('v', JSONProtocol);
       sp.append('p', updatePassword);

       fetch(ajaxHandlerScript, {method: 'post', body: spLock})
         .then(response => {
           console.log(response);
           return fetch(ajaxHandlerScript, {method: 'post', body: sp})
         })
         .catch(error => {
           console.error(error);
         });
     }
   }

  createProtocol = () =>{
    this.props.dispatch (protocol_createAC(1))
    this.props.history.push('/protocolRedact');
  }


// ----------------------  СОРТИРУЕМ ПО НОМЕРУ ПРОТОКОЛЫ ------------------------ //
  sortByNumber = () => {
      let sortList = this.props.data.dataProtocolsList.slice();
      sortList.sort((el1, el2)=>{
      if(el1.numProtocol<el2.numProtocol) return -1;
      if(el1.numProtocol>el2.numProtocol) return 1;
      return null
    })
    this.props.dispatch (protocol_list_sortAC(sortList))
  }
// ----------------------  СОРТИРУЕМ ПО ДАТЕ ПРОТОКОЛЫ ------------------------ //
  sortByDate = () => {
    let sortList = this.props.data.dataProtocolsList.slice()
    sortList.sort((el1, el2)=>{
      if(el1.dateProtocol<el2.dateProtocol) return 1;
      if(el1.dateProtocol>el2.dateProtocol) return -1
    return  null
    })
    this.props.dispatch (protocol_list_sortAC(sortList))
  }
// ----------------------  СОРТИРУЕМ ПО КАФЕДРЕ ПРОТОКОЛЫ ------------------------ //
  sortByDepartment = () => {
    let sortList = this.props.data.dataProtocolsList.slice()
    sortList.sort((el1, el2)=>{
      if(el1.departmentPr<el2.departmentPr) return -1;
      if(el1.departmentPr>el2.departmentPr) return 1
      return  null
    })
    this.props.dispatch (protocol_list_sortAC(sortList))
  }

  render() {
  //console.log(this.props)
   if (this.props.data.status <= 1)
      return "Перейдите на главную страницу";
   else {
     let  arrProtocols = this.props.data.dataProtocolsList.map(protocol => {
       return <Protocol key ={protocol.id}
                        num = {parseFloat(protocol.numProtocol)}      // --- данные по котторым строитеся список
                        date = {protocol.dateProtocol}
                        dep={ protocol.departmentPr}
                        prId={protocol.id}
        />});
     return (
        <React.Fragment>
          {/*------------------------ меню управления конструктором -------------------------*/}
          <div key="Protocol_control" className="Protocol_control">
            <div className="Preview_title"><h2> Список протоколов "Архитектурного факультета"</h2></div>
            <input className='Protocol_button' type="button" value="Создать протокол" onClick={this.createProtocol}/>
          </div>

          <table key='table'
                 className='ProtocolList_table'>
                <tbody className='ProtocolList_tbody'>
            <tr className='ProtocolList_tr'>
              <th className='ProtocolList_th' onClick={this.sortByNumber}>№</th>
              <th className='ProtocolList_th' onClick={this.sortByDate}>Дата</th>
              <th className='ProtocolList_th' onClick={this.sortByDepartment}>Кафедра</th>
              <th className='ProtocolList_th'>Редактировать</th>
              <th className='ProtocolList_th'>Удалить</th>
            </tr>

            {/*СЮДА ДОБАВИТСЯ РЕНДЕР КАЖДОГО ЭЛЕМЕНТА*/}
            {arrProtocols}

            </tbody>
          </table>

        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = function (state) {

  return {
    protocol: state.protocol.dataProtocol,
    data: state.protocolsList,
  };
};

export default connect(mapStateToProps)(Page_ProtocolsList);
