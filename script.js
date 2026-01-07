const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequiredValid = checkRequired([username,email,password,confirmPassword])

    let isFormValid = isRequiredValid;

    if( isRequiredValid){
        const isUsernameValid = checkLength(username,3,15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password,6,25);
        const isPasswordsMatch = checkPasswordsMatch(password,confirmPassword);

        isFormValid= isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }
    if(isFormValid){
        alert("registration succcessful !");
        form.reset();

        document .querySelectorAll(".form-group").forEach(group=>{
            group.className = "form-group";
        });
    }
});
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`Attention! ${formatFieldName(input)} must at least ${min} characters!`);
        return false;
    }else if (input.value.length > max){
        showError(input, `Attention! ${formatFieldName(input)} must be less then ${max} characters!`);
        return false;
    }else{
        showSuccess(input);
        return true;
    }
}
function checkEmail(email){
    // to check email we are going to use a method called Regex(Regular Expression) that cover most common email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())){
        showSuccess(email);
        return true ;
    }else{
        showError(email,"Email is not valid");
        return false;
    }
}
// fonction de verification de correspondance des mdp
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match");
        return false;
    }
    return true;
}


function checkRequired(inputArray){
    let isValid = true;

    inputArray.forEach(input =>{
        // password is required (fonction imposant la presence d'un mdp pour valider le formulaire )
        if(input.value.trim()===""){
            showError(input,`${formatFieldName(input)} is required`);
            isValid = false;
        }else{
            showSuccess(input);
        }
    });

    return isValid;
}


//format field name with proper capitalization
function formatFieldName(input) {
    //input id: username > Username(fonction transformant automatiquement l'input de l'user name  pour que celui ci est automatique une maj en 1er charactère)
    return input.id.charAt(0).toUpperCase()+ input.id.slice(1);
}


//fontion rendant visible les messages d'erreures en modifiant la class du groupe parent (dans le cas ou certain champs ne serait pas correctement rempli)
function showError(input,message){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
}