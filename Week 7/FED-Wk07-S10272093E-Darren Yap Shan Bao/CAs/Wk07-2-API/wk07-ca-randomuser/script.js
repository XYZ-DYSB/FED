// https://randomuser.me/api/
//@TODO use only the fetch web api

let url = "https://randomuser.me/api/";

document.getElementById('btn').addEventListener('click', () => {
  
  //modify this code to your needs
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data.results[0]); 
      const dataResult = data.results[0]; 
      // console.log(data.results[0].email);
      // console.log(data.results[0].name);
      
      let fullNameElement = document.getElementById('fullname');
      fullNameElement.innerText = dataResult.name.first + " " + dataResult.name.last;

      let userNameElement = document.getElementById('username');
      userNameElement.innerText = dataResult.login.username;

      let emailElement = document.getElementById('email');
      emailElement.innerText = dataResult.email;

      let cityElement = document.getElementById('city');
      cityElement.innerText = dataResult.location.city;

      let avatarElement = document.getElementById('avatar');
      avatarElement.src = dataResult.picture.large;
    })
    .catch(function (error) {
      console.error("Error fetching user:", error);
    });
});

    // let dataResult = data.results[0];
    // "results": [
    // {[0] starts here
    // "gender": "male",
    // "name": {
    //    "title": "Mr",
    //    "first": "Elijah",
    //    "last": "Hopkins"
    //  },
      


