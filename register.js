// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    const form = document.getElementById("myRegister");
    if (form) {
        form.onsubmit = validateForm;
    }
}

function validateForm(event) {
    const errorMsg = document.getElementById("errormsg");
    const username = document.forms["myRegister"]["username"].value.trim();
    const passwords = document.forms["myRegister"]["password"];
    const password = passwords[0].value;
    const retypePassword = passwords[1].value;

    // 0. ตรวจสอบว่ากรอกข้อมูลครบทุกช่องหรือไม่
    //เติม
    if (!username || !password || !retypePassword) {
        event.preventDefault();
        errorMsg.innerHTML = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        return false;
    }

    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่ ถ้าไม่ตรงกันให้แจ้งเตือน และ return false
    if (password !== retypePassword) {
        event.preventDefault();
        errorMsg.innerHTML = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน";
        return false;
    }

    // 2. เคลียร์ข้อความแจ้งเตือนถ้าผ่านการตรวจสอบ
    errorMsg.innerHTML = "";

    // 3. บันทึกข้อมูลลงใน localStorage
    // เพื่อความปลอดภัย: รหัสผ่านไม่ปรากฏบน Browser Address Bar และ Browser History
    const newUser = {
        username: username,
        password: password
    };

    // ดึงรายชื่อผู้ใช้เดิมที่เคยลงทะเบียนไว้ (ถ้ามี) แล้วแปลงจาก JSON string กลับเป็น Array
    const storedUsersJSON = localStorage.getItem("users");
    let users = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

    // เพิ่มผู้ใช้ใหม่เข้าไปใน Array แล้วบันทึกกลับ (ต้องแปลง Array เป็น JSON string ก่อนเก็บ)
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // 4. นำทางไปหน้า login.html
    event.preventDefault();
    window.location.href = "login.html";
    return true;
}