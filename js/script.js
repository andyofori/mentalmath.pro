var view = {
    timerDisplay: document.querySelector(".timer__figure"),
    
    /**
     * This method displays the 
     * countdown time on the webpage
     */
    countdownDisplay: function() {
        //console.log(countdownTimer);//disable for log
        this.timerDisplay.innerHTML = countdownTimer;
        countdownTimer--;
    },

    /**
     * This method prints the current
     * operands unto the webpage
     */
    operandPrinter: function() {
        const showXOperand =  document.querySelector(".x");
        const showYOperand =  document.querySelector(".y");
        
        // Ensures that x always holds the greater number 
        if (model.operand1 > model.operand2) {
            showXOperand.innerHTML = model.operand1;
            showYOperand.innerHTML = model.operand2;
        } else {
            showXOperand.innerHTML = model.operand2;
            showYOperand.innerHTML = model.operand1;
        }
    },
    
    /**
        * This method prints two possible answers,
        * one wrong and one correct
        * ...isCorrect returns false at timeout
        */
    answerPrinters: function() {
        const showAnswerA = document.querySelector(".answer__a");
        const showAnswerB = document.querySelector(".answer__b");
        const answerArray = [model.equationAddition()];

        switch ((Math.floor(Math.random()*2)) + 1) {
            // insert radio buttons here
            case 1: showAnswerA.innerHTML = answerArray.map((numa) => 
                    `<div>
                        <input type="radio" name="answer" value="${numa}" id="${numa}">
                        <label class="" for="${numa}">${numa}</label>
                    </div>`).join(' ');
                    showAnswerB.innerHTML = answerArray.map((numb) => 
                    `<div>
                        <input type="radio" name="answer" value="${numb+1}" id="${numb}">
                        <label class="" for="${numb}">${numb+1}</label>
                    </div>`).join(' ');
                    console.log(1);
                    break;

            case 2: showAnswerA.innerHTML = answerArray.map((numa) => 
                    `<div>
                        <input type="radio" name="answer" value="${numa+1}" id="${numa}">
                        <label class="" for="${numa}">${numa+1}</label>
                    </div>`).join(' ');
                    showAnswerB.innerHTML = answerArray.map((numb) => 
                    `<div>
                        <input type="radio" name="answer" value="${numb}" id="${numb}">
                        <label class="" for="${numb}">${numb}</label>
                    </div>`).join(' ');
                    console.log(2);
                    break;
        }

    },

    // Change color of Timer background based on correctness of User's choice
    canvasColorChange: function() {
        const canvas = document.querySelector(".timer");
        if (model.isCorrect()) {
            canvas.style.backgroundColor = "teal";
        } else {
            canvas.style.backgroundColor = "red";
        }
    },

    canvasColorReset: function() {
        const canvas = document.querySelector(".timer");
        canvas.style.backgroundColor = "teal";
    },
    
    progressBar: function() {
        const progress = document.querySelector(".progress__bar");
        switch (model.errorCount) {
            case 0: progress.style.width = 100 + "%";
                    progress.style.backgroundColor  = "teal";
                    break;
            case 1: progress.style.width = 66.67 + "%";
                    progress.style.backgroundColor  = "yellow";
                    break;
            case 2: progress.style.width = 33.33 + "%";
                    progress.style.backgroundColor  = "red";
                    break;
            case 3: progress.style.width = 0 + "%";
                    break;
        }
    },
}

var model = {
    difficultyLevel: "Easy",    // initial level
    operand1: null,             // initial value of 1st operand
    operand2: null,             // initial value of 2nd operand
    answer: null,               // initial value for the equation sum
    //this.choice (or model.choice) will be set on-the-fly
    errorCount: 0,
    
    /**
        * This method sets the userAnswer property of 
        * this object
        * @param ans The answer value from the user
        */
    setUserAnswer: function(ans) {
        this.answer = ans;
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
        this.answer = sum;
        return sum;
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
    },

    /** 
        * This method compares user's answer with correct 
        * anser
        * @return true if they match
        * @return false if they don't match
        */
    isCorrect: function() {
        if (this.choice == this.answer) {
            return true;
        } else {
            return false;
        }
    }
}

