const character = document.getElementById("main-character");
const characterImg = document.getElementById("player");
const square = document.getElementById("game-board");
const score = document.getElementById("score-text");
const gameOverAlert = document.getElementById("game-over-alert");
const mainMenu = document.getElementById("menu");
const boton = document.getElementById("boton");

let maxX = square.offsetWidth - character.offsetWidth;
let maxY = square.offsetHeight - character.offsetHeight;
let gameStatus = true;
let intervalModifier = 5000;
let x = 0
let y = maxY;
let speed = 100;
let ingredienteSpeed;
let count = 0;
let ingredientesRecogidos = 0;
let pauseButton = document.getElementById("pauseButton");
let despauseButton = document.getElementById("despauseButton");
let isPaused = false;
let ingredienteGenerationInterval;
let Cancion = document.getElementById("Cancion");

Cancion.play();


function iniciarjuego(){

    startGame();

}


document.getElementById("pauseButton").addEventListener("click", function () {

  
  gameStatus = false;

});

document.getElementById("despauseButton").addEventListener("click", function () {

  gameStatus = true;

});


document.getElementById("Facil").addEventListener("click", function () {
    iniciarjuego("Facil");
});

document.getElementById("Medio").addEventListener("click", function () {
    iniciarjuego("Medio");
});

document.getElementById("Extremo").addEventListener("click", function () {
    iniciarjuego("Extremo");
});

function iniciarjuego(nivel) {
  switch (nivel) {
    case "Facil":
      ingredienteSpeed = 2;
      break;
    case "Medio":
      ingredienteSpeed = 4;
      break;
    case "Extremo":
      ingredienteSpeed = 10;
      break;
  }

  mainMenu.style.display = "none";
 


  

  let ingredienteGenerationInterval = setInterval(createIngrediente, intervalModifier);

  setInterval(() => {
    if (intervalModifier > 100) {
      intervalModifier -= 300;
      console.log(intervalModifier);
    }
    clearInterval(ingredienteGenerationInterval);
    ingredienteGenerationInterval = setInterval(createIngrediente, intervalModifier);
  }, 7000);

  document.addEventListener("keydown", moveCharacter);

  function moveCharacter(e) {
    switch (e.key) {
      case "ArrowLeft":
        x -= speed;
        if (x < 0) {
          x = 0;
        }
        break;
      case "ArrowRight":
        x += speed;
        if (x > maxX) {
          x = maxX;
        }
        break;
    }
    character.style.left = x + "px";
    character.style.top = y + "px";
  }

 

  function createIngrediente() {
    if (gameStatus == true ) {
      const ingrediente = document.createElement("div");
      const ingredienteType = getRandomIngredienteType();
      ingrediente.classList.add("Ingrediente", ingredienteType);
  
      square.appendChild(ingrediente);
  
      let posY = 0;
      let posX = generateIngredientePosition();
      ingrediente.style.left = posX + "px";
  
      function moveIngrediente() {
        if (posY < maxY && gameStatus == true) {
          posY += ingredienteSpeed;
          ingrediente.style.top = posY + "px";
  
          if (posY + ingrediente.offsetHeight >= y && posX === x) {
            handleIngredienteCollected(ingredienteType);
  
            ingrediente.style.display = "none";
  
            ingredientesRecogidos++; 

            if (ingredientesRecogidos === 20) {
              
              Swal.fire({
                          title: "GANASTEEE!",
                          text: "Hiciste un ratatuil",
                          imageUrl: "https://i.pinimg.com/originals/90/3e/92/903e928b36217553b1ae570638c278d8.png",
                          imageWidth: 400,
                          imageHeight: 200,
                          imageAlt: "Custom image"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.location.href = "index.html";
                          }
                        });

                        gameStatus = false;
            }
  
            count += getIngredienteValue(ingredienteType); 
            
  
            if (count % 50 === 0) {
              increaseGameSpeed();
            }
  
            setTimeout(() => {}, 1000);
          } else if (posY + ingrediente.offsetHeight >= maxY + character.offsetHeight) {
            if(ingredienteType != "Veneno" && ingredienteType != "Trampa"){
              gameOverAlert.style.display = "block";
             gameStatus = false; 
            }
            ingrediente.style.display = "none";
            handleIngredienteCollected();
          }
        }
      }
  
      setInterval(moveIngrediente, 10);
    }
  }
  

  function increaseGameSpeed() {
  
    ingredienteSpeed += 1;

    if (ingredienteSpeed >= 7) {
      ingredienteSpeed -= 1;
    }


}

  function getRandomIngredienteType() {
    const types = ["Ingrediente", "Ingrediente-20", "Ingrediente-50", "Ingrediente-30", "Ingrediente-40", "Ingrediente-60", "Ingrediente-70", "Veneno", "Trampa" , "Veneno", "Trampa", "Veneno", "Trampa"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  function generateIngredientePosition() {
    let pos = Math.floor(Math.random() * 12);
    pos *= 100;
    return pos;
  }

  

 

function handleIngredienteCollected(ingredienteType) {


}


function handleIngredienteCollected(ingredienteType) {
    
}


function getIngredienteValue(ingredienteType) {
    switch (ingredienteType) {
        case "Veneno":
            gameOverAlert.style.display = "block";
            gameStatus = false; 
            return

            case "Trampa":
            gameOverAlert.style.display = "block";
            gameStatus = false; 
            return

            case "Ingrediente":

        
        default:
            return 0; 
    }
}

}
