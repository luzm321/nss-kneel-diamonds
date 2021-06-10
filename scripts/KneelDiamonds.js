import { DiamondSizes } from "./DiamondSizes.js";
import { Metals } from "./Metals.js";
import { JewelryStyles } from "./JewelryStyles.js";
import { Orders } from "./Orders.js";
import { addCustomOrder, checkOrderState} from "./database.js";

// Add click event listener and implement/invoke addCustomerOrder function to the Create Custom Order Button by targeting its id
// If checkOrderState() fxn is true and contains all the option values, then execute addCustomOrder function, else display alert:
document.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "orderButton") {
            if (checkOrderState()) {
                addCustomOrder();
            } else {
                window.alert("Please select from all options before placing order.")
            };
            
        };
    }
);

// Event listener below removes the isHidden class from the create custom order button so it is displayed to DOM:

document.addEventListener("showOrderBtn", () => document.querySelector(".orderButton").classList.remove("isHidden"))

export const KneelDiamonds = () => {
    return `
        <h1>Kneel Diamonds</h1>

        <article class="choices">
            <section class="choices__metals options">
                <h2>Metals</h2>
                ${Metals()}
            </section>
            <section class="choices__sizes options">
                <h2>Sizes</h2>
                ${DiamondSizes()}
            </section>
            <section class="choices__styles options">
                <h2>Styles</h2>
                ${JewelryStyles()}
            </section>
        </article>

        <article>
            <button id="orderButton" class="orderButton isHidden">Create Custom Order</button>
        </article>

        <article class="customOrders">
            <h2>Custom Jewelry Orders</h2>
            ${Orders()}
        </article>
    `
};

