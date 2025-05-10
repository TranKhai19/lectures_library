# from fastapi import FastAPI, Query
# import json
# import os
# import pdfplumber
# from docx import Document
# import openai

# app = FastAPI()

# # Load danh sách sách từ file JSON
# with open("data\\books.json", "r", encoding="utf-8") as f:
#     books = json.load(f)

# # API tìm kiếm sách
# @app.get("/search/book/")
# def search_book(query: str = Query(..., description="Tên sách cần tìm")):
#     results = [book for book in books if query.lower() in book["title"].lower()]
#     return {"books": results if results else "Không tìm thấy sách phù hợp."}

# # API tìm kiếm bài giảng trong thư mục lectures
# @app.get("/search/lecture/")
# def search_lecture(query: str):
#     folder_path = "./lectures"
#     files = os.listdir(folder_path)
#     results = [file for file in files if query.lower() in file.lower()]
#     return {"lectures": results if results else "Không tìm thấy bài giảng."}

# # API đọc file PDF
# def read_pdf(file_path):
#     text = ""
#     with pdfplumber.open(file_path) as pdf:
#         for page in pdf.pages:
#             text += page.extract_text() + "\n"
#     return text

# # API đọc file DOCX
# def read_docx(file_path):
#     doc = Document(file_path)
#     return "\n".join([p.text for p in doc.paragraphs])

# # API hỏi GPT-4
# @app.get("/ask/")
# def ask_gpt(question: str):
#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[{"role": "user", "content": question}]
#     )
#     return {"answer": response["choices"][0]["message"]["content"]}

# # Chạy server FastAPI
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)

from fastapi import FastAPI
from pydantic import BaseModel
import openai

app = FastAPI()

openai.api_key = "OPENAI_API_KEY"

class ChatRequest(BaseModel):
    message: str

@app.post("/chatbot")
async def chatbot(request: ChatRequest):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": request.message}]
    )
    return {"reply": response["choices"][0]["message"]["content"]}
