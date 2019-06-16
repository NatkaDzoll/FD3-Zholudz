var arrString = [
    'аафвлуекепльдфукавабмп', 
    'рывмдлвьаишвдбьывсыв', 
    'вывждльвишщвамдылв', 
    'уцабьчаваирлдфтилоыл', 
    'лывммыввиаимориыв', 
    'ждьывмоыиргыосмывс', 
    'екпдлытьмлтоыивсжь',
]
var filtrArr = arrString.filter(function(el) {
    return el.indexOf('иш')!=-1;
})

ReactDOM.render(
    React.createElement(List, {words: arrString}),
    document.getElementById("app")
);
