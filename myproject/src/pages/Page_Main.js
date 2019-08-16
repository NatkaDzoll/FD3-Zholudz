import React from 'react';
import './Page_Main.css';
import {protocol_list_errorAC, protocol_list_loadingAC, protocol_list_setAC} from "../redux/protocolsListAC";
import isoFetch from "isomorphic-fetch";
import connect from "react-redux/es/connect/connect";

class Page_Main extends React.PureComponent {
   componentWillMount() {
    //console.log("сработал componentWillMount")
}
  componentDidMount() {
    if(this.props.data.status === 0){
      this.props.dispatch (protocol_list_loadingAC()); // переводим раздел countries стора в состаяние "загружается"
      const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
// --------------------------------- CONFIG запросов --------------------------------- //
      let spProtocols = new URLSearchParams();
      spProtocols.append('f', 'READ');
      spProtocols.append('n', 'ZHOLUD_PR_PROTOCOLS');

      let spDepartment = new URLSearchParams();
      spDepartment.append('f', 'READ');
      spDepartment.append('n', 'ZHOLUD_PR_DEPARTMENT');

      let spTeachers = new URLSearchParams();
      spTeachers.append('f', 'READ');
      spTeachers.append('n', 'ZHOLUD_PR_TEACHERS');
// ----------------------- СОЗДАЕМ ПРОМИСЫ ДЛЯ 3-Х ЗАПРОСОВ -------------------------- //
      let prProtocolsList = isoFetch(ajaxHandlerScript, { method: 'post', body: spProtocols }).then( (response) => { // response - HTTP-ответ
        if (!response.ok) {
          let Err=new Error("fetch error " + response.status);
          Err.userMessage="Ошибка связи";
          throw Err;
        }
        else
          return response.json();
      } );// промис протокола

      let prDepartment = isoFetch(ajaxHandlerScript, { method: 'post', body: spDepartment }).then( (response) => { // response - HTTP-ответ
        if (!response.ok) {
          let Err=new Error("fetch error " + response.status);
          Err.userMessage="Ошибка связи";
          throw Err;
        }
        else
          return response.json();
      } ); // промис департамента

      let prTeachers = isoFetch(ajaxHandlerScript, { method: 'post', body: spTeachers }).then( (response) => { // response - HTTP-ответ
        if (!response.ok) {
          let Err = new Error("fetch error " + response.status);
          Err.userMessage = "Ошибка связи";
          throw Err;
        } else
          return response.json();
      });

      let dataProtocolsList;
      let dataDepartment;
      let dataTeachers;
      let lastProtocolId= 0;

      Promise.all([prProtocolsList,prDepartment,prTeachers])
        .then( (data) => {
// -------- ЕСЛИ ПРОМИ РЕШИЛСЯ ДЛЯ 3-Х ЗАПРОСОВ ТО В ПЕРЕМЕННУЮ ПЕРЕДАЕМ ДАННЫЕ ----------- //
          data.forEach((el, i) => {
            let res = JSON.parse(el.result);
            if (i === 0){
              dataProtocolsList = res;
// -------- ВЫЧИСЛЯЕМ ПОСЛЕДНИЙ ID протокола ---------- //
              dataProtocolsList.forEach((protocol) => {
                lastProtocolId = Math.max(lastProtocolId, protocol.id)
              });
            }
            else if (i===1){
              dataDepartment = res
            }
            else if (i===2){
              dataTeachers = res
            }
          });
//    console.log("dataProtocolsList", dataProtocolsList, dataDepartment, dataTeachers, lastProtocolId)
// ----------------------- ПЕРЕДАЕМ ДАННЫЕ В STORE -------------------------- //
          this.props.dispatch (protocol_list_setAC(dataProtocolsList, dataDepartment, dataTeachers, lastProtocolId));
        })
        .catch( error => {
          console.error(error);
          this.props.dispatch (protocol_list_errorAC()) // переводим раздел protocol_List стора в состояние "ошибка"
        } );

    }
 }

  render() {
    if (this.props.data.status <= 1)
      return "загрузка данных...";

    if (this.props.data.status === 2)
      return "ошибка загрузки данных";
    else {
    //console.log("сработал render")
    return (


      <React.Fragment>

        <div key="Protocol_control" className="Protocol_control">
          <div className="Preview_title"> <h2>Программа для создания протоколов</h2> </div>
        </div>

      <div className="Main_Table">
        <p>Программа <b>ProtocolNaTi</b> - предоставляет готовое решение для управления процессом создания, доработки и изменения протоколов.</p>
        <div className="Main_box">
          <p>Для просмотра созданных протоколов нажмите "Список протоколов" в верхей панели. Так же в списке протоколов есть возможность редактировать протокол и удалить.</p>
          <p>Для создание нового протокола нажмите "Редактор протоколов", либо во вкладке протоколов нажать "Создать протокол"</p>
          <p>Что бы сохранить протокол, на панеле нажмите "Сохранить", для выхода из редактирования или создания протокола нажать "Не сохранять", либо перейти в меню навигации.</p>
          <p>При редактировании или создании доступен просмотр протокола, для этого нажать "Предпросмотр".</p>

        </div>
      </div>

      </React.Fragment>

        );
  }}
}

const mapStateToProps = function (state) {

  return {

    data: state.protocolsList,
  };
};

export default connect(mapStateToProps)(Page_Main);

