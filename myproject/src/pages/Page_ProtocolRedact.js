import React from 'react';
import './Page_ProtocolRedact.css';
import '../components/MenuButton.css';
import MenuButton from "../components/MenuButton";

import connect from "react-redux/es/connect/connect";
import BlockDate_Edit from "../components/Blokcs/BlockDate_Edit";
import BlockNumber_Edit from "../components/Blokcs/BlockNumber_Edit";
import BlockDepartment_Edit from "../components/Blokcs/BlockDepartment_Edit";
import BlockTeachers_Edit from "../components/Blokcs/BlockTeachers_Edit";
import BlockSubject_Edit from "../components/Blokcs/BlockSubject_Edit";
import {block_createAC} from "../redux/protocolAC";
import {protocol_addAC, protocol_updateAC} from "../redux/protocolsListAC";


class Page_ProtocolRedact extends React.PureComponent {

  preview = () => {
    let idProtocol = this.props.protocol.dataProtocol.id
    this.props.history.push('/protocolPreview/'+ idProtocol);
  };


  saveProtocol = () => {
    if (this.props.protocol.redacting){
     // console.log(this.props)
      let newProtocol = { };

      if(this.props.protocol.dataProtocol.id) {
        newProtocol.id = this.props.protocol.dataProtocol.id // ---- если id уже есть в списке протоколов
        // ------- НАХОДИМ ЗНАЧЕНИЯ В БЛОКАХ ------------ //
        this.props.protocol.dataProtocol.protocolBlocks.forEach((el) => {
          if( el.blockType === "NUMBER") {
            newProtocol.numProtocol = el.valueNumber;
          }
          if (el.blockType === "DEPARTMENT") {
            newProtocol.departmentPr = el.valueDepartment;
          }
          if (el.blockType === "DATE") {
            newProtocol.dateProtocol = el.valueDate;
          }
        });
        newProtocol.protocolBlocks = this.props.protocol.dataProtocol.protocolBlocks;
        let index;
          this.props.protocolsList.dataProtocolsList.filter((el,i) => {
          if(el.id === newProtocol.id){
           // console.log("el.id =",el.id, "  newProtocol.id =", newProtocol.id);
             index = i}
          return null
        });

        this.props.dispatch(protocol_updateAC(newProtocol, index));
      }
      else {
          newProtocol.id = this.props.protocolsList.lastProtocolId + 1;// ---- если id нет в списке протоколов

        // ------- НАХОДИМ ЗНАЧЕНИЯ В БЛОКАХ ------------ //
        this.props.protocol.dataProtocol.protocolBlocks.forEach((el) => {
          if( el.blockType === "NUMBER") {
            newProtocol.numProtocol = el.valueNumber;
          }
          if (el.blockType === "DEPARTMENT") {
            newProtocol.departmentPr = el.valueDepartment;
          }
          if (el.blockType === "DATE") {
            newProtocol.dateProtocol = el.valueDate;
          }
        });
        newProtocol.protocolBlocks = this.props.protocol.dataProtocol.protocolBlocks;
        this.props.dispatch(protocol_addAC(newProtocol));
      }

     this.props.history.push('/protocolsList');
    }
    else {
      alert("Изменений не было внесено")
    }
  }

  cancelProtocol = () =>{
    if (this.props.protocol.redacting) {   //проверяем на наличие именений в протоколе
      const conf =  window.confirm(`Вы уверены, что хотите выйти из протокола не сохранившись?`);
      if(conf){
        this.props.history.push('/protocolsList');
      }
    }
    // если не было изменений то сразу же возвращаемся  в список
    else {
      this.props.history.push('/protocolsList');
    }
  };

  whatPosition = (blockType) => {
    let position;
    switch ( blockType ) {
      case "SUBJECT":
        position = this.props.protocol.dataProtocol.protocolBlocks.length;
        return position;
      case "TEACHERS":
        if (this.props.blocks.find((el, i) =>
          el.valueDepartment === "SUBJECT" ? position = i - 1 : position = this.props.blocks.length - 1
        ))
          return position;
        break;
      default:
        break;
    }
  };

  // проверка на наличие блока в протоколе
  isBlockInList = (blockType) => {
    let isAdded = this.props.protocol.dataProtocol.protocolBlocks.some(el => el.blockType === blockType);
    if (isAdded) {
      alert("Такое поле уже было добавлено")
    } else {
      return !isAdded
    }
  };

  addFieldData = () => {
    if (this.isBlockInList("DATE")) {
      let block = {
        "blockType": "DATE",
        "valueDate": ""
      };
      this.props.dispatch(block_createAC(block, 0))
    }

  };
  addFieldNumber = () => {
    if (this.isBlockInList("NUMBER")) {
      let block = {
        "blockType": "NUMBER",
        "valueNumber": null,
      };
      let pos = this.whatPosition("NUMBER") + 1
      this.props.dispatch(block_createAC(block, pos))
    }
  };
  addFieldDepartment = () => {
    if (this.isBlockInList("DEPARTMENT")) {
      let block = {
        "blockType": "DEPARTMENT",
        "valueDepartment": "",
      };
      let pos = this.whatPosition("DEPARTMENT")
      this.props.dispatch(block_createAC(block, pos))
    }
  };
  addFieldTeachers = () => {
    if (this.isBlockInList("TEACHERS")) {
      let depart = this.props.blocks.map(el =>
        (el.blockType === "DEPARTMENT") ? el.checkedDepartment : "Выберите кафедру"
      )
      let block = {
        "blockType": "TEACHERS",
        "checkedDepartment": depart,
        "checkedTeachers": []
      };
      let pos = this.whatPosition("TEACHERS")
      this.props.dispatch(block_createAC(block, pos))
    }
  };
  addFieldSubjects = () => {
    let block = {
      "blockType": "SUBJECT",
      "subNumber": this.props.lastSubNum + 1,    //номер расчитывать нужно
      "subData": {
        "topicSubject": "",
        "informationFrom": "",
        "textSubject": "",
        "textDecision": "",
      }
    };

    let pos = this.whatPosition("SUBJECT")
    this.props.dispatch(block_createAC(block, pos))
  };

  render() {
  // console.log(this.props)

      let Blocks = {
        "DATE": {
          viewComp: BlockDate_Edit,
        },
        "NUMBER": {
          viewComp: BlockNumber_Edit,
        },
        "DEPARTMENT": {
          viewComp: BlockDepartment_Edit,
        },
        "TEACHERS": {
          viewComp: BlockTeachers_Edit,
        },
        "SUBJECT": {
          viewComp: BlockSubject_Edit,
        },
      };

      let blocks = this.props.protocol.dataProtocol.protocolBlocks;
    //  console.log(this.props)
    let BlocksView;
      if (blocks) {
        BlocksView = blocks.map((el) => {
          let ViewComp = Blocks[el.blockType].viewComp;
          return <ViewComp key={el.lastId+el.blockType} data={el}/>;
        });
      }

    return (
        <React.Fragment>
          {/*------------------------ меню управления конструктором -------------------------*/}
          <div className="Protocol_control"><div className="Preview_title"> <h2>Меню редактирования протокола</h2> </div>
            <input key="cancelBut" className='Protocol_button cancelBut' type="button" value="Не сохранять" onClick={this.cancelProtocol}/>
            <input key="saveBut" className='Protocol_button saveBut' type="button" value="Сохранить" onClick={this.saveProtocol}/>
            <input key="But" className='Protocol_button ' type="button" value="Предпросмотр" onClick={this.preview}/>
          </div>

          <div className="Protocol_box">


            <div  className="Protocol_menu">

              <ul className='navigation-menu'>
                <p className ='add_title'>Добавляемые поля</p>
                <MenuButton key="Data"
                            buttonComp="Data" // ---- передаем ему имя компонента который нужно будет добавить на лист
                            getButton={() =>
                              <input className="buttonMenu" type="button" value="Дата" name="Data"
                                     onClick={this.addFieldData}/>
                            }/>
                <MenuButton key="Number"
                            buttonComp="Number" // ---- передаем ему имя компонента который нужно будет добавить на лист
                            getButton={() =>
                              <input className="buttonMenu" type="button" value="Номер" name="Number"
                                     onClick={this.addFieldNumber}/>
                            }/>
                <MenuButton key="Department"
                            buttonComp="Department" // ---- передаем ему имя компонента который нужно будет добавить на лист
                            getButton={() =>
                              <input className="buttonMenu" type="button" value="Кафедра" name="Department"
                                     onClick={this.addFieldDepartment}/>
                            }/>
                <MenuButton key="Teachers"
                            buttonComp="Teachers" // ---- передаем ему имя компонента который нужно будет добавить на лист
                            getButton={() =>
                              <input className="buttonMenu" type="button" value="Преподаватели" name="Teachers"
                                     onClick={this.addFieldTeachers}/>
                            }/>
                <MenuButton key="Subjects"
                            buttonComp="Subjects" // ---- передаем ему имя компонента который нужно будет добавить на лист
                            getButton={() =>
                              <input className="buttonMenu" type="button" value="Вопрос повестки дня" name="Subjects"
                                     onClick={this.addFieldSubjects}/>
                            }/>
                   </ul>
            </div>

            <div  className="Protocol_info">
              <div className="ProtocolInfo_box">
                <div  className="Protocol_Table">

                  {BlocksView}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

const mapStateToProps = function (state) {

  return {
    protocol: state.protocol,
    protocolsList: state.protocolsList,
  };
};

export default connect(mapStateToProps)(Page_ProtocolRedact);