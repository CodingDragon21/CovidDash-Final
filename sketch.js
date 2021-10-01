var playerRunner, player
var edges;
var ground, movingGround;
var ground2;
var cloud, movingCloud;
var cloud2, movingCloud2;
var negative, negativeImg, positive
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var negativeGroup;
var cloudGroup;
var playerCollide;
var gameOver, gameOverText;
var restartButton, button;
var maskImg, mask
var bgImg
var bg
var change = true, time = 20
var gameState = "positive";
var protected
var tp, tpImg
var check = true
var title, titleImg
var collectSound
var cheerSound
var bgSound
var mic
var tp, tpImg, tpGroup, maybe = false
var muteImg,unmuteImg,sound
//var highScore = 0
localStorage['HighScore'] = 0
function preload() {
  playerRunner = loadAnimation(
    "./assets/costume1.svg",
    "./assets/costume2 (1).svg",
    "./assets/costume3.svg",
    "./assets/costume4.svg",
    "./assets/costume5.svg",
    "./assets/costume6.svg"
  );

  movingGround = loadImage("./assets/ground2.png");
  movingCloud = loadImage("./assets/cloud1.png");
  movingCloud2 = loadImage("./assets/cloud2.png");
  negativeImg = loadAnimation("./assets/negative1.svg",
  "./assets/negative2.svg",
  "./assets/negative3.svg",
  "./assets/negative4.svg",
  "./assets/negative5.svg",
  "./assets/negative6.svg");
  // gameOver = loadImage("./assets/gameover.svg");
  restartButton = loadImage("./assets/restart.svg");
  collideSound = loadSound("collided.wav");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.wav");
  maskImg = loadImage("./assets/mask.svg")
  bgImg = loadImage("./assets/bg2.png")
  positive = loadAnimation(    "./assets/costume1.svg",
  "./assets/costume2 (1).svg",
  "./assets/costume3.svg",
  "./assets/costume4.svg",
  "./assets/costume5.svg",
  "./assets/costume6.svg")

  protected = loadAnimation(    "./assets/protected1.svg",
  "./assets/protected2.svg",
  "./assets/protected3.svg",
  "./assets/protected4.svg",
  "./assets/protected5.svg",
  "./assets/protected6.svg")

  titleImg= loadImage("./assets/title.svg")
  
  bgSound = loadSound("bgMusicWav.wav")
  collectSound = loadSound("Coin.mp3")
  cheerSound = loadSound("Cheer.mp3")
  
  tpImg = loadImage("./assets/toilet paper.svg")

 

}

function setup() {

  createCanvas(4500, windowHeight - 20);

  bg = createSprite(width / 2, height / 2, 4500, height)
  bg.addImage("background", bgImg)
  bg.scale = 0.86


  //create a trex sprite
  player = createSprite(50, -80, 20, 50);
 
  player.addAnimation("running", playerRunner);
  player.addAnimation("masked", protected);
  player.changeAnimation("running")

  player.scale = .89;
  player.setCollider("rectangle", 0, 0, 30, 100);


  ground2 = createSprite(width / 2, height, width, 125);
  ground2.visible = false;


title = createSprite(115, 65, 20,20)
title.addImage("show", titleImg)
title.scale = 0.55

/*mute_btn = createImg("mute.png")
mute_btn.position(1250,40)
mute_btn.size(50,50)
mute_btn.mouseClicked(mute)*/



  /*gameOverText = createSprite(width/2, height/2);
  gameOverText.addImage("gameOver", gameOver);
  gameOverText.visible = false;
  
  button = createSprite(width/2, height/2 + 60);
  button.addImage("restart", restartButton);
  button.visible = false;
  
  var anynumber = Math.round(random(20, 100));
  console.log(anynumber);*/

  negativeGroup = createGroup();
  cloudGroup = createGroup();
  maskGroup = createGroup()
  tpGroup = createGroup()


}

