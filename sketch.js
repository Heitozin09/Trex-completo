
var trex,trexRunning;
var ground,groundImg;
var invisibleGround;
var cloud;
var cloudImg;
var cacto
var cactoImg1
var cactoImg2
var cactoImg3
var cactoImg4
var cactoImg5
var cactoImg6
var score = 0
var record = 0
var play = 1
var end = 0
var gameState = play
var cloudGroup
var cactoGroup
var trexCollide 
var GameOver, GameOverImg
var Restart,RestartImg
var Jump
var die
var point



//preload carrega as midías do jogo 
function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImg=loadImage("ground2.png")
  cloudImg =loadImage("cloud.png")
  cactoImg1 =loadImage("obstacle1.png")
  cactoImg2 =loadImage("obstacle2.png")
  cactoImg3 =loadImage("obstacle3.png")
  cactoImg4 =loadImage("obstacle4.png")
  cactoImg5 =loadImage("obstacle5.png")
  cactoImg6 =loadImage("obstacle6.png")
  trexCollide = loadAnimation("trex_collided.png")
  GameOverImg = loadImage("gameOver.png")
  RestartImg = loadImage("restart.png")
  Jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  point = loadSound("checkpoint.mp3")

}
//setup faz a aconfiguração
function setup(){
  createCanvas(windowWidth,windowHeight);
  // criando as bordas
  trex = createSprite(50,height-40,20,50)
  trex.addAnimation("Running",trexRunning)
  trex.scale = 0.6
  trex.addAnimation("collided",trexCollide)
  trex.debug = false
  trex.setCollider("rectangle",0,0,50,50,60) 
  //trex.setCollider("circle",0,0,30)
  ground=createSprite(width/2,height-20,width,2)
  ground.addImage("ground",groundImg)

  invisibleGround = createSprite(width/2,height-10,width,2)
  invisibleGround.visible = false

  cloudGroup = new Group()
  cactoGroup = new Group()

  GameOver = createSprite(width/2,height-120,100,10)
  GameOver.addImage(GameOverImg)
  GameOver.scale = 0.5

  Restart = createSprite(width/2,height-80,50,50)
  Restart.addImage(RestartImg)
  Restart.scale = 0.5

  GameOver.visible = false
  Restart.visible = false

}

//draw faz o movimento, a ação do jogo
function draw(){
  background("white ");

  if (trex.isTouching(cactoGroup)) {
    gameState = end 
    //die.play()


  }

  if (gameState == play) {
    score += Math.round(getFrameRate()/60) 
    if (score%100==0&&score>0) {
      point.play()
    }
    
    if(touches.length>0||keyDown("space")&&trex.y > height-40){
      trex.velocityY = -12
      Jump.play()
      touches=[]
    }

    ground.velocityX=-(10+score/100)
    if(ground.x<250){
      ground.x=ground.width/2
    }

    createCloud()
    createCactos()
  }

  if (gameState == end) {
    trex.changeAnimation("collided",trexCollide)
    ground.velocityX = 0
    cactoGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    cactoGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    GameOver.visible = true
    Restart.visible = true

    if(record<score){
      record = score
    }
    if(mousePressedOver(Restart)){
      gameState = play
      GameOver.visible = false
      Restart.visible = false
      cactoGroup.destroyEach()
      cloudGroup.destroyEach()
      trex.changeAnimation("Running",trexRunning)
      score = 0
    }

  }

  
  trex.velocityY = trex.velocityY +0.5
 
  fill ("black")
  textSize(18)
  textAlign(CENTER,TOP)
  text("score: "+score,width-1300,height-170)
  text("record: "+record,width-1300,height-155)

  trex.collide(invisibleGround)
   //coordenadas do mouse na tela
   //text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}

function createCloud() {
  if(frameCount%60 == 0){
    cloud = createSprite(width,random(height-169,height-110),10,10)
    cloud.velocityX = -(4+score/100)
    cloud.addImage(cloudImg)
    cloud.scale = random(0.3,1.5)
    cloud.depth = trex.depth -1
    cloud.lifetime = width/cloud.velocityX
    cloudGroup.add(cloud)
  }
}

function createCactos(){
  if(frameCount%100 == 0){
    cacto=createSprite(width,height-40,10,50)
    cacto.velocityX = -(4+score/100)
    cacto.scale = 0.5
    cacto.lifetime = width/cacto.velocityX
    cacto.depth = trex.depth
    cactoGroup.add(cacto)

    var Ale = Math.round(random(1,6))
    switch (Ale) {
      case 1:cacto.addImage(cactoImg1)
        break;
    
        case 2:cacto.addImage(cactoImg2)
        break;

        case 3:cacto.addImage(cactoImg3)
        break;
      
        case 4:cacto.addImage(cactoImg4)
        break;

        case 5:cacto.addImage(cactoImg5)
        break;

        case 6:cacto.addImage(cactoImg6)
        break;

    }
  }
}

