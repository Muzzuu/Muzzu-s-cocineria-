// Obtén referencias a elementos HTML por su ID
const character = document.getElementById("main-character");
const characterImg = document.getElementById("player");
const square = document.getElementById("game-board");
const gameOverAlert = document.getElementById("game-over-alert");
const mainMenu = document.getElementById("menu");



let maxX = square.offsetWidth - character.offsetWidth;
let maxY = square.offsetHeight - character.offsetHeight;
let gameStatus = true; // Variable para controlar el estado del juego
let intervalModifier = 5000; // Modificador de intervalo para la generación de billetes
let x = 0;
let y = maxY; 
let speed = 100; 
let IngredienteSpeed;

document.getElementById("Facil").addEventListener("click", function() {
    startGame("Facil");
  });
  
  document.getElementById("Medio").addEventListener("click", function() {
    startGame("Medio");
  });
  
  document.getElementById("Extremo").addEventListener("click", function() {
    startGame("Extremo");
  });

  function startGame(nivel) {
 
    switch (nivel) {
      case "Facil":
         
        IngredienteSpeed = 4;
         
        break;
      case "Medio":

        IngredienteSpeed = 6;

        break;
      case "Extremo":

       IngredienteSpeed = 10;

        break;

    }

}


// Agrega la clase "IngredienteType" a un elemento que parece estar fuera de contexto
Ingrediente.classList.add(IngredienteType);


function startGame() {
  // Oculta el menú principal
  mainMenu.style.display = "none";

  
  let IngredienteGenerationInterval = setInterval(createIngrediente, intervalModifier);

  
  setInterval(() => {
    if (intervalModifier > 100) {
      intervalModifier -= 300;
      console.log(intervalModifier);
    }
    clearInterval(IngredienteGenerationInterval);
    IngredienteGenerationInterval = setInterval(createIngrediente, intervalModifier);
  }, 5000);

  // Agrega un evento de escucha para el movimiento del personaje
  document.addEventListener("keydown", moveCharacter);

  // Función para mover el personaje
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
    if (gameStatus == true) {
      const Ingrediente = document.createElement("div");
      const IngredienteType = getRandomIngredienteType(); 
      Ingrediente.classList.add("Ingrediente", IngredienteType); 

      square.appendChild(Ingrediente);

      
      let posX = generateIngredientePosition();
      Ingrediente.style.left = posX + "px";

      setInterval(() => moveIngrediente(Ingrediente, IngredienteType), 10);
    }
  }

  
  function getRandomIngredienteType() {
    const types = ["Ingrediente", "Ingrediente-20", "Ingrediente-50"]; 
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex]; 
  }

 
  function generateIngredientePosition() {
    let pos = Math.floor(Math.random() * 12);
    pos *= 100;
    return pos;
  }
}
