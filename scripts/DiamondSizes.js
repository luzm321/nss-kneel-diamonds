import { getSizes, setSize, checkOrderState } from "./database.js";
import { dispatchOrderBtnEvent } from "./orderBtnEvent.js";

const sizes = getSizes()

// Event Listener below: If the checkOrderState fxn contains all the values for each option, trigger the dispatchOrderBtnEvent fxn that will 
// implement the showOrderBtn custom event

document.addEventListener("change", (event) => {
    if (event.target.name === "size") {
        setSize(parseInt(event.target.value));
        if ( checkOrderState() ) {
            dispatchOrderBtnEvent()
        };
    };
});

export const DiamondSizes = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItems = sizes.map(size => {
        return `<li>
                    <input type="radio" name="size" value="${size.id}" /> ${size.carats}
                </li>`
    });

    html += listItems.join("");
    html += "</ul>";

    return html;
};

