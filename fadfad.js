// ========== دالة تحديث عداد الأحرف ==========
function updateCharCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const count = textarea.value.length;
    
    charCount.textContent = `${count} / 2000 حرف`;
    
    if (count > 1900) {
        charCount.style.color = '#e74c3c';
    } else {
        charCount.style.color = '#999';
    }
}

// ========== دالة إرسال الرسالة إلى Firebase ==========
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    const btnText = document.getElementById('btnText');
    const sendBtn = document.getElementById('sendBtn');
    
    // التحقق من وجود نص
    if (!message) {
        alert('من فضلك اكتبي فضفضتك أولاً 😊');
        return;
    }
    
    // تغيير نص الزر أثناء الإرسال
    btnText.textContent = '⏳ جاري الإرسال...';
    if (sendBtn) sendBtn.disabled = true;
    
    // إخفاء الرسائل السابقة
    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');
    
    // إنشاء مرجع جديد في قاعدة البيانات
    const messagesRef = database.ref('fadfadat');
    const newMessageRef = messagesRef.push();
    
    // البيانات المراد حفظها
    const messageData = {
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        date: new Date().toLocaleString('ar-SA', {
            timeZone: 'Asia/Riyadh',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // حفظ البيانات في Firebase
    newMessageRef.set(messageData)
        .then(() => {
            // نجح الإرسال
            console.log('✅ تم إرسال الفضفضة بنجاح!');
            
            // عرض رسالة النجاح
            successMsg.classList.add('show');
            
            // مسح النص
            messageInput.value = '';
            updateCharCount();
            
            // إعادة نص الزر
            btnText.textContent = '📨 إرسال الفضفضة';
            if (sendBtn) sendBtn.disabled = false;
            
            // إخفاء رسالة النجاح بعد 4 ثواني
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 4000);
        })
        .catch((error) => {
            // فشل الإرسال
            console.error('❌ خطأ في الإرسال:', error);
            console.error('📝 رسالة الخطأ:', error.message);
            console.error('🔢 كود الخطأ:', error.code);
            console.error('📍 تفاصيل إضافية:', error);
            
            // عرض رسالة الخطأ
            errorMsg.textContent = `❌ خطأ: ${error.message}`;
            errorMsg.classList.add('show');
            
            // إعادة نص الزر
            btnText.textContent = '📨 إرسال الفضفضة';
            if (sendBtn) sendBtn.disabled = false;
            
            // إخفاء رسالة الخطأ بعد 4 ثواني
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 4000);
        });
}

// ========== دالة تبديل الثيم (ليلي/نهاري) ==========
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// ========== تحميل الثيم المحفوظ عند فتح الصفحة ==========
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }
    
    // التحقق من اتصال Firebase
    console.log('🔥 Firebase متصل:', typeof firebase !== 'undefined');
    console.log('💾 Database جاهز:', typeof database !== 'undefined');
});

// ========== اختصار لوحة المفاتيح (Ctrl + Enter للإرسال) ==========
document.getElementById('message').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        sendMessage();
    }
});