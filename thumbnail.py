from fastapi import FastAPI, UploadFile, File
from pdf2image import convert_from_path
from PIL import Image
import os

app = FastAPI()

UPLOAD_DIR = "uploads/"
THUMBNAIL_DIR = "./thumbnails/"


os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(THUMBNAIL_DIR, exist_ok=True)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    thumbnail_path = generate_thumbnail(file_path, file.filename)
    return {"filename": file.filename, "thumbnail": thumbnail_path}

def generate_thumbnail(file_path, filename):
    ext = filename.split('.')[-1].lower()
    if ext == "pdf" or ext == "docx":
        images = convert_from_path(file_path, first_page=1, last_page=1, poppler_path="C:\\Users\\tdk19\\Downloads\\Release-24.08.0-0\\poppler-24.08.0\\Library\\bin")
        thumbnail_path = os.path.join(THUMBNAIL_DIR, f"{filename}.jpg")
        images[0].save(thumbnail_path, "JPEG")
    else:
        thumbnail_path = file_path  # Nếu là ảnh, dùng luôn file gốc
    return thumbnail_path   
