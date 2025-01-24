from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

#load keys
load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')

