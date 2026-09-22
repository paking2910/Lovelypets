// =============================================================================
// MDT312 Assignment 6 login.js
// Modernized: ES6 (const/let), event.preventDefault(), and for loop
// =============================================================================

window.onload = loginLoad;

function loginLoad() {
    const form = document.getElementById("myLogin");
    if (form) {
        form.onsubmit = checkLogin;
    }
}

function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit
    if (event) {
        event.preventDefault();
    }

    // 2. ดึงข้อมูลจาก localStorage แล้วนำมาใส่ใน Array of Objects
    // ใส่ผู้ใช้ default ไว้ให้ทดสอบได้แม้ยังไม่เคย Register
    let users = [{ username: "admin", password: "123456" }];

    const storedUsersJSON = localStorage.getItem("users");

     // ถ้ามีข้อมูลใน localStorage ให้นำมาเก็บใส่ Array of Objects
    if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);
        users = users.concat(storedUsers);
    }

    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html";
        return false;
    }

    // 4. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login ปัจจุบัน
    const inputUsername = document.forms["myLogin"]["username"].value.trim(); //เติม
    const inputPassword = document.forms["myLogin"]["password"].value; //เติม

    // 5. ใช้ for loop วนหาใน Array ว่ามี username และ password ที่ตรงกับที่เรากรอกหรือไม่
    let isLoginSuccess = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === inputUsername && users[i].password === inputPassword) {
            isLoginSuccess = true;
            break;
        }
    }

    // 6. ตรวจสอบผลลัพธ์จากการวนลูป
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}