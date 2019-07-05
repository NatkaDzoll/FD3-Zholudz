"use stict";
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
        workMode:PropTypes.number.isRequired,  // ------ 1-add, 2-edit, 3-see, 0-button
        title: PropTypes.string,
    };
    state = {
        workMode: this.props.workMode,
        title:  null,
        code: null,
        itemName: null,
        price: null,
        url: null,
        
    }

    addItem = (EO) => {
        EO.stopPropagation();                   // --------- останавливаем всплытие React события
        this.props.cbAddItem(this.props.data);
    }
    handleChange= (EO) => {
        let fieldName = EO.target.name
        //console.log(EO.target.name + ' ' + EO.target.value)
        this.setState({EO.target.name: EO.target.value});
        console.log(this.state)
    }
    handleSubmit = (EO) =>{
        console.log('ENTER SUBMIT');
        EO.preventDefault();
    }
    render() {


    var arr = [];
        
        if(this.props.workMode === 0 || 1) {
            arr.push(
                <div key = 'add__button'
                     className ='add__button'>
                    <input  type = 'button' 
                            onClick = {this.addItem}
                            Value = 'Add product'></input>
                </div>)
        }
        if(this.props.data) {
            var itemData = this.props.data;
            //console.log('key = ' + itemData.itemName)
            
            if(this.props.workMode === 1) {
                arr.push(
                    <React.Fragment>
                         <h2 key = 'title' 
                     className = 'EditListTitle'>Edit Product</h2>
                    <form key = 'formAdd' name = 'formList' onSubmit={this.handleSubmit} > 
                         <div className = "strList">
                        <img src = {itemData.url} className = "item__img"/>                 
                    </div>
                    
                    <div className = "strList">
                        <label className = "labelList">Code: {itemData.code}</label>
                    </div>
                    
                    <div className = "strList">
                        <label className = "labelList"> Name: 
                            <input  className = "inputList"
                                    type = "text" 
                                    name = "itemName" 
                                    value = {itemData.itemName}
                                    onChange = {this.handleChange}/>
                        </label>
                    </div>
                    
                    <div className = "strList">
                        <label className = "labelList"> Price: 
                            <input  className = "inputList"
                                    type = "text" 
                                    name = "price" 
                                    defaultValue = {itemData.price}
                                    onChange = {this.handleChange}/>
                        </label>
                    </div>
                    
                <div className = "strList">
                        <label className = "labelList"> Count: 
                            <input  className = "inputList"
                                    type = "text" 
                                    name = "count" 
                                    defaultValue = {itemData.count}
                                    onChange = {this.handleChange}/>
                        </label>
                    </div>
                    
                <input type="button" value="Save" />
                <input type="button" value="Cancel" />
                </form>
                </React.Fragment>
            )
        }

        if(this.props.workMode === 3) {
            arr.push(
                <h2 key = 'title' 
                    className = 'EditListTitle'>{this.props.data.itemName}</h2>
            )
            arr.push(
                <div  key = {itemData.code} 
                    className = 'ItemList'> 
                    <img className = 'item__img' src = {itemData.url}/>
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