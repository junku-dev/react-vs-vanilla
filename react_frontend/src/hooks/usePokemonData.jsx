import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokemonData(url){
    const [pokemon , setPokemon] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [error, setError] = useState("");
    
    
    useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(response => {
                if(response.status === 200){
                    console.log(response.data);
                    setAllPokemon(response.data);
                    setPokemon(response.data);
                }
            })
            .catch((err) => {
                console.log("error: " + err)
                setError(err.message);
            })
        }

        fetchData();

    }, [url]);

    const handleInputs = (position, input) => {
        const choices = ["id", "name", "pokemonType", "height", "weight"]
        let filteredPokemon = [];
        if(pokemon){
            //add more filters to an existing filter
            for(let i in allPokemon){
                let p = allPokemon[i];
                let val = String(p[choices[position]]);
                if (val.includes(input)){
                    filteredPokemon.push(p);
                }
            }
            setPokemon(filteredPokemon.length > 0 ? filteredPokemon : allPokemon);
        }
        else if(allPokemon){
            //create new filter
            for(let i in pokemon){
                let p = pokemon[i];
                let val = String(p[choices[position]]);
                if (val.includes(input)){
                    filteredPokemon.push(p);
                }
            }
            setPokemon(filteredPokemon.length > 0 ? filteredPokemon : allPokemon);
        }
        else {
            console.error("data could not be found, or something else went wrong...");
        }
    };
    return { pokemon, error, handleInputs }
}