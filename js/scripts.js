document.addEventListener('DOMContentLoaded', function() {
    const nutChatbot = document.getElementById('chatbot-button');
    const cuaSoChatbot = document.getElementById('chatbot-window');
    const nutGui = document.getElementById('send-button');
    const nhapNguoiDung = document.getElementById('user-input');
    const khuVucChat = document.getElementById('chat-area');

    // Chuyển đổi hiển thị cửa sổ chatbot
    nutChatbot.addEventListener('click', function() {
        cuaSoChatbot.classList.toggle('hidden');
    });

    // Xử lý gửi câu hỏi của người dùng
    nutGui.addEventListener('click', function() {
        const tinNhan = nhapNguoiDung.value.trim();
        if (tinNhan) {
            hienThiTinNhan('Người dùng: ' + tinNhan);
            nhapNguoiDung.value = '';
            layPhanHoiChatbot(tinNhan);
        }
    });

    // Hàm hiển thị tin nhắn trong khu vực chat
    function hienThiTinNhan(tinNhan) {
        const phanTuTinNhan = document.createElement('div');
        phanTuTinNhan.textContent = tinNhan;
        khuVucChat.appendChild(phanTuTinNhan);
    }

    // Mô phỏng phản hồi của chatbot
    function layPhanHoiChatbot(tinNhanNguoiDung) {
        // Ở đây bạn có thể triển khai logic thực tế cho phản hồi của chatbot
        const phanHoi = 'Chatbot: Tôi có thể giúp bạn với các câu hỏi về sách và bài giảng.';
        setTimeout(() => {
            hienThiTinNhan(phanHoi);
        }, 1000);
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