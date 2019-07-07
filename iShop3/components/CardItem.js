"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './CardItem.css';

class CardItem extends React.Component {
    static propTypes = {
        data: PropTypes.shape({                      // ----- массив с данными о каждом item
            code: PropTypes.number.isRequired,
            itemName: PropTypes.string.isRequired,   // ----- назвазвание item
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
        }),
        workMode:PropTypes.number.isRequired,  // ------ 1-edit, 2-add, 3-see, 0-button
        cbEditItemList:PropTypes.func.isRequired,
        cbAddItemToList:PropTypes.func.isRequired,
        cbAddItem: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        cbIsRedactTime: PropTypes.func.isRequired,
        };

    state = {
        code: this.props.data?this.props.data.code:null,
        itemName: this.props.data?this.props.data.itemName:null,
        price: this.props.data?this.props.data.price:null,
        count: this.props.data?this.props.data.count:null,
        url: this.props.data?this.props.data.url:null,

        itemNameValid: !!this.props.data.itemName,
        countValid: !!this.props.data.count,
        priceValid: !!this.props.data.price,
        urlValid: !!this.props.data.url,
        isDisabled: !this.props.data,  // ----------- кнопка не доступна

     };

    validStr = (_name, _value) => {
        if (!_value) { //---------- если поле вводимое пустое
            console.log("!_value = " +(!_value))
            this.setState({
                isDisabled:false,
                [_name + "Valid"]: false,
            })
        }

        else {
            console.log("!_value = " +(!_value))
            this.setState({
                [_name + "Valid"]: true,
                isDisabled:
                    (this.state.itemNameValid)||
                    (this.state.countValid)||
                    (this.state.priceValid)||
                    (this.state.urlValid)||false
            })
        }
    };

    addItem = (EO) => {
        //console.log("Вызвали add");
        EO.stopPropagation();
        this.setState({
            temNameValid: false,
            countValid: false,
            priceValid: false,
            urlValid: false,
            isDisabled: true,
        });
        this.props.cbIsRedactTime(true);//------ передаем родителю запрет на кнопки
        this.props.cbAddItem(this.state.isDisabled);
        //console.log(this.state);
    };

    handleChangeString = (EO) => {
        EO.stopPropagation();
        this.validStr(EO.target.name, EO.target.value);
        this.setState({[EO.target.name]:EO.target.value}); //--- переписываем значения в соответствии с именем поля
        this.props.cbIsRedactTime(true);//------ передаем родителю запрет на кнопки
    };

    handleChangeNumber = (EO) => {
        EO.stopPropagation();
        this.validStr(EO.target.name, EO.target.value);
        this.setState({[EO.target.name]: parseFloat(EO.target.value)}); //--- переписываем значения в соответствии с именем поля
        this.props.cbIsRedactTime(true); //------ передаем родителю запрет на кнопки
    };

    handleClickSave = (EO) =>{
        EO.stopPropagation();

        this.props.cbEditItemList(this.state);

        this.props.cbIsRedactTime(false);
    };
    handleClickCancel = (EO) =>{
        EO.stopPropagation();

        this.props.cbCancel(this.state.data);
        this.props.cbIsRedactTime(false);
    };
    // handleSubmit = (EO) =>{
    //     console.log('ENTER SUBMIT');
    //     EO.preventDefault();
    // };

    createInput = (_name, _value, _type, _nameValid) => {
        //let nameValid = _name+"Valid";
        return (
        <div className = "strList">
             <label className = "labelList"> {_name}
            <input  className = "inputList"
                    type = {_type}
                    name = {_name}
                    defaultValue = {_value}
                    onChange = {(_type==='number')?this.handleChangeNumber:this.handleChangeString}/>
            </label>
            <span className = "error">{(_nameValid)?" ": "Заполните поле!"} </span>
        </div>
        )
    };
 
    render(){
        let arr=[];
/*------------ СОЗДАЕМ КНОПКУ ADD PRODUCT ( ВИДНА ПРИ WORKMODE == 0, 3) ---------*/
        if(this.props.workMode === 3 || this.props.workMode === 0) {
            arr.push(
                <div key='add__button'
                     className='add__button'>
                    <input  type='button'
                            onClick = {this.addItem}
                            value ='Add product'/>
                </div>
            )
        }

/*------------ СОЗДАЕМ карточку для редактирования ( ВИДНА ПРИ "WORKMODE" == 1) ---------*/
        if(this.props.data){
            let itemData = this.props.data;
            if(this.props.workMode === 1) {
                arr.push(
                    <h2 key = 'title' className = 'EditListTitle'>Edit Product</h2>
                );
                arr.push(
                    <form key = 'formAdd' name = 'formList' onSubmit={this.handleSubmit}>
                        <div className = 'strList'>
                            <img src={itemData.url} className='item__img'alt='Image'/>
                        </div>

                        <div className='strList'>
                            <label className = 'labelLiWst'>Code: {itemData.code}</label><br/>
                        </div>

                        {this.createInput("itemName", itemData.itemName, "text", this.state.itemNameValid)}
                        {this.createInput("price", itemData.price, "number", this.state.priceValid)}
                        {this.createInput("count", itemData.count, "number", this.state.countValid)}

                        <input type="button" value="Save" onClick = {this.handleClickSave} disabled={!this.state.isDisabled}/>
                        <input type="button" value="Cancel" onClick = {this.handleClickCancel}/>
                    </form>
                )
            }

 /*------------ СОЗДАЕМ карточку для добавления продукта ( ВИДНА ПРИ "WORKMODE" == 2) ---------*/
            if(this.props.workMode === 2) {
                arr.push(
                    <h2 key = 'title' className = 'EditListTitle'>Add Product</h2>
                );
                arr.push(
                    <form key = 'formAdd' name = 'formList' onSubmit={this.handleSubmit}>

                        <div className='strList'>
                            <label className = 'labelLiWst'>Code: <span  className = "inputList">10</span></label><br/>
                        </div>
                        {this.createInput("url", "", "text",this.state.urlValid)}
                        {this.createInput("itemName", "", "text",this.state.itemNameValid)}
                        {this.createInput("price", "", "number", this.state.priceValid)}
                        {this.createInput("count", "", "number", this.state.countValid)}

                        <input type="button" value="Save" onClick = {this.handleClickSave} disabled={!this.state.isDisabled}/>
                        <input type="button" value="Cancel" onClick = {this.handleClickCancel}/>
                    </form>
                )
            }

 /*------------ СОЗДАЕМ карточку для просмотра продукта ( ВИДНА ПРИ "WORKMODE" == 3) ---------*/
            if(this.props.workMode === 3) {
                arr.push(
                    <h2 key = 'title' 
                        className = 'EditListTitle'>{this.props.data.itemName}</h2>
                );
                arr.push(
                    <div  key = {itemData.code} 
                        className = 'ItemList'> 
                        <img className = 'item__img' src = {itemData.url} alt='Not foto'/>
                        <div className = 'listPrice'>Price: {itemData.price}$</div>
                        <div className = 'listCount'>Count: {itemData.count}</div>
                    </div>
                )
            }

        }

    return (
        <React.Fragment>
            {arr}
        </React.Fragment>
    )}
}
export default CardItem;