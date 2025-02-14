import { getTableData } from "./data.js";

// Id Section
const sortByAgeBtn = document.getElementById("sortByAgeBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");
const sortByFirstNameBtn = document.getElementById("sortByFirstNameBtn");
const sortByLastNameBtn = document.getElementById("sortByLastNameBtn");
const sortByHeightBtn = document.getElementById("sortByHeightBtn");
const tableBody = document.getElementById("tableBody");
const entriesPerPage = document.getElementById("entriesPerPage");
const pagesList = document.getElementById("pagesList");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

// Variables
let entriesPerPageValue = 10;
let currentPage = 1;
let currentData = [];
let sortIdAscend = true;
let sortFirstNAscend = true;
let sortLastNAscend = true;
let sortHeightAscend = true;
let sortAgeAscend = true;

// Functions
const sortByAge = async () => {
    let temporaryArr = await getTableData();
    if (sortAgeAscend) {
        temporaryArr.sort((i, j) => i.Age - j.Age);
    } else {
        temporaryArr.sort((i, j) => j.Age - i.Age);
    }
    console.log(temporaryArr);
    displayData(temporaryArr);
}

const sortById = async () => {
    let temporaryArr = await getTableData();
    if (sortIdAscend) {
        temporaryArr.sort((i, j) => i.Id - j.Id);
    } else {
        temporaryArr.sort((i, j) => j.Id - i.Id);
    }
    console.log(temporaryArr);
    displayData(temporaryArr);
}

const sortByFirstName = async () => {
    let temporaryArr = await getTableData();
    if (sortFirstNAscend) {
        temporaryArr.sort((i, j) => {
            const firstNameI = i.FirstName.toUpperCase(); 
            const firstNameJ = j.FirstName.toUpperCase(); 
            if (firstNameI < firstNameJ) {
                return -1;
            }
            if (firstNameI > firstNameJ) {
                return 1;
            }
            return 0;
        });
    } else {
        temporaryArr.sort((i, j) => {
            const firstNameI = i.FirstName.toUpperCase(); 
            const firstNameJ = j.FirstName.toUpperCase(); 
            if (firstNameI > firstNameJ) {
                return -1;
            }
            if (firstNameI < firstNameJ) {
                return 1;
            }
            return 0;
        });
    }
    console.log(temporaryArr);
    displayData(temporaryArr);
}

const sortByLastName = async () => {
    let temporaryArr = await getTableData();
    if (sortLastNAscend) {
        temporaryArr.sort((i, j) => {
            const lastNameI = i.LastName.toUpperCase(); 
            const lastNameJ = j.LastName.toUpperCase(); 
            if (lastNameI < lastNameJ) {
                return -1;
            }
            if (lastNameI > lastNameJ) {
                return 1;
            }
            return 0;
        });
    } else {
        temporaryArr.sort((i, j) => {
            const lastNameI = i.LastName.toUpperCase(); 
            const lastNameJ = j.LastName.toUpperCase(); 
            if (lastNameI > lastNameJ) {
                return -1;
            }
            if (lastNameI < lastNameJ) {
                return 1;
            }
            return 0;
        });
    }
    console.log(temporaryArr);
    displayData(temporaryArr);
}

const sortByHeight = async () => {
    let temporaryArr = await getTableData();
    if (sortHeightAscend) {
        temporaryArr.sort((i, j) => {
            const heightI = parseInt(i.Height);
            const heightJ = parseInt(j.Height);
            return heightI - heightJ;
        });
    } else {
        temporaryArr.sort((i, j) => {
            const heightI = parseInt(i.Height);
            const heightJ = parseInt(j.Height);
            return heightJ - heightI;
        });
    }
    console.log(temporaryArr);
    displayData(temporaryArr);
}


const displayData = (arr) => {
    currentData = showLimitedValues(arr);
    tableBody.innerHTML = "";
    currentData.map(person => {
        const entryRow = document.createElement('tr');
        entryRow.className = "bg-white border-b  border-gray-200";

        const entryId = document.createElement('th');
        entryId.scope = "row";
        entryId.className = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap";
        entryId.innerText = person.Id;

        const entryFirstName = document.createElement('td');
        entryFirstName.className = "px-6 py-4";
        entryFirstName.innerText = person.FirstName;
        console.log(person.FirstName);

        const entryLastName = document.createElement('td');
        entryLastName.className = "px-6 py-4";
        entryLastName.innerText = person.LastName;

        const entryEmail = document.createElement('td');
        entryEmail.className = "px-6 py-4";
        entryEmail.innerText = person.Email;

        const entryHeight = document.createElement('td');
        entryHeight.className = "px-6 py-4";
        entryHeight.innerText = person.Height;

        const entryAge = document.createElement('td');
        entryAge.className = "px-6 py-4";
        entryAge.innerText = person.Age;

        tableBody.appendChild(entryRow);
        entryRow.appendChild(entryId);
        entryRow.appendChild(entryFirstName);
        entryRow.appendChild(entryLastName);
        entryRow.appendChild(entryEmail);
        entryRow.appendChild(entryHeight);
        entryRow.appendChild(entryAge);
    });
}

function showLimitedValues(arr) {
    const startIndex = (currentPage - 1) * entriesPerPageValue;
    const endIndex = startIndex + entriesPerPageValue;
    currentData = arr.slice(startIndex, endIndex);
    return currentData;
    getPages(initialvalues);
}


/* 
    <li>
        <button id="previousBtn"
            class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700   dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="text-gray-700">Previous</span>
        </button>
    </li>
    <li>
        <button
            class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700   dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
        <button aria-current="page"
            class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight border hover:bg-gray-400 hover:text-white border-gray-700 bg-gray-700 ">3</a>
    </li>
    <li>
        <button id="nextBtn"
            class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700   dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="text-gray-700">Next</span>
        </button>
    </li>
    
*/
// function getPages(arr) {
//     const pageCount = Math.ceil(arr.length / entriesPerPageValue);
//     pagesList.innerHTML = "";

//     for (let i = 1; i <= pageCount; i++) {

//     }
// }

entriesPerPage.addEventListener("change", () => {
    entriesPerPageValue = entriesPerPage.value;
}); 

// Event Listeners
sortByAgeBtn.addEventListener("click", () => {
    sortByAge();
    sortAgeAscend = !sortAgeAscend;
});

sortByIdBtn.addEventListener("click", () => {
    sortById();
    sortIdAscend = !sortIdAscend;
});

sortByFirstNameBtn.addEventListener("click", () => {
    sortByFirstName();
    sortFirstNAscend = !sortFirstNAscend;
});

sortByLastNameBtn.addEventListener("click", () => {
    sortByLastName();
    sortLastNAscend = !sortLastNAscend;
});

sortByHeightBtn.addEventListener("click", () => {
    sortByHeight();
    sortHeightAscend = !sortHeightAscend;
});


// On Load
const initialValues = await getTableData();
displayData(initialValues);