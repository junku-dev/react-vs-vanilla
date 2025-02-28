import json

pokemon_db:list = []

def all_genone_pokemon() -> dict:
    return pokemon_db

def add(pokemon:dict) -> None:
    try:
        pokemon_db.append(pokemon)
    except:
        print("something went wrong...")
        return
    
def delete_by_id(p_id:str) -> str:
    del pokemon_db[p_id]