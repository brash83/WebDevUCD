function sumAndAverageCalculator() {
    let numbers = [];
    let totalSum = 0;
    let count = 0;
    let input;

    // Prompt the user until they input -1
    while (true) {
        input = parseFloat(prompt("Enter a positive number (-1 to quit):"));

        // If input is -1, break the loop
        if (input === -1) {
            break;
        }

        // Check if input is valid and positive
        if (isNaN(input) || input < 0) {
            console.error("Invalid input. Please enter a positive number or -1 to quit.");
            continue;
        }

        // Add valid numbers to the array and update sum and count
        numbers.push(input);
        totalSum += input;
        count++;
    }

    // Handle the case where no valid input was entered
    if (count === 0) {
        console.log("No numbers entered. Nothing to calculate.");
        document.getElementById("result").innerHTML = "No numbers entered. Nothing to calculate.";
        return;
    }

    // Calculate the average
    let average = totalSum / count;

    // Prepare the output
    const resultText = `
        <strong>SUMS:</strong><br>
        The values you entered were: ${numbers.join(", ")}<br>
        Number Count = ${count}<br>
        Sum = ${totalSum.toFixed(3)}<br>
        Average = ${average.toFixed(3)}
    `;

    // Output to the HTML document
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = resultText;

    // Output to the console
    console.log("SUMS:");
    console.log(`The values you entered were: ${numbers.join(", ")}`);
    console.log(`Number Count = ${count}`);
    console.log(`Sum = ${totalSum.toFixed(3)}`);
    console.log(`Average = ${average.toFixed(3)}`);
}

// Call the function when the page loads
sumAndAverageCalculator();
