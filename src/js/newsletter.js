const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const message = document.getElementById("newsletterMsg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value;

  let emails = localStorage.getItem("newsletterEmails");

  if (emails) {
    emails = JSON.parse(emails);
  } else {
    emails = [];
  }

  emails.push(email);

  localStorage.setItem("newsletterEmails", JSON.stringify(emails));

  message.textContent = "Thanks for signing up!";

  emailInput.value = "";
});
