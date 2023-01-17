/*slider register bar*/
const loginTabBtn = document.querySelector("#login-tab");
const signupTabBtn = document.querySelector("#signup-tab");
const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");
const registerAgain = document.querySelector("#register-again");
const haveAcount = document.querySelector("#have-acount");

function activeElement(activeContent, inActiveContent, activeBtn, inActiveBtn) {
    //content
    activeContent.classList.add("active-tab");
    inActiveContent.classList.remove("active-tab");
    //btn
    activeBtn.classList.add("active-tab-btn");
    inActiveBtn.classList.remove("active-tab-btn");
}

registerAgain.addEventListener("click", function () {
    activeElement(signupForm, loginForm, signupTabBtn, loginTabBtn);

    // //content
    // signupForm.classList.add("active-tab");
    // loginForm.classList.remove("active-tab");
    // //btn
    // signupTabBtn.classList.add("active-tab-btn");
    // loginTabBtn.classList.remove("active-tab-btn");
});

haveAcount.addEventListener("click", function () {
    activeElement(loginForm, signupForm, loginTabBtn, signupTabBtn);
    // //content
    // loginForm.classList.add("active-tab");
    // signupForm.classList.remove("active-tab");
    // //btn
    // loginTabBtn.classList.add("active-tab-btn");
    // signupTabBtn.classList.remove("active-tab-btn");
});

loginTabBtn.addEventListener("click", function () {
    activeElement(loginForm, signupForm, loginTabBtn, signupTabBtn);
    //content
    // loginForm.classList.add("active-tab");
    // signupForm.classList.remove("active-tab");
    // //btn
    // loginTabBtn.classList.add("active-tab-btn");
    // signupTabBtn.classList.remove("active-tab-btn");
});

signupTabBtn.addEventListener("click", function () {
    activeElement(signupForm, loginForm, signupTabBtn, loginTabBtn);

    // //content
    // signupForm.classList.add("active-tab");
    // loginForm.classList.remove("active-tab");
    // //btn
    // signupTabBtn.classList.add("active-tab-btn");
    // loginTabBtn.classList.remove("active-tab-btn");
});

//initial local-storage
if (localStorage.key("users")) {
    const data = JSON.parse(localStorage.getItem("users"));
    console.log(data);
} else {
    localStorage.setItem("users", JSON.stringify([]));
}

//signup logic

const signupBtn = document.querySelector("#signup-btn");
const signupUsernameInp = document.querySelector("#signup-username");
const signupNameInp = document.querySelector("#signup-name");
const signupEmailInp = document.querySelector("#signup-email");
const signupPasswordInp = document.querySelector("#signup-password");

signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = {
        id: users.length + 1,
        name: signupNameInp.value,
        email: signupEmailInp.value,
        username: signupUsernameInp.value,
        password: signupPasswordInp.value,
        data: [],
        liked: [],
        disliked: [],
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current", JSON.stringify(user));
    window.location.replace("./memories.html");
});

// login logic
const loginBtn = document.querySelector("#login-btn");
const loginUsernameInp = document.querySelector("#login-username");
const loginPasswordInp = document.querySelector("#login-password");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const username = loginUsernameInp.value;
    const password = loginPasswordInp.value;
    const users = JSON.parse(localStorage.getItem("users"));
    const checkUser = users.find(
        (item) => item.username === username && item.password === password
    );
    if (checkUser) {
        localStorage.setItem("current", JSON.stringify(checkUser));
        window.location.replace("./memories.html");
    } else {
        alert("xato malumot");
    }
    console.log(checkUser);
});
