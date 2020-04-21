let video;
let label = 'waiting.....';
let classifier;

// STEP 1: Load the model!


function preload() {
classifier     =    ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/hhMb-T3Vl/'  +'model.json');

}






let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  
  classifyAudio();  
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

// STEP 2 classify!
function classifyAudio(){

classifier.classify(gotResults);
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function controlSnake() {
  if (label === 'left') {
    snake.setDir(-1, 0);
  } else if (label === 'right') {
    snake.setDir(1, 0);
  } else if (label === 'down') {
    snake.setDir(0, 1);
  } else if (label === 'up') {
    snake.setDir(0, -1);
  }
  

}

function draw() {
  scale(rez);
  background(220);
  text(label,10,50)
  fill(255)
  textSize(32)
  if (snake.eat(food)) {
    foodLocation();
  }
  
  
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}




// STEP 3: Get the classification!
function gotResults(error,results){
  if (error){
    console.error(error);
    return


}
   label =  results[0].label;
    controlSnake();
    
    
}