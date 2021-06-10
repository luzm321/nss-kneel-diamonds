/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/
const database = {
    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carats: 0.5, price: 405 },
        { id: 2, carats: 0.75, price: 782 },
        { id: 3, carats: 1, price: 1470 },
        { id: 4, carats: 1.5, price: 1997 },
        { id: 5, carats: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    customOrders: [
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            timestamp: 1614659931693
        }
    ],
    orderBuilder: {
        metalId: "",
        sizeId: "",
        styleId: ""
    }
};

// Get Functions:

export const getStyles = () => {
    return database.styles.map(style => ({...style}));
};

export const getSizes = () => {
    return database.sizes.map(size => ({...size}));
};

export const getMetals = () => {
    return database.metals.map(metal => ({...metal}));
};

export const getOrders = () => {
    return database.customOrders.map(order => ({...order}));
};

// Set/Save Functions to store/record the temporary/transient state of the orderBuilder object:

export const setMetal = (id) => {
    database.orderBuilder.metalId = id
};

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
};

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
};

// Function that checks the current order state to verify if each option has been chosen

export const checkOrderState = () => {
    return (
      "metalId" in database.orderBuilder &&
      "sizeId" in database.orderBuilder &&
      "styleId" in database.orderBuilder
    );
};


// function responsible for changing permanent state of customOrder, once changed permanent state, it dispatches a custom event.

export const addCustomOrder = () => {
    // Copy the current state of user choices
    const newOrder = {...database.orderBuilder}

    // Add a new primary key to the object
    const lastIndex = database.customOrders.length - 1
    newOrder.id = database.customOrders[lastIndex].id + 1

    // Add a timestamp to the order
    newOrder.timestamp = Date.now()

    // Add the new order object to custom orders state
    database.customOrders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
};