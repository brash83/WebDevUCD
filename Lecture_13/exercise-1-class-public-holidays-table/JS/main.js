class PublicHolidaysDataTable {
    // Properties
    #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/"; // Base URL for REST API
    #country = "IE"; // Default country
    #year = "2024"; // Default year
    #title; // Title text for component
    #data; // Data object returned via fetch()
    #componentRoot; // DOM node for component
    #columnNames; // Array of column names to display

    constructor(title) {
        this.#title = title;
        this.#componentRoot = document.getElementById("content");

        // Add event listener for dropdown changes
        document.addEventListener("change", this.handleEvent.bind(this));
        this.render(); // Render dropdowns and placeholder
        this.loadData(); // Initial load
    }

    async loadData() {
        try {
            const url = `${this.#dataUrl}${this.#year}/${this.#country}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            this.#data = await response.json();
            this.renderTable(); // Render the updated table
        } catch (error) {
            console.error(`Could not get holiday data: ${error}`);
            this.#componentRoot.innerHTML += `<p style="color: red;">Error fetching data. ${error.message}</p>`;
        }
    }

    render() {
        // Add dropdowns for year and country
        this.#componentRoot.innerHTML = `
            <div class="controls">
                <label for="country">Country:</label>
                <select id="country">
                    <option value="IE" selected>Ireland</option>
                    <option value="US">United States</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>
                
                <label for="year">Year:</label>
                <select id="year">
                    <option value="2023">2023</option>
                    <option value="2024" selected>2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>
            <div id="table-container"></div>
        `;
    }

    renderTable() {
        if (!this.#data || this.#data.length === 0) {
            this.#componentRoot.innerHTML += `<p>No data available.</p>`;
            return;
        }

        const tableData = this.#data;
        this.#columnNames = Object.keys(tableData[0]);

        // Build the table HTML
        let outputHtml = `
            <h2>${this.#title}</h2>
            <table class="blueTable">
                <thead>
                    <tr>${this.#columnNames.map(name => `<th>${name}</th>`).join("")}</tr>
                </thead>
                <tbody>
                    ${tableData.map(row => `
                        <tr>${this.#columnNames.map(col => `<td>${row[col]}</td>`).join("")}</tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        document.getElementById("table-container").innerHTML = outputHtml;
    }

    handleEvent(event) {
        const { id, value } = event.target;
        if (id === "country") {
            this.#country = value;
        } else if (id === "year") {
            this.#year = value;
        }
        this.loadData(); // Reload data with updated parameters
    }
}

// Initialize the table on load
function init() {
    new PublicHolidaysDataTable("Public Holidays");
}

window.addEventListener("load", init);
