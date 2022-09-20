console.log("hello");
function validateForm() {


    let name = document.forms["contactusform"]["name"].value;
    let email = document.forms["contactusform"]["email"].value;
    let number = document.forms["contactusform"]["number"].value;

    if (name == "") {
        let error = "Name shoule be filled";
        document.querySelector("#name_error").innerHTML = error;

        return false;
    }
    else {
        document.querySelector("#name_error").remove("p")
    }


    if (email == "") {
        let error = "email shoule be filled";
        document.querySelector("#email_error").innerHTML = error;
        return false;
    }
    else {
        document.querySelector("#name_error").remove("p")
    }

    if (number == "") {
        let error = "Please write your number ";
        document.querySelector("#number_error").innerHTML = error;
        return false;
    }
    else {
        document.querySelector("#name_error").remove("p")
    }

 

   


}