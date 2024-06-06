function validar() {
    var retorno_correo = validar_correo();
    var retorno_contraseña = validar_contraseña();
    var retorno_direccion = validar_direccion();
    var retorno_telefono = validar_telefono();
    var retorno_hobbie = validarHobbies()
    var retorno_paginaweb = validar_paginaWeb()
    var retorno_comuna = validar_comuna()
    var retorno_agregarAficionLista = agregarAficionLista()

    console.log("Validación de correo:", retorno_correo);
    console.log("Validación de contraseña:", retorno_contraseña);
    console.log("Validación de dirección:", retorno_direccion);
    console.log("Validación de teléfono:", retorno_telefono);
    console.log("Validación de comuna:", retorno_comuna);

    return retorno_correo && retorno_contraseña && retorno_direccion && retorno_telefono && retorno_hobbie && retorno_paginaweb && retorno_comuna && retorno_agregarAficionLista;

}

function enviarFormulario() {
    var checkbox = document.getElementById("checkboxCondiciones");
    var errorCheckbox = document.getElementById("errorCheckbox");

    if (!checkbox.checked) {
        errorCheckbox.style.display = "block";
        return false; 
    } else {
        errorCheckbox.style.display = "none";
        
        return true; 
    }
}

function validar_comuna() {
    var comuna = document.getElementById("select-comuna").value;
    var errorComuna = document.getElementById("error-comuna");


    if (comuna === "") {
        errorComuna.style.display = "block";
        return false;
    } else {
        errorComuna.style.display = "none";

        return true;
    }
}

function validar_paginaWeb() {
    var input = document.getElementById('input-paginaWeb');
    var error = document.getElementById('error-paginaWeb');
    var value = input.value.trim();

    var isValid = false;

    if (value.startsWith('https://') || value.startsWith('http://')) {
        var restOfUrl = value.startsWith('https://') ? value.slice(8) : value.slice(7); 
        var pos_punto = restOfUrl.indexOf(".");
        
        if (pos_punto > 0 && pos_punto < restOfUrl.length - 1) {
            isValid = true;
        }
    } else if (value.startsWith('www.')) {
        var restOfUrl = value.slice(4); 
        var pos_punto = restOfUrl.indexOf(".");
        
        if (pos_punto > 0 && pos_punto < restOfUrl.length - 1) {
            isValid = true;
        }
    }

    if (isValid) {
        input.classList.remove('is-invalid');
        error.style.display = 'none';

    } else {
        input.classList.add('is-invalid');
        error.style.display = 'block';
    }
}




function validar_contraseña() {
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirmPassword");
    var errorMessagePassword = document.getElementById("error-password");
    var errorMessageConfirmPassword = document.getElementById("error-confirmPassword");

    clearTimeout(errorMessagePassword.timer);
    clearTimeout(errorMessageConfirmPassword.timer);

    errorMessagePassword.style.display = "none";
    errorMessageConfirmPassword.style.display = "none";
    checkValidIcon.className = "";

    if (password === "") {
        errorMessagePassword.style.display = "block";
        errorMessagePassword.textContent = "Campo Obligatorio";
        confirmPassword.disabled = true;


        return false;
    }
    confirmPassword.disabled = false;

    if (password.length < 3 || password.length > 6) {
        errorMessagePassword.style.display = "block";
        errorMessagePassword.textContent = "La contraseña debe tener entre 3 y 6 caracteres.";

        return false;
    }

    var hasLetter = false;
    var hasDigit = false;

    for (var i = 0; i < password.length; i++) {
        if (isNaN(password[i])) {
            hasLetter = true;
        } else {
            hasDigit = true;
        }
    }

    if (!hasLetter || !hasDigit) {
        errorMessagePassword.style.display = "block";
        errorMessagePassword.textContent = "La contraseña debe contener al menos una letra y un dígito.";

        return false;
    }

    if (confirmPassword.value !== "") {
        if (password !== confirmPassword.value) {
            errorMessageConfirmPassword.style.display = "block";
            errorMessageConfirmPassword.textContent = "Las contraseñas no coinciden.";
            return false;
        } else {
            errorMessageConfirmPassword.style.display = "none";
            return true;
        }
    }

    return true;
}

function validar_correo() {
    var input_email = document.getElementById("email");
    var div_error_email = document.getElementById("error-email");
    var correo = input_email.value.trim();

    
    if (correo === "") {
        div_error_email.style.display = "block";
        div_error_email.innerHTML = "Campo obligatorio";
        return false;
    } else {
        var pos_arroba = correo.indexOf("@");
        var pos_punto = correo.lastIndexOf(".");
        var arr_correo = correo.split(".");
        var extension = arr_correo[arr_correo.length - 1];

        if (pos_arroba > 0 && pos_punto > pos_arroba + 1 && pos_punto < correo.length - 1 && extension.length >= 2 && extension.length <= 3) {
            div_error_email.style.display = "none";
            return true;
        } else {
            div_error_email.style.display = "block";
            div_error_email.innerHTML = "Formato de correo inválido";

            return false;
        }
    }
}

function validar_direccion() {
    var validar_direccion = document.getElementById("input-direccion");
    var div_error_direccion = document.getElementById("error-direccion");
    var direccion = validar_direccion.value;

    if (direccion == "") {
        div_error_direccion.innerHTML = "Campo obligatorio";
        div_error_direccion.className = "text-danger small mt-1";
        return false;
    } else {
        div_error_direccion.innerHTML = "";
        return true;
    }
}

function validar_telefono() {
    const phoneInput = document.getElementById('phone');
    const errorFeedback = document.getElementById('error-telefono');

    if (phoneInput.value === '') {
        errorFeedback.style.display = 'block';
        errorFeedback.textContent = "Campo obligatorio";
        checkValidIconTelefono.innerHTML = ""; 
        return false; 
    }

    if (!esNumero(phoneInput.value)) {
        errorFeedback.style.display = 'block';
        errorFeedback.textContent = "Por favor, ingrese solo valores numéricos.";
        return false; 
    }

    
    let cleanedPhoneNumber = '';
    for (let i = 0; i < phoneInput.value.length; i++) {
        const char = phoneInput.value.charAt(i);
        if (!isNaN(parseInt(char))) {
            cleanedPhoneNumber += char;
        }
    }
    phoneInput.value = cleanedPhoneNumber;

    if (phoneInput.value.length > 9) {
        phoneInput.value = phoneInput.value.slice(0, 9);
    }

    if (phoneInput.value.length < 9) {
        errorFeedback.style.display = 'block';
        errorFeedback.textContent = "El número de teléfono debe tener al menos 9 dígitos.";
    
        return false; 
    }

    if (phoneInput.value.charAt(0) !== '9') {
        errorFeedback.style.display = 'block';
        errorFeedback.textContent = "El número de teléfono debe comenzar con '9'.";
        
        return false; 
    }

    
    errorFeedback.style.display = 'none';
    
    return true;
}


function esNumero(str) {
    for (let i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str.charAt(i)))) {
            return false;
        }
    }
    return true;
}


var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
    initialCountry: "cl",
    separateDialCode: false, 
    onlyCountries: ["cl"], 
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js" 
});


input.addEventListener('input', function(event) {
    let cleanedInput = '';
    for (let i = 0; i < input.value.length; i++) {
        const char = input.value.charAt(i);
        if (!isNaN(parseInt(char))) {
            cleanedInput += char;
        }
    }
    input.value = cleanedInput;


    if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
    }
});

function validarHobbies() {
    var hobbiesList = document.getElementById('hobbiesList').children;
    var divErrorHobbies = document.getElementById('error-hobbies');

    if (hobbiesList.length >= 2) {
        divErrorHobbies.innerHTML = "";
        return true;
    } else {
        divErrorHobbies.innerHTML = "Debe agregar al menos 2 aficiones";
        divErrorHobbies.className = "text-danger small mt-1";
        return false;
    }
}

document.getElementById('addHobbyButton').addEventListener('click', function() {
    const hobbyInput = document.getElementById('hobbyInput');
    const hobbiesList = document.getElementById('hobbiesList');
    const hobby = hobbyInput.value.trim();

    if (hobby) {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const hobbyText = document.createElement('span');
        hobbyText.textContent = hobby;

        li.appendChild(hobbyText);
        hobbiesList.appendChild(li);

        hobbyInput.value = '';

        validarHobbies();
    }
});

function agregarAficionLista() {
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("agregarAficion").addEventListener("click", function() {
            var aficion = document.getElementById("input-aficion").value.trim();
            if (aficion !== "" && aficion.trim() !== "") { 
                var listaAficiones = document.getElementById("listaAficiones");
                var nuevaAficion = document.createElement("li");
                nuevaAficion.textContent = aficion;
                nuevaAficion.className = "list-group-item";
                listaAficiones.appendChild(nuevaAficion);
                document.getElementById("input-aficion").value = ""; 
            }
        });
    });
}
