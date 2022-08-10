import React from "react";
import Die from "./components/Die";
// This library/component shows dropping ribbons indicating congrats
import Confetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = React.useState(generateRandDieNums());
    const [tenzies, setTenzies] = React.useState(false);

    // Keeping 2 state in sync is one reason to make use of useEffect 
    React.useEffect(() => {
        // .every is a array method in that can be used to test 
        // a condition is true/false for every item in the array
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);

        if (allHeld && allSameValue) {
            setTenzies(true); 
        }
    }, [dice]); // let this effect run anytime the dice array changes in state

    // Map each of the random numbers in the array and return a Die component for each. Because
    // of the warning in console of "no key" I added a 2nd parameter "index" which is the index
    // of the die number generated. Same die parameter could have been used but since the random
    // numbers generated could be the same it can't be used since the value has to be unique.
    // nanoid library can also be used 
    const diceElements = dice.map((die, index) => {
        return (
            <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                // Though only the Die component is the only component (bar the App) in this
                //  project, for inheritance sake, always pass the function this way when it's
                // expecting a parameter instead of doing it directly in the component. This 
                // ensures its new state is passed unto other components depending on it
                holdDie={() => holdDie(die.id)} 
            />
        );
    });

    function holdDie(id) {
        // Since setDice deals with the whole dice, just map all 
        // of the dice and check for the particular die that was
        // clicked and flip its isHeld property.
        setDice(oldDice => {
            return oldDice.map(oldDie => 
                oldDie.id === id 
                ? { ...oldDie, isHeld: !oldDie.isHeld } 
                : oldDie
            );
        });
    }

    function generateRandDieNums() {
        const diceArray = [];
        for (let i = 0; i < 10; i++) {
            const randNum = Math.ceil(Math.random() * 6);
            diceArray.push({
                id: i, // Since i is unique number from 0-10 it can be passed as id
                value: randNum,
                isHeld: false
            });
        }
        return diceArray;
    }

    function rollDice() {
        setDice(oldDice => {
            return oldDice.map(oldDie => {
                const randNum = Math.ceil(Math.random() * 6);
                // If the die is held do nothing to its value else get all of its  
                // properties and change its value to a random generated number
                return oldDie.isHeld ? oldDie : { ...oldDie, value: randNum }
            });
        });
    }

    function newGame() {
        setDice(generateRandDieNums);
        setTenzies(false);
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all the dice are the same. 
                Click the die with the same number(s) freeze 
                its current while rolling the others.
            </p>
            { tenzies && <h3>CONGRATS! YOU WON!!</h3>}
            { tenzies && <Confetti />}
            <div className="all-dice-div">
                {diceElements}
            </div>

            <button 
                onClick={tenzies ? () => newGame() : rollDice} 
                className="roll-die-btn"
                >{tenzies ? "NEW GAME" : "ROLL DICE"}
            </button>
        </main>
    );
}