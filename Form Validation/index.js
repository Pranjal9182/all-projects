//const { relativeTimeRounding } = require("moment");
const nameInput=document.getElementById('name');
const emailInput=document.getElementById('email');
const passInput=document.getElementById('password');
const showPassword=document.getElementById('showPassword');


const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const form=document.getElementById('form');

// FORM SUBMIT (best practice)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateName()&& validateEmail() &&validatePassword()) {
        alert('Form Submitted Successfully');
        form.reset()
           // clear all errors
        nameError.textContent = "";
        emailError.textContent = "";
        passError.textContent = "";
    }
});

//  REAL-TIME VALIDATION
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passInput.addEventListener('input', validatePassword);

// Name Validation
function validateName() {
    let name = nameInput.value.trim();
    if (name.length == 0) {
        nameError.textContent = "* Name is required";
        return false;
    }
    let pattern=/^[A-Za-z]+\s[A-Za-z]+$/;
    if (!pattern.test(name)) {
        nameError.textContent = "* Write full Name";
        return false;
    }
    nameError.textContent = "";
    return true;
}
// Email Validation
function validateEmail(){
     let email =emailInput.value.trim();
    if (email.length == 0) {
        emailError.textContent = "* Email is required";
        return false;
    }
    let pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        emailError.textContent = "* Enter valid email";
        return false;
    }
    emailError.textContent = "";
    return true;
}
// Password Validation
function validatePassword(){
    let password=passInput.value.trim();
    if(password.length==0){
        passError.textContent="* Password is required";
        return false;
    }
    let pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,30}$/;
    if(!pattern.test(password)){
        passError.textContent="* Min 8 chars, include A-Z, a-z, 0-9 & symbol"
        return false;
    }
   
    passError.textContent = "";
    return true
}
 //showPassword();
showPassword.addEventListener('change',()=>{
passInput.type=showPassword.checked?"text":"password";
// if(showPassword.checked){
//     passInput.type="text";

// }
// else{
//     passInput.type="password";

});