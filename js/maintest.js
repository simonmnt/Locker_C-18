var loading = false;
var canvas = document.getElementById('canvas');
console.log(1);
canvas.width = window.innerWidth;
canvas.height = innerWidth;
var ctx = canvas.getContext('2d');
console.log(2);
var tileset = new Tileset('./img/tileset.png');
console.log(3);
var laby = new Labyrinthe(mazes, 5);
console.log(4);

if(loading){
    console.log("LOAD")
    laby.popMonster();
    laby.afficheCarte();

}
console.log(5);