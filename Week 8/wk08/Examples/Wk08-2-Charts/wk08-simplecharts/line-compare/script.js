// Wait for DOM to be fully loaded before executing script
// This ensures all HTML elements are available before JavaScript tries to access them
document.addEventListener("DOMContentLoaded", function () {
  // Get canvas context for Chart.js
  // Canvas is an HTML element used for drawing graphics with JavaScript
  // getContext("2d") returns a 2D drawing context for the canvas
  const ctx = document.getElementById("myChart").getContext("2d");
  
  let last = 26; // Counter for date labels

  let chartStorageDataLabels = []; // Store labels for filtering
  let chartStorageDataset = []; // Store datasets for filtering

  // ========================================
  // INITIALIZE CHART: Create line chart
  // ========================================
  // Chart.js 4.4.1 uses a simplified configuration syntax
  let myChart = new Chart(ctx, {
    // CHART TYPE: Different visualization options
    // "line" = Line chart connecting data points
    type: "line",
    
    // DATA OBJECT: Contains labels and datasets
    data: {
      // LABELS: X-axis labels (dates)
      labels: ["21/11", "22/11", "23/11", "24/11", "25/11", "26/11"],
      
      // DATASETS: Array of data series to display
      // Multiple datasets allow comparison of different metrics
      datasets: [
        {
          // First dataset: Expenses
          label: "Expenses",
          data: [12, 19, 3, 5, 2, 3],
          
          // BACKGROUND COLOR: Fill color under the line
          // RGBA format: rgb values + alpha (transparency)
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          
          // BORDER COLOR: Color of the line itself
          borderColor: "rgba(255, 99, 132, 1)",
          
          // BORDER WIDTH: Thickness of the line in pixels
          borderWidth: 2,
          
          // TENSION: Curve smoothness (0 = sharp angles, 1 = very curved)
          tension: 0.1,
        },
        {
          // Second dataset: Income
          label: "Income",
          data: [20, 6, 3, 8, 1, 44],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    },
    
    // OPTIONS: Configure chart appearance and behavior
    options: {
      // RESPONSIVE: Chart resizes to fit container
      responsive: true,
      
      // PLUGINS: Configure title, legend, tooltip, etc.
      // Chart.js 4 moved title to plugins section
      plugins: {
        title: {
          display: true,
          text: "Budget Tracking - November",
        },
      },
      
      // SCALES: Configure X and Y axes
      // Chart.js 4 simplified scales syntax
      scales: {
        // Y-AXIS configuration
        y: {
          // BEGIN AT ZERO: Y-axis starts at 0
          // Shows true proportions between data values
          beginAtZero: true,
        },
      },
    },
  });

  // ========================================
  // EVENT LISTENER: Add Data Button
  // ========================================
  // ADD DATA: Dynamically add new data points to both datasets
  document.getElementById("addData").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Generate random values between 0-30 for both metrics
    // Math.random() returns 0-1, multiply by 30 to get 0-30
    // Math.round() to convert to whole number
    const expenseValue = Math.round(Math.random() * 30);
    const incomeValue = Math.round(Math.random() * 30);

    // MODIFY CHART DATA:
    // 1. Add new date label (increment counter)
    myChart.data.labels.push(++last + "/11");

    // 2. Add expense value to first dataset
    myChart.data.datasets[0].data.push(expenseValue);

    // 3. Add income value to second dataset
    myChart.data.datasets[1].data.push(incomeValue);

    // UPDATE CHART: Redraw chart with new data
    // Chart.js animates the transition to new data
    myChart.update();
  });
});