import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function DataTable(){
    const url = "http://localhost:5000/genone";
    const [pokemons , setPokemons] = useState([]);

    function fetchData(url){
        axios.get(url)
        .then(response => {
            if(response.status === 200){
                console.log(response.data);
                setPokemons(response.data);
            }
        })
        .catch((err) => console.log("error: " + err))
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

    function DisplayTableData(){
        if(!Array.isArray(pokemons)){
            return (
                <tbody>
                    <tr>
                        <td>loading...</td>
                    </tr>
                </tbody>
            );
        }
        return(
            <tbody>
                {
                    pokemons.map((p) => (
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

    useEffect(() => {
        fetchData(url);
    }, []);

    return (
        <>
            <div className="main-content">
                <table>
                    <thead>
                        <tr>
                            <th>pokemon id</th>
                            <th>name</th>
                            <th>type(s)</th>
                            <th>height</th>
                            <th>weight</th>
                        </tr>
                    </thead>
                    <DisplayTableData />
                </table>
            </div>
        </>
    );
}