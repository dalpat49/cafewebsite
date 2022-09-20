function validateForm() {
  let name = document.forms["bookingForm"]["name"].value;
  let email = document.forms["bookingForm"]["email"].value;
  let number = document.forms["bookingForm"]["number"].value;
  let date = document.forms["bookingForm"]["date"].value;

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

  if (date == "") {
    let error = "Please select a date";
    document.querySelector("#date_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#date_error").remove("p");
  }
}
