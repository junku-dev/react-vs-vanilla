from flask import Flask, jsonify, redirect, url_for, request
from flask_cors import CORS

from util.repo import all_genone_pokemon, add, delete_by_id

app=Flask(__name__)

CORS(app, resources={r"/*/*/": {"origins": "*"}})

@app.route("/", methods=['GET'])
def home():
    return redirect(url_for("gen_one_pokemon"))

@app.route("/genone", methods=['GET'])
def gen_one_pokemon() -> dict:
    return all_genone_pokemon() if len(all_genone_pokemon()) > 0 else {"warn":"empty..."}

@app.route("/genone/add", methods=['POST'])
def add_pokemon() -> str:
    try:
        post_req = request.get_json()
        add(post_req)
        return "success"
    except:
        return "failed..."

@app.route("/genone/del/<int:id>", methods=['GET'])
def delete(id:str):
    delete_by_id(id)
    return redirect(url_for("gen_one_pokemon"))

if __name__ == "__main__":
    app.run(debug=True)