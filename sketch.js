//Create variables here
var dog, dogImage, happyDog, dogHappy, database, foodS, foodStock;
var database, position;
var Milkbottle, MilkbottleImage;
var feed, addFood;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  MilkbottleImage = loadImage("Milk.png");
}
  
function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  var dogPosition = database.ref("Food/position");
  dogPosition.on("value", readPosition, showError);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

}


function draw() {  
  background(46,139,87);
  foodObj.display();

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

function readPosition(data){
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Error in reading database");
}


