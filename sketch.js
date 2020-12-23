const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;


var ground;

var particles=[];
var plinkos=[];
var divisions=[];
var score=0;
var turn=0;
var particle;
var divisionHeight=300;
var gameState="play";

function setup() {

  createCanvas(480,800);
  engine = Engine.create();
  world = engine.world;


  ground=new Ground(240,height,480,20);

  for(var k=0;k<=width;k=k+80){
    divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight));
  }

  for(var j=40;j<=width;j=j+50){
    plinkos.push(new Plinko(j,75));
  }
  for(var j=15;j<=width;j=j+50){
    plinkos.push(new Plinko(j,175));
  }
  for(var j=30;j<=width;j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for(var j=20;j<=width;j=j+50){
    plinkos.push(new Plinko(j,375));
  }
  
}

function draw() {
  background("black"); 
  Engine.update(engine);
  ground.display(); 
  textSize(35);
  fill("white");
  text("Score: "+score,20,40);
  text("500",5,550);
  text("500",80,550);
  text("200",160,550);
  text("200",240,550);
  text("100",320,550);
  text("100",400,550);
  if(turn>=5){
    gameState="end";
    textSize(50);
    text("GAME OVER",50,250);
  }
  if(particle!=null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x<100){
        score=score+500;
        particle=null;
        
      }
      else if(particle.body.position.x>101&&particle.body.position.x<300){
        score=score+200;
        particle=null;
      }
      else if(particle.body.position.x>301&&particle.body.position.x<500){
        score=score+100;
        particle=null;
      }

    }
  }
  for(var j=0;j<particles.length;j++){
    particles[j].display();
  }
  for(var k=0;k<plinkos.length;k++){
    plinkos[k].display();
  }
  for(var z=0;z<divisions.length;z++){
    divisions[z].display();
  }
}
function mousePressed(){
if(gameState!=="end"){
  turn++;
  particle=new Particle(mouseX,10,10,10);
}
}