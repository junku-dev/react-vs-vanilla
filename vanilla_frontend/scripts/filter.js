const inputs = document.querySelectorAll("input.filter-input");
const dt = document.getElementById("data");

function inputIsNum(value){
    if(Number.isInteger(value)){
        return true;
    }
    return false;
}

function filterTable(){
    if(!dt){
        dt.innerHTML = '<tr><td>something went wrong...</td></tr>';
        console.error("Error: table data could not be found on the page...");
        return;
    }

    const rows = dt.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++ ){
        const row = rows[i];
        let shouldDisplay = true;

        for (let j = 0; j < inputs.length; j++){
            const input = inputs[j];
            const filter = input.value.toUpperCase();
            const cell = row.getElementsByTagName("td")[j];

            if(cell){
                const cellTxt = cell.innerText || cell.textContent;
                if(filter && cellTxt.toUpperCase().indexOf(filter) < 0){
                    shouldDisplay = false;
                }
            }
        }
        row.style.display = shouldDisplay ? "" : "none";
    }
}

inputs.forEach(input => {
	input.addEventListener("input", filterTable);
});