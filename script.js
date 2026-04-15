    //sets the canvas
    const canvas = document.getElementById("gameCanvas")
    //sets the pen
    const ctx = canvas.getContext("2d");

 //Player Properties    
let player = {
  x: 100,
  y: 100,
  width: 60,
  height: 60,
  speed: 5
};

//apple properties
let apple = {
    x: 300,
    y: 400,
    width: 10,
    height: 10
}

//player score
let score = 0

//keyboard inputs
let keys = {
ArrowUp: false,
ArrowDown: false,
ArrowLeft: false,
ArrowRight: false,

};

// draws the square
    function drawPlayer(){
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    }
//draws the apple
    function drawApple(){
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, apple.width, apple.height);
    }

//gameloop that runs every frame (60fps)
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  movePlayer();

  drawApple();
  spawnApple();



  requestAnimationFrame(gameLoop);
}

//Controls Player movement and wall collisions
function movePlayer(){
if (player.x >= 0 && player.y >= 0 && player.x <= 800 - player.width && player.y <= 600 - player.height){
    if (keys.ArrowLeft){
    player.x = player.x - player.speed
}

if(keys.ArrowRight){
    player.x = player.x + player.speed
} 

if(keys.ArrowUp) {
player.y = player.y - player.speed
} 

if(keys.ArrowDown) {
 player.y = player.y + player.speed
}
}

if (player.x < 0 || player.y < 0) {

    while( player.x < 0){  
    player.x = player.x + player.speed
    }

    while (player.y < 0){
    player.y = player.y + player.speed
    }

} 
if(player.x > 800 - player.width || player.y > 600 - player.height ) {
     
    while( player.x > 800 - player.width){  
    player.x = player.x - player.speed
    }

    while (player.y > 600 - player.height){
    player.y = player.y - player.speed
    }
}

}

//spawns an apple when the player finally collides with one
function spawnApple(){
    if (isColliding(player, apple) == true){
       apple.x = Math.floor(Math.random() * (800))
       apple.y = Math.floor(Math.random() * (600))
        
       score = score + 1
       document.getElementById("scorecnt").innerText = "Score: " + score
       
       drawApple()


    }
}

//function for collisions
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

//checks if an arrow key is pressed down
document.addEventListener("keydown", function(event) {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
});

//checks if an arrow key is released/not pressed
document.addEventListener("keyup", function(event) {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
});

//runs the game loop
gameLoop();
