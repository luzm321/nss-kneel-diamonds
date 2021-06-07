import { getOrders, getMetals, getSizes, getStyles } from "./database.js";

const metals = getMetals();
const orders = getOrders();
const sizes = getSizes();
const styles = getStyles();


// The function buildOrderListItem is responsible for building the custom order list, finding the prices of each component (metal, size, style),
// and calculating the total cost of the custom order that the user chooses, then returns the value of the order with html string interpolation

const buildOrderListItem = (order) => {
    let totalCost = 0;
// The function you pass to find() must return true/false
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId;
        } 
    );

    totalCost += foundMetal.price;

    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId;  
        }
    );

    totalCost += foundSize.price;

    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId;
        }
    );

    totalCost += foundStyle.price;

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    return `<li>
        Order #${order.id} costs ${costString}, which was created and customized on ${new Date(order.timestamp).toLocaleDateString()}.
    </li>`;
};


export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders();

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem);
   
    html += listItems.join("")
    html += "</ul>"

    return html;
};

