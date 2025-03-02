// code is wrapped in an IIFE (Immediately Invoked Function Expression). See https://developer.mozilla.org/en-US/docs/Glossary/IIFE for more details
//
(() => {
    // globals
    const contentContainer = document.getElementById("content");
    
    function renderTable(publicHolidays) {
        let outputHtml = `
            <div class="table-container">
                <h2>List of Public Holidays in Ireland for 2024</h2>
                <table class="blueTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name (in Irish)</th>
                            <th>Name</th>
                            <th>Country Code</th>
                            <th>Types</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${publicHolidays.map(holiday => `
                            <tr>
                                <td>${holiday.date}</td>
                                <td>${holiday.localName}</td>
                                <td>${holiday.name}</td>
                                <td>${holiday.countryCode}</td>
                                <td>${holiday.types.join(', ')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        contentContainer.innerHTML = outputHtml;
    }

    function init() {
        try {
           
            console.log(data);
            renderTable(data); 
        } catch(err) {
            console.error(err);
            contentContainer.innerHTML = '<h2>Error</h2><p>No public holidays to display.</p><p>' + err + '</p>';
        }
    }

    window.addEventListener("load", (event => {
        init();
    }));

})();
