document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    fetch("/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        message: form.message.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Email sent successfully!");
        } else {
          alert("Error sending email. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      });
  });
});
