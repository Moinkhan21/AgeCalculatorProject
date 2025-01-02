// Get references to the date input and result display elements
let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0]; // Restrict date input to today's date or earlier
let result = document.getElementById("result");

// Main function to calculate age based on the selected date
function calculateAge() {
    // Parse the birth date from the input field
    let birthDate = new Date(userInput.value);

    // Check if the date is valid before calculating
    if (!userInput.value) {
        result.innerHTML = "Please enter a valid date.";
        return;
    }

    // Extract day, month, and year components from the birth date
    let birthDay = birthDate.getDate();
    let birthMonth = birthDate.getMonth() + 1; // JavaScript months are zero-indexed
    let birthYear = birthDate.getFullYear();

    // Get the current date components
    let today = new Date();
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    // Calculate the difference in years, months, and days
    let years = currentYear - birthYear;

    // Adjust months if birth month hasn't been reached this year
    let months = currentMonth >= birthMonth ? currentMonth - birthMonth : 12 + currentMonth - birthMonth - 1;
    years = currentMonth >= birthMonth ? years : years - 1;

    // Adjust days if birth day hasn't been reached this month
    let days = currentDay >= birthDay ? currentDay - birthDay : getDaysInMonth(currentYear, currentMonth - 1) + currentDay - birthDay;
    if (currentDay < birthDay) months = months > 0 ? months - 1 : 11; // Borrow a month if needed

    // Display the result in the output area
    result.innerHTML = `You are <span>${years}</span> years, <span>${months}</span> months, and <span>${days}</span> days old.`;
}

// Helper function to calculate days in a month, used for accurate day calculations
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate(); // Returns the last day of the given month
}
