import { getOrders, getMetals, getSizes, getStyles } from "./database.js";

const metals = getMetals();
const orders = getOrders();
const sizes = getSizes();
const styles = getStyles();

// The function you pass to find() must return true/false
const foundMetal = metals.find(
    (metal) => {
        for (let order of orders) {
            return metal.id === order.metalId;
        };
    }
);

const foundSize = sizes.find(
    (size) => {
        for (let order of orders) {
            return size.id === order.sizeId;
        };
    }
);

const foundStyle = styles.find(
    (style) => {
        for (let order of orders) {
            return style.id === order.styleId;
        };
    }
);

let totalCost = foundMetal.price + foundSize.price + foundStyle.price;

const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
});

const buildOrderListItem = (order) => {
    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
};

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

