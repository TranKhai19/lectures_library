from fastapi import FastAPI
from pydantic import BaseModel
import requests

# Khởi tạo FastAPI
app = FastAPI()

# Thay bằng Hugging Face API Key của bạn
HUGGINGFACE_API_KEY = "HUGGINGFACE_API_KEY"

# Model Endpoint (Meta-Llama 3 8B Instruct)
HF_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"

# Định nghĩa request model
class ChatRequest(BaseModel):
    message: str

@app.post("/chatbot")
async def chatbot(request: ChatRequest):
    headers = {
        "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "inputs": request.message,  # Đúng format Hugging Face
        "parameters": {
            "temperature": 0.5,
            "max_new_tokens": 512,  # Hugging Face dùng "max_new_tokens" thay vì "max_tokens"
            "top_p": 0.7,
        }
    }

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=120)
        
        if response.status_code != 200:
            return {"reply": f"Lỗi từ API: {response.status_code} - {response.text}"}

        response_json = response.json()

        if not response_json:
            return {"reply": "Lỗi từ API: Phản hồi trống"}

        # Hugging Face trả về danh sách JSON, lấy kết quả từ phần tử đầu tiên
        generated_text = response_json[0]["generated_text"]

        return {"reply": generated_text}
    
    except Exception as e:
        return {"reply": f"Lỗi khi xử lý yêu cầu: {str(e)}"}

@app.get("/")
async def root():
    return {"message": "Chatbot API is running with Hugging Face!"}
