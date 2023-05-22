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

function validateFormOrder() {
  let name = document.forms["bookingForm"]["name"].value;
  let email = document.forms["bookingForm"]["email"].value;
  let number = document.forms["bookingForm"]["number"].value;
  let houseNumber = document.forms["bookingForm"]["Housenumber"].value;
  let colony = document.forms["bookingForm"]["colony"].value;
  let landmark = document.forms["bookingForm"]["landmark"].value;
  let district = document.forms["bookingForm"]["district"].value;
  let state = document.forms["bookingForm"]["state"].value;
  let zipcode = document.forms["bookingForm"]["zipcode"].value;
  let orderId = document.forms["bookingForm"]["orderId"].value;
  

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

  if (houseNumber == "") {
    let error = "Please select a date";
    document.querySelector("#Housenumber_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#Housenumber_error").remove("p");
  }

  if (colony == "") {
    let error = "Please select a date";
    document.querySelector("#colony_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#colony_error").remove("p");
  }

  if (landmark == "") {
    let error = "Please select a date";
    document.querySelector("#landmark_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#landmark_error").remove("p");
  }

  if (landmark == "") {
    let error = "Please select a date";
    document.querySelector("#city_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#city_error").remove("p");
  }

  if (district == "") {
    let error = "Please select a date";
    document.querySelector("#district_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#district_error").remove("p");
  }

  if (state == "") {
    let error = "Please select a date";
    document.querySelector("#state_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#state_error").remove("p");
  }

  if (zipcode == "") {
    let error = "Please select a date";
    document.querySelector("#zipcode_error").innerHTML = error;
    return false;
  } else {
    document.querySelector("#zipcode_error").remove("p");
  }

  if (orderId == "") {
    let error = "Please select a date";
    document.querySelector("#orderId_err").innerHTML = error;
    return false;
  } else {
    document.querySelector("#orderId_err").remove("p");
  }

}

