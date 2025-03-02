function sumAndAverageCalculator() {
    let numbers = [];
    let totalSum = 0;

    // Prompt the user for 5 numbers
    for (let i = 1; i <= 5; i++) {
        let input = parseFloat(prompt(`Enter number ${i} of 5:`));

        // Validate input
        while (isNaN(input)) {
            input = parseFloat(prompt(`Invalid input. Please enter a valid number for ${i} of 5:`));
        }

        numbers.push(input); // Add the number to the array
        totalSum += input;   // Add the number to the sum
    }

    // Calculate the average
    let average = totalSum / numbers.length;

    // Prepare the output
    const resultText = `
        <strong>SUMS:</strong><br>
        The values entered were: ${numbers.join(", ")}<br>
        Sum = ${totalSum}<br>
        Average = ${average.toFixed(2)}
    `;

    // Output to the HTML document
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = resultText;

    // Output to the console
    console.log("SUMS:");
    console.log(`The values entered were: ${numbers.join(", ")}`);
    console.log(`Sum = ${totalSum}`);
    console.log(`Average = ${average.toFixed(2)}`);
}

// Call the function when the page loads
sumAndAverageCalculator();
