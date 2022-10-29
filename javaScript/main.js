
//nav close nav bar after every onclick event
function close(){
    let sideWidth = $('.side-bar').outerWidth();
     $('nav').animate({ left: `-${sideWidth}` }, 1000)

}


//close and open sideBar

$('.close-icon').click(function () {

    let sideWidth = $('.side-bar').outerWidth();
    if ($('nav').css('left') == '0px') {
        //close nav

        $('nav').animate({ left: `-${sideWidth}` }, 500)
        $('#open-icon').removeClass('fa-close');
        $('#open-icon').addClass('fa-sliders');
    }
    else {
        //open nav

        $('nav').animate({ left: '0px' }, 500)
        $('#open-icon').removeClass('fa-sliders');
        $('#open-icon').addClass('fa-close');



    }



})
////////////////


/*spinners */


$(document).ready(function () {


        close();
    $('.spinners').fadeOut(300)


})


////////////////////////////////////

/*api calling fuunction*/
let boxer = document.getElementById('boxer')
let MydataArray = [];
let userPassword;


async function callApi() {

    let calling = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`) ///meals home display
    let callResponse = await calling.json();
    MydataArray = callResponse.meals;



    displaymeals()

}
callApi("");

$('.search').hide();
$('.item6').hide();
$('.displayM').hide();






//display meals once opening openning

function displaymeals() {

    let box = ``
    for (let i = 0; i < MydataArray.length; i++) {
        console.log(MydataArray[i].idMeal)///////////idmeal////////


        box += `


<div class="col-md-3" onclick="getPoductIngredient(${MydataArray[i].idMeal})">
<div class="inner">
    <img src="${MydataArray[i].strMealThumb}" class="w-100" alt="">
    <div class="inner-overlay">
    <h3>${MydataArray[i].strMeal}</h3>

    </div>

</div>
</div>
        


`



    }
    $('#display-meal-section').html(box);



}





$('#category-list-item').on('click',  displayCategories);
$('#searchClick').on('click', showSearch);
$('#AreaDisplay').on('click', GetbyArea )
$('#ingredients-list-a').on('click', getIngredients);
$('#contact').on('click', showInput);


function showSearch() {
    close();

    hideMealsSection('#search-section');
    $('.search').css({ display: 'flex' })
}

function hideMealsSection(itemClicked) {
    let container = $('.site-container div');

    $('.displayM').hide();

    for (let i = 0; i < container.length; i++) {
        $(`.item${i + 1}`).hide();
    }

    $(itemClicked).show();

}


async function displayCategories() {
    close();
    let categoriApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);//categories display ///////////

    let categResponse = await categoriApi.json();
    MydataArray = categResponse.categories

    //api

    hideMealsSection('.item3');

    let box = ``
    for (let i = 0; i < MydataArray.length; i++) {



        box += `


<div class="col-md-3 " >
<div class="inner">
    <img src="${MydataArray[i].strCategoryThumb}" class="w-100" alt="">
    <div class="inner-overlay">
    <h3>${MydataArray[i].strCategory}</h3>

    </div>

</div>
</div>



`


    }
    $('#category-section').html(box);



}
////
/////////////////////////////////////////////////filter with area///////////////////////////////////////////////////////////////////////////////////////////
async function GetbyArea(location) {
    close();
    let getArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${location}`)////area display ///
    let areaResponse = await getArea.json();
    MydataArray = areaResponse.meals.splice(0, 20)
    hideMealsSection('.item4');
    let box = ``
    for (let i = 0; i < MydataArray.length; i++) {


        box += `

    
      <div class="col-md-3">
                    
                     <i class="fa-solid fa-globe"></i> 
                        <h3>${MydataArray[i].strArea}</h3>
                   
                    </div>
        
    `
    }


    $('#area-section').html(box);



}


