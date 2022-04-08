var view = {
    timerDisplay: document.getElementById("timerDisplay"),
    
    //This method displays the 
    //countdown time on the webpage
    countdownDisplay: function() {
        //console.log(countdownTimer);//disable for log
        this.timerDisplay.innerHTML = "Timer: " + countdownTimer;
        countdownTimer--;
    },

    //This method displays the user-selected (not  
    //default) difficulty unto the webpage
    difficultyPrinter: function() {
        var showDifficulty = document.getElementById("difficultyPrint");
        showDifficulty.innerHTML = "Difficulty: " + 
        model.difficultyLevel.toUpperCase() + ". " + countdownTimer +
        "s";
    },

    //This method prints the current 
    //operands unto the webpage
    operandPrinter: function() {
        var showOperands =  document.getElementById("equationPrint");
        showOperands.innerHTML = model.operand1 + " + " + model.operand2;
    },

    //This method prints the correct answer
    //Teal when correct answer was given on time
    //Red when wrong answer was given or timed out (
    //...isCorrect returns false at timeout)
    answerPrinter: function() {
        var showAnswer = document.getElementById("answerPrint");
        showAnswer.innerHTML = "= " + model.equationAddition();
        if (model.isCorrect()) {
            showAnswer.style.color = "teal";
        } else {
            showAnswer.style.color = "red";
        }
    },

    //This method cleans up the previously
    //displayed answer back to a "-" (dash)
    //!Currently disabled!
    answerClearer: function() {
        var clearAnswer = document.getElementById("answerPrint");
        clearAnswer.innerHTML = "= -";
    }
}

var model = {
    difficultyLevel: "Easy", //Default level
    operand1: null,          //starting value of 1st operand
    operand2: null,          //starting value of 2nd operand
    //userAnswer: null,      //uncomment to pass as an argument within this object
    
    /**
        * This method sets the userAnswer property of 
        * this object
        * @param ans The answer value from the user
        */
    setUserAnswer: function(ans) {
        this.userAnswer = ans;
    },

    /**
        * This method returns the sum of 2 randomly 
        * generated operands
        * @param operand1 The first operand
        * @param operand2 The second operand
        * @return Their sum
        */
    equationAddition: function(operand1, operand2) {
        var sum = this.operand1 + this.operand2;
        return sum;
    },

    /**
        * This method compares user's answer with correct 
        * anser
        * @return true if they match
        * @return false if they don't match
        */
    isCorrect: function() {
        if (this.userAnswer == this.equationAddition()) {
            return true;
        } else {
            return false;
        }
        
    },

    /**
        * This method generates a random number
        * based on current difficulty level
        * @return A random number 
        */
    randomNew: function() {
        switch (this.difficultyLevel) {
                case "easy": return Math.floor(Math.random()*10);
                case "normal": return Math.floor(Math.random()*100);
                case "hard": return Math.floor(Math.random()*1000);
                break;
            }
    }
}
var controller = {
    /**
        * This method prints the current 
        * operands unto the webpage
        */
    printOperands: function() {
        view.operandPrinter();
    },

    /**
        * This method displays the user-selected (not 
        * default) difficulty unto the webpage
        */
    printDifficulty: function() {
        view.difficultyPrinter();
    },

    /**
        * This method prints the correct answer
        */
    printAnswer: function() {
        view.answerPrinter();
        console.log("correct answer " + model.equationAddition());
    },

    /**
        * This method prints the correct answer
        * This method cleans up the previously
        * displayed answer back to a "-" (dash)
        * !Currently inactive!
        */
    clearAnswer: function() {
        view.answerClearer();
    },

    /**
        * This method only allows difficulty level changes
        * when timer is at...
        * 0  (game has not started),
        * 5  (stopped & set to easy),
        * 10 (stopped & set to normal),
        * 20 (stopped & set to hard)
        */ 
    difficultySwitchControl: function() {
    if (countdownTimer ===  0 || 
        countdownTimer ===  5 || 
        countdownTimer === 10 || 
        countdownTimer === 20) {
            return true;
        }
    }
}

//Handles "easy" difficulty button press
var easyButton = document.getElementById("easyButton");
easyButton.onclick = function() {
    if (controller.difficultySwitchControl()) {
        model.difficultyLevel = "easy";
        setTimer(5);
        controller.printDifficulty();
        //Set next-in-line numbers
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        //shows next-in-line numbers and time
        console.log("next: " + model.operand1 + " & " + model.operand2
                    + " /time: " + countdownTimer + "secs");
    }
}

//////////////
//Handles "normal" difficulty button press
var normalButton = document.getElementById("normalButton");
normalButton.onclick = function() {
    if (controller.difficultySwitchControl()) {
        model.difficultyLevel = "normal";
        setTimer(10);
        controller.printDifficulty();
        //Set next-in-line numbers
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        //shows next-in-line numbers and time
        console.log("next: " + model.operand1 + " & " + model.operand2
                    + " /time: " + countdownTimer + "secs");
    }
}

//////////////
//Handles "hard" difficulty button press
var hardButton = document.getElementById("hardButton");
hardButton.onclick = function() {
    if (controller.difficultySwitchControl()) {
        model.difficultyLevel = "hard";
        setTimer(20);
        controller.printDifficulty();
        //Set next-in-line numbers
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        //shows next-in-line numbers and time
        console.log("next: " + model.operand1 + " & " + model.operand2
                    + " /time: " + countdownTimer + "secs");
    }
}

//////////////
//Handles start/stop button press
var startStopButton = document.getElementById("startStopButton");
startStopButton.onclick = function() {if (startStopButton.value === "start"){
        console.log("//////STARTED//////");
        //If at start, set difficulty to easy (as the starting default)
        if (model.operand1 === null && model.operand2 === null) {
            easyButton.onclick();
        }
        controller.printOperands();
        //controller.clearAnswer();
        controller.mainCounter = setInterval(function hello() {
                    view.countdownDisplay();
                    //If timer reaches "0", or in this case -2,
                    //stop and start again.
                    //-2 not zero due to setInterval's 
                    //delay correction via recurssion
                    if (countdownTimer == -2) {
                        startStopButton.click();
                        startStopButton.click();
                    }
                    return hello;
                    }(), 1000);

        //Cause start/stop button to STOP on next 
        //press
        startStopButton.value = "stop";
    } else {
        //Stop countdown timer
        clearInterval(controller.mainCounter);
        console.log("//////STOPPED//////");
        controller.printAnswer();

        //Cause start/stop button to START on next 
        //press
        startStopButton.value = "start";

        //Prepare timer for next countdown based on
        //the current difficulty level
        if (model.difficultyLevel === "easy") {
            setTimer(5);
        } else if (model.difficultyLevel === "normal") {
            setTimer(10);
        } else {
            setTimer(20);
        }

        //Set next-in-line numbers
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        console.log("next 2: " + model.operand1 + " & " + model.operand2);         
    }
}

//////////////
//Handles Enter button click
var enterButton = document.getElementById("enterButton");
enterButton.onclick = function() {
        var userInput = document.getElementById("userInput");
        var input = userInput.value;
        //Pass user's answer to the model object
        model.setUserAnswer(userInput.value);

        //Clean up the input form
        userInput.value = "";

        //////////////
        //If the game is in motion, stop and start
        //again after user enters answer
        if (startStopButton.value === "stop") {
            startStopButton.click();
            startStopButton.click();
        }  
    }

//Handles Enter button press
var userInput = document.getElementById("userInput");
userInput.onkeypress = function(e) {

    // in IE9 and earlier, the event object doesn't get passed
    // to the event handler correctly, so we use window.event instead.
    e = e || window.event;

    if (e.keyCode === 13) {
        //trick enterButton into thinking it was clicked
        enterButton.click();
        return false;
    }
}

//////////////
//Countdown timer
var countdownTimer = 0;
//Access to set countdown timer
function setTimer(newTimer) {
    countdownTimer = newTimer;
}