function draw() {
  background("white");
 // console.log(tp.x)


  //bgSound.play()


  if (keyIsDown(UP_ARROW) && player.y >= 520) {
    player.velocityY = -9;
    jumpSound.play()
    
  }
  player.changeAnimation("running")

  player.velocityY = player.velocityY + 0.3;

  player.x = camera.position.x - 2100


  bg.setVelocity(-4, 0)




  if (gameState === "positive") {
 
    for (var i = 0; i < negativeGroup.length; i++) {
      if (negativeGroup.get(i).isTouching(player) && check === true) {
        // change = true
  
        negativeGroup.get(i).changeAnimation("red")
        score = score + 1;
        check = false
        setTimeout(function(){ check = true}, 1000)
      }
    }
    for (var i = 0; i < maskGroup.length; i++) {
      if (maskGroup.get(i).isTouching(player)) {
  
        gameState = "protected"
       collectSound.play()
        maskGroup.get(i).destroy()
        
      }
      
    }


    if(bg.x <-11000){
      gameState = "end"
      
    }
  
  }

  if(gameState === "protected"){
    negative.changeAnimation("blue")
    player.changeAnimation("masked")
    setTimeout(function(){ gameState = "positive", player.changeAnimation("running")}, 6000);
    console.log(gameState)
  }
  if(gameState === "end"){
    bg.setVelocity(0,0)
    maskGroup.destroyEach()
    negativeGroup.destroyEach();    
 

    if(frameCount % 6 === 0){
      tp = createSprite(random(player.x, player.x + 1100), 0, 20,20)
      tp.addImage("outbreak", tpImg)
      tp.depth = player.depth
      tp.setVelocity(0, 5)
      tp.scale = 0.5
      tp.lifetime = height/ 5
      tpGroup.add(tp)
      maybe = true
    }
    GameOver()
    if(!cheerSound.isPlaying()){
    cheerSound.play()
    }
   
  }
 
  if(maybe === true){
    console.log("it is there")
  }
  spawnNegative();
  spawnMask();
  

 
  //spawnClouds();
  player.collide(ground2);
// textSize(30)
//text(score, 500,100)
drawSprites()
}


function spawnNegative() {
  if (frameCount % 60 === 0) {

    var rand = Math.round(random(1,2))

    if(rand === 1){
      negative = createSprite(width - 3100, height - 100,20,20);
    }
    if(rand === 2){
      negative = createSprite(width - 3100, height - 100,20,20);
      negative = createSprite(width - 2800, height - 90,20,20);
    }
  
  //  negative = createSprite(width - 3100, height - 100);
   // console.log(negative)
    negative.velocityX = -4

    negative.addAnimation("blue", negativeImg)
    negative.addAnimation("red", positive)
    negative.changeAnimation("blue")

    negative.depth = bg.depth
    negative.depth += 1
    negative.scale = 0.89;
   // negative.debug = true
    negative.lifetime = width / 4
    negativeGroup.add(negative);
  }
}

function spawnMask() {
  if (frameCount % 140 === 0) {

    mask = createSprite(width - 3100, height - 250);
    mask.velocityX = -4
    mask.addImage("mask2", maskImg)

    mask.depth = negative.depth
    mask.depth -= 1
    mask.scale = 0.3;
    mask.lifetime = width / 4
    maskGroup.add(mask);
  }
}



function reset() {
  //score to 0
  gameState = PLAY


  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()

  trex.changeAnimation("running", trex_running);
  if (score > localStorage['HighScore']) {
    localStorage['HighScore'] = score
  }
  score = 0
  //obstacles and clouds has to go back

  //gameState has to be play


}

function GameOver(){
swal(
  {
    title: " You infected " + score + " people",
    text: "I want to inform YOU that if we all do our part and protect ourselveles by wearing masks, washing our hands and getting the vaccine we can make a differnce in the world. WE CAN DO THIS TOGETHER!",
    confirmButtonText: "Play Again"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }

);

}
