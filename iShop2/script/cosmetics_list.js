'use strick'
var CosmeticsList = React.createClass({

    displayName: 'CosmeticsList',
    
    propTypes: {
        items:  React.PropTypes.array.isRequired,       // ------------- массив с товарами
        itemSelectNumb: React.PropTypes.number,         // ------------- key выбранного товара
        itemSelectClassName: React.PropTypes.string,    // ------------- className выбранного товара  
        itemNotSelectClassName: React.PropTypes.string, //-------------- className не выбранного товара
    },

/*---------------------- ИНИЦИАЛИЗИРУЕМ СОСТОЯНИЕ КОМПОНЕНТА -----------------------*/
    getInitialState: function() {
        return{
            items: this.props.items.slice(),            // ------------- перезаписываем массив с товарами в state
            itemSelectNumb: null,                       // ------------- нет выбранного товара
            itemSelectClassName: "itemSelect",          
            itemNotSelectClassName: "Item",
        };
     },

/*------------------------------ КРАСИМ ВЫБРАННЫЙ ЭЛЕМЕНТ --------------------------*/
    selectItem: function(itemKey) {
        this.setState({ itemSelectNumb: itemKey, });       // ------------- устанавливаем в state key выбранного элемента
        console.log('выбран элемент с key: ' + itemKey);
    },

/*--------------------- УДАЛЕНИЕ ПО КНОПКЕ ТОВАРА ИЗ СПИСКА ------------------------*/
    deleteItem: function(itemKey) {
        var confirmQuestion = confirm("Вы уверены что хотите удалить этот товар?");
        if (confirmQuestion) {
            var filteredItems = this.state.items.filter(el => el.key !== itemKey);  // ------- удаляем из массива элемент если его key совпадают с itemKey
                this.setState({                                                     // ------- перезаписываем отфильтрованный массив в state
                    items: filteredItems,
            })
            console.log('выбран элемент с key: ' + itemKey + ' был удален');
        }
    },
/*----------------------------- РЕНДЕР КОМПОНЕНТА ---------------------------------*/
    render: function() {
        var itemList = this.state.items.map((el, i) => {
            return React.createElement(Item, {
                key: el.key,                    
                numb: i+1,
                data: el,
                cbSelectItem:this.selectItem,
                cbDeleteItem: this.deleteItem,
                itemClassName: (this.state.itemSelectNumb == el.key)?this.state.itemSelectClassName:this.state.itemNotSelectClassName,
            });
        })
        //console.log(itemList)
        
/*--------------------- СОЗДАЕМ ШАПКУ ТАБЛИЦЫ СПИСКА ТОВАРОВ -----------------------*/
        return React.createElement("table", {className: 'CosmeticsList__table'},
            React.createElement("caption", {className: 'CosmeticsList__caption'}, 'Store of cosmetics'),
            React.createElement("tbody", {className: 'CosmeticsList__tbody'},
                React.createElement("tr", {className: 'CosmeticsList__tr'},
                React.createElement("th", {className: 'CosmeticsList__th'}, '№'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Name'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Photo'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Price, $'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Count in the store'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Delete'),
                ),
                itemList,
            )
        )
    }
})