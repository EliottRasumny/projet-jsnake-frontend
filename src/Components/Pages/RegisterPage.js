import HomePage from "./HomePage";
/**
 * View the Register form :
 * render a register page into the #page div
 * At this step: this is only a static component...
 */
function RegisterPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
  // create a login form
  const form = document.createElement("form");
  form.className = "p-5";
  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.placeholder = "username";
  username.required = true;
  username.className = "form-control mb-3";
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "password";
  password.className = "form-control mb-3";
  const submit = document.createElement("input");
  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn";
  submit.id = "btn";
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  pageDiv.appendChild(form);
}

export default RegisterPage;