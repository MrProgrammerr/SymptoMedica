from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import helper
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process', methods=['POST'])
def process():
    try:
        symps = request.get_json()
        
        if not isinstance(symps, list) or not all(isinstance(item, str) for item in symps):
            return jsonify({"error": "Input must be an array of strings"}), 400
        
        disease, dis_class = helper.get_predicted_value(symps) 
        desc, pre, med, die, wrkout = helper.get_details(disease)
        return jsonify({"disease": disease,
                        "desc": desc,
                        "pre": pre,
                        "med": med,
                        "diet": die,
                        "wrkout": wrkout
                        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Make sure Flask listens on all available network interfaces
