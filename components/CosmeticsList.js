'use strick'
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
            editItems: null
        };

/*------------------------------ КРАСИМ ВЫБРАННЫЙ ЭЛЕМЕНТ --------------------------*/
    selectItem = (item) => {
        this.setState({ itemSelectNumb: item.code, });       // ------------- устанавливаем в state key выбранного элемента
        console.log('выбран элемент с code: ' + item.code);
        this.setState({  
            workMode: 3,                                                   // ------- перезаписываем отфильтрованный массив в state
            editItems: item,
    })
    };

/*--------------------- УДАЛЕНИЕ ПО КНОПКЕ ТОВАРА ИЗ СПИСКА ------------------------*/
    deleteItem = (itemCode) => {
        var confirmQuestion = confirm("Вы уверены что хотите удалить этот товар?");
        if (confirmQuestion) {
            var filteredItems = this.state.items.filter(el => el.code !== itemCode);  // ------- удаляем из массива элемент если его key совпадают с itemKey
                this.setState({                                                     // ------- перезаписываем отфильтрованный массив в state
                    items: filteredItems,
            })
            console.log('выбран элемент с code: ' + itemCode + ' был удален');
        }
    };
/*--------------------- РЕДАКТИРОВАНИЕ ПО КНОПКЕ ТОВАРА ИЗ СПИСКА ------------------------*/
    editItem = (item) => {
        this.setState({  
                workMode: 1,                                                   // ------- перезаписываем отфильтрованный массив в state
                editItems: item,
                itemSelectNumb: null
        })
    }
    addItem = (item) => {
        this.setState({  
            workMode: 1,                                                   // ------- перезаписываем отфильтрованный массив в state
            editItems: item,
        })        
        console.log('поменяли воркмоде и меняем вид компонента')            
    }
/*----------------------------- РЕНДЕР КОМПОНЕНТА ---------------------------------*/
    render() {

        var itemList = this.state.items.map((el, i) => 
            <Item   key = {el.code}
                    code = {el.code}                  
                    numb = {i+1}
                    data = {el}
                    cbSelectItem = {this.selectItem}
                    cbDeleteItem =  {this.deleteItem}
                    cbEditItem = {this.editItem}
                    itemClassName = {(this.state.itemSelectNumb == el.code)?this.state.itemSelectClassName:this.state.itemNotSelectClassName}
            />
        )

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
        )
        console.log(this.state.workMode)
        arr.push(
            <CardItem   key = 'CardItem'
                        data = {this.state.editItems} 
                        workMode = {this.state.workMode}
                        cbAddItem = {this.addItem}/>
        )
        //console.log(this.state.editItems.itemName)
        
        return (
            <React.Fragment>
                {arr}
            </React.Fragment>
        )
    }
}

export default CosmeticsList;