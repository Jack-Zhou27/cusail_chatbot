from flask import request, jsonify
from .config import app
from .chat import Chat

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    response = Chat.get_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=False)
