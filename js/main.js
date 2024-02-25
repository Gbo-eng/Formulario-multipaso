document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar")
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;

    // Información obtenida
    const inputNombre = document.getElementById("input-nom");
    const inputApe = document.getElementById("input-ape");
    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    const inputConf = document.getElementById("input-conf");
    const btnShowHidePass = document.getElementById("btn-show-hide-pass");
    const btnShowHidePass2 = document.getElementById("btn-show-hide-pass2");
    const inputTel = document.getElementById("input-tel");
    const inputFecha = document.getElementById("input-fecha");
    const selectGenero = document.getElementById("select-gen");
    const inputNumero = document.getElementById("numero");
    const inputCodDes = document.getElementById("cod-des");
    const btnC = document.getElementById("btn-cal");
    const resultado10 = document.getElementById("resultado-10");
    const resultado30 = document.getElementById("resultado-30");
    const fActual = new Date();
    

    // Validaciones
    const REGEX_NOMBRE = /^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{1,}'?-?\s{0,1}){1,}$/;
    const REGEX_TEL = /^(\+?\d{2,3}\s?)?(\d{3}\s?\d{2}\s?\d{2}\s?\d{2}|\d{3}\s?\d{3}\s?\d{3})$/;
    const REGEX_EMAIL = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const REGEX_CONTRA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/@#])[A-Za-z\d-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/@#]{8,}$/;

    //Info
    var nom, ape, contra, contraCon = "";
    let email, tel= "";
    let bienFecha=false;

    // Códigos de descuento válidos
    const codigosDescuento = {
        "descuento10": "DESC10",
        "descuento30": "DESC30"
    };


    // Base
    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        // console.log(progreso);
        progressBar.style = `width: ${progreso}%`
    }
    function siguientePaso() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual++;
        if (pasoActual > pasos.length) {
            pasoActual = pasos.length;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    function pasoAnterior() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            if (pasoActual === 1) {
                if(!validarCamposText()){
                    // console.log("mal");
                    return;
                }
                console.log("Bi");
            } else if (pasoActual === 2) {
                if (!validarTelefono()) {
                    return;
                }
                if (!validarEmail()) {
                    return;
                }
                if(!validarContrasenia()){
                    return;
                }
            }else if (pasoActual === 3) {
                if (!bienFecha) {
                    return;
                }
            }else if (pasoActual === 4) {
                if (calcularPorcentaje()) {
                    const mensaje = `Gracias por completar el formulario.\n\n${obtenerDatosFormulario()}`;
                    alert(mensaje);
                    setTimeout(function() {
                        window.location.reload();
                    }, 1500);
                }
            }
            siguientePaso();
        });
    });
    
    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    // Input
    inputNombre.addEventListener("input", () => {
        nom = inputNombre.value;
        // console.log(nom);
        validarCamposText();
    });
    inputApe.addEventListener("input", () => {
        ape = inputApe.value;
        // console.log(ape);
        validarCamposText();
    });
    
    inputTel.addEventListener("input", () => {
        tel = inputTel.value;
        validarTelefono();
    });
    inputPassword.addEventListener("input", () => {
        contra = inputPassword.value;
        console.log(contra);
        validarSeguridad();
    });
    inputConf.addEventListener("input", () => {
        contraCon = inputConf.value;
        console.log(contraCon);
        validarContrasenia();
    });
    inputEmail.addEventListener("input", () => {
        email = inputEmail.value;
        validarEmail();
    });
    inputFecha.addEventListener("change", function() {
        const fInput = new Date(this.value);
        validarFecha(fInput);
    });

    inputNumero.addEventListener("input", limpiarResultados);
    btnC.addEventListener("click", calcularPorcentaje);
    
    //Validaciones
    function validarCamposText() {
        if (REGEX_NOMBRE.test(nom) && REGEX_NOMBRE.test(ape) && nom!=null && ape!=null ) {
            mostrarError("", "error-m-1");
            return true;
        } else {
            mostrarError("Por favor, ingrese un formato válido para nombre y apellido.", "error-m-1");
            return false;
        }
    }

    selectGenero.addEventListener("change", () => {
        selectGenero.options[0].disabled = true;
    });

    function validarTelefono() {
        if (REGEX_TEL.test(tel)) {
            mostrarError("", "error-m-2");
            return true;
        }else{
            mostrarError("El formato del teléfono es incorrecto.", "error-m-2");
            return false;
        }
    }
    
    function validarEmail() {
        if(REGEX_EMAIL.test(email)){
            mostrarError("", "error-m-2");
            return true;
        }else{
            mostrarError("El formato del correo electrónico es incorrecto.", "error-m-2");
            return false;
        }
    }
    function validarSeguridad() {
        if(REGEX_CONTRA.test(contra) && contra!=null){
            mostrarError("", "error-m-2");
            return true;
        }else{
            mostrarError("Contraseña de 8 caracteres con una mayúscula, minúscula, un número y un carácter especial.", "error-m-2");
            return false;
        }
    }
    function validarContrasenia() {
        if (contra != contraCon || contra==undefined || contraCon==undefined) {
            mostrarError("Las contraseñas no son válidas", "error-m-2");
            return false;
        } else {
            if (validarSeguridad()) {
                mostrarError("", "error-m-2");
                return true;
            }else{
                mostrarError("Contraseña de 8 caracteres con una mayúscula, minúscula, un número y un carácter especial.", "error-m-2");
                return false;
            }
        }
    }
    function validarFecha(fI) {
        const edadMin = 16;
        const diferenciaAnios = fActual.getFullYear() - fI.getFullYear();

        if (diferenciaAnios >= edadMin) {
            if (diferenciaAnios>135) {
                mostrarError("No puedes tener esa edad, mentiroso", "error-m-3");
                return false;
            }
            mostrarError("", "error-m-3");
            bienFecha=true;
            return true;
            
        } else {
            mostrarError("Debes tener al menos 16 años", "error-m-3");
            return false;
        } 
    }
    // Ver Contraseña
    btnShowHidePass.addEventListener("click", () => {
        if (inputPassword.type === 'password') {
            inputPassword.type = 'text';
        } else {
            inputPassword.type = 'password';
        }
    });
    btnShowHidePass2.addEventListener("click", () => {
        if (inputConf.type === 'password') {
            inputConf.type = 'text';
        } else {
            inputConf.type = 'password';
        }
    });

    // Mensaje error
    function mostrarError(mensaje, idMensaje) {
        const errorM = document.getElementById(idMensaje);
        errorM.innerText = mensaje;
        errorM.style.display = "block";
    }

    // Cálculo descuento
    function calcularPorcentaje() {
        const numero = parseFloat(inputNumero.value);
        const codigoDescuento = inputCodDes.value.trim(); // Obtenemos el código de descuento y eliminamos espacios en blanco al inicio y al final

        if (!isNaN(numero) && numero>0) {
            let porcentaje = 0;
            const radios = document.querySelectorAll('input[name="porcentaje"]');
            radios.forEach(radio => {
                if (radio.checked) {
                    porcentaje = parseFloat(radio.value);
                }
            });

            let codigoCorrecto = false;

            // Verificamos el código de descuento 
            if (porcentaje === 10) {
                codigoCorrecto = codigoDescuento === "DESC10";
            } else if (porcentaje === 30) {
                codigoCorrecto = codigoDescuento === "DESC30";
            }

            if (!codigoCorrecto) {
                alert("El código de descuento es incorrecto.");
                return;
            }
            // Calculamos descuento
            const resultado = numero-(numero*(porcentaje /100));
            if (porcentaje === 10) {
                resultado10.innerText = `Con descuento del 10%: ${resultado.toFixed(2)}`;
                resultado10.style.display = "block";
                resultado30.innerText = "";
                return true;
            } else if (porcentaje === 30) {
                resultado30.innerText = `Con descuento del 30%: ${resultado.toFixed(2)}`;
                resultado30.style.display = "block";
                resultado10.innerText = "";
                return true;
            }
            return false;
        } else {
            alert("Por favor, ingrese un número válido.");
            return false;
        }
    }

    function limpiarResultados() {
        resultado10.innerText = "";
        resultado30.innerText = "";
    }
    //Recoger datos para el alert final
    function obtenerDatosFormulario() {
        let datos = "";
        datos += `Nombre: ${inputNombre.value}\n`;
        datos += `Apellidos: ${inputApe.value}\n`;
        datos += `Género: ${selectGenero.options[selectGenero.selectedIndex].text}\n`;
        datos += `Email: ${inputEmail.value}\n`;
        datos += `Contraseña: ${inputPassword.value}\n`;
        datos += `Teléfono: ${inputTel.value}\n`;
        datos += `Fecha de nacimiento: ${inputFecha.value}\n`;
        datos += `Precio de la compra: ${inputNumero.value}\n`;
        datos += `Código de descuento: ${inputCodDes.value}\n`;
        datos += `Tipo de descuento: ${document.querySelector('input[name="porcentaje"]:checked').nextElementSibling.textContent}\n`;
        return datos;
    }
    formulario.addEventListener("submit", (e) => e.preventDefault());
});