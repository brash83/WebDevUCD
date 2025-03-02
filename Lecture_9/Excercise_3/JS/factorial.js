function calculateFactorials() {
    let input = parseInt(prompt("Enter an integer value greater than 1 and less than 20:"));

    
    if (isNaN(input) || input <= 1 || input >= 20) {
        alert("Invalid input. Please enter a number greater than 1 and less than 20.");
        console.error("Invalid input. Exiting.");
        return;
    }

    let resultText = "<strong>Factorials:</strong><br>";

    
    for (let n = input; n >= 1; n--) {
        let factorial = 1;

        
        for (let i = 1; i <= n; i++) {
            factorial *= i;
        }

       
        resultText += `${n}! = ${factorial}<br>`;
        console.log(`${n}! = ${factorial}`);
    }

    
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = resultText;
}


calculateFactorials();
