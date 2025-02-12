document.getElementById("loadDocuments").addEventListener("click", function() {
    const documents = [
        {
            "Số/Ký hiệu": "14/KHLT-HLHTNVN-HSVVN-NVHTN",
            "Ngày ban hành": "23/12/2024",
            "Trích yếu": "Kế hoạch tổ chức Liên hoan hợp xướng lần 5 – Chủ đề 'Tôi yêu tổ quốc tôi'",
            "Tệp đính kèm": "https://hoisinhvientphcm.com/wp-content/uploads/2024/12/14_KHLT_HLHTNVN_HSVVN_NVHTN.pdf"
        },
        {
            "Số/Ký hiệu": "173/BTK",
            "Ngày ban hành": "13/12/2024",
            "Trích yếu": "Công văn 173 Về việc đẩy mạnh tổ chức 'Hành trình Chín tháng Giêng'",
            "Tệp đính kèm": "https://hoisinhvientphcm.com/wp-content/uploads/2024/12/173_BTK.pdf"
        },
        {
            "Số/Ký hiệu": "72/TB-BTK",
            "Ngày ban hành": "08/12/2024",
            "Trích yếu": "Thông báo số 01 về đăng ký chiến sĩ trực tuyến chiến dịch Xuân tình nguyện năm 2025",
            "Tệp đính kèm": "https://hoisinhvientphcm.com/wp-content/uploads/2024/12/72_TB_BTK.pdf"
        }
    ];

    let tableBody = document.querySelector("#documentTable tbody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ

    documents.forEach(doc => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${doc["Số/Ký hiệu"]}</td>
            <td>${doc["Ngày ban hành"]}</td>
            <td>${doc["Trích yếu"]}</td>
            <td><a href="${doc["Tệp đính kèm"]}" target="_blank">Xem</a></td>
        `;
        tableBody.appendChild(row);
    });
});
