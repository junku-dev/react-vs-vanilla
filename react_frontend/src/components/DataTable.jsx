import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function DataTable(){
    const url = "http://localhost:5000/genone";
    const [pokemon , setPokemon] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [error, setError] = useState("");
    

    function fetchData(url){
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

    function handleTypes(types){
        const len = types.length;
        if (len === 1){
            return types[0];
        }
        let typeStr = "";
        for(let i = 0; i < len; i++){
            typeStr += types[i];
            if (i < len - 1){
                typeStr += ", ";
            }
        }
        return typeStr;
    }

    function handleInputs(position, input){
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
            if(filteredPokemon.length > 0){
                setPokemon(filteredPokemon);
            }
            else {
                setPokemon(pokemon);
            }
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
            if(filteredPokemon.length > 0){
                setPokemon(filteredPokemon);
            }
            else {
                setPokemon(allPokemon);
            }
        }
        else {
            console.error("data could not be found, or something else went wrong...");
        }
    }

    function DisplayTableData(){
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
                <tbody>
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
                </tbody>
            );
        }
    }

    useEffect(() => {
        fetchData(url);
    }, []);

    return (
        <>
            <div className="main-content">
                <table>
                    <thead>
                        <tr>
                            <th>Poke ID:</th>
                            <th>Pokemon:</th>
                            <th>Type(s):</th>
                            <th>Height:</th>
                            <th>Weight:</th>
                        </tr>
                    </thead>
                    <tr className="filter-input">
                        <td>
                            <input 
                                type="text"
                                onChange={(e) => handleInputs(0, e.target.value)} 
                            />
                        </td>
                        <td>
                            <input 
                                type="text"
                                onChange={(e) => handleInputs(1, e.target.value)} 
                            />
                        </td>
                        <td>
                        <input 
                            type="text"
                            onChange={(e) => handleInputs(2, e.target.value)} 
                        />
                        </td>
                        <td>
                        <input 
                            type="text"
                            onChange={(e) => handleInputs(3, e.target.value)} 
                        />
                        </td>
                        <td>
                        <input 
                            type="text"
                            onChange={(e) => handleInputs(4, e.target.value)} 
                        />
                        </td>
                    </tr>
                    <DisplayTableData />
                </table>
            </div>
        </>
    );
}