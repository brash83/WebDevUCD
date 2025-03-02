import PublicHolidaysDataTable from "./modules/PublicHolidaysDataTable.js";

function init() {
    // Configuration object for the table
    const config = {
        country: "IE", // Default country
        year: new Date().getFullYear(), // Default year
        title: "Public Holidays", // Table title
    };

    // Create an instance of the table
    new PublicHolidaysDataTable(config);
}

window.addEventListener("load", init);
