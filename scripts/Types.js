import { getTypes, setType, checkOrderState } from "./dataAccess.js";
import { dispatchOrderBtnEvent } from "./orderBtnEvent.js";

const types = getTypes();

document.addEventListener("change", (event) => {
    if (event.target.name === "type") {
        setType(parseInt(event.target.value));
        if (checkOrderState()) {
            dispatchOrderBtnEvent();
        };
    };
});


export const Types = () => {
    let html = "<ul>";

    const listItems = types.map(type => {
        return `<li class="jewelryType">
            <input type="radio" name="type" value="${type.id}" checked /> ${type.name}
        </li>`
    });

    html += listItems.join("");
    html += "</ul>";

    return html;
};