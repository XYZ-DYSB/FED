// Wait for DOM to be fully loaded before executing script
// This ensures all HTML elements are available before JavaScript tries to access them
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element context for Chart.js
  // Canvas is an HTML element used for drawing graphics with JavaScript
  // getContext("2d") returns a 2D drawing context for the canvas
  const ctx = document.getElementById("myChart").getContext("2d");

  let last = 26; // Counter for generating new date labels

  let chartStorageDataLabels = []; // Store labels when "Show first 7" is clicked
  let chartStorageDataset = []; // Store dataset when "Show first 7" is clicked

  // COLOR PALETTE: Chart.js uses RGB color format
  // RGB = Red, Green, Blue values (0-255)
  // Example: rgb(255, 99, 132) = Red color
  const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  // Get all color names to cycle through colors for new data
  const colorNames = Object.keys(chartColors);

  // HELPER FUNCTION: Convert RGB to RGBA
  // RGBA = RGB + Alpha (transparency)
  // Alpha value: 0 = transparent, 1 = opaque
  // This function adds transparency to colors
  function rgbToRgba(rgb, alpha = 0.5) {
    return rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  // ========================================
  // INITIALIZE CHART: Create the initial chart
  // ========================================
  let myChart = new Chart(ctx, {
    // CHART TYPE: Different visualization options
    // "bar" = Bar chart, "line" = Line chart, "doughnut" = Pie chart
    type: "bar",

    // DATA OBJECT: Contains labels and datasets
    data: {
      // LABELS: X-axis labels (categories/dates)
      labels: ["21/11", "22/11", "23/11", "24/11", "25/11", "26/11"],

      // DATASETS: Array of data series to display
      // You can have multiple datasets on one chart
      datasets: [
        {
          // Label appears in legend and tooltip
          label: "Expenses",

          // DATA ARRAY: Y-axis values corresponding to each label
          data: [12, 19, 3, 5, 2, 3],

          // BACKGROUND COLOR: Fill color of bars/lines
          // Using rgba() with 0.5 alpha for transparency
          backgroundColor: [
            rgbToRgba(chartColors.red),
            rgbToRgba(chartColors.blue),
            rgbToRgba(chartColors.yellow),
            rgbToRgba(chartColors.green),
            rgbToRgba(chartColors.purple),
            rgbToRgba(chartColors.orange),
          ],

          // BORDER COLOR: Outline color of bars
          borderColor: [
            chartColors.red,
            chartColors.blue,
            chartColors.yellow,
            chartColors.green,
            chartColors.purple,
            chartColors.orange,
          ],

          // BORDER WIDTH: Thickness of the border in pixels
          borderWidth: 1,
        },
      ],
    },

    // OPTIONS: Configure chart appearance and behavior
    options: {
      // RESPONSIVE: Chart resizes to fit container
      responsive: true,

      // SCALES: Configure axes (X and Y)
      scales: {
        // Y-AXIS configuration
        y: {
          // BEGIN AT ZERO: Y-axis starts at 0
          // Useful for bar/column charts to show true proportions
          beginAtZero: true,
        },
      },
    },
  });

  // ========================================
  // EVENT LISTENERS: Handle button clicks
  // ========================================

  // ADD DATA BUTTON: Add random data to the chart
  document.getElementById("addDataset").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Select next color cyclically (if 7 colors, cycles back to first)
    const colorName =
      colorNames[myChart.data.labels.length % colorNames.length];
    const dsColor = chartColors[colorName];

    // Generate new date label (increments last number)
    const newDataName = ++last + "/11";

    // Generate random data value between 1-21
    const newDataValue = Math.round(Math.random() * 20 + 1);

    // ADD TO CHART:
    // 1. Add label to X-axis
    myChart.data.labels.push(newDataName);

    // 2. Add data value to dataset
    myChart.data.datasets[0].data.push(newDataValue);

    // 3. Add background color
    myChart.data.datasets[0].backgroundColor.push(rgbToRgba(dsColor));

    // 4. Add border color
    myChart.data.datasets[0].borderColor.push(dsColor);

    // UPDATE CHART: Redraw chart with new data
    myChart.update();
  });

  // LINE CHART BUTTON: Change chart type to line
  document.getElementById("lineChart").addEventListener("click", function (e) {
    e.preventDefault();

    // Store current data before destroying
    const chartData = myChart.data;

    // DESTROY: Remove old chart instance from memory
    // Prevents multiple chart instances from existing
    myChart.destroy();

    // CREATE NEW CHART: Same data, different type
    myChart = new Chart(ctx, {
      type: "line", // Change type to line
      data: chartData, // Reuse stored data
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            // TICKS: Configure axis labels
            ticks: {
              // CALLBACK: Function to format tick labels
              // Adds "$" prefix to all Y-axis values
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
      },
    });
  });

  // BAR CHART BUTTON: Change chart type to bar
  document.getElementById("barChart").addEventListener("click", function (e) {
    e.preventDefault();
    const chartData = myChart.data;
    myChart.destroy();
    myChart = new Chart(ctx, {
      type: "bar", // Bar chart type
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });

  // DONUT CHART BUTTON: Change chart type to doughnut (pie chart)
  document.getElementById("donutChart").addEventListener("click", function (e) {
    e.preventDefault();
    const chartData = myChart.data;
    myChart.destroy();
    myChart = new Chart(ctx, {
      // TYPE: "doughnut" creates a pie chart with hole in center
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        // Note: Pie/Doughnut charts don't use scales
      },
    });
  });

  // SHOW FIRST 7 BUTTON: Display only first 7 data points
  document.getElementById("showFirst").addEventListener("click", function (e) {
    e.preventDefault();

    // STORE DATA: Make copies before modifying
    // Using slice() creates a shallow copy
    chartStorageDataLabels = myChart.data.labels.slice();

    // Map through datasets and copy all properties
    chartStorageDataset = myChart.data.datasets.map((ds) => ({
      ...ds, // Copy all dataset properties
      data: [...ds.data], // Copy data array
      backgroundColor: [...ds.backgroundColor], // Copy colors
      borderColor: [...ds.borderColor], // Copy borders
    }));

    // REMOVE DATA: Keep only first 7 items
    // splice(7) removes everything from index 7 onwards
    myChart.data.datasets[0].data.splice(7);
    myChart.data.labels.splice(7);

    // Update chart with filtered data
    myChart.update();
  });

  // SHOW ALL BUTTON: Restore all data after "Show first 7"
  document.getElementById("showAll").addEventListener("click", function (e) {
    e.preventDefault();

    // Check if we have stored data
    if (chartStorageDataLabels.length > 0) {
      // RESTORE DATA: Replace current data with stored copies
      myChart.data.labels = chartStorageDataLabels.slice();
      myChart.data.datasets[0].data = chartStorageDataset[0].data.slice();
      myChart.data.datasets[0].backgroundColor =
        chartStorageDataset[0].backgroundColor.slice();
      myChart.data.datasets[0].borderColor =
        chartStorageDataset[0].borderColor.slice();

      // Redraw chart with restored data
      myChart.update();
    }
  });

  // ADD CUSTOM AMOUNT BUTTON: Add user-entered value to chart
  document.getElementById("btnSubmit").addEventListener("click", function (e) {
    e.preventDefault();

    // GET INPUT VALUE: Retrieve user-entered amount
    const amountInput = document.getElementById("txtAmt");
    const newDataValue = parseInt(amountInput.value);

    // VALIDATE INPUT: Check if input is a valid number
    if (isNaN(newDataValue)) {
      alert("Please enter a valid number");
      return; // Exit function if invalid
    }

    // Generate new color and label
    const colorName =
      colorNames[myChart.data.labels.length % colorNames.length];
    const dsColor = chartColors[colorName];
    const newDataName = ++last + "/11";

    // ADD USER DATA TO CHART
    myChart.data.labels.push(newDataName);
    myChart.data.datasets[0].data.push(newDataValue);
    myChart.data.datasets[0].backgroundColor.push(rgbToRgba(dsColor));
    myChart.data.datasets[0].borderColor.push(dsColor);

    // Redraw chart with new data
    myChart.update();

    // CLEAR INPUT: Reset text field for next entry
    amountInput.value = "";
  });
});
