import re
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import BertTokenizer, BertModel
from scipy.spatial.distance import cosine
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import gensim.corpora as corpora
from flask import Flask, request, jsonify
import nltk
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Path for NLTK data
nltk_data_path = os.path.join(os.path.expanduser("~"), "nltk_data")
nltk.data.path.append(nltk_data_path)

# Required NLTK packages
required_nltk_packages = ['stopwords', 'wordnet']

# Download required NLTK packages if not already present
for package in required_nltk_packages:
    try:
        nltk.data.find(f'corpora/{package}')
    except LookupError:
        nltk.download(package, download_dir=nltk_data_path)

# Initialize the lemmatizer and other resources
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load pre-trained model and tokenizer
tokenizer = BertTokenizer.from_pretrained("emilyalsentzer/Bio_ClinicalBERT")
model = BertModel.from_pretrained("emilyalsentzer/Bio_ClinicalBERT")

# Load ICD embeddings and codes
icd_embeddings = np.load("embeddings.npy")
with open('extracted_codes.json', 'r') as file:
    icd_codes = json.load(file)

# Preprocessing function
def preprocess_notes(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\n+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    words = [lemmatizer.lemmatize(word) for word in words]
    return words

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512, padding=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).detach().numpy().flatten()

@app.route('/api/predict_icd', methods=['POST'])
def predict_icd():
    data = request.get_json()
    clinical_note = data.get('clinical_note', '')

    if not clinical_note:
        return jsonify({"error": "No clinical note provided"}), 400

    processed_note = preprocess_notes(clinical_note)
    id2word = corpora.Dictionary([processed_note])
    token_ids = list(id2word.token2id.values())
    all_words = [id2word.get(token_id) for token_id in token_ids]
    unique_words = list(set(all_words))
    unique_words = [word for word in unique_words if len(word) >= 4]
    
    if not unique_words:
        return jsonify({"error": "No valid words found after preprocessing"}), 400
    
    note_embeddings = get_embeddings(" ".join(unique_words))

    similarities = [1 - cosine(note_embeddings, icd_emb) for icd_emb in icd_embeddings]

    icd_with_similarities = [
        {"code": code["code"], "description": code["description"], "similarity": format(sim, ".3f")}
        for code, sim in zip(icd_codes, similarities)
    ]

    sorted_icd_with_similarities = sorted(icd_with_similarities, key=lambda x: x["similarity"], reverse=True)

    return jsonify(sorted_icd_with_similarities[:10])

# To handle the Vercel serverless function entry point
def handler(event, context):
    return app(event, context)
