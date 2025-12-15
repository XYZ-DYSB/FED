// Use FETCH to help in this portion (Hint: Edit the code from the lecture slide.)
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnSubmit");
  const dateInput = document.getElementById("txtDate");

  btn.addEventListener("click", function () {
    let dateValue = dateInput.value.trim();

    if (dateValue === "") {
      alert("Please enter a date & time!");
      return;
    }

    let url = `https://api.data.gov.sg/v1/environment/psi?date_time=${dateValue}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("API status:", data.api_info.status);

        if (!data.items || data.items.length === 0) {
          document.getElementById("psi-twenty-four-hourly").innerHTML =
            "No data";
          document.getElementById("psi-three-hourly").innerHTML =
            "No data";
          return;
        }

        let readings24 = data.items[0].readings.psi_twenty_four_hourly;
        let readings3 = data.items[0].readings.psi_three_hourly;

        let output24 = "";
        for (let key in readings24) {
          output24 += `${key}: ${readings24[key]}<br>`;
        }

        let output3 = "";
        for (let key in readings3) {
          output3 += `${key}: ${readings3[key]}<br>`;
        }

        document.getElementById("psi-twenty-four-hourly").innerHTML = output24;
        document.getElementById("psi-three-hourly").innerHTML = output3;
      })
      .catch((err) => {
        console.error(err);
        alert("Error retrieving PSI data. Check your date format (YYYY-MM-DDTHH:MM:SS).");
      });
  });
});
