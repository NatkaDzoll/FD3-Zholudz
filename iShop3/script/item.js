'use strick'
var Item = React.createClass({

    displayName: 'Item',

    propTypes:{
        numb: React.PropTypes.number.isRequired,           // ----- порядковый номер в интернет магазине
        data: React.PropTypes.shape({                      // ----- массив с данными о каждом item
            key: React.PropTypes.number.isRequired,        // ----- key для React компонентов
            itemName: React.PropTypes.string.isRequired,   // ----- назвазвание item
            price: React.PropTypes.number.isRequired,
            count: React.PropTypes.number.isRequired,
            url: React.PropTypes.string.isRequired,
        }),
        cbSelectItem: React.PropTypes.func.isRequired,  
        itemClassName: React.PropTypes.string.isRequired,
        cbDeleteItem: React.PropTypes.func.isRequired,
        //selectClass: React.PropTypes.string.isRequired,
    },
/*----------- ОПРЕДЕЛЯЕМ ВЫБРАННЫЙ ЭЛЕМЕНТ И ПЕРЕДАЕМ РОДИТЕЛЮ ------------*/
    selectedItem: function(EO) {
       this.props.cbSelectItem(this.props.data.key);
    },
/*----------- ОПРЕДЕЛЯЕМ ВЫБРАННЫЙ ЭЛЕМЕНТ И ПЕРЕДАЕМ РОДИТЕЛЮ ------------*/
    deletedItem: function(EO) {
        EO.stopPropagation();                   // --------- останавливаем всплытие React события
        this.props.cbDeleteItem(this.props.data.key);
    },

/*------------------------- РЕНДЕР КОМПОНЕНТА ----------------------------*/
    render: function() {
        var itemData = this.props.data;
        //console.log(itemData);
        return  React.createElement("tr", {className: this.props.itemClassName, onClick: this.selectedItem},
        React.createElement("td", {className: 'item__td'}, this.props.numb),
                React.createElement("td", {className: 'item__td'}, itemData.itemName),
                React.createElement("td", {className: 'item__td'}, 
                    React.createElement("img", {className: 'item__img', src: itemData.url}),
                ),
                React.createElement("td", {className: 'item__td'}, itemData.price),
                React.createElement("td", {className: 'item__td'}, itemData.count),
                React.createElement("td", {className: 'item__td'}, 
                    React.createElement("input", {type: 'button', className: 'item__button', onClick: this.deletedItem, value: 'X'}, ),
                ),
            )
        },
    
})
