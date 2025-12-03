// write a code using a for loop to 
// get elements with the class "li.hot"

// Method 1 (using query CSS)
let elementsWithLiHot = document.querySelectorAll('li.hot');
console.log(elementsWithLiHot);

/* Method 2 (recommended as you gusy need to use loop)
let elements = document.getElementsByTagName('li'); */

for(let i = 0; i < elementsWithLiHot.length; i++) {
    elementsWithLiHot[i].className = 'cool';
}

let elements = document.getElementsByClassName('hot');
if (elements.length >= 3) {
    elements[i].className = 'cool';
}

let  listItems = document.getElementsByTagName('li');
if (listItems.length >= 1) {
    for(let i = 0; i < listItems.length; i++) {
        if (listItems[i].className === 'hot') {
            listItems[i].className = 'cool'
            break;
        }
    }
}