import { getMetals, setMetal, checkOrderState } from "./database.js";
import { dispatchOrderBtnEvent } from "./orderBtnEvent.js";

const metals = getMetals()

// Event Listener below: If the checkOrderState fxn contains all the values for each option, trigger the dispatchOrderBtnEvent fxn that will 
// implement the showOrderBtn custom event

document.addEventListener("change", (event) => {
    if (event.target.name === "metal") {
        // window.alert(`User chose metal ${event.target.value}`)
        setMetal(parseInt(event.target.value));
        if (checkOrderState()) {
            dispatchOrderBtnEvent();
        };
    };
});

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
    };

    html += "</ul>";
    return html;
};

