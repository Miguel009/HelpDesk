
function init(){
    var email = document.getElementById("Email");
    var pass = document.getElementById("password");
    var sigin = document.getElementById("signin");
    const database = firebase.database();
    const userRef = database.ref('users');

    var usr = {Key:'',  Email: '', Passw: ''};
    sigin.onclick = function(e){
        userRef.orderByChild('Email').equalTo(email.value).on('child_added', snapshot => {
            usr = snapshot.val();  
            if (usr['Passw']==pass.value) {
                Swal.fire({
                    title: 'Bienvenido '+usr.Email+'!',
                    text: 'Inicio Correctamente',
                    icon: 'success',
                    confirmButtonText: 'Yes!'
                    }).then((result) => {
                        var user={
                            email: email.value,
                            key: snapshot.key
                        }
                        if (result.isConfirmed) {
                           localStorage.setItem('user', JSON.stringify(user));
                            window.location.href = "./index.html";
                        } else if (result.isDenied) {
                            localStorage.setItem('user', JSON.stringify(user));
                            window.location.href = "./index.html";
                        }
                    })
            }
            else
            {
                Swal.fire({
                    title: 'Error!',
                    text: 'Correo o Usuario no existe',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                    })
            }
        });
    }
}

if(window.addEventListener){
    window.addEventListener("load", init, false);
}
   else if(window.attachEvent){
    window.attachEvent("onload", init);
}