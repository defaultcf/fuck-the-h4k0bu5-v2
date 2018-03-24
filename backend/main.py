from flask import Flask, jsonify
from calc import Search, Result

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, world"

@app.route("/search/<string:stop>")
def search(stop):
    res = Search(stop).get_res()
    return jsonify(res)

@app.route("/result/<string:from_stop>/<string:to_stop>")
def result(from_stop, to_stop):
    res = Result(from_stop, to_stop).get_res()
    return jsonify(res)

if __name__ == "__main__":
    app.run()
