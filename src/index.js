let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//DOM elements

const toysURL = "http://localhost:3000/toys"
const toyListDiv = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container")
const form = document.querySelector("form")


//event listeners

form.addEventListener("submit", handleForm)
toyListDiv.addEventListener("click", handleLikes)

//handle likes

function handleLikes(event){
  if (event.target.matches(".like-btn")){
    const likeBtn = event.target
    
    let card = likeBtn.closest(".card")
    const id = card.dataset.id
    let cardP = card.querySelector("p")
    let like = parseInt(cardP.textContent)
    cardP.textContent = `${like + 1} Likes`
    newLikes = cardP.textContent
    // debugger
    
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({likes: newLikes}),
  })
  .then(response => response.json())
  .then(updatedToy => {
    console.log('Success:', updatedToy);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  }
}

//handle form

function handleForm(event){
  event.preventDefault()
  newToy = {}
  newToy.name = event.target.name.value
  newToy.image = event.target.image.value
  newToy.likes = 0
  // newToy.id
  createCards(returnedToy)

  fetch(toysURL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy),
    })
    .then(response => response.json())
    .then(returnedToy => {
      console.log('Success:', returnedToy);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


//initialize display all toys on page load

function fetchToys(){
  return fetch(toysURL)
  .then(response => response.json() )
  .then(json => renderToys(json))
}

function renderToys(toysArray){
  toysArray.forEach(createCards)
}

function createCards(toyCard){
  const cardDiv = document.createElement("div")
  cardDiv.dataset.id = toyCard.id
  cardDiv.className = "card"
  const h2 = document.createElement("h2")
  h2.textContent = toyCard.name
  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toyCard.image
  const p = document.createElement("p")
  p.textContent = `${toyCard.likes} Likes`
  likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.textContent = " Like "
  cardDiv.append(h2,img,p,likeButton)
  toyListDiv.append(cardDiv)
  
}

