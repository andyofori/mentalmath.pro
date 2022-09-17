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
                    console.log("* Offset is " + model.offSet());
                    console.log("* Ans A  is Correct");
                    showAnswerB.innerHTML = answerArray.map((numb) => 
                    `<div>
                        <input type="radio" name="answer" value="${model.offSet()}" id="${numb}">
                        <label class="" for="${numb}">${model.offSet()}</label>
                    </div>`).join(' ');
                    break;

            case 2: showAnswerA.innerHTML = answerArray.map((numa) => 
                    `<div>
                        <input type="radio" name="answer" value="${model.offSet()}" id="${numa}">
                        <label class="" for="${numa}">${model.offSet()}</label>
                    </div>`).join(' ');
                    showAnswerB.innerHTML = answerArray.map((numb) => 
                    `<div>
                        <input type="radio" name="answer" value="${numb}" id="${numb}">
                        <label class="" for="${numb}">${numb}</label>
                    </div>`).join(' ');
                    console.log("* Offset is " + model.offSet());
                    console.log("* Ans B  is Correct");
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
        * This method returns true if the player has not exhausted their
        * chances/lives or if it is a fresh game (fresh start).
        * @return true if player has not used up all 3 chances or just started
    */
    playerHasLives: function() {
        if (this.errorCount < 3) {
            return true;
        }
    },
    
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
     * This method offsets one of the answer options.
     * It provides special 
     * @returns the offset figure
     */
    offSet: function() {
        if (this.operand1 < 10 || this.operand2 < 10) {
            return this.equationAddition() + 1; // If one operand is a single digit. Meant for "normal".
        } else if (this.operand1 < 100 || this.operand2 < 100) {
            return this.equationAddition() + 10; // If one operand is in tens. Meant for "hard".
        } else { // If both operands are of equal expected lenghts
            switch (this.difficultyLevel) {
                case "easy": return this.equationAddition() + 1;
                case "normal": return this.equationAddition() + 10;
                case "hard": return this.equationAddition() + 100;
                break;
            }
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
    },

    /** 
        * This method compares user's answer with correct answer
        * @return true if they match
        * @return false if they don't match
        */
    isCorrect: function() {
        if (this.choice == this.answer) {
            return true;
        } else {
            return false;
        }
    },

    /**
        * This method reads difficulty level from local storage if it exists.
        * @returns a state of "easy", "normal" or "hard" selections for the difficulty
        * radio buttons.
     */
    localStorageForDifficulty: function() {
        console.log(localStorage.getItem("difficultyOnDisk") + " difficulty");
        if (localStorage.getItem("difficultyOnDisk") !== null) { //If key exists
            switch (localStorage.getItem("difficultyOnDisk")) {
                case "easy":    return document.getElementById("radio-easy").checked = true;
                                break;
                case "normal":  return document.getElementById("radio-normal").checked = true;
                                break;
                case "hard":    return document.getElementById("radio-hard").checked = true;
                                break;
                }
        } else { //If key doesn't exist, assign "easy" as the default
            document.getElementById("radio-easy").checked = true;
            console.log("easy auto assigned");
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
    printAnswerChoices: function() {
        view.answerPrinters();
    },

    /**
        * Difficulty Switch.
        * ...handles difficulty level selection via radio buttons
        * ...calls the necessary method to store difficulty level 
        * and to set the corresponding duration
        */
    difficultySwitch: function(selectedDifficulty) {
        const difficultyRadioButtons = document.querySelectorAll('input[name="levels"]');

        //Assign difficulty according to the checked radio button
        for (const difficultyRadioButton of difficultyRadioButtons) {
            if (difficultyRadioButton.checked) {
                selectedDifficulty = difficultyRadioButton.value;
                break;
            }
        }

        //Set difficulty level
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
    * This method sets the timer and the next operand numbers.
    * It also sets the difficulty level and then stores it on local disk
    * @param selectedDifficulty Holds user's radio selection. It is needed by model.randomNew for operands to be generated in the appropriate ranges that match the difficulty level that the user has selected.
    * @param time Holds the number of seconds for countdownTimer
    */
    setTimerAndOperands: function(selectedDifficulty, time) {
        model.difficultyLevel = selectedDifficulty;
        model.operand1 = model.randomNew();
        model.operand2 = model.randomNew();
        countdownTimer = time;
        //Write difficulty level to local storage
        localStorage.setItem("difficultyOnDisk", selectedDifficulty);
    },

    /**
        * This method increases and decreases user error count
        * whiles keeping it above zero.
        */
     progressControl: function() {
        if (!model.isCorrect()) {
            model.errorCount++;  //  If wrong answer, add one. Max count is 2
        } else if (model.isCorrect() && model.errorCount > 0) {
            model.errorCount--;  //  If right answer, minus one. Min is 0.
        }
    },
}












    
//////////////
//Progress__Bar
view.progressBar(); //Initial Bar. This fills the bar before the game runs.

//Read difficulty level from local storage if it exists
//or assign a first-time default of "easy" 
model.localStorageForDifficulty();


//  Play/Stop + Radio (difficulty) buttons
const btn = document.querySelector(".play-stop");        
// Radio buttons
btn.addEventListener("click", () => {
    if (model.playerHasLives()) {    //  If player still hasn't finished
        if (model.errorCount == 0) {    //  If it's a fresh game...
            view.canvasColorReset();    //  ...reset the canvas color
        }
        
        if (btn.value == "play") { //   If Play/Stop Button value is "Play"
            
            //Handle difficulty level selection via radio buttons
            let selectedDifficulty;
            controller.difficultySwitch(selectedDifficulty);

            //Display operands
            controller.printOperands();
            //Display possible answer choices
            controller.printAnswerChoices();
            
            //Progress__Bar
            view.progressBar(); //In-game Bar. This fills the bar in-game.
            
            // Get user choice and cross-check with correct equation answer
            const answerRadioButton = document.querySelectorAll('input[name="answer"]');
            for (const radioButton of answerRadioButton) {
                radioButton.addEventListener("change", function(e){
                    // set the property for the user's answer choice
                    model.choice = this.value;
                    
                    // invoke invigilator and ekepp running the game till game over
                    if (model.isCorrect()) {
                        console.log("///// CORRECT ANS.");
                        btn.click();
                        btn.click();
                    } else {
                        console.log("/////   WRONG ANS.");
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
            //Clear the timer for next (re)start
            clearInterval(controller.mainCounter);
            // Change canvas color based on answer
            view.canvasColorChange();
            //Cause start/stop button to RESTART on next pressing
            btn.value = "play";
            btn.innerHTML = "Ans: " + model.equationAddition();
            
            //Count errors
            controller.progressControl();
            //Progress__Bar
            view.progressBar(); //Game over Bar. For the final removal of the bar.
            console.log("Errors: " + model.errorCount);
        }
    } else { // GAME OVER
        btn.innerHTML = "Play";
        console.log("STOPPED since errors made is: " + model.errorCount);
        model.errorCount = 0;
    }
});





//////////////
//  Countdown timer - a Global variable
var countdownTimer;