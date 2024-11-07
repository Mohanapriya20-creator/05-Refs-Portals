import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef(function ({ result, targetTime,timeRemaining ,reset}, ref) {
    const dialog = useRef(null);
    const userLost = timeRemaining <= 0;
    const formattedTime = new Date(timeRemaining).toISOString().substr(17, 2);
    const score = Math.round(1- timeRemaining / formattedTime);
    
    // Expose the open method to the parent component 
    // use imperative handle to expose the open method
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
// portal is used to render the modal in  the specified element
    return createPortal(
        <dialog ref={dialog} className="result-modal"  >
            {userLost && <h2>You {result}</h2>}
            {!userLost && <h2>Your score  {score}</h2>}
            <p>The target was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer at <strong> {formattedTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={reset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;
