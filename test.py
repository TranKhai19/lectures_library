# # from pdf2image import convert_from_path

# # file_path = "uploads\\PRICE LIST.pdf"  # Đổi thành file của bạn
# # images = convert_from_path(file_path, first_page=1, last_page=1)

# # if images:
# #     images[0].save("test_output.jpg", "JPEG")
# #     print("Thumbnail created successfully!")
# # else:
# #     print("No images extracted!")

# from pdf2image import convert_from_path

# file_path = "uploads\\"  # Đổi thành file của bạn

# images = convert_from_path(file_path, first_page=1, last_page=1, poppler_path="C:\\Users\\tdk19\\Downloads\\Release-24.08.0-0\\poppler-24.08.0\\Library\\bin")

# if images:
#     images[0].save("test_output.jpg", "JPEG")
#     print("Thumbnail created successfully!")
# else:
#     print("No images extracted!")

import os

file_path = os.path.join("uploads", "PRICE LIST.pdf")
try:
    with open(file_path, "rb") as f:
        print("✅ File mở thành công!")
except Exception as e:
    print(f"🚨 Không thể mở file: {e}")

