import { getOrders, getMetals, getSizes, getStyles, getTypes } from "./dataAccess.js";

const metals = getMetals();
const sizes = getSizes();
const styles = getStyles();
const types = getTypes();


// The function buildOrderListItem is responsible for building the custom order list, finding the prices of each component (metal, size, style),
// and calculating the total cost of the custom order that the user chooses, then returns the value of the order with html string interpolation

const buildOrderListItem = (order) => {
// The function you pass to find() must return true/false
    const metalOrder = metals.find(metal => metal.id === order.metalId);
    const sizeOrder = sizes.find(size => size.id === order.sizeId);
    const styleOrder = styles.find(style => style.id === order.styleId);
    const typeOrder = types.find(type => type.id === order.typeId);

    let sumAmount = metalOrder.price + sizeOrder.price + styleOrder.price;

    const calculateCost = () => {
        if (typeOrder.id === 2) {
            sumAmount *= 2;
        } else if (typeOrder.id === 3) {
            sumAmount *= 4;
        } else {
            sumAmount = sumAmount;
        };
        
        return sumAmount;
    };

    const totalCost = calculateCost();

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

