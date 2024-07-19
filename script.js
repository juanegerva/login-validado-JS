document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm")
    const emailInput = document.getElementById("email")
    const claveInput = document.getElementById("clave")
    const confirmClaveInput = document.getElementById("confirmarClave")
    const emailError = document.getElementById("errorEmail")
    const claveError = document.getElementById("errorClave")
    const claveConfirmarError = document.getElementById("errorConfirmarClave")
    const showHide = document.getElementById("show-hide")

    loginForm.addEventListener("submit", function(event){
        event.preventDefault()
        validateForm()
    })

    emailInput.addEventListener("blur", function () {
        validateEmail()     
    })

    emailInput.addEventListener("change", function () {
        clearError(emailError)
    })

    claveInput.addEventListener("change", function () {
        clearError(claveError)
    })

    confirmClaveInput.addEventListener("change", function () {
        clearError(claveConfirmarError)
    })

    showHide.addEventListener("click", function(){
        if(claveInput.type == "password"){
            claveInput.type = "text"
            confirmClaveInput.type = "text"
        }else {
            claveInput.type = "password"
            confirmClaveInput.type = "password"
        }
    })

    function validateForm() {
        const isValidEmail = validateEmail()
        const isValidClave = validatePassword()
        const isValidConfirmarClave = validatePasswordMatch()

        if(isValidEmail && isValidClave && isValidConfirmarClave) {
            saveToLocalStorage()
            alert("Ingreso con Exito")
        }

    }

    function validateEmail(){
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const emailValue = emailInput.value.trim()

        if (!emailRegex.test(emailValue)) {
            showError(emailError, "Ingresa un Email valido")
            return false
        }
        return true 
    }

    function validatePassword(){
        const passwordValue = claveInput.value.trim()

        if(passwordValue.length < 6){
            showError(claveError, "Ingresa una contraseña de al menos 6 caracteres")
            return false
        }
        return true 
    }


    function validatePasswordMatch(){
        const passwordValue = claveInput.value.trim()
        const confirmPasswordValue = confirmClaveInput.value.trim()

        if(passwordValue!=confirmPasswordValue){
            showError(claveConfirmarError, "Las contraseñas no coinciden")
            return false
        }
        return true
    }

    function showError(errorElement, message){
        errorElement.innerHTML = message
        errorElement.style.display = "block"
    }

    function clearError(errorElement){
        errorElement.innerHTML = ""
        errorElement.style.display = "none"
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim()
        localStorage.setItem('email', emailValue)
        
        const body = bodyBuilderJSON()
        console.log(body)
    }

    function bodyBuilderJSON(){
        return {
            "email" : emailInput.value,
            "clave" : claveInput.value
        }
    }

})