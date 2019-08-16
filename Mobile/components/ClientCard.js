"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import {mobileEvents} from "./events";

import './ClientCard.css';

class ClientCard extends React.PureComponent {

    static propTypes = {
        client:
          PropTypes.shape({
              id: PropTypes.number.isRequired,
              fam: PropTypes.string.isRequired,
              im: PropTypes.string.isRequired,
              otch: PropTypes.string.isRequired,
              balance: PropTypes.number.isRequired,
          }),
        workMode: PropTypes.number.isRequired,  // ------ 1 - редактирование клиента, 2 - добавление клиента, 0 - выкл карточка
        lastCode: PropTypes.number.isRequired,
    };

    /* handleChangeNumber = (EO) => {
         const NAME = EO.target.name;
         const VALUE = EO.target.value;
         this.setState({
                 item : {
                     ...this.state.item,                   // ------ в стейте есть item, присвоить ему значения из this.state.item
                     [NAME]:parseFloat(VALUE)}},     // ----- и добавить еще это значене
             () => { this.validateFields(NAME, VALUE)})
         this.props.cbIsRedactTime(true);                        //------ передаем родителю запрет на кнопки
     };

     handleClickSave = (EO) =>{
         EO.stopPropagation();
         this.setState({
             formValid: false,
         });
         if(this.props.workMode === 1){
             this.props.cbEditItemList(this.state.item);
         }
         else{
             this.props.cbAddItemToList(this.state.item);
             this.props.cbLastCodeChange(this.props.lastCode + 1);
         }
         this.props.cbIsRedactTime(false);
     };

     handleClickCancel = (EO) =>{
         EO.stopPropagation();
         this.props.cbCancel(this.state.item);
         this.setState({ formValid: false });
         this.props.cbIsRedactTime(false);
     };
     // handleSubmit = (EO) =>{
     //     console.log('ENTER SUBMIT');
     //     EO.preventDefault();
     // };*/

    createInput = (_name, _value, _type, _ref, _val) => {
        return (
          <div className="strList">
              <label className="labelList"> {_name}
                  <input className="inputList"
                         type={_type}
                         name={_name}
                         defaultValue={_value}
                         ref = {_ref}
                         disabled={_val}
                  />
              </label>
          </div>
        )
    };

    clientIDRef = 150;
    clientFamRef = null;
    clientImRef = null;
    clientOtchRef = null;
    clientBalanceRef = null;

    setClientIDRef = (ref) => {
        this.clientIDRef = ref;
    };
    setClientFamRef = (ref) => {
        this.clientFamRef = ref;
    };
    setClientImRef = (ref) => {
        this.clientImRef = ref;
    };
    setClientOtchRef = (ref) => {
        this.clientOtchRef = ref;
    };
    setClientBalanceRef = (ref) => {
        this.clientBalanceRef = ref;
    };


    clickSave = () => {
        let clientData = {
            "id": this.props.client.id,
            "fam": this.clientFamRef.value,
            "im": this.clientImRef.value,
            "otch": this.clientOtchRef.value,
            "balance": parseInt(this.clientBalanceRef.value),
        };
        mobileEvents.emit('EvClickSave', clientData)
    };

    clickAdd = () => {
        let clientData = {
            "id": this.props.lastCode,
            "fam": this.clientFamRef.value,
            "im": this.clientImRef.value,
            "otch": this.clientOtchRef.value,
            "balance": parseInt(this.clientBalanceRef.value)||0,
        };
        mobileEvents.emit('EvClickAdd', clientData)
    };

    clickCancel = () => {
        mobileEvents.emit('EvClickCancel')
    };

    render() {
        console.log("ClientCard render");
{/*------------ СОЗДАЕМ карточку ----EDIT--- ( ВИДНА ПРИ "WORKMODE" == 1) ---------*/}
      let client = this.props.client;
      return (
       <React.Fragment> {
        (this.props.workMode ===1)?<h2 className={'EditListTitle'}>Редактирование клиента</h2>:
          <h2 className={'EditListTitle'}>Добавление клиента</h2>
    }
        <form key="formEdit" name="formList">
          {
            (this.props.workMode === 1) &&
              <React.Fragment>
                {this.createInput("Фамилия", client.fam, "text", this.setClientFamRef)}
                {this.createInput("Имя", client.im, "text", this.setClientImRef)}
                {this.createInput("Отчество", client.otch, "text", this.setClientOtchRef)}
                {this.createInput("Баланс", client.balance, "number", this.setClientBalanceRef)}
                  <input type="button" value="Save" onClick={this.clickSave}/>
              </React.Fragment>
                }

{/*------------ СОЗДАЕМ карточку для ----- ADD ----- ( ВИДНА ПРИ "WORKMODE" == 2) ---------*/}
          {
            (this.props.workMode === 2) &&

            <React.Fragment>
                {this.createInput("ID", this.props.lastCode, "number", this.setClientIDRef, true)}
                {this.createInput("Фамилия", "", "text", this.setClientFamRef)}
                {this.createInput("Имя", "", "text", this.setClientImRef)}
                {this.createInput("Отчество", "", "text", this.setClientOtchRef)}
                {this.createInput("Баланс", {}, "number", this.setClientBalanceRef)}
                <input type="button" value="Save" onClick={this.clickAdd}/>
            </React.Fragment>

          }

                <input type="button" value="Cancel" onClick={this.clickCancel}/>
        </form>

       </React.Fragment>
        )
    }
}
export default ClientCard;