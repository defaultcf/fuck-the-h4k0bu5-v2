from flask import Flask, jsonify
from calc import Calc

app = Flask(__name__)

@app.route("/")
def index():
  return "Hello, world"

@app.route("/result/<string:from_stop>/<string:to_stop>")
def result(from_stop, to_stop):
  res = Calc(from_stop, to_stop).getRes()
  return jsonify(res)

if __name__ == "__main__":
  app.run()
