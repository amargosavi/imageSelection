
//Validation from input
function validateForm() {
    console.log("## in validate")
    var inputVar = document.getElementsByClassName("inputClass");
    for (var index = 0; index < inputVar.length; index++) {
        if (inputVar[index].id == "name") {

            let regxName = /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
            if (regxName.test(inputVar[index].value.trim())) {
                displayAndHideError("nameErrorId", "none");
                console.log("Name is mached");
            }
            else {
                displayAndHideError("nameErrorId", "block");
                return false;
            }

        }
        if (inputVar[index].id == "mobile" && inputVar[index].value != "") {
            let regxMobile = /^\+\d{1,3}\d{9,10}$/;
            console.log(" ", inputVar[index]);
            if (regxMobile.test(inputVar[index].value)) {
                displayAndHideError("nameErrorId", "none");
                console.log("mobile is mached");
            }
            else {
                displayAndHideError("mobileErrorId", "block");
                return false;
            }
        }
        if (inputVar[index].id == "email") {
            var regxEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            console.log(" ", inputVar[index]);
            if (regxEmail.test(inputVar[index].value)) {
                displayAndHideError("nameErrorId", "none");
                console.log("email is mached");
            }
            else {
                displayAndHideError("emailErrorId", "block");
                return false;
            }
        }
        if (inputVar[index].type == "select-one") {
            console.log(" ", inputVar[index]);
            var strUser = inputVar[index].options[inputVar[index].selectedIndex].text;
            if (strUser.trim() != "" || strUser != null || strUse) {
                displayAndHideError("nameErrorId", "none");
                console.log("not null Radio");
            }
            else {
                displayAndHideError("dobErrorId", "block");
                return false;
            }
            break;
        }
    }

    registerEvent("event","Registration","submit","Registration-successfull");


    return true;

}
//saving image variable for next slection page
function redirectParams(img) {
    console.log(" ## redirectParams ");
    localStorage["imageUrl"] = img.src;
    registerEvent("event","Selection","click","click "+img.name);
    window.open("thankyou.html", "_self");
}

//display and hide error message
function displayAndHideError(elementId, status) {
    var elementOfErrorMessage = document.getElementsByClassName("error");
    for (var index = 0; index < elementOfErrorMessage.length; index++) {
        if (elementOfErrorMessage[index].id == elementId) {
            elementOfErrorMessage[index].style.display = status;
        }

    }

}

//submit event to google analytics
function registerEvent(evtType,evtCat,evtAct,evtLbl){
    ga('send', {
        hitType: evtType,
        eventCategory: evtCat,
        eventAction: evtAct,
        eventLabel: evtLbl
    }
    );

}


//genrator dob and validate
function dobGenrator() {
    var dobVars = document.getElementsByClassName("dob");
    for (index = 0; index < dobVars.length; index++) {
        console.log(" ## dobGenrator ");
        if (dobVars[index].id == "year") {
            for (year = 1980; year <= new Date().getFullYear(); year++) {
                var option = document.createElement("option");
                option.text = year;
                dobVars[index].add(option);
            }
        }
        if (dobVars[index].id == "month") {
            for (year = 1; year <= 12; year++) {
                var option = document.createElement("option");
                option.text = year;
                dobVars[index].add(option);
            }

        }
    }


}

//Date value anable
function enableInput(parameterVal) {
    console.log(" parameterVal ", parameterVal);
    if (parameterVal.value != null && parameterVal.id == "year") {
        document.getElementById("month").disabled = false;
    }
    if (parameterVal.value != null && parameterVal.id == "month") {
        var monthValue = document.getElementById("month").value;
        var yearValue = document.getElementById("year").value;
        var numberDaysInMonths = function (yearV, monthV) {
            return new Date(yearV, monthV, 0).getDate();
        };

        // var numberDaysInMonths = new Date(yearValue, monthValue, 0).getDate();
        var temp = numberDaysInMonths(parseInt(yearValue), parseInt(monthValue));
        //console.log( " numberDaysInMonths "+ temp);
        var dayElement = document.getElementById("day");
        //console.log(" dayElement.length  " +dayElement.length );
        dayElement.innerHTML = "";

        for (daysInMonths = 1; daysInMonths <= temp; daysInMonths++) {
            var option = document.createElement("option");
            option.text = daysInMonths;
            dayElement.add(option);
        }
        dayElement.disabled = false;
    }
}