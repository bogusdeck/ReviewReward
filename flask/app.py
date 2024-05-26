import os
import string
import pickle
import pandas as pd
import numpy as np
from sklearn import svm
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from nltk.corpus import stopwords
from langchain_cohere import ChatCohere
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

nltk.download("stopwords")

app = Flask(__name__)
CORS(app)

# Cohere LLM
llm = ChatCohere(cohere_api_key="XjFEJxdARMVU166udeN6mzSzahWQbv1qrrmpNmKa")

prompt = ChatPromptTemplate.from_messages([
    ("system", "I want you to check the authenticity of the review written below and check if the given product review detail is matching with other details and also check the validity of the text review that it is worth enough to give reward points and I want the answer in one word 'Original' or 'Fake'."),
    ("user", "{input}")
])

output_parser = StrOutputParser()

chain = prompt | llm | output_parser

df = pd.read_csv("deceptive-opinion.csv")

df1 = df[["deceptive", "text"]].copy()
df1.loc[df1["deceptive"] == "deceptive", "deceptive"] = 0
df1.loc[df1["deceptive"] == "truthful", "deceptive"] = 1
df1.dropna(subset=["text"], inplace=True)

# spliting the dataset into features and target
X = df1["text"]
Y = np.asarray(df1["deceptive"], dtype=int)

# spliting the dataset into trainin and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=109)

cv = CountVectorizer()
X_train_cv = cv.fit_transform(X_train)
X_test_cv = cv.transform(X_test)

nb = MultinomialNB()
nb.fit(X_train_cv, y_train)

clf = svm.SVC(kernel="linear")
clf.fit(X_train_cv, y_train)

# save the model and CountVectorizer if the file doesn't exist
if not os.path.exists("model.pkl"):
    with open("model.pkl", "wb") as f:
        pickle.dump((nb, cv), f)

@app.route("/api/review", methods=["POST"])
def predict():
    data = request.json

    product_name = data['productName']
    category = data['category']
    brand = data['brand']
    purchase_date = data['purchaseDate']
    purchase_price = data['purchasePrice']
    product_review = data['productReview']
    shoppingLink = data['shoppingLink']

    input_text = f"I bought the {product_name} {category} of {brand} from {shoppingLink} on {purchase_date} at {purchase_price}. This is my review about it: {product_review}"

    response = chain.invoke({"input": input_text})

    with open("model.pkl", "rb") as f:
        model, cv = pickle.load(f)

    vect = cv.transform([product_review]).toarray()
    prediction = model.predict(vect)

    my_response = "Original" if prediction == [1] else "Fake"

    message = "Original" if response == "Original" and my_response == "Original" else "Fake"

    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(debug=True)
