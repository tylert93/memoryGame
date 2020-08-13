document.addEventListener("DOMContentLoaded", () =>{
    // create variables
    const start = document.getElementById("start"),
          reset = document.getElementById("reset"),
          display = document.querySelector('#time'),
          grid = document.querySelector(".grid"),
          resultDisplay = document.querySelector("#result");

    let fiveMinutes = 60 * 1,
        cardsChosen = [],
        cardsChosenId = [],
        cardsWon = [],
        won = false,
        playing = false,
        stopClock = false;

    //create the array which represents your deck of cards
    const cardArray = [
        {
            name: "frog",
            img: "imgs/frog.jpg"
        },
        {
            name: "frog",
            img: "imgs/frog.jpg"
        },
        {
            name: "elephant",
            img: "imgs/elephant.jpg"
        },
        {
            name: "elephant",
            img: "imgs/elephant.jpg"
        },
        {
            name: "flemingo",
            img: "imgs/flemingo.jpg"
        },
        {
            name: "flemingo",
            img: "imgs/flemingo.jpg"
        },
        {
            name: "parrot",
            img: "imgs/parrot.jpg"
        },
        {
            name: "parrot",
            img: "imgs/parrot.jpg"
        },
        {
            name: "tiger",
            img: "imgs/tiger.jpg"
        },
        {
            name: "tiger",
            img: "imgs/tiger.jpg"
        },
        {
            name: "turtle",
            img: "imgs/turtle.jpg"
        },
        {
            name: "turtle",
            img: "imgs/turtle.jpg"
        }
    ];
    //randomise the order of the card array
    shuffleArray(cardArray);
    //create the board the game will be played on
    createBoard();
    // start the game when the player commands
    start.addEventListener("click", function(){
        startTimer(fiveMinutes, display);
        playing = true;
        this.style.display = "none";
        reset.style.display = "flex";
    })
    //restart the game when the player commands
    reset.addEventListener("click", () => {
        location = location;
    })
    //create an element for each object in the card array
    function createBoard(){
        for(i = 0; i < cardArray.length; i++){
            var card = document.createElement("img");
            card.classList.add("outline");
            //make each card look like its face down
            card.setAttribute("src", "imgs/card.jpg");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }
    //check for matches
    function checkForMatch(){
        const cards = document.querySelectorAll("img"),
              optionOneId = cardsChosenId[0],
              optionTwoId = cardsChosenId[1];

        if(cardsChosen[0] === cardsChosen[1]){
            //remove the cards from the board and add them to the cardsWon array
            alert("You've found a match!");
            cards[optionOneId].setAttribute("src", "imgs/blank.jpg");
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionOneId].classList.remove("outline");
            cards[optionTwoId].setAttribute("src", "imgs/blank.jpg");
            cards[optionTwoId].removeEventListener("click", flipCard);
            cards[optionTwoId].classList.remove("outline");
            cardsWon.push(cardsChosen); 
        } else {
            //flip the cards back over
            cards[optionOneId].setAttribute("src", "imgs/card.jpg");
            cards[optionOneId].addEventListener("click", flipCard);
            cards[optionTwoId].setAttribute("src", "imgs/card.jpg");
            cards[optionTwoId].addEventListener("click", flipCard);
            alert("sorry, try again");   
        }
        //clear the chosen cards and update score
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        //check if player has won
        if(cardsWon.length === cardArray.length/2){
            alert("Congratulaitons, you have won");
            won = true;
            flipAllcards();
        }; 
    }
    //flip the card card the player has chosen
    function flipCard(){
        if(playing === true){
            let cardId = this.getAttribute("data-id");

            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute("src", cardArray[cardId].img);
            this.removeEventListener("click", flipCard);
            if(cardsChosen.length === 2){
                setTimeout(checkForMatch, 500);
            }
        }  
    }
    // flip all the cards over once the player has won
    function flipAllcards(){
        let cards = document.querySelectorAll("img");

        for(i = 0; i < cards.length; i++){
            cards[i].setAttribute("src", cardArray[i].img);
            cards[i].classList.add("outline");
        }
    }
    // countdown timer
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            if(won != true && stopClock != true){
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
    
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
    
                display.textContent = minutes + ":" + seconds;
    
                if (--timer < 0) {
                    let cards = document.querySelectorAll("img");
                    playing = false;
                    stopClock = true;
                    if (cardsChosenId.length > 0){
                        cards[cardsChosenId[0]].setAttribute("src", "imgs/card.jpg");
                    }
                    alert("Your time is up");
                }
            }
            
        }, 1000);
    }
    //reorder the objects in the cardArray
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)),
                temp = arr[i];
                
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
})
