const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const guessScreen = document.getElementById('guessScreen');
const winScreen = document.getElementById('winScreen');
const wordDisplay = document.getElementById('wordDisplay');
const missedLetters = document.getElementById('missedLetters');
const guessRemain = document.getElementById('guessRemain');
const winDisplay = document.getElementById('winDisplay');
const loseScreen = document.getElementById('loseScreen');


let gameObj = {
    coffeeWords: ['espresso', 'americano', 'frappe', 'cappuccino', 'latte', 'macchiato', 'mocha', 'frappuccino', 'columbian', 'arabica'],
    wins: 0,
    remain: 10,
    badArray: ['Backspace', 'CapsLock', ' ', 'Tab', 'Control', 'Alt', 'Shift', 'Insert', 'Delete', 'End', 'Home', 'PageUp', 'PageDown', 'Pause', 'PrintScreen', 'Meta', ',', '.', '/', ';', '[', ']', "'", '\\', '-', '=', '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    word: '',
    wordChoice() {
        let rand = Math.floor(Math.random() * this.coffeeWords.length)
        let word = this.coffeeWords[rand];
        this.word = word;
        return word;
    },
    startDisp() {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        guessScreen.style.display = 'block';
        guessRemain.textContent = this.remain;
        winDisplay.textContent = this.wins;
        let word = this.wordChoice();
        if (wordDisplay.textContent === word.length) {
            return;
        } else {
            for (let i = 0; i < word.length; i++) {
                wordDisplay.textContent += '_';
            }
        }
    },
    loseDisplay() {
        gameScreen.style.display = 'none';
        guessScreen.style.display = 'none';
        loseScreen.style.display = 'block';
    },
    letterHit(event) {
        let key = event.key;
        let str = wordDisplay.textContent;
        let undArray = str.split('');
        let pos = this.word.indexOf(key);

        if (pos === -1) {
            return key.toUpperCase();
        } else {
            while (pos !== -1) {
                undArray[pos] = this.word[pos].toUpperCase();
                pos = this.word.indexOf(key, pos + 1);
            }
            return undArray.join('');
        }
    },
    letterMiss(event) {
        let key = event.key;
        let str = missedLetters.textContent.toLowerCase();
        let pos = str.indexOf(key);

        if (pos === -1) {
            return key.toUpperCase();
        }
    },
    resetDisplay() {
        startScreen.style.display = 'none';
        loseScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        guessScreen.style.display = 'block';
        guessRemain.textContent = this.remain;
        wordDisplay.textContent = '';
        missedLetters.textContent = '';
        let word = this.wordChoice();
        for (let i = 0; i < word.length; i++) {
            wordDisplay.textContent += '_';
        }
    },
    winReset() {
        let str = wordDisplay.textContent;
        let pos = str.indexOf('_');

        if (pos === -1) {
            gameScreen.style.display = 'none';
            winScreen.style.display = 'block';
            wordDisplay.textContent = '';
            let timer = setInterval(() => {
                gameScreen.style.display = 'block';
                winScreen.style.display = 'none';
                clearInterval(timer);
            }, 1000);
            guessRemain.textContent = this.remain;
            missedLetters.textContent = '';
            winDisplay.textContent++
            let word = this.wordChoice();
            for (let i = 0; i < word.length; i++) {
                wordDisplay.textContent += '_';
            }
        }
    },
}

document.onkeyup = (event) => {
    if (event.key === 'Enter') {
        gameObj.startDisp();
    } else if (event.key === 'Escape') {
        gameObj.resetDisplay();
    } else if (event.key !== 'Enter') {
        for (let i = 0; i < gameObj.badArray.length; i++) {
            if (event.key === gameObj.badArray[i]) {
                return;
            }
        }
        if (gameObj.letterHit(event).length > 1) {
            wordDisplay.textContent = gameObj.letterHit(event);
        } else if (gameObj.letterMiss(event) !== undefined) {
            missedLetters.textContent += gameObj.letterMiss(event);
            let num = guessRemain.textContent--;
            if (num === 1) {
                gameObj.loseDisplay();
            }
        }
        gameObj.winReset();
    }
}