import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import svm
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, accuracy_score, recall_score, precision_score, confusion_matrix
from tqdm import tqdm
import time

df = pd.read_csv("deceptive-opinion.csv")

# Select and preprocess the relevant columns
df1 = df[["deceptive", "text"]].copy()
# Replacing string labels with numeric values
df1.loc[df1["deceptive"] == "deceptive", "deceptive"] = 0
df1.loc[df1["deceptive"] == "truthful", "deceptive"] = 1

# Defining features and labels
X = df1["text"]
Y = np.asarray(df1["deceptive"], dtype=int)

# Spliting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=109)

# Initialing the count vectorizer
cv = CountVectorizer()
x_train = cv.fit_transform(X_train)
x_test = cv.transform(X_test)

# Initialize and train the Multinomial Naive Bayes model with progress bar
nb = MultinomialNB()

print("\n")
with tqdm(total=len(y_train), desc="Training Multinomial Naive Bayes", ncols=100) as pbar:
    nb.partial_fit(x_train, y_train, classes=np.unique(y_train))
    pbar.update(len(y_train))

pickle.dump(nb, open("model.pkl", "wb"))

model = pickle.load(open("model.pkl", "rb"))
print(model)

nb_predictions = nb.predict(x_test)

print("\n\n")
print("Multinomial Naive Bayes Metrics:")
print("F1 Score:", f1_score(y_test, nb_predictions))
print("Accuracy Score:", accuracy_score(y_test, nb_predictions))
print("Recall Score:", recall_score(y_test, nb_predictions))
print("Precision Score:", precision_score(y_test, nb_predictions))
print("\n\n")

nb_cm = confusion_matrix(y_test, nb_predictions)
plt.figure(figsize=(10, 7))
sns.heatmap(nb_cm, annot=True, fmt='d', cmap='Blues', xticklabels=['Deceptive', 'Truthful'], yticklabels=['Deceptive', 'Truthful'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix - Multinomial Naive Bayes')

clf = svm.SVC(kernel="linear")

with tqdm(total=len(y_train), desc="Training Support Vector Machine", ncols=100) as pbar:
    clf.fit(x_train, y_train)
    pbar.update(len(y_train))

svm_predictions = clf.predict(x_test)

print("\nSupport Vector Machine Metrics:")
print("F1 Score:", f1_score(y_test, svm_predictions))
print("Accuracy Score:", accuracy_score(y_test, svm_predictions))
print("Recall Score:", recall_score(y_test, svm_predictions))
print("Precision Score:", precision_score(y_test, svm_predictions))
print("\n\n")

svm_cm = confusion_matrix(y_test, svm_predictions)
plt.figure(figsize=(10, 7))
sns.heatmap(svm_cm, annot=True, fmt='d', cmap='Blues', xticklabels=['Deceptive', 'Truthful'], yticklabels=['Deceptive', 'Truthful'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix - Support Vector Machine')
plt.savefig('confusion_matrix_svm.png') 