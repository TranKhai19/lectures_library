document.addEventListener('DOMContentLoaded', function() {
    const nutChatbot = document.getElementById('chatbot-button');
    const cuaSoChatbot = document.getElementById('chatbot-window');
    const nutGui = document.getElementById('send-button');
    const nhapNguoiDung = document.getElementById('user-input');
    const khuVucChat = document.getElementById('chat-area');

    // Chuyển đổi hiển thị cửa sổ chatbot
    nutChatbot.addEventListener("click", function () {
        cuaSoChatbot.classList.toggle("hidden");
    });

    // Xử lý gửi câu hỏi của người dùng khi nhấn nút gửi
    nutGui.addEventListener("click", function () {
        guiCauHoi();
    });

    // Xử lý khi nhấn Enter để gửi tin nhắn
    nhapNguoiDung.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            guiCauHoi();
        }
    });

    // Hàm gửi câu hỏi và hiển thị phản hồi từ chatbot
    function guiCauHoi() {
        const tinNhan = nhapNguoiDung.value.trim();
        if (tinNhan) {
            hienThiTinNhan("Bạn: " + tinNhan, "user-message");
            nhapNguoiDung.value = "";
            layPhanHoiChatbot(tinNhan);
        }
    }

    // Hàm hiển thị tin nhắn trong khu vực chat
    function hienThiTinNhan(tinNhan, className) {
        const phanTuTinNhan = document.createElement("div");
        phanTuTinNhan.classList.add(className);
        phanTuTinNhan.textContent = tinNhan;
        khuVucChat.appendChild(phanTuTinNhan);
        khuVucChat.scrollTop = khuVucChat.scrollHeight; // Cuộn xuống cuối
    }

    // Gửi câu hỏi đến FastAPI và nhận phản hồi
    function layPhanHoiChatbot(tinNhanNguoiDung) {
        hienThiTinNhan("Đang xử lý...", "bot-message");

        fetch("/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: tinNhanNguoiDung }),
        })
        .then(response => response.json())
        .then(data => {
            const phanHoi = data.reply || "Xin lỗi, tôi không thể trả lời ngay lúc này.";
            khuVucChat.lastChild.remove(); // Xóa "Đang xử lý..."
            hienThiTinNhan("Chatbot: " + phanHoi, "bot-message");
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
            khuVucChat.lastChild.remove();
            hienThiTinNhan("Chatbot: Đã xảy ra lỗi, vui lòng thử lại!", "bot-message");
        });
    }

    
    // Fetch and display lectures
    fetch('/api/lectures')
        .then(response => response.json())
        .then(data => {
            const lectureList = document.getElementById('lecture-list');
            lectureList.innerHTML = ''; // Clear existing content
            data.forEach(lecture => {
                const lectureElement = document.createElement('div');
                lectureElement.classList.add('lecture');
                lectureElement.innerHTML = `
                    <h2>${lecture.name}</h2>
                    <p>${lecture.description}</p>
                    <a href="${lecture.path}" download>Tải xuống</a>
                `;
                lectureList.appendChild(lectureElement);
            });
        })
        .catch(error => console.error('Error fetching lectures:', error));

    // Handle file upload
    const uploadForm = document.getElementById('upload-form');
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const lectureFile = document.getElementById('lecture-file').files[0];
        const lectureName = document.getElementById('lecture-name').value;
        const lectureDescription = document.getElementById('lecture-description').value;
        const formData = new FormData();
        formData.append('lecture', lectureFile);
        formData.append('name', lectureName);
        formData.append('description', lectureDescription);

        fetch('/api/lectures/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            location.reload();
        })
        .catch(error => console.error('Error uploading file:', error));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let books = [];  // Lưu dữ liệu sách
    let currentPage = 1;
    const itemsPerPage = 20; // Số sách mỗi trang

    const booksContainer = document.getElementById("books-list");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageIndicator = document.getElementById("pageIndicator");

    // Fetch dữ liệu từ JSON
    fetch("data/books.json")
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks();
            updatePagination();
        })
        .catch(error => console.error("Lỗi tải dữ liệu:", error));

    function displayBooks() {
        booksContainer.innerHTML = ""; // Xóa nội dung cũ
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const booksToShow = books.slice(start, end);

        booksToShow.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                <img src="${book.image_cover}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h2 class="book-title">${book.title}</h2>
                    <p class="book-category"><strong>Thể loại:</strong> ${book.category || "Không xác định"}</p>
                    <p class="book-price"><strong>Giá:</strong> ${book.price.toLocaleString()} VND</p>
                    <p class="book-description">${book.description.slice(0, 150)}...</p>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });

        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(books.length / itemsPerPage);
        pageIndicator.textContent = `Trang ${currentPage} / ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Xử lý nút chuyển trang
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayBooks();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < Math.ceil(books.length / itemsPerPage)) {
            currentPage++;
            displayBooks();
        }
    });
});
