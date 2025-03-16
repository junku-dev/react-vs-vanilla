export default function fetchData(){
    const dt = document.getElementById("data") || null;
    const api_url = "http://localhost:5000/genone";
    
    function handleTypes(types){
        const len = types.length;
        if(len === 1){
            return types[0];
        }
        
        let typeStr = "";
        for(let i = 0; i < len; i++){
            typeStr += types[i]
            if(i < len - 1){
                typeStr += ",";
            }
        }
        return typeStr;
    }
    
    function displayPokemonData(data){
        let table_data = '';

        let id = 0;
        let name = "";
        let type = "";
        let height = 0;
        let weight = 0;

        for(let i = 0; i < data.length; i++){
            let pokemon = data[i];
            id = pokemon["id"];
            name = pokemon["name"];
            type = handleTypes(pokemon["pokemonType"]);
            height = pokemon["height"];
            weight = pokemon["weight"];

            table_data += `
                <tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${type}</td>
                    <td>${height}</td>
                    <td>${weight}</td>
                </tr>
            `;
        }
        return table_data;
    }
    
    async function getPokemon(){
        const req = {
            method: 'GET',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        await fetch(api_url, req)
        .then(async (response) => {
            if(response.ok){
                const data = await response.json();
                dt.innerHTML = displayPokemonData(data); 
            }
            else{
                throw await response.json();
            }
        })
        .catch((error) => {
            console.error("Error: " + error);
        });
    }

    if(dt){
        getPokemon();
    }
    else {
        dt.innerHtml = "<tr>something went wrong...</tr>"
    }
}