import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

class Item extends React.Component {
    
    static propTypes = {
        numb: PropTypes.number.isRequired,           // ----- порядковый номер в интернет магазине
        data: PropTypes.shape({                      // ----- массив с данными о каждом item
            code: PropTypes.number.isRequired,        
            itemName: PropTypes.string.isRequired,   // ----- назвазвание item
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
        }),
        cbSelectItem: PropTypes.func.isRequired,  
        itemClassName: PropTypes.string.isRequired,
        cbDeleteItem: PropTypes.func.isRequired,
        cbEditItem: PropTypes.func.isRequired,
        //selectClass: PropTypes.string.isRequired,
    }
/*----------- ОПРЕДЕЛЯЕМ ВЫБРАННЫЙ ЭЛЕМЕНТ И ПЕРЕДАЕМ РОДИТЕЛЮ ------------*/
    selectedItem = (EO) => {
       this.props.cbSelectItem(this.props.data);
    }
/*----------- ОПРЕДЕЛЯЕМ ВЫБРАННЫЙ ЭЛЕМЕНТ И ПЕРЕДАЕМ РОДИТЕЛЮ ------------*/
    deletedItem = (EO) => {
        EO.stopPropagation();                   // --------- останавливаем всплытие React события
        this.props.cbDeleteItem(this.props.data.code);
    }
    editItem = (EO) => {
        console.log("Вызвали Едит");
        EO.stopPropagation();                   // --------- останавливаем всплытие React события
        this.props.cbEditItem(this.props.data);
    }

/*------------------------- РЕНДЕР КОМПОНЕНТА ----------------------------*/
    render() {
        var itemData = this.props.data;
        //console.log(itemData);

        return  (
        <tr key = {itemData.code} 
            className = {this.props.itemClassName}
            onClick = {this.selectedItem}>
            <td className = 'item__td'>{this.props.numb}</td>
            <td className = 'item__td'>{itemData.itemName}</td>
            <td className = 'item__td'>{itemData.url}
                
            </td>
            <td className = 'item__td'>{itemData.price}</td>
            <td className= 'item__td'>{itemData.count}</td>
            <td className = 'item__td'>
                <input  type = 'button' 
                        className = 'edit__button'
                        onClick = {this.editItem}
                        value = 'Edit'/>
                        <input  type = 'button' 
                        className = 'delete__button'
                        onClick = {this.deletedItem}
                        value = 'X'/>
            </td> 
           
            </tr>
            
        )
    }
};

export default Item;
