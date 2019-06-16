var List = React.createClass({

    displayName:'List',
    
    propTypes:{
        sorted: React.PropTypes.bool,
        words: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
        sortContain: React.PropTypes.string,
    },

/*---------------------- ИНИЦИАЛИЗИРУЕМ КОМПОНЕНТ -----------------------*/
    getInitialState: function () {    
        return {
          sorted: false,
          sortContain: "",
          words: this.props.words,
        };
      },

/*------------------ ПРОЦЕСС ФИЛЬТРАЦИИ И СОРТИРОВКИ --------------------*/
    processWords: function() {
        var currentWords = this.props.words.slice();        //-------------------- пересохранили передаваемый из props массив строк
        if (this.state.sortContain!="") {                   //-------------------- фильтрует по вводу строки
            currentWords = currentWords.filter(el =>
                el.indexOf(this.state.sortContain) != -1
            );
        };
        if (this.state.sorted==true){                       //-------------------- сортировку по алфавиту
            currentWords.sort();
        }
        this.setState({
            words: currentWords})                          //-------------------- заносим зменения в state
    },

/*-------------- ВКЛЮЧЕНИЕ И ВЫКЛЮЧЕНИЕ ПТИЧКИ СОРТИРОВКИ ---------------*/
    sortCheckedChange: function(EO) { 
            this.setState({
                sorted: EO.target.checked
            }, this.processWords);
    },
/*-------------------- ФИЛЬТРАЦИЯ ПО ВВОДИМОМУ ПОЛЮ ----------------------*/
    containChange: function(EO) {
        this.setState({
            sortContain: EO.target.value}, this.processWords);
        //console.log("в поле ввели: " + EO.target.value + " - А в contain лежит: " + this.state.contain);
        console.log('Слова были отфильтрованы. Обновлен список строк');
    },
/*----------------- СБРОС ФИЛЬТРА И СОРТИРОВКИ ПО КНОПКЕ -----------------*/
    refreshWords: function(){
        this.setState({
            sorted: false, 
            sortContain: "", 
            word: this.props.words}, this.processWords);
    },
/*------------------------- РЕНДЕР КОМПОНЕНТА ----------------------------*/
    render: function() {

        var optionList = [];
        this.state.words.forEach(function(el){                      // для каждого элемента массива делаем option
            var option = React.createElement("option", {
                key: optionList.length,                             // тем самым создаем список
                multiple: true, 
                className: 'List_option'}, el)
            optionList.push(option);
        })

        return React.createElement("div", {className: 'List'}, 
            React.createElement("input", {
                type: 'checkbox', 
                className: 'List_checkbox', 
                checked: this.state.sorted, 
                onChange: this.sortCheckedChange
            }),
            React.createElement("input", {
                type: 'text', 
                className: 'List_input', 
                value: this.state.sortContain, 
                onChange: this.containChange
            }),
            React.createElement("input", {
                type: 'button', 
                className: 'List_button',
                value: 'сброс', 
                onClick: this.refreshWords
            }),
            React.createElement("select", {
                multiple: true, 
                className: 'List_select'}, optionList) 
        ) 
    }
})