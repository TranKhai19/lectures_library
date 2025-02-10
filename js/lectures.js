document.addEventListener("DOMContentLoaded", function () {
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileInput");
  const lecturesList = document.getElementById("lecturesList");
  const toggleUploadForm = document.getElementById("toggleUploadForm");
  const uploadForm = document.getElementById("uploadForm");

  // Hiển thị/ẩn form tải lên
  toggleUploadForm.addEventListener("click", function () {
    uploadForm.style.display =
      uploadForm.style.display === "none" ? "block" : "none";
  });

  // Upload file
  uploadBtn.addEventListener("click", async function () {
    const file = fileInput.files[0];
    if (!file) return alert("Vui lòng chọn file");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:4000/lectures/upload", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
      alert("Tải lên thành công!");
      loadLectures();
    }
  });

  // Load danh sách bài giảng
  async function loadLectures() {
    const response = await fetch("http://localhost:4000/lectures");
    const data = await response.json();
    lecturesList.innerHTML = "";

    data.lectures.forEach((file) => {
      const lectureCard = document.createElement("div");
      lectureCard.classList.add("lecture-card");

      lectureCard.innerHTML = `
                <div class="lecture-info">
                    <h2 class="lecture-title">${file.name}</h2>
                    <a href="${file.url}" target="_blank">📄 Xem bài giảng</a>
                </div>
            `;
      lecturesList.appendChild(lectureCard);
    });
  }

  loadLectures();
});