var controller = {
    /**⚖︎
        * This method prints the current 
        * operands unto the webpage
        */
    printOperands: function() {
        view.operandPrinter();
    },

    /**
        * This method prints the two answer choices
        */
    printAnswers: function() {
        view.answerPrinters();
    },

    /**
        * Difficulty Switch.
        * ...sets difficulty level and corresponding duration
        */
    difficultySwitch: function(selectedDifficulty) {
        switch (selectedDifficulty) {
            case "easy":    this.setTimerAndOperands(selectedDifficulty, 5);
                            break;
            case "normal":  this.setTimerAndOperands(selectedDifficulty, 10);
                            break;
            case "hard":    this.setTimerAndOperands(selectedDifficulty, 20);
                            break;
            }
    },
    
    /**
    * This method sets the timer and the next operand numbers
    * @param selectedDifficulty Holds user's radio selection. It is needed by model.randomNew for operands to be generated in the appropriate ranges that match the difficulty level that the user has selected.
    * @param time Holds the number of seconds for countdownTimer
    */
    setTimerAndOperands: function(selectedDifficulty, time) {
        model.difficultyLevel = selectedDifficulty;
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        countdownTimer = time;
    }
}












    
//////////////
//  Play/Stop + Radio (difficulty) buttons
const btn = document.querySelector(".play-stop");        
const difficultyRadioButtons = document.querySelectorAll('input[name="levels"]');
// Radio buttons
btn.addEventListener("click", () => {
    if (model.errorCount <= 2) {
        if (model.errorCount == 0) {
            view.canvasColorReset();
        }

        if (btn.value == "play") { //  If Play/Stop Button value is "Play"
            let selectedDifficulty;
            for (const difficultyRadioButton of difficultyRadioButtons) {
                if (difficultyRadioButton.checked) {
                    selectedDifficulty = difficultyRadioButton.value;
                    break;
                }
            }
            //Set difficulty level
            controller.difficultySwitch(selectedDifficulty);
            //Display operands
            controller.printOperands();
            //Display answer choices
            controller.printAnswers();
    
            //progress__bar
            view.progressBar();
            
            // Get user choice and cross-check with correct equation answer
            const answerRadioButton = document.querySelectorAll('input[name="answer"]');
            for (const radioButton of answerRadioButton) {
                radioButton.addEventListener("change", function(e){
                    // set model property for choice of answer
                    // model.setChoice(this.value);
                    model.choice = this.value;
    
                    // invoke invigilator
                    if (model.isCorrect()) {
                        console.log("RIGHT");
                        btn.click();
                        btn.click();
                    } else {
                        console.log("WRONG");
                        btn.click();
                        btn.click();
                    }
                });
            }
    
            //Countdown
            controller.mainCounter = setInterval(function hello() {
                view.countdownDisplay();
                /**
                 * If timer reaches "0", or in this case -2,
                 * stop and start again.
                 * -2 not zero due to setInterval's 
                 * delay correction via recurssion
                 */
                if (countdownTimer == -2) {
                    btn.click();
                    btn.click();
                }
                return hello;
            }(), 1000);

            //Cause Start/Stop Button to STOP on next pressing
            btn.value = "stop";
            
        } else { // Else if the Stop Button (now the countdown timer) is pressed

            clearInterval(controller.mainCounter);
            controller.printAnswers();
            //Cause start/stop button to RESTART on next pressing
            btn.value = "play";
            btn.innerHTML = "play";
            view.canvasColorChange();
                         
            if (!model.isCorrect()) {
                model.errorCount++;
            }
            console.log("errors made: " + model.errorCount);

        }

    } else {

        model.errorCount = 0;
        console.log("STOPPED since errors made is: " + model.errorCount);

    }
});





//////////////
//  Countdown timer - a Global variable
var countdownTimer;




//////////////////////////////////////////////////////////// OBSOLETE
//////////////////////////////////////////////////////////// CODE
//////////////////////////////////////////////////////////// BELOW
//Handles Enter button click
// var enterButton = document.querySelector("#enterButton");
// enterButton.onclick = () => {
//     var userInput = document.querySelector("#userInput");
//     var input = userInput.value;
//     //Pass user's answer to the model object
//     model.setUserAnswer(userInput.value);

//     //Clean up the input form
//     userInput.value = "";

//     //////////////
//     //If the game is in motion, stop and start
//     //again after user enters answer
//     if (btn.value === "stop") {
//         btn.click();
//         btn.click();
//     }  
// }

// //Handles Enter button press
// var userInput = document.querySelector("#userInput");
// userInput.onkeypress = (e) => {

//     // in IE9 and earlier, the event object doesn't get passed
//     // to the event handler correctly, so we use window.event instead.
//     e = e || window.event;

//     if (e.keyCode === 13) {
//         //trick enterButton into thinking it was clicked
//         enterButton.click();
//         return false;
//     }
// }