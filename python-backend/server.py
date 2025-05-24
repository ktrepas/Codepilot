from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import sys

app = Flask(__name__)
CORS(app)

@app.route('/api/python', methods=['POST'])
def run_python():
    data = request.get_json()
    code = data.get('code', '')
    try:
        # Redirect stdout to capture print output
        old_stdout = sys.stdout
        sys.stdout = mystdout = io.StringIO()
        exec_globals = {}
        exec(code, exec_globals)
        sys.stdout = old_stdout
        output = mystdout.getvalue()
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)