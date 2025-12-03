// https://randomuser.me/api/
//@TODO use only the fetch web api

let url = "https://randomuser.me/api/";
document.getElementById('btn').addEventListener('click', () => {
  //modify this code to your needs
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data.results[0]);
      console.log(data.results[0].email);
      console.log(data.results[0].name);
    });
});



    let dataResult = data.results[0];
    // "results": [
    // {[0] starts here
    // "gender": "male",
    // "name": {
    //    "title": "Mr",
    //    "first": "Elijah",
    //    "last": "Hopkins"
    //  },
    
    let fullNameElement = document.getElementById('fullname');
    fullNameElement.innerText = dataResult.name.first + " " + dataResult.name.last;


      


