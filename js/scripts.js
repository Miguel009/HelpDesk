
function init(){
    var email = document.getElementById("Email");
    var pass = document.getElementById("password");
    var conpass = document.getElementById("confirmpassword");
    var register = document.getElementById("register"); 
    const database = firebase.database();
    const userRef = database.ref('users');
    register.onclick = function(e){
        if (email.value.trim() != "" && pass.value.trim() != "" && conpass.value.trim() != "") {
            if (conpass.value==pass.value) {
                var autoID = userRef.push().key
                userRef.child(autoID).set({
                        Email: email.value,
                        Passw: pass.value
                    });
                Swal.fire({
                    title: 'Guardado!',
                    text: 'Registrado Correctamente',
                    icon: 'success',
                    confirmButtonText: 'Yes!'
                    })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Las contraseñas no son iguales',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                    })
            }
        }
        else
        {
            Swal.fire({
                title: 'Error!',
                text: 'Hay campos vacios',
                icon: 'error',
                confirmButtonText: 'Entendido'
                })
        }

    };
}

if(window.addEventListener){
    window.addEventListener("load", init, false);
}
   else if(window.attachEvent){
    window.attachEvent("onload", init);
}