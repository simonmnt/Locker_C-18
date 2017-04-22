var loading = false;
var canvas = document.getElementById('canvas');
console.log(1);
canvas.width = 960;
canvas.height = 640;
var ctx = canvas.getContext('2d');
console.log(2);
var tileset = new Tileset('./img/tileset.png');
console.log(3);
var laby = new Labyrinthe(mazes, 3);
console.log(4);
if(loading){
laby.afficheCarte();}
console.log(5);