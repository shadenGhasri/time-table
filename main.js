const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const movieName = [
  {name:"Casablanca",duration:2},
  {name:"The Shawshank Redemption",duration:1},
  {name:"The Godfather",duration:3},
];

// Store listitems
const listItems = [];

 function setTime (e){
  let count = 0;

  if(e === 0){
    count = 1
  }
  if(e === 1){
    const time = document.getElementById("draggable-list").children[0].children[1].children[1].textContent
    const duration =  document.getElementById("draggable-list").children[0].children[0].textContent
    count = parseInt(time) + parseInt(duration)
  }
  if(e === 2){
    const time = document.getElementById("draggable-list").children[1].children[1].children[1].textContent
    const duration = document.getElementById("draggable-list").children[1].children[0].textContent
    count =  parseInt(time) + parseInt(duration)
  }
  return count 

}



let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {


  [...movieName]
    .map((a) => ({ value: a.name, sort: Math.random() , time : a.duration}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => ({name :a.value , duration : a.time }))
    .forEach((person, index) => {
      
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      let getLi = listItem.getAttribute("data-index")
     

      const get = setTime(getLi)

      listItem.innerHTML = `
        <span class="number">${get}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person.name}</p>
          <span>${person.duration}</span>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");

}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
 
}

function dragDrop() {


  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== movieName[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);






