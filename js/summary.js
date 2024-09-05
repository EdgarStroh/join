function greetUser() {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 11) {
    greeting = "Good Morning, ";
  } else if (currentHour >= 11 && currentHour < 15) {
    greeting = "Hello, ";
  } else if (currentHour >= 15 && currentHour < 18) {
    greeting = "Good Afternoon, ";
  } else {
    greeting = "Good Evening, ";
  }

  let userName = "Sofia Müller" // hier muss der richtige User reingerendert werden

  document.querySelector("#greetings h2").textContent = greeting;
  document.querySelector("#greetings span").textContent = userName;
}

greetUser();
