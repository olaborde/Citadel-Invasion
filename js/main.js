window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var ctx  = canvas.getContext('2d');
  var ctx2  = canvas.getContext('2d');
  var characterImage = new Image();
  var characterWidth = 50;


  stop = function() {
    clearInterval(this.interval);
}

  

  function interval(){
                          // |====> milliseconds
    setInterval(updateCanvas, 50);
  }

  document.getElementById("start-button").onclick = function() {
    // call interval() which calls updateCanvas() as soon as the user clicks on start
    // interval();
    startGame();
    // drawCannon();
    interval();
  };

  document.getElementById("restart-button").onclick = function() {
    location.reload();
  };

  // function clearCanvas() {
  //   ctx.clearRect(0,0,width,height);
  // }

  function startGame() {
    drawCharacter()
    // setInterval(draw,140 );
     
  }


  var character = {
    x: 220,
    y: 515,
    characterWidth: 50,
    characterHeight: 85,
    // defined function to move characters
    moveLeft: function(){
      console.log("x in moveLeft before", this.x);
      this.x -=10;
      console.log("x in moveLeft after", this.x);
      if(this.x < 0){
        this.x = 0;
      }

    },
    moveUp: function(){
      console.log("x in moveLeft before", this.x);
      this.y -=10;
      console.log("x in moveLeft after", this.x);
      if(this.y <= 0){
        this.y = 0;
      }

    },
    moveRight: function(){
      console.log("x in moveRight before", this.x);
      this.x +=10;
      console.log("x in moveRight after", this.x);
      // 750 => canvas width (800) - the width of the character (50)
      if(this.x >=750  ){
        this.x = 750;
      }

    },
    moveDown: function(){
      console.log("x in moveRight before", this.x);
      this.y +=10;
      console.log("x in moveRight after", this.y);

    }

    
    
  } //end of character
  console.log("the caracter is: ", character)

  function drawCharacter(){
    characterImage.src = './images/ninja.jpg';
  // characterImage.onload = function(){
    // change character.characterWidth to simply character to be use for collision detection
    ctx.drawImage(characterImage, character.x, character.y, characterWidth, character.characterHeight);
  // }

//   if(x + dx > canvas.width-characterWidth || x + dx < characterWidth) {
//     dx = -dx;
// }
// if(y + dy > canvas.height-characterWidth || y + dy < characterWidth) {
//     dy = -dy;
// }

  }

  // define variable myObstacle as an empty array
  var myObstacles = [];
  
  // 3rd => makecharacter  moving
  document.onkeydown = function(e){
    ctx.clearRect(0,0,800,690);
    switch(e.keyCode){
      case 37:
      character.moveLeft();
      break;
      case 38:
      // code here
      character.moveUp();
      break;
      case 39:
      character.moveRight();
      break;
      case 40:
      // code here
      character.moveDown();
      break;
      default:
      console.log("blah");
    }
  }



//start location for x and y
var x = 400; //= canvas.width/3;
var y = 80; //= canvas.height-30;
var dx = +2;
var dy = 2;

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCharacter();

// ctx.beginPath();
// ctx.arc(x, y, 10, 0, Math.PI*2);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.closePath();
// x += dx;
// y += dy;
// }

  // var score = 0;
  var board = {
    score: 0,
    // 5th step add frames (variable that increments every time we update our canvas)
    // We add a frames variable on board object because this will help us to count 
    // how many times we call the updateCanvas() function. This way, we can push new 
    // obstacles every certain amount of updates.
    frames: 0
  }




  // we want the road to be re-drawn plenty of times, which basically means our obstacles will be re-drawn in different positions
  function Component (width, height,x,y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    // to add "moving" to the obstacles we need to introduce speed
    this.speedX = 0;
    this.speedY = 0;
    // function to add this value to our current position
    this.update = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCharacter();
    
    ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI*2);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.closePath();
    // x += dx;
    // y += dy;




      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

    },
    // function to draw the element in its new position
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    





  }// end of component function


  // 5th step => update canvas:
  function updateCanvas(){
    ctx.clearRect(0,0,500,600);
    drawCharacter();
    // Every time we call updateCanvas() we will add 1 to our frames variable
    board.frames ++;
    // Every 60 times we update the canvas, a new obstacle will be created. 
    // If you want to make it harder, just put a lower number.
    // we use modulus of number of frames to be equal 1 because we want our obstacles to be created right away
    // if we set it equal to 0, that means our first obstacle will be created after 60 milliseconds
    if (board.frames % 60 === 1) {
      // we want random object to appear on X between 0 and 400, 
      // because 400 is the width of the road (500 - 2*50 (50 is the width of the green lines on the both sides of the road))
      wallX = Math.floor(Math.random() * 600);
      wallWidth = 10;
      wallHeight = 10;
      myObstacles.push(new Component(wallWidth, wallHeight, wallX, 0));
      // board.frames = 2;
    }
    for(var i = 0; i < myObstacles.length; i++){
      // this line allows moving of the obstacles (without this line we just get first obstacle at the position 0)
      myObstacles[i].y += 10;
      myObstacles[i].update();
    }
  }
};
