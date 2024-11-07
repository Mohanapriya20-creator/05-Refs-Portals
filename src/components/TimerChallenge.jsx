import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(null);
    const dialog = useRef(null); // Ref for the modal dialog
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);

    }

    function handleStart() {
        // setInterval is a JavaScript function that executes a specified function repeatedly at fixed time intervals, measured in milliseconds. 
        timer.current = setInterval(() => {
            setTimeRemaining(prevTime=> prevTime - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);   
    }

    return (
        <>
            {/* Passing the ref to the ResultModal */}
            <ResultModal ref={dialog} result="lost" targetTime={targetTime}  timeRemaining={timeRemaining} reset={handleReset}/>
            
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
    );
}
