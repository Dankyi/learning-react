import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split"; // This allows you to split components
import { nanoid } from "nanoid"; // This allows you to generate unique id

export default function App() {
    // Because React re-renders the whole App component/function any time 
    // there is changes in a state being tracked, it makes it expensive 
    // loading information from heavy sources such as localStorage, DB 
    // so in other to boost performance we use lazy state initialization
    // which allows data to be fetched only onetime

    // const [notes, setNotes] = React.useState(
    //     JSON.parse(localStorage.getItem("notes")) || []
    // );

    // So instead of the above we use this (lazy state):
    const [notes, setNotes] = React.useState(() =>
        JSON.parse(localStorage.getItem("notes")) || []
    );

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || "" // If no note has been created currentNoteId is blank (i.e. "") 
    );
    
    // Since we're saving the state of notes to local storage we make use of useEffect
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        };

        setNotes(prevNotes => [newNote, ...prevNotes]); // set the new note to the beginning of the old list
        setCurrentNoteId(newNote.id);
    }
    
    function updateNote(text) {
        // Since map returns the an array of items at the same
        // position, we rearrange only the modified note
        setNotes(oldNotes => {
            // Create a new empty array
            // Loop over the original array
            // If the id matches
            // Put the updated note at the beginning on the new array
            // else push the old note to the end of the array
            // return the new array
            const newArray = [];
            for(let i = 0; i < oldNotes.length; i++) {
                if (oldNotes[i].id === currentNoteId) {
                    newArray.unshift({ ...oldNotes[i], body: text }); // Retrieve all of the properties of the note being edited, update only its body since its the only one changing and then put it at the beginning of the note array using "unshift"
                } else {
                    newArray.push({ ...oldNotes[i] }); // Push to the end without changing its body text since its not the current note being modified
                }                
            }
            return newArray; // Return the list with the current modified note the top.
        });

        // old code modified to above to allow for the position of the current note being modified to be placed at the top
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text }
        //         : oldNote
        // }));
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0];
    }
    
    function deleteNote(event, noteID) {
        event.stopPropagation(); // Search the meaning
        console.log(noteID);
        
        // Approach 1
        return setNotes(oldNotes => {
            // How filter works: https://www.w3schools.com/jsref/jsref_filter.asp
            // Filter returns a list of only items in an array that meets a certain condition
            // It's like saying in SQL get me everything in the list where note.id !== noteID
            return oldNotes.filter(note => note.id !== noteID)
        });

        // // Approach 2
        // setNotes(oldNotes => {
        //     const newArray = [];
        //     for (let i = 0; i < oldNotes.length; i++) {
        //         if (oldNotes[i].id !== noteID) {
        //             newArray.push({ ...oldNotes[i]});
        //         }
        //     }
        //     return newArray;
        // });
    }

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    // Lines 120-121 are not necessary since we've already checked if there are some notes at the top end
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    );
}
