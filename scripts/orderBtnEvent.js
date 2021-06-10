// Function that contains a custom event listener that will show order btn when all selections are made

export const dispatchOrderBtnEvent = () => document.dispatchEvent(new CustomEvent("showOrderBtn"))