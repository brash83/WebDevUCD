export default class PublicHolidaysDataTable {
    #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/";
    #countriesUrl = "https://date.nager.at/api/v3/AvailableCountries";
    #config; // Configuration object
    #data; // Data object returned via fetch
    #dropdownCountries = []; // List of available countries
    #dropdownYears = []; // List of available years
    #componentRoot; // Root element for rendering

    constructor(config) {
        this.#config = config;

        // Assign component root and validate
        this.#componentRoot = document.getElementById("content");
        if (!this.#componentRoot) {
            throw new Error("Element with ID 'content' not found in the DOM.");
        }

        // Add event listener for dropdown changes
        document.addEventListener("change", this.handleEvent.bind(this));

        this.init(); // Initialize the component
    }

    async init() {
        try {
            await this.loadCountries(); // Load countries
            this.#dropdownYears = this.loadYears(); // Load years
            this.render(); // Render the dropdowns and placeholder
            await this.loadData(); // Fetch and render the table data
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
                        country.countryCode === this.#config.country ? "selected" : ""
                    }>${country.name}</option>`
            )
            .join("");
    }

    renderYears() {
        return this.#dropdownYears
            .map(
                (year) =>
                    `<option value="${year}" ${
                        year === this.#config.year ? "selected" : ""
                    }>${year}</option>`
            )
            .join("");
    }

    async loadData() {
        try {
            const url = `${this.#dataUrl}${this.#config.year}/${this.#config.country}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            this.#data = await response.json();
            this.renderTable(); // Render the table
        } catch (error) {
            console.error(`Could not fetch holiday data: ${error.message}`);
            this.#componentRoot.innerHTML += `<p style="color: red;">Error fetching data. ${error.message}</p>`;
        }
    }

    render() {
        // Render dropdowns and table container
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
        const columnNames = Object.keys(tableData[0]);

        let outputHtml = `
            <h2>${this.#config.title}</h2>
            <table class="blueTable">
                <thead>
                    <tr>${columnNames.map((name) => `<th>${name}</th>`).join("")}</tr>
                </thead>
                <tbody>
                    ${tableData
                        .map(
                            (row) =>
                                `<tr>${columnNames
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
            this.#config.country = value;
        } else if (id === "year") {
            this.#config.year = value;
        }
        this.loadData(); // Reload data with updated parameters
    }
}
