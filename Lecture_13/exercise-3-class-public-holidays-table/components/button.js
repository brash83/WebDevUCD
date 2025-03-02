export default class BtnHandler {
    constructor(buttonId) {
        this.button = document.getElementById(buttonId);
        if (this.button) {
            this.button.addEventListener("click", this.handleClick);
        } else {
            console.error(`Button with ID ${buttonId} not found.`);
        }
    }

    handleClick() {
        alert("Button clicked!");
    }
}
