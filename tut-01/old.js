// APP JS
import React from "react";
import Die from "./components/Die";

export default function App() {
    const [dice, setDice] = React.useState(generateRandDieNums());
    // Map each of the random numbers in the array and return a Die component for each. Because
    // of the warning in console of "no key" I added a 2nd parameter "index" which is the index
    // of the die number generated. Same die parameter could have been used but since the random
    // numbers generated could be the same it can't be used since the value has to be unique.
    // nanoid library can also be used 
    const diceElements = dice.map((die, index) => {
        return (
            <Die 
                key={die.id}
                die={die}
                holdDie={holdDie}
            />
        );
    });

    function holdDie(event, id) {
        setDice(oldDice => {
            return oldDice.map(oldDie => 
                oldDie.id === id 
                ? { ...oldDie, isHeld: true } 
                : oldDie
            )
        })
    }

    function generateRandDieNums() {
        const diceArray = [];
        for (let i = 0; i < 10; i++) {
            const randNum = Math.floor(Math.random() * 6);
            diceArray.push({
                id: i,
                value: randNum,
                isHeld: false
            });
        }
        return diceArray;
    }

    function rollDice() {
        setDice(generateRandDieNums());
    }

    return (
        <main>
            <div className="all-dice-div">
                {diceElements}
            </div>

            <button 
                onClick={rollDice} 
                className="roll-die-btn"
                >ROLL DICE
            </button>
        </main>
    );
}




// DIE JS
// export default function Die(props) {
//     return (
//         // 2 classNames for styling the die div based on if its held
//         <div 
//             onClick={(event, id) => props.holdDie(event, props.die.id)} 
//             className={`each-die-div ${props.die.isHeld ? "die-held" : ""}`}>
//             <h2 className="each-die-h2">{props.die.value}</h2>
//         </div>
//     );
// }