import { usePokemonData } from "../hooks/usePokemonData.jsx";

export default function DataTable(){
    const url = "http://localhost:5000/genone";
    const { pokemon, error, handleInputs } = usePokemonData(url);

    function handleTypes(types){
        const len = types.length;
        if(len === 1){
            return types[0];
        }
        
        let typeStr = "";
        for(let i = 0; i < len; i++){
            typeStr += types[i];
            if( i < len - 1){
                typeStr += ", ";
            }
        }
        return typeStr;
    }
    
    function DisplayTableData({ pokemon, error }){
        if(!Array.isArray(pokemon)){
            return (
                <tbody>
                    <tr>
                        <td>loading...</td>
                    </tr>
                </tbody>
            );
        }
        else if (error){
            return (
                <tbody>
                    <tr>
                        <td>{error}</td>
                    </tr>
                </tbody>
            );
        }
        else {
            return(
                <>
                {
                    pokemon.map((p) => (
                        <tr key={p.id} >
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{handleTypes(p.pokemonType)}</td>
                            <td>{p.height}</td>
                            <td>{p.weight}</td>
                        </tr>
                    ))
                }
                </>
            );
        }
    }

    const choices = ["Poke ID:", "Pokemon:", "Types(s):", "Height:", "Weight:"];
    return (
        <>
            <div className="main-content">
                <table>
                    <thead>
                        <tr>
                            {choices.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="filter-input">
                            {choices.map((_, index) => (
                                    <td key={index}>
                                        <input 
                                        type="text"
                                        onChange={(e) => handleInputs(index, e.target.value)}  />
                                    </td>
                                ))
                            }
                        </tr>
                        <DisplayTableData pokemon={pokemon} error={error} />
                    </tbody>
                </table>
            </div>
        </>
    );
}