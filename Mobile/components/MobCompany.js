"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import MobClient from './MobClient';
import ClientCard from './ClientCard';

import './MobCompany.css';
import {mobileEvents} from "./events";

class MobCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    clientsFilter: 'all',
    workMode: 0, // 1 - редактирование, 2 - добавление, 0 - нет карточки
    editingClient: null,
    lastCode: 115,
  };

  componentDidMount = () => {
     mobileEvents.addListener('EvEditClient', this.editClient);
     mobileEvents.addListener('EvDeleteClient', this.deleteClient);
     mobileEvents.addListener('EvClickSave', this.clickSave);
     mobileEvents.addListener('EvClickCancel', this.clickCancel);
     mobileEvents.addListener('EvClickAdd', this.clickAdd);
   };

  componentWillUnmount = () => {
     mobileEvents.removeListener('EvEditClient', this.editClient);
     mobileEvents.removeListener('EvDeleteClient', this.deleteClient);
     mobileEvents.removeListener('EvClickSave', this.clickSave);
     mobileEvents.removeListener('EvClickCancel', this.clickCancel);
     mobileEvents.removeListener('EvClickAdd', this.clickAdd);
  };

  /*------------------- изменение имени компании 1-Velcom, 2-MTS ---------------------*/
    setName1 = () => {
      this.setState({name:'Velcom'});
    };
    setName2 = () => {
      this.setState({name:'MTS'});
    };

  /*----------------------- устанавливаем фильтрацию элемента ------------------------*/
    showAllClients = () => {
      this.setState({clientsFilter:'all'});
    };
    showActiveClients = () => {
      this.setState({clientsFilter:'active'});
    };
    showBlockedClients = () => {
      this.setState({clientsFilter:'blocked'});
    };
  /*------------- ВЫЗЫВАЕМ КАРТОЧКУ ={РЕДАКТИРОВАНИЕ КЛИЕНТА}= ПО КНОПКЕ РЕДАКТИРОВАНИЕ -----------------*/
    editClient = (client) => {
        this.setState( {
        editingClient: client,
        workMode: 1,
      });
    };
  /*---------------------- УДАЛЯЕМ КЛИЕНТА ПО КНОПКЕ УДАЛИТЬ -------------------------*/
    deleteClient = (clientId) => {
      let confirmQuestion = confirm("Вы уверены что хотите удалить этот товар?");
      if (confirmQuestion) {
        let newClients = [...this.state.clients]; // копия самого массива клиентов
        let filteredClients = newClients.filter( el => el.id !== clientId);  //удалим элемент (клиента) из массива
        this.setState({
          clients: filteredClients,
          workMode: 0,
        });
      }
    };
  /*------------- ВЫЗЫВАЕМ КАРТОЧКУ ={ДОБАВЛЕНИЯ КЛИЕНТА}= ПО КНОПКЕ ДОБАВИТЬ КЛИЕНТА -----------------*/
    addClient = () => {
      this.setState( {
        editingClient: null,
        workMode: 2,
      });
    };
  /*------------- ПЕРЕОПРЕДЕЛЯЕМ ID ДЛЯ ДОБАВЛЕНИЯ КЛИЕНТА -----------------*/
    lastCodeChange = (code) => {
      this.setState( {lastCode: code,    })
    };
  /*------------- СОХРАНЯЕМ ИЗМЕНЕНИЯ В КАРТОЧКЕ ={РЕДАКТИРОВАНИЕ КЛИЕНТА}= ПО КНОПКЕ SAVE -----------------*/
    clickSave = (clientData) => {
      let changed = false;
      let newClients = [...this.state.clients]; // создаем копию массива клиентов

      let indexClient = newClients.findIndex((curClient) => {
        return curClient.id === clientData.id;  // ------ если значения code совпадают, то меняет на item
      });

      if(newClients[indexClient].id !== clientData.id ||        // проверяем изменилиль ли данные у
        newClients[indexClient].fam !== clientData.fam ||       // редакируемого клиента
        newClients[indexClient].im !== clientData.im ||
        newClients[indexClient].otch !== clientData.otch ||      // если изменились, то переопределяем
        newClients[indexClient].balance !== clientData.balance   // изменившегося клиента
      ){
        newClients[indexClient] = clientData;
        changed = true;
      }

      if ( changed ) {                // если были изменения, то переопределяем state
        this.setState({
          editingClient: null,
          workMode: 0,
          clients: newClients
        });
      }
    };
  /*------------- ДОБАВЛЯЕМ НОВОГО КЛИЕНТА В СПИСОК КЛИЕНТОВ ПО КНОПКЕ SAVE -----------------*/
    clickAdd = (clientData) => {
      let newClients=[...this.state.clients]; // копия самого массива клиентов
      newClients.push(clientData);
      this.setState({
        editingClient: null,
        workMode: 0,
        clients:newClients,
      });
      this.lastCodeChange(clientData.id + 1) // изменяем ID следующего нового клиента
    };
  /*---------- ОТМЕНЯЕМ ВСЕ ИЗМЕНЕНИЯ И ЗАКРЫВАЕМ КАРТОЧКУ КЛИЕНТА ПО КНОПКЕ CANCEL -------------*/
    clickCancel = () => {
      this.setState({
        editingClient: null,
        workMode: 0,
      });
    };

    render() {
      console.log("MobCompany render");
      let clientsCode=this.state.clients.map( client => {
        // если выбраны все клиенты
        if(this.state.clientsFilter === 'all'){
          return <MobClient key={client.id} client={client} balance={client.balance} />;
        }
        //если выбраны только активные клиенты
        else if(this.state.clientsFilter === 'active'&& client.balance > 0){
            return <MobClient key={client.id} client={client} balance={client.balance} />
          }
        //если выбраны только заблокированные клиенты
        else if(this.state.clientsFilter === 'blocked'&&client.balance <= 0){
             return <MobClient key={client.id} client={client} balance={client.balance} />
        }
      });

     //console.log('Выбраны клиенты: ' + this.state.clientsFilter);

      return (
        <React.Fragment>
          <div className='MobCompanyControl'>
            <input className = 'MobCompany' type="button" value="Velcom" onClick={this.setName1} />
            <input className = 'MobCompany' type="button" value="MTS" onClick={this.setName2} />
            <div className = 'MobCompany'> Компания: {this.state.name}</div>
         </div>

          <div className='MobCompanyControl'>
            <input className = 'MobCompany' type="button" value="Все" onClick={this.showAllClients} />
            <input className = 'MobCompany' type="button" value="Активные" onClick={this.showActiveClients} />
            <input className = 'MobCompany' type="button" value="Заблокированные" onClick={this.showBlockedClients} />
          </div>
        <table  key = 'table'
                className = 'MobCompany'>
          {/*<caption className = 'MobCompany'>Компания: {this.state.name}</caption>*/}
        <tbody className = 'MobCompany'>
        <tr className = 'MobCompany'>
          <th className = 'MobCompany'>Фамилия</th>
          <th className = 'MobCompany'>Имя</th>
          <th className = 'MobCompany'>Отчество</th>
          <th className = 'MobCompany'>Баланс</th>
          <th className = 'MobCompany'>Статус</th>
          <th className = 'MobCompany'>Редактировать</th>
          <th className = 'MobCompany'>Удалить</th>
        </tr>
        {clientsCode}
        </tbody>
      </table>
        {
          <div key='add__button'
               className='MobCompany'>
            <input  type='button'
                    onClick = {this.addClient}
                    value ='Добавить клиента'/>
          </div>
        }
{/* Карточка для редактирование  или создания клиента*/}
        {
          (this.state.workMode === 1 || this.state.workMode === 2) &&
          <React.Fragment>

          <ClientCard key = {this.state.editingClient?this.state.editingClient.id : "Create"}
                      workMode={this.state.workMode}
                      client={this.state.editingClient}
                      lastCode={this.state.lastCode}/>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default MobCompany;
