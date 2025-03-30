import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokemonData(url){
    const [pokemon , setPokemon] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [error, setError] = useState("");

    const OK = 200;
    
    
    useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(response => {
                console.log(response); //for debugging
                if(response.status === OK){
                    setAllPokemon(response.data);
                    setPokemon(response.data);
                }
                else{
                    setError("data could not be retrieved from response or response status was not OK...");
                }
            })
            .catch((err) => {
                console.log("error: " + err)
                setError(err.message);
            })
        }

        fetchData();

    }, [url]);

    function filterPokemon(position, input, pokemon){
        const choices = ["id", "name", "pokemonType", "height", "weight"]
        let filteredPokemon = [];
        for(let i in pokemon){
            let p = pokemon[i];
            let val = String(p[choices[position]]);
            if (val.includes(input)){
                filteredPokemon.push(p);
            }
        }
        setPokemon(filteredPokemon.length > 0 ? filteredPokemon : allPokemon);
    }

    const handleInputs = (position, input) => {
        if(pokemon){
            //add more filters to an existing filter
            filterPokemon(position, input, allPokemon);
        }
        else if(allPokemon){
            //create new filter
            filterPokemon(position, input, pokemon);
        }
        else {
            console.error("data could not be found, or something else went wrong...");
        }
    };
    return { pokemon, error, handleInputs }
}