class PublicHolidaysDataTable {
    // Properties
    #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/"; // Base URL for REST API
    #countriesUrl = "https://date.nager.at/api/v3/AvailableCountries"; // URL for available countries
    #country = "IE"; // Default country
    #year = new Date().getFullYear(); // Default year
    #title; // Title text for component
    #data; // Data object returned via fetch()
    #componentRoot; // DOM node for component
    #columnNames; // Array of column names to display
    #dropdownCountries = []; // Array of available countries
    #dropdownYears = []; // Array of years available

    constructor(title) {
        this.#title = title;
        this.#componentRoot = document.getElementById("content");

        // Add event listener for dropdown changes
        document.addEventListener("change", this.handleEvent.bind(this));

        this.init(); // Initialize the component
    }

    async init() {
        try {
            await this.loadCountries(); // Load the list of countries
            this.#dropdownYears = this.loadYears(); // Generate the list of years
            this.render(); // Render dropdowns and placeholder
            await this.loadData(); // Load initial data
        } catch (error) {
            console.error(`Initialization error: ${error.message}`);
        }
    }

    async loadCountries() {
        try {
            const response = await fetch(this.#countriesUrl);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            this.#dropdownCountries = await response.json();
        } catch (error) {
            console.error(`Could not fetch countries: ${error.message}`);
        }
    }

    loadYears() {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => currentYear + i);
    }

    renderCountries() {
        return this.#dropdownCountries
            .map(
                (country) =>
                    `<option value="${country.countryCode}" ${
                        country.countryCode === this.#country ? "selected" : ""
                    }>${country.name}</option>`
            )
            .join("");
    }

    renderYears() {
        return this.#dropdownYears
            .map(
                (year) =>
                    `<option value="${year}" ${
                        year === this.#year ? "selected" : ""
                    }>${year}</option>`
            )
            .join("");
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
            console.error(`Could not fetch holiday data: ${error.message}`);
            this.#componentRoot.innerHTML += `<p style="color: red;">Error fetching data. ${error.message}</p>`;
        }
    }

    render() {
        // Render dropdowns for year and country
        this.#componentRoot.innerHTML = `
            <div class="controls">
                <label for="country">Country:</label>
                <select id="country">
                    ${this.renderCountries()}
                </select>
                
                <label for="year">Year:</label>
                <select id="year">
                    ${this.renderYears()}
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
                    <tr>${this.#columnNames.map((name) => `<th>${name}</th>`).join("")}</tr>
                </thead>
                <tbody>
                    ${tableData
                        .map(
                            (row) =>
                                `<tr>${this.#columnNames
                                    .map((col) => `<td>${row[col]}</td>`)
                                    .join("")}</tr>`
                        )
                        .join("")}
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
