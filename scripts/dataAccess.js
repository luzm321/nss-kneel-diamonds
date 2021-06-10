import { database } from "./database.js";




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

export const getTypes = () => database.types.map(type => ({...type}));

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

export const setType = (id) => {
    database.orderBuilder.typeId = id
};

// Function that checks the current order state to verify if each option has been chosen

export const checkOrderState = () => {
    return (
      "metalId" in database.orderBuilder &&
      "sizeId" in database.orderBuilder &&
      "styleId" in database.orderBuilder &&
      "typeId" in database.orderBuilder
    );
};


// function responsible for changing permanent state of customOrder, once changed permanent state, it dispatches a custom event.

export const addCustomOrder = () => {
    // Copy the current state of user choices
    const newOrder = {...database.orderBuilder}

    // Add a new primary key to the object
    const lastIndex = database.customOrders.length - 1
    newOrder.id = lastIndex >= 0 ? database.customOrders[lastIndex].id + 1 : 1
    // newOrder.id = database.customOrders[lastIndex].id + 1

    // Add a timestamp to the order
    newOrder.timestamp = Date.now()

    // Add the new order object to custom orders state
    database.customOrders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
};