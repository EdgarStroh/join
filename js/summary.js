function greetUser() {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 11) {
    greeting = "Good morning, ";
  } else if (currentHour >= 11 && currentHour < 15) {
    greeting = "Hello, ";
  } else if (currentHour >= 15 && currentHour < 18) {
    greeting = "Good afternoon, ";
  } else {
    greeting = "Good evening, ";
  }

// Abrufen des Benutzernamens aus localStorage
 let userName = localStorage.getItem('inputName') || "Guest";

  document.querySelector("#greetings h2").textContent = greeting;
  document.querySelector("#greetings span").textContent = userName;
}

greetUser();
