"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './CosmeticsList.css';

import Item from './Item';
import CardItem from './CardItem';

class CosmeticsList extends React.Component {

    static propTypes = {
        startWorkMode: PropTypes.number.isRequired,
        workMode: PropTypes.number,
        items:  PropTypes.array.isRequired,       // ------------- массив с товарами
        itemSelectNumb: PropTypes.number,         // ------------- key выбранного товара
        itemSelectClassName: PropTypes.string,    // ------------- className выбранного товара  
        itemNotSelectClassName: PropTypes.string, //-------------- className не выбранного товара
        editItems: PropTypes.array,
        
    };

/*---------------------- ИНИЦИАЛИЗИРУЕМ СОСТОЯНИЕ КОМПОНЕНТА -----------------------*/
    state = {
            items: this.props.items.slice(),            // ------------- перезаписываем массив с товарами в state
            itemSelectNumb: null,                       // ------------- нет выбранного товара
            itemSelectClassName: "itemSelect",          
            itemNotSelectClassName: "Item",
            workMode: this.props.startWorkMode,
            editItems: null,
            isDisabled: false,
            isRedactTime:false,
        };

/*------------------------------ КРАСИМ ВЫБРАННЫЙ ЭЛЕМЕНТ --------------------------*/
    selectItem = (item) => {
        this.setState({
            itemSelectNumb: item.code,
            workMode: 3,                                                   // ------- перезаписываем отфильтрованный массив в state
            editItems: item,
        });       // ------------- устанавливаем в state key выбранного элемента
        //console.log('выбран элемент с code: ' + item.code)
    };

/*--------------------- УДАЛЕНИЕ ПО КНОПКЕ ТОВАРА ИЗ СПИСКА ------------------------*/
    deleteItem = (itemCode) => {
        let confirmQuestion = confirm("Вы уверены что хотите удалить этот товар?");
        if (confirmQuestion) {
            let filteredItems = this.state.items.filter(el => el.code !== itemCode);  // ------- удаляем из массива элемент если его key совпадают с itemKey
                this.setState({
                    workMode: 0,// ------- перезаписываем отфильтрованный массив в state
                    items: filteredItems,
                    editItems: null,

            });
            console.log('выбран элемент с code: ' + itemCode + ' был удален');
        }
    };
/*--------------------- ОТОБРАЖЕНИЕ КАРТОЧКИ РЕДАКТИРОВАНИЕ ПО КНОПКЕ ТОВАРА ИЗ СПИСКА ------------------------*/
    editItem = (item) => {
        this.setState({  
                workMode: 1,                                                   // ------- перезаписываем отфильтрованный массив в state
                editItems: item,
                itemSelectNumb: null
        })
    };

    addItem = (isVal) => {
        this.setState({
            workMode: 2,                                                   // ------- перезаписываем отфильтрованный массив в state
            isRedactTime: isVal,
            itemSelectNumb: null
        })
    };
    isRedactTime = (_value) =>{
        this.setState({isRedactTime: _value})
    };
/*----------------- ИЗМЕНЕНИЕ СПИСКА ПРИ ДОБАВЛЕНИИ ИЛИ РЕДАКТИРОВАНИИ ТОВАРА -----------*/
    editItemList = (item) => {

        let filteredItem = this.state.items.map(el => {
            //console.log(el);
            if(el.code === item.code){
                el.price =  item.price;
                el.count =  item.count;
                el.itemName = item.itemName;
            }
            return el;
        });

          // ------- удаляем из массива элемент если его key совпадают с itemKey
        this.setState({
            // ------- перезаписываем отфильтрованный массив в state
            items: filteredItem,
            workMode: 0,
        });
        //console.log('поменяли воркмоде и меняем вид компонента')
        //console.log(this.state.items)
    };


    addItemToList = (item) => {
        let filteredItem = this.state.items.map(el => {
            console.log(el);
            return el;
        });

        console.log(filteredItem);

        // ------- удаляем из массива элемент если его key совпадают с itemKey
        this.setState({                                                     // ------- перезаписываем отфильтрованный массив в state
            items: filteredItem,
            workMode: 2,
        });

        /*let filteredItem = this.state.items.filter(el => el.code !== item.code);
                filteredItem.push(item);
                console.log(filteredItem);*/
        //let filItem = this.state.items.filter(el => el.code === item.code);
        //filteredItem.push(item);
    };
    cancel = () =>{
        this.setState({                                                     // ------- перезаписываем отфильтрованный массив в state

            workMode: 0,
        });
    };

/*----------------------------- РЕНДЕР КОМПОНЕНТА ---------------------------------*/
    render() {

        let itemList = this.state.items.map((el, i) =>
            <Item   key = {el.code}
                    code = {el.code?el.code:11}
                    numb = {i+1}
                    data = {el}
                    cbSelectItem = {this.selectItem}
                    cbDeleteItem =  {this.deleteItem}
                    cbEditItem = {this.editItem}
                    itemClassName = {(this.state.itemSelectNumb == el.code)?this.state.itemSelectClassName:this.state.itemNotSelectClassName}
                    isRedactTime = {this.state.isRedactTime}
            />
        );

        let arr = [];
        arr.push( 
/*--------------------- СОЗДАЕМ ШАПКУ ТАБЛИЦЫ СПИСКА ТОВАРОВ -----------------------*/            
            <table  key = 'table'
                    className = 'CosmeticsList__table'>
            <caption className = 'CosmeticsList__caption'>Store of cosmetics</caption>
            <tbody className = 'CosmeticsList__tbody'>
                <tr className = 'CosmeticsList__tr'>
                    <th className = 'CosmeticsList__th'>№</th>
                    <th className = 'CosmeticsList__th'>Name</th>
                    <th className = 'CosmeticsList__th'>Photo</th>
                    <th className = 'CosmeticsList__th'>Price, $</th> 
                    <th className = 'CosmeticsList__th'>Count in the store</th>
                    <th className = 'CosmeticsList__th'>Control</th>
                </tr>
            {itemList}
            </tbody>
        </table>
        );
        //console.log(this.state.editItems);

        arr.push(
            <CardItem   key = {this.state.editItems?this.state.editItems:this.state.editItems}
                        data = {this.state.editItems?this.state.editItems:this.state.workMode}
                        workMode = {this.state.workMode}
                        cbEditItemList = {this.editItemList}
                        cbAddItemToList = {this.addItemToList}
                        cbCancel = {this.cancel}
                        cbAddItem = {this.addItem}
                        cbIsRedactTime= {this.isRedactTime}
            />
        );

        return (
            <React.Fragment>
                {arr}
            </React.Fragment>
        )
    }
}

export default CosmeticsList;