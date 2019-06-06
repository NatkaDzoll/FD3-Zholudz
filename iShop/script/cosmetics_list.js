
var CosmeticsList = React.createClass({
    displayName: 'CosmeticsList',
    propTypes: {
        items:  React.PropTypes.arrayOf(
            React.PropTypes.shape({
                key: React.PropTypes.number.isRequired,
                itemName: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                count: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
            }),
        ),
    },

    render: function(){
        var itemList = [];
        this.props.items.forEach(function(el){
            var itemStr = React.createElement("tr", {key: el.key},
                React.createElement("td", {className: 'CosmeticsList__td'}, el.key),
                React.createElement("td", {className: 'CosmeticsList__td'}, el.itemName),
                React.createElement("td", {className: 'CosmeticsList__td'}, 
                    React.createElement("img", {className: 'CosmeticsList__img', src: el.url}),
                ),
                React.createElement("td", {className: 'CosmeticsList__td'}, el.price),
                React.createElement("td", {className: 'CosmeticsList__td'}, el.count),
            )
            itemList.push(itemStr);
        });
        return React.createElement("table", {className: 'CosmeticsList__table'},
            React.createElement("caption", {className: 'CosmeticsList__caption'}, 'Store of cosmetics'),
            React.createElement("tbody", {className: 'CosmeticsList__tbody'},
                React.createElement("tr", {className: 'CosmeticsList__tr'},
                    React.createElement("th", {className: 'CosmeticsList__th'}, '№'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Name'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Photo'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Price, $'),
                    React.createElement("th", {className: 'CosmeticsList__th'}, 'Count in the store'),),
                itemList
            )
        )
    }
})
