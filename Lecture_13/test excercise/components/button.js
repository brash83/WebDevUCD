window.addEventListener("DOMContentLoaded", () => {
const button = document.createElement("button");
button.textContent = "Click me!";
button.addEventListener("click", () => {
    alert("Hello, World!");

});
document.getElementById("root").appendChild(button)
})