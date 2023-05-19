var dataListResult = [];
const PAGESIZE = 10;

function GetData() {
    //this.GetDataFromAPI(); //used for getting data from API and addad that data to data.js with email.
    this.setPaginationButtons();
    this.GetPageData();
    const totalContacts = document.querySelector("#totalcontacts");
    totalContacts.innerHTML = "Total: " + users.length;

}

function setPaginationButtons() {
    let totalPages = Math.ceil(users.length / PAGESIZE);
    for (let x = 1; x <= totalPages; x++) {
        const paginationButtonList = document.querySelector(".pagination");
        paginationButtonList.innerHTML += `<li><a class='paginationbtn' onclick='return GetPageData(this, ${x})'> ${x} </a></li>`;
    }
}

function GetPageData(event = null, page = 1) {

    //Remove active class from pagination buttons to set newly clicked button to be selected
    const paginationButtonButtons = document.getElementsByClassName("paginationbtn");
    for (let x = 0; x < paginationButtonButtons.length; x++) {
        paginationButtonButtons[x].classList.remove('active');
    }

    if (event) {
        event.classList.add('active');//highlight clicked button
    }
    else {
        paginationButtonButtons[0].classList.add('active'); //gighlight first button on page reload
    }
    if (users) {
        dataListResult = users.slice(((page * PAGESIZE) - PAGESIZE), page * PAGESIZE);
        const dataListComponent = document.querySelector("#profilelist");

        dataListComponent.innerHTML = ``;
        dataListResult.forEach(element => {
            dataListComponent.innerHTML += `<li class="contact-item cf">
                <div class="contact-details">
                    <img class="avatar" src="${element.image}">
                    <h3>${element.name}</h3>
                    <span class="email">${element.email}</span>
                </div>
                <div class="joined-details">
                       <span class="date"> Joined ${element.joined}</span>
               </div>
            </li>`
        });
    }
}

//Following methods used to get data from given API and saved them in data.js including the email

var userObjList = [];
async function GetDataFromAPI() {
    const response = await fetch("https://randomuser.me/api/?results=1000");
    const dataList = await response.json();

    dataList.results.forEach(element => {
        this.userObjList.push({ name: element.name.first + ' ' + element.name.last, email: element.email, image: element.picture.thumbnail, joined: formatDate(element.registered.date) });
    });

    console.log(JSON.stringify(userObjList)); //Copied this data to data.js
}
function formatDate(datestring) {
    let yyyy_mm_ddFormatDate = datestring.split('T')[0];
    let datepartArray = yyyy_mm_ddFormatDate.split('-');
    return datepartArray[1] + "/" + datepartArray[2] + "/" + datepartArray[0].slice(-2);
}



// https://www.w3schools.com/js/js_arrays.asp
// https://jsonformatter.org/
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://www.w3schools.com/jsref/jsref_slice_array.asp
