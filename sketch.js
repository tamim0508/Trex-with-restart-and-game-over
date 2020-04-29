var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var PLAY = 1
var END = 0;
var gameState = PLAY;
var ObstaclesGroup, CloudsGroup;
var gameRestart, gameOver, gameRestart1, gameOver1
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  gameRestart1 = loadImage("restart.png");
  
  gameOver1 = loadImage("gameOver.png");
  
  groundImage = loadImage("ground2.png")
  
  clouds = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //trex_collided = loadImage("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("co", trex_collided);
  trex.scale = 0.5;
  
  gameRestart = createSprite(300,100,20,50);
  gameRestart.addImage("re", gameRestart1);
  gameRestart.visible = false;
  gameRestart.scale = 0.5;
  
  gameOver = createSprite(300,50,20,50);
  gameOver.addImage("ov", gameOver1);
  gameOver.visible = false;
  gameOver.scale = 0.5
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
}

function draw() {
  background("blue");
  if(gameState === PLAY){
    //Trex Jumps
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
    
    
    
    
    
  //Spawning of Clouds
    spawnClouds();
  //Gravity
    trex.velocityY = trex.velocityY + 0.8
  //Spawning of obstacles
    spawnObstacles();
  //resets ground
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(ObstaclesGroup.isTouching(trex)){
       gameState = END;
      
       }
  }
  else if(gameState === END){
  //stops ground
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("co", trex_collided);
    gameRestart.visible = true;
    gameOver.visible = true;
  }
  if(mousePressedOver(gameRestart)){
    gameState = PLAY;
      gameRestart.visible = false;
      gameOver.visible = false;
      CloudsGroup.destroyEach();
      ObstaclesGroup.destroyEach();
      trex.changeAnimation("running", trex_running);
    }
  
  
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds(){
  if (frameCount % 60 === 0) {
   var cloud = createSprite(600,120,35,10);
    cloud.y = random(80,120);
    cloud.addImage("c",clouds);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    CloudsGroup.add(cloud);
  }
}
function spawnObstacles(){
 if(frameCount % 60 === 0) {
  var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
 obstacle.scale = 0.5;
  var rand = Math.round(random(1,6));
   ObstaclesGroup.add(obstacle);
 switch(rand){
   case 1 : obstacle.addImage("1", obstacle1);
     break;
        case 2 : obstacle.addImage("2", obstacle2);
     break;
case 3 : obstacle.addImage("3", obstacle3);
     break;
     case 4 : obstacle.addImage("4", obstacle4);
     break;
     case 5 : obstacle.addImage("5", obstacle5);
     break;
     case 6 : obstacle.addImage("6", obstacle6);
     break;
     default:break;
 }
   obstacle.lifetime = 100;
 } 
}