from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)

# Enable CORS
CORS(app, supports_credentials=True)  # Allow credentials (cookies, etc.)

# Add Cross-Origin Opener Policy and Cross-Origin Resource Policy headers
@app.after_request
def add_headers(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Resource-Policy'] = 'same-origin'
    return response

# Serve your static files (HTML, CSS, JS)
@app.route('/')
def serve_index():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(os.getcwd(), path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
