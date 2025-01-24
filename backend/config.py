from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

#load keys
load_dotenv()
GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')

