// Function to change the text color of a paragraph
function changeColour(paragraph, color) {
    paragraph.style.color = color;
}

// Add a click event listener to btn1 to change para1's color to blue
document.getElementById('btn1').addEventListener('click', function () {
    const para1 = document.getElementById('para1');
    changeColour(para1, 'blue'); // Change para1 text color to blue
});

// Add a click event listener to btn2 to change para2's color to red
document.getElementById('btn2').addEventListener('click', function () {
    const para2 = document.getElementById('para2');
    changeColour(para2, 'red'); // Change para2 text color to red
});

// Function to add a new quote paragraph
function addNewParagraph(text) {
    const newPara = document.createElement('p');
    newPara.classList.add('quote-card'); // Add class to style the new quote card
    newPara.innerHTML = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        deleteQuote(newPara);
    };

    newPara.appendChild(deleteButton);

    const container = document.getElementById('container');
    container.appendChild(newPara);
}

// Function to delete a quote card
function deleteQuote(quoteId) {
    const quoteCard = document.getElementById(quoteId);
    quoteCard.remove(); // Removes the quote card from the DOM
}

// Add a click event listener to para1 to change its background color to yellow
document.getElementById('quote1').addEventListener('click', function () {
    this.style.backgroundColor = 'yellow'; // Set background color of quote 1 to yellow
});

// Add event listeners to para2 to add/remove "highlight" class on hover
document.getElementById('quote2').addEventListener('mouseover', function () {
    this.classList.add('highlight'); // Add "highlight" class on mouseover
});

document.getElementById('quote2').addEventListener('mouseout', function () {
    this.classList.remove('highlight'); // Remove "highlight" class on mouseout
});

// Add a click event listener to addParaBtn to add a new quote when clicked
document.getElementById('addParaBtn').addEventListener('click', function () {
    addNewParagraph('"A man is not the sum of his actions, but the sum of his will." - Unknown'); // Example quote
});



