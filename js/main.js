let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
let nameInput;
let emailInput;
let phoneInput;
let ageInput;
let passwordInput;
let repasswordInput ;


$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500);
        $("body").css("overflow", "visible")

    })
})
/*===========================SIDE NAV===========================*/  
function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let navWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -navWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
/*===========================DISPLAY MEALS===========================*/  
function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal rounded-2">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer d-flex">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

/*===========================SEARCH INPUTS===========================*/  

$("#searchLi").click(function(){
    showSearchInputs()
})

function showSearchInputs(){
    closeSideNav()
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="searchName form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"  maxlength="1" class="searchLetter form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML = ""
}
/*===========================SEARCH BY NAME===========================*/  

// $("input .searchName").keyup(function(){
//     searchByName(this.value)
// })

async function searchByName(term){

rowData.innerHTML = ""
$(".inner-loading").fadeIn(300)

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
response = await response.json();
console.log(response);

response.meals ? displayMeals(response.meals) : displayMeals([])
$(".inner-loading").fadeOut(300)

}
/*===========================SEARCH BY FLETTER===========================*/  

// $(".searchLetter").keyup(function(){
//     searchByFLetter(this.value)
// })

async function searchByFLetter(term) {
    
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    console.log(response);

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(300)

}

/*===========================CATEGORY==========================*/  

$("#categoriesLi").click(function(){
    getCategories()
})
async function getCategories(){
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    $(".inner-loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();

    displayCategories(response.categories)
    $(".inner-loading").fadeOut(300)

}

function displayCategories(arr){
    cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer text-center ">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
}
rowData.innerHTML = cartoona;
}
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}
/*===========================AREA==========================*/  

$("#areaLi").click(function(){
    getArea()
})

async function getArea(){
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    $(".inner-loading").fadeIn(300);

    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
response = await response.json();
displayArea(response.meals)
$(".inner-loading").fadeOut(300);
}

function displayArea(arr){
    cartoona = "";
    for (let i = 0; i < arr.length; i++) {
      cartoona += `<div class="col-md-3">
      <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${arr[i].strArea}</h3>
      </div>
  </div>` 
    }
    rowData.innerHTML = cartoona
}

async function getAreaMeals(area){
    rowData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)
}
/*===========================ingredients==========================*/  
$("#ingredientsLi").click(function(){
    getIngredients()
})

async function getIngredients(){
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    $(".inner-loading").fadeIn(300);
let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
response = await response.json();
displayIngredients(response.meals.slice(0, 20))
$(".inner-loading").fadeOut(300);
}


 function displayIngredients(arr){
cartoona = ""
for (let i= 0; i < arr.length; i++) {
   cartoona += `
   <div class="col-md-3">
    <div onclick="getIngredientsMeals('${arr[i].strIngredient}') ">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
</div>
   ` 
}
rowData.innerHTML = cartoona

 }

async function getIngredientsMeals(ingredients){
    rowData.innerHTML = "";
    $(".inner-loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)   
}
/*===========================DETAILS(global)==========================*/  
async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";

    $(".inner-loading").fadeIn(300)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    console.log(respone.meals[0]);

    displayMealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(300)
}
function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

/*===========================CONTACT US==========================*/  
$("#contactLi").click(function(){
    showContacts()
})
function showContacts(){
    closeSideNav()
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed & at least 3 letters
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> 
    `
                /*============REASSIGN VARIBALES============*/  

    submitBtn = document.getElementById("submitBtn");
    nameInput = document.getElementById("nameInput");
    emailInput = document.getElementById("emailInput");
    phoneInput = document.getElementById("phoneInput");
    ageInput = document.getElementById("ageInput");
    passwordInput = document.getElementById("passwordInput");
    repasswordInput = document.getElementById("repasswordInput");


    nameInput.addEventListener("focus", () => {
        nameInputTouched = true
    })

    emailInput.addEventListener("focus", () => {
        emailInputTouched = true
    })

    phoneInput.addEventListener("focus", () => {
        phoneInputTouched = true
    })

    ageInput.addEventListener("focus", () => {
        ageInputTouched = true
    })

    passwordInput.addEventListener("focus", () => {
        passwordInputTouched = true
    })

    repasswordInput.addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation(){
  
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    
        if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

/*===========================REGEX==========================*/  

function nameValidation(){
    return (/^[a-zA-Z]{3,}$/.test(nameInput.value))

}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}

function repasswordValidation() {
    return repasswordInput.value == passwordInput.value
}

