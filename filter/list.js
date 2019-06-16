var List = React.createClass({

    displayName:'List',
    
    propTypes:{
        str: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
        sortChecked: React.PropTypes.bool,
        fieldText: React.PropTypes.string,
        cbFieldTextChange: React.PropTypes.func,
    },

    getDefaultProps: function(){
        return{
            str: '',
            sortChecked: false,
            fieldText: '',
        }
    },

    fieldTextChange: function(EO) {
        console.log("в поле ввели: " + EO.target.value);
       // this.props.cbFieldTextChange(EO.target.value);
    },
    
    updateStrList: function() {
        console.log('Обновить список строк');

    },

    render: function() {
        var optionList = [];
        this.props.str.forEach(function(el){
            var option = React.createElement("option", {key: optionList.length, 
                multiple: true, className: 'List_option'}, el)
            optionList.push(option);
           // console.log('code is  ' + optionList.length )
    })

        return React.createElement("div", {className: 'List'}, 
            React.createElement("input", {type: 'checkbox', className: 'List_checkbox'}),
            React.createElement("input", {type: 'text', className: 'List_input', onChange: this.fieldTextChange}),
            React.createElement("input", {type: 'button', value: 'сброс', className: 'List_button'}),
            React.createElement("select", {multiple: true, className: 'List_select'}, optionList) 
        ) 
    }
})