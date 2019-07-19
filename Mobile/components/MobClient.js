import React from 'react';
import PropTypes from 'prop-types';

import './MobClient.css';
import {mobileEvents} from "./events";

class MobClient extends React.PureComponent {

  static propTypes = {
    client:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
    }),
    balance: PropTypes.number.isRequired,
  };

  state = {
    client: this.props.client,
    balance: this.props.balance,
    status: this.props.balance>0?"active":"blocked",
  };

  componentWillReceiveProps = (newProps) => {
    //console.log("MobileClient id="+this.props.id+" componentWillReceiveProps");
    this.setState({
      client:newProps.client,
      balance:newProps.balance,
      status: newProps.balance>0?"active":"blocked",
    });
  };

  /*----------- РЕДАКТИРУЕМ КЛИЕНТА ------------*/
  editClient = () => {
    console.log("Вызвали Edit");
     mobileEvents.emit('EvEditClient', this.props.client);
  };
  /*----------- УДАЛЯЕМ КЛИЕНТА ------------*/
  deleteClient = () => {
    console.log("Вызвали Delete");
    mobileEvents.emit('EvDeleteClient', this.props.client.id);
  };

  render() {

    console.log("MobClient id="+this.props.client.id+" render");
    return  (
      <tr className = 'MobClient' key = {this.props.client.id}
         /*className = {this.props.itemClassName}
          onClick = {this.selectedItem}*/>
        <td className = 'MobClient'>{this.props.client.fam}</td>
        <td className = 'MobClient'>{this.props.client.im}</td>
        <td className = 'MobClient'>{this.props.client.otch}</td>
        <td className = 'MobClient'>{this.props.balance}</td>
        <td className = {this.state.status}>{this.state.status}</td>
        <td className = 'MobClient'>
          <input  type = 'button'
                  className = 'edit__button'
                  onClick = {this.editClient}
                  value = 'Редактировать'/>
        </td>
        <td className = 'MobClient'>
          <input  type = 'button'
                className = 'delete__button'
                onClick = {this.deleteClient}
                value = 'Удалить'/>
        </td>
      </tr>
    )
    /*return (
      <div className='MobClient'>
        <span className='MobClientBalance'>{this.state.balance}</span>
        <span className='MobClientFIO'>{this.state.FIO.fam+" "+this.state.FIO.im+" "+this.state.FIO.otch}</span>
      </div>
    );*/


  }

}

export default MobClient;