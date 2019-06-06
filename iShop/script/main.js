 

var store = [
    {key:1, itemName: "Mascara", price: 60, count: 9, url:"img/mascara.jpg"},
    {key:2, itemName: "Concealer", price: 53, count: 5, url:"img/concealer.jpg"},
    {key:3, itemName: "A set of cosmetics for the face: Foundation, Powder, Corector and Buff", price: 230, count: 3, url:"img/makeup_kit.jpg"},
    {key:4, itemName: "Face cream", price: 38, count: 7, url:"img/cream_face.jpg"},
    {key:5, itemName: "Eye shadow", price: 49, count: 6, url:"img/eye_shadow.jpg"},
    {key:6, itemName: "Lipstick set", price: 127, count: 3, url:"img/lipstick_set.jpg"},
    {key:7, itemName: "Foundation brush", price: 17, count: 9, url:"img/brush_concealer.jpg"},
    {key:8, itemName: "Powder brush", price: 18, count: 13, url:"img/brush_powder.jpg"},
    {key:9, itemName: "Bronzer brush", price: 14, count: 8, url:"img/brushes_bronzer.jpg"},
    {key:10, itemName: "Highlighter brush", price: 16, count: 10, url:"img/brush_higtliter.jpg"},
    
];

ReactDOM.render(
    React.createElement(CosmeticsList, {items: store}), 
    document.getElementById("app")
);