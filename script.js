// وظائف الآلة الحاسبة الأساسية
const appendValue = (val) => {
    const res = document.getElementById('result');
    res.value += val;
};

const clearScreen = () => {
    document.getElementById('result').value = '';
};

const deleteLast = () => {
    const res = document.getElementById('result');
    res.value = res.value.slice(0, -1);
};

const calculate = () => {
    const res = document.getElementById('result');
    if (!res.value) return;
    try {
        // تحويل العلامات الجمالية لعلامات حسابية برمجية
        let expression = res.value.replace(/×/g, '*').replace(/÷/g, '/');
        res.value = eval(expression);
    } catch (e) {
        alert("Incorrect Equation");
        clearScreen();
    }
};

// --- نظام التحكم الصارم في لوحة المفاتيح ---

// 1. منع أي "Focus" على شاشة الإدخال لضمان عدم حجب الأرقام
document.getElementById('result').addEventListener('focus', (e) => {
    e.target.blur(); 
});

// 2. التقاط المفاتيح من مستوى النافذة بالكامل
window.onkeydown = function(e) {
    const key = e.key;

    // أرقام (0-9)
    if (/[0-9]/.test(key)) {
        appendValue(key);
    }
    // العمليات
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    }
    // النقطة
    else if (key === '.') {
        appendValue('.');
    }
    // تنفيذ (Enter)
    else if (key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    // حذف (Backspace)
    else if (key === 'Backspace') {
        deleteLast();
    }
    // مسح الكل (Shift + Delete) أو (Escape)
    else if ((e.shiftKey && key === 'Delete') || key === 'Escape') {
        clearScreen();
    }
};
