// تنظیم فوکوس ورودی در هنگام بارگذاری صفحه
function convertPersianNumbersToEnglish(str) {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    for (let i = 0; i < persianNumbers.length; i++) {
        str = str.replace(persianNumbers[i], englishNumbers[i]);
    }
    
    return str;
}

window.onload = function() {
    document.getElementById("certificateCode").focus();
    
    // افزودن امکان جستجو با فشردن دکمه Enter
    document.getElementById("certificateCode").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkCertificate();
        }
    });
};

// تابع بررسی و جستجوی گواهی
function checkCertificate() {
    let code = document.getElementById("certificateCode").value.trim();
    code = convertPersianNumbersToEnglish(code); // تبدیل اعداد فارسی به انگلیسی
    let messageDiv = document.getElementById("message");

    if (code === "") {
        showMessage("لطفاً کد ملی خود را وارد کنید", "error");
        return;
    }

    if (!/^\d{10}$/.test(code)) {
        showMessage("کد ملی باید دقیقاً 10 رقم باشد", "error");
        return;
    }

    let filePath = `certificates/${code}.pdf`;

    fetch(filePath, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                showMessage(`
                    <div class="success-container">
                        <span class="success-icon">✓</span>
                        <p>گواهی شما یافت شد!</p>
                        <a href="${filePath}" target="_blank" class="download-btn">
                            <span class="download-icon">⬇</span>
                            دانلود گواهی
                        </a>
                    </div>
                `, "success");
            } else {
                throw new Error("File not found");
            }
        })
        .catch(error => {
            showMessage("گواهی یافت نشد! لطفاً کد ملی خود را صحیح وارد کنید", "error");
        });
}

// تابع نمایش پیام با کلاس مناسب
function showMessage(text, type) {
    let messageDiv = document.getElementById("message");
    messageDiv.innerHTML = text;
    messageDiv.className = type;
    
    // افکت ظاهر شدن تدریجی
    messageDiv.style.opacity = "0";
    setTimeout(() => {
        messageDiv.style.opacity = "1";
    }, 10);
}

// افزودن استایل‌های لازم به صفحه
document.addEventListener("DOMContentLoaded", function() {
    // اضافه کردن استایل برای انیمیشن‌ها و المان‌های اضافی
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            display: flex;
            justify-content: center;
            padding: 20px;
        }
        
        .loading-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(58, 123, 213, 0.2);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .success-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
        
        .success-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            border-radius: 50%;
            font-size: 20px;
        }
        
        .download-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(58, 123, 213, 0.3);
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(58, 123, 213, 0.4);
        }
        
        .download-icon {
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);
});

console.log("Certificate Search System Initialized");