////////////////////////////////get ingredients /// //////////////////////////////////////////////////////////////////////////////////////////////
let ingredientLocation = document.getElementById('ingredient-section');
async function getIngredients() {
    close();
    let ingredientsCall = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=`);
    let ingredientRespose = await ingredientsCall.json()

    MydataArray = ingredientRespose.meals.splice(0, 16);
    hideMealsSection('.item5');
    let box = ``
    for (let i = 0; i < MydataArray.length; i++) {


        box += `
        
        
        
        <div class="col-md-3">
        <i class="fa-solid fa-bowl-food"></i>
        <h3>${MydataArray[i].strIngredient}</h3>
        <p>${MydataArray[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
        
        
        
        
        
        
        `
    }






    $('#ingredient-section').html(box);




}
//get pruduct ingredient//
async function getPoductIngredient(id){


    let productApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);/////////////recieve
    let proResponse = await productApi.json();
    MydataArray = proResponse.meals
    hideMealsSection('#ingredientInner');
   

  
let box=``
for (let i= 0 ; i<MydataArray.length ; i++){




box +=`


<div class="col-md-4">
<img src="${MydataArray[i].strMealThumb}" class="w-100" alt="">
</div>
<div class="col-md-8">
<h2>inustrction</h2>
<p>${MydataArray[i].strInstructions}</p>
<div class="area ">
    <h3>area</h3>
    <span>${MydataArray[i].strArea}</span>
</div>
<div class="category ">
    <h3>category</h3>
    <span>${MydataArray[i].strCategory}</span>


</div>
<div class="recipes">
    <h2>recipes</h2>

    <span>${MydataArray[i].strIngredient1}</span>
    <span>${MydataArray[i].strIngredient2}</span>
    <span>${MydataArray[i].strIngredient3}</span>
    <span>${MydataArray[i].strIngredient4}</span>
    <span>${MydataArray[i].strIngredient5}</span>
    <span>${MydataArray[i].strIngredient6}</span>
    <span>${MydataArray[i].strIngredient7}0</span>
</div>

<h3 class="my-2">tags</h3>


<a  href="${MydataArray[i].strSource}"> source</a>

<a  href="${MydataArray[i].strYoutube}"> youtube</a>



</div>




`


} 


$('.ingredientDetails').html(box)
$('.displayM').show();

}




/////////////////////////////////////////////////////////////////////////////////start search functions////////////////////////////////////////////////

async function searchByname(mealname) {
    
    let searchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
    let searchResponse = await searchApi.json()

    let MydataArray = searchResponse.meals

    let box = ``
    for (let i = 0; i < MydataArray.length; i++) {
        box += ` 
</div>
    
<div class="col-md-3">
<div class="inner">
    <img src="${MydataArray[i].strMealThumb}" class="w-100" alt="">
    <div class="inner-overlay">
    <h3>${MydataArray[i].strMeal}</h3>

    </div>

</div>
</div>
  
    `

    }
    $('#search-results').html(box);


}

/*search on input event */
let searchinput = document.getElementById('searchInput');

searchinput.addEventListener('keyup', function () {

    let searchNameValue = $(this).val();

    searchByname(searchNameValue)


})


//////////////////////////////////////////////////////////////////////////////////start search by letter //////////////////////////////////////////////////
async function seachbyLetter(letter) {

    let sByletter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let sByResponse = await sByletter.json();
    MydataArray = sByResponse.meals

    console.log(MydataArray)
    let box = ``;
    for (let i = 0; i < MydataArray.length; i++) {

        box += `
        
        </div>
    
<div class="col-md-3">
<div class="inner">
    <img src="${MydataArray[i].strMealThumb}" class="w-100" alt="">
    <div class="inner-overlay">
    <h3>${MydataArray[i].strMeal}</h3>

    </div>

</div>
</div>
        
        
         
        
        `

    }

    $('#search-results').html(box);



}
let searchInputByletter = document.getElementById('letterSearch')
searchInputByletter.addEventListener('keyup', function () {
    let searchRbyletter = $(this).val();

    seachbyLetter(searchRbyletter);


})
// contact us /// 
function showInput() {
    close();

    hideMealsSection('#contact-section')
    $('.item6').css({ display: 'flex' })


}
//validation functions//////////////////////////////////////

$('#userName').on( 'input' , function(){

    let userName= ($(this).val());
    

    userNameValidation(userName)
})

function userNameValidation(name){

let regex= /^[a-zA-Z]+$/;
if(regex.test(name) != true){

  $('.nameMessage').css({display: 'block'})
  $('.nameMessage').text('Special Characters and Numbers not allowed')
  $('#userName').css({color: 'red'})


  
}
else{
    $('.nameMessage').css({display:'none'})
    $('#userName').css({color: 'green'})

}

    // $('#nameMessage').css({display: 'block'})
   

    }
   


///////////password validation ////////

$('#userPhone').on('input' , function(){

    let userPhone = ($(this).val());
 
    validphone(userPhone)
})
function validphone(phone){

let regex= /^[0-9]{10,15}$/
if(regex.test(phone) != true){
    $('.numberMessage').css({display: 'block'})
    $('.numberMessage').text('Enter valid number')
    $('#userPhone').css({color: 'red'})
   

   
}
else{
    $('.numberMessage').css({display:'none'})
    $('#userPhone').css({color: 'green'})
   


}


}
//password validation//

$('#userPassword').on('input', function (){

    userPassword=($(this).val())
   

passValidation(userPassword)


})
function passValidation(passsword){

let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
if(regex.test(passsword) != true ){


    $('.passwordMessage').css({display: 'block'})
    $('.passwordMessage').text('Enter valid number')
    $('#userPassword').css({color: 'red'})



}
else{
    $('.passwordMessage').css({display: 'none'})
    $('#userPassword').css({color: 'green'})


}


}



//////email validation///// 
$('#userEmail').on('input', function(){

    let userEmail=($(this).val())
   

EmailValidation(userEmail)


})
function EmailValidation(email){

let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if(regex.test(email) != true ){


    $('.emailMessage').css({display: 'block'})
    $('.emailMessage').text('Enter valid Email')
    $('#userEmail').css({color: 'red'})


}
else{
    $('.emailMessage').css({display: 'none'})
    $('#userEmail').css({color: 'green'})

}


}
////////age validation ////////
$('#userAge').on('input', function(){

    let userage=($(this).val())
   

ageValidation(userage)


})
function ageValidation(age){

let regex = /^[1-9][0-9]?$|^100$/
if(regex.test(age) != true ){


    $('.ageMessage').css({display: 'block'})
    $('.ageMessage').text('Enter valid age')
    $('#userAge').css({color: 'red'})


}
else{
    $('.ageMessage').css({display: 'none'})
    $('#userAge').css({color: 'green'})


}


}
///////reenter password validation //////

$('#userRepassword').on('input',function(){

let rePassrodValue= ($(this).val())

RepasswordValidation(userPassword ,rePassrodValue)
})


function RepasswordValidation( userPassword , rePassrodValue )

{
  

    if (userPassword != rePassrodValue ){
        $('.repasswordMessage').css({display: 'block'})
        $('.repasswordMessage').text('password not matched')
        $('#userRepassword').css({color: 'red'})




    }
    else{

        $('.repasswordMessage').css({display: 'none'})
        $('#userRepassword').css({color: 'green'})



    }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
