// Get Elements By Id:

const search = document.getElementById('Search');
const meal = document.getElementById('Meal');
const results = document.getElementById('Results');


//Search A Meal
let urlSearch = '';
const fetchSearch = async(url) => {
	meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${url}`)
    .then(res => res.json())
    .then(res => res.meals) 
};

const searchDisplay = async() => {
  await fetchSearch(urlSearch);

  if (meals == null){
    results.innerHTML = `<span class="noResult">No results to show </span>`
  }
  
  results.innerHTML = (
    
    meals.map(meal => (       
      `
      <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="infos">
        <div>origin : ${meal.strArea}</div>
        <div>classification : ${meal.strCategory}</div>
      </div>
        <img src='${meal.strMealThumb}' /></br>
        <button id="details"  onclick="myFunction()">View details</button>
      </div>
      `
    )).join('')
  );
};
function myFunction(){
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id','newDiv');
    const para = document.createElement("p"); 
    para.setAttribute('id','para');
    meals.map(meal => para.innerText= meal.strInstructions);
    newDiv.appendChild(para);
    document.body.appendChild(newDiv);
    let close = document.createElement("div");
            close.className = 'close';
            let closeText = document.createTextNode("X");
            close.appendChild(closeText);
            newDiv.appendChild(close);
};
document.addEventListener("click",function(e){
    if(e.target.className == 'close'){
        e.target.parentNode.remove();
    }
});
search.addEventListener('input', (e) => {
  urlSearch = `search.php?s=${e.target.value}`;
  searchDisplay();
});

// Get Random Meal
const randomMealDisplay = async() => {
    await fetchSearch('random.php');
  
    results.innerHTML = (
      
      meals.map(meal => (
              
        `
          <div class="randomContainer">
            <h2>${meal.strMeal}</h2>
            <div class="infos">
              <div>origin : ${meal.strArea}</div>
              <div>classification : ${meal.strCategory}</div>
            </div>
            <img src='${meal.strMealThumb}' />
            <p>${meal.strInstructions}</p>
          </div>
        `
      ))
    );
  };
  
  meal.addEventListener('click', randomMealDisplay)
  //randomMealDisplay();