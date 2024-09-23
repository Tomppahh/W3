async function fetchData(){
    try {
        //muni and pop fetch
        const response = await fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff');
        const data = await response.json();
        console.log(data);

        // employment fetch
        const employment_response = await fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065');
        const employment_data = await employment_response.json();
         
        // get muni and pop data
        const municipalities = data.dataset.dimension.Alue.category.label;
        const populations = data.dataset.value;
        const employments = employment_data.dataset.value;
        
        //Populate table
        const tbody = document.querySelector('#municipality-table tbody')

        Object.values(municipalities).forEach((municipality, index) => {
            const row = document.createElement('tr')

            //Create and append cells
            const municipalityCell = document.createElement('td')
            municipalityCell.textContent = municipality;
            row.appendChild(municipalityCell);

            const populationCell = document.createElement('td')
            populationCell.textContent = populations[index];
            row.appendChild(populationCell)

            const employmentCell = document.createElement('td');
            employmentCell.textContent = employments[index];
            row.appendChild(employmentCell);

            const employmentPercentageCell = document.createElement('td')
            const employmentPercentage = ((employments[index]/populations[index]) * 100).toFixed(2);
            employmentPercentageCell.textContent = `${employmentPercentage}%`;
            row.appendChild(employmentPercentageCell);

            tbody.appendChild(row);
            
        });
    }catch(error){
    console.error('Error getting data: ',error);
    }
}


fetchData();