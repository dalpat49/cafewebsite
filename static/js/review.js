function validateForm() {
  let name = document.forms["reviewform"]["name"].value;
  let email = document.forms["reviewform"]["email"].value;
  let number = document.forms["reviewform"]["number"].value;
  let occassion = document.forms["reviewform"]["review"].value;

  if (name == "") {
    let error = "Name shoule be filled";
    document.querySelector("#name_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#name_error").remove("p");
  }

  if (email == "") {
    let error = "email shoule be filled";
    document.querySelector("#email_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#email_error").remove("p");
  }

  if (number == "") {
    let error = "Please write your number ";
    document.querySelector("#number_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#number_error").remove("p");
  }

  if (review == "") {
    let error = "Please select a date";
    document.querySelector("#review_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#review_error").remove("p");
  }
}
