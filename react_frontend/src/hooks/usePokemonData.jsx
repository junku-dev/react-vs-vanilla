import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokemonData(url){
    const [pokemon , setPokemon] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState(Array(6).fill({position: null, input:""}));
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

    useEffect(() => {
        if(allPokemon.length > 0){
            filterPokemon();
        }
    }, [filter,allPokemon]);

    function filterPokemon(){
        const choices = ["id", "name", "pokemonType", "height", "weight"]
        let filteredPokemon = [...allPokemon];

        filter.forEach(filter => {
            if(filter.input && filter.position !== null){
                console.log(filter);
                filteredPokemon = filteredPokemon.filter(p => {
                    const val = String(p[choices[filter.position]]).toLowerCase();
                    return val.includes(filter.input.toLowerCase());
                });
                console.log(filteredPokemon.length);
            }
        });
        
        setPokemon(filteredPokemon.length > 0 ? filteredPokemon : allPokemon);
    }

    const handleInputs = (position, input) => {
        setFilter(prev => {
            const newFilters = [...prev];
            newFilters[position] = { position, input };
            return newFilters;
        });
    };

    return { pokemon, error, handleInputs }
}