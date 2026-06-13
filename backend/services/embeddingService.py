from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys

model = SentenceTransformer('all-MiniLM-L6-v2')

input_data = json.loads(sys.argv[1])

user_text = input_data["user"]
products = input_data["products"]

user_embedding = model.encode([user_text])

product_texts = [
    p["category"] + " " + p["description"]
    for p in products
]

product_embeddings = model.encode(product_texts)

scores = cosine_similarity(
    user_embedding,
    product_embeddings
)[0]

for i, p in enumerate(products):
    p["score"] = float(scores[i])

products.sort(
    key=lambda x: x["score"],
    reverse=True
)

print(json.dumps(products[:5]))