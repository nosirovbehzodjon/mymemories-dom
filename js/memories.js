//drop down-menu
const hamburgerBtn = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
hamburgerBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active-menu");
});

//modal content
const modalLogo = document.querySelector("#modal-logo");
function viewMemeories(url, title, desc, date) {
    //
    return `
        <div class="view">
            <img class="view-img" src="${url}" alt="view" />
            <p class="view-title">${title}</p>
            <p class="view-desc">${desc}</p>
        </div>
    `;
}
function inputGenerate(type, title = "", url = "", desc = "") {
    return `
                <div class="input">
                    <input
                        id="${type}-title"
                        type="text"
                        placeholder="enter title"
                        value="${title}"
                    />
                    <img src="./images/pen-create.svg" alt="create" />
                </div>
                <div class="input">
                    <input
                        id="${type}-url"
                        type="text"
                        placeholder="enter url"
                        value="${url}"
                    />
                    <img src="./images/pen-create.svg" alt="${type}" />
                </div>
                <div class="textarea">
                    <textarea
                        id="${type}-description"
                        placeholder="enter description"
                    >${desc}</textarea>
                    <img src="./images/pen-create.svg" alt="create" />
                </div>
                <div class="btns">
                    <button class="btn" id="${type}-btn">${type}</button>
                    <button class="btn-second" id="cancel-btn">cancel</button>
                </div>
            `;
}
//draw card
const currentUser = JSON.parse(localStorage.getItem("current"));
const content = document.querySelector(".content");
function createCard(id, url, title, desc, date) {
    return `
                <div class="card" data-id="${id}">
                    <div class="img_icon_container">
                        <div class="img_box">
                            <img src="${url}" alt="avatar" />
                        </div>
                        <div class="icon_box">
                            <span class="icon">
                                <img src="./images/heart.svg" alt="heart" />
                            </span>
                            <span class="icon">
                                <img src="./images/heart-crack.svg" alt="heart-crack" />
                            </span>
                        </div>
                    </div>
                    <div class="title_desc_date_container">
                        <h2 class="title">${title}</h2>
                        <p class="desc">${desc}</p>
                        <p class="date">${date}</p>
                    </div>
                    <div class="action_menu">
                        <span class="action-icon delete">
                            <img src="./images/trash.svg" alt="trash" />
                        </span>
                        <span class="action-icon edit" id="edit-memory">
                            <img src="./images/pen.svg" alt="pen" />
                        </span>
                        <span class="action-icon view" id="view-memory">
                            <img src="./images/plus.svg" alt="plus" />
                        </span>
                    </div>
                </div>
        `;
}

function getData(array) {
    content.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        content.innerHTML += createCard(
            array[i].id,
            array[i].url,
            array[i].title,
            array[i].description,
            array[i].date
        );
    }
}
getData(currentUser.data);

//create memories
const createMemoriesBtn = document.querySelector("#create-memories");
const closeModalBtn = document.querySelector(".close-btn");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

createMemoriesBtn.addEventListener("click", function () {
    modalContent.innerHTML = inputGenerate("create");
    const createBtn = document.querySelector("#create-btn");
    const cancelBtn = document.querySelector("#cancel-btn");
    const titleInp = document.querySelector("#create-title");
    const urlInp = document.querySelector("#create-url");
    const descriptionInp = document.querySelector("#create-description");
    modal.classList.add("active-modal");

    cancelBtn.addEventListener("click", function () {
        modal.classList.remove("active-modal");
    });

    createBtn.addEventListener("click", function () {
        const theme = {
            id: currentUser.data.length + 1,
            title: titleInp.value,
            url: urlInp.value,
            description: descriptionInp.value,
            date: dateGenerate(),
        };
        currentUser.data.push(theme);
        const users = JSON.parse(localStorage.getItem("users"));
        let currentIndex = users.findIndex(
            (item) => item.id === currentUser.id
        );
        users.splice(currentIndex, 1, currentUser);
        localStorage.setItem("current", JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));
        getData(currentUser.data);
    });
});

closeModalBtn.addEventListener("click", function () {
    modal.classList.remove("active-modal");
});

function dateGenerate() {
    const d = new Date();
    let day = `${d.getDate()}`.padStart(2, "0");
    let month = `${d.getMonth() + 1}`.padStart(2, "0");
    let year = `${d.getFullYear()}`;
    let hour = `${d.getHours()}`.padStart(2, "0");
    let minute = `${d.getMinutes()}`.padStart(2, "0");
    const date = `${day}/${month}/${year} | ${hour}:${minute}`;
    return date;
}

//edit memory
const editMemoryBtn = document.querySelector("#edit-memory");

content.addEventListener("click", function (e) {
    if (e.target.closest(".action-icon")?.classList.contains("edit")) {
        modalLogo.setAttribute("src", "../images/editmemories.svg");
        let editDataId = e.target.closest(".card")?.dataset.id;
        let editData = currentUser.data.find((item) => item.id == editDataId);
        modalContent.innerHTML = inputGenerate(
            "edit",
            editData.title,
            editData.url,
            editData.description
        );
        const editBtn = document.querySelector("#edit-btn");
        const cancelBtn = document.querySelector("#cancel-btn");
        const titleInp = document.querySelector("#edit-title");
        const urlInp = document.querySelector("#edit-url");
        const descriptionInp = document.querySelector("#edit-description");

        modal.classList.add("active-modal");
        editBtn.addEventListener("click", function () {
            const editTheme = {
                ...editData,
                title: titleInp.value,
                description: descriptionInp.value,
                url: urlInp.value,
            };
            const editDataIndex = currentUser.data.findIndex(
                (item) => item.id == editDataId
            );
            currentUser.data.splice(editDataIndex, 1, editTheme);
            localStorage.setItem("current", JSON.stringify(currentUser));
            getData(currentUser.data);
        });
        cancelBtn.addEventListener("click", function () {
            modal.classList.remove("active-modal");
        });
    }
});

//view memories
content.addEventListener("click", function (e) {
    if (e.target.closest(".action-icon")?.classList.contains("view")) {
        modalLogo.setAttribute("src", "../images/viewmemories.svg");
        let viewDataId = e.target.closest(".card")?.dataset.id;
        let viewData = currentUser.data.find((item) => item.id == viewDataId);
        console.log(viewData);
        modalContent.innerHTML = viewMemeories(
            viewData.url,
            viewData.title,
            viewData.description,
            viewData.date
        );
        modal.classList.add("active-modal");
    }
});
