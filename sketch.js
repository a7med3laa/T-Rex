var yVel;
var Obstacles=[];
var speed;
var horizon;
var y;
var onGround;
var score;


function setup() {
  
  createCanvas(600, 200);
  
  textAlign(CENTER);
  score=0;
  yVel=0;
  speed=6;
  horizon=height-40;
  y=20;
  onGround=false;
  
}

function draw() {
  
  background(51);
  
  //draw hor
  stroke(255);
  line(0,horizon,width,horizon);
  fill('#FF0000');
  ellipse(40,y,40);
  
  if(frameCount % 120 === 0){
    speed *=1.05;
  }
  
  if(frameCount % 30 === 0 ){
  if(random(0,1) > 0.8){
    newObstacles();
  }
  }
  
  score++;
  textSize(20);
        text("Score : "+ score, width/2, 30);
  
  
  updateObstacles();
  
  handleTRex();
}

function updateObstacles(){
  
  for(var i=Obstacles.length-1; i >= 0;i--){
    
    Obstacles[i].x -= speed;
    var x=Obstacles[i].x;
    var size =Obstacles[i].size;
    var s2= size/2;
    
    
    if(x > -30){
      // draw on screen
      fill(Obstacles[i].color);
      rect(x,horizon-size,size,size);
      
      //check collision
      var x1= x + s2;
      var y1= horizon - s2;
      if(dist(x1, y1, 40, y) < s2 + 20){
        //collision
        noStroke();
        fill(255);
        textSize(30);
        text("Game Over, Got you ;)", width/2,height/2);
        textSize(20);
        text("Press f5 to continue", width/2,height/2 +40);
        noloop();
        
      }
    }
    else{
      //delete from screen and array
      Obstacles.splice(i , 1);
    }
  }
}

function newObstacles(){
  
  var obs= new Obstacle(random(20 , 40), color( random(255),random(255),random(255)) );
  
  Obstacles.push(obs);
  
  
}


function handleTRex(){
  
  if ((y+20+yVel) < horizon){
    yVel += 0.6;
    onGround=false;
  }else  { 
    yVel = 0;
    onGround=true;
  }
  
  
  if(mouseIsPressed ||keyIsDown(UP_ARROW)||keyIsDown(32)){
    
    if(onGround){
      yVel-=10;
      onGround=false;
       }
    
  }
  
  //movement
    y+=yVel;
    
}