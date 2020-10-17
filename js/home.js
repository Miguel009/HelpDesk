function colorCategory() {
    colors = ["#9C27B0", "#673ab7", "#4caf50", "#f44336"];
    for (i = 1; i < 10; i++) {
        cat = "home_category_" + i;
        //
    }
    var user = {
        email:'',
        key: ''
    };
    var reds= document.getElementById("red");
    reds.innerHTML=" <div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>"+
    "<div class='modal-dialog' role='document'>"+
      "<div class='modal-content'>"
        +"<div class='modal-header'>"
          +"<h5 class='modal-title' id='exampleModalLabel'>Actualizar Contraseña</h5>"
          +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
            +"<span aria-hidden='true'>&times;</span>"
         +"</button>"
        +"</div>"
        +"<div class='modal-body'>"
        +"<form>"
            +"<div class='form-group'>"
              +"<label for='recipient-name' class='col-form-label'>Email:</label>"
              +"<input type='email' class='form-control' id='emails' disabled>"
           +"</div>"
           +"<div class='form-group'>"
           +"<label for='recipient-name' class='col-form-label'>Contraseña antigua:</label>"
           +"<input type='password' class='form-control' id='contraseña'>"
            +"</div>"
            +"<div class='form-group'>"
            +"<label for='recipient-name' class='col-form-label'>Contraseña nueva:</label>"
            +"<input type='password' class='form-control' id='contraseñaN'>"
             +"</div>"
             +"<div class='form-group'>"
             +"<label for='recipient-name' class='col-form-label'>Contraseña nueva repeticion:</label>"
             +"<input type='password' class='form-control' id='contraseñaN2'>"
              +"</div>"
          +"</form>"
        +"</div>"
        +"<div class='modal-footer'>"
            +"<button type='button' id='enviars' class='btn btn-success'>Enviar</button>"
          +"<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"
        +"</div>"
      +"</div>"
    +"</div>"
  +"</div>";
    user= JSON.parse(localStorage.getItem("user"));
    var title = document.getElementsByClassName("nav-link");
    var signout = document.getElementById("buton-menu");
    if (user!=null) {
        var split = user.email.split('@');
        title[2].textContent = split[0];
        signout.textContent = "Cerrar Sesion";
    } else {
        title[2].textContent = "Iniciar Sesion";
        signout.textContent = "Registrarme";
    }

    signout.onclick = function(e){
        if (signout.textContent == "Registrarme") {
            window.location.href = "./register.html";
        }
        else
        {
            const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success btn2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: '¿Deseas Cerrar Sesion?',
                showCancelButton: true,
                confirmButtonText: `Si`,
                cancelButtonText: 'No'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Sesion Cerrada!',
                        text: 'Gracias!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.clear();
                                window.location.href = "./index.html";
                            } else if (result.isDenied) {
                                localStorage.clear();
                                window.location.href = "./index.html";
                            }
                        })
                } else {
                  Swal.fire('Sesion no cerrada', '', 'info')
                }
              })
        }
    };

    title[2].onclick = function(e)
    {
        console.log("alho");
        if (title[2].textContent != "Iniciar Sesion") {
            update(user);
        } else {
            window.location.href = "./sign-in.html";
        }

    }


}

function update(user){
    const database = firebase.database();
    const userRef = database.ref('users');
    var ema = document.getElementById("emails");
    var contra = document.getElementById("contraseña");
    var contraN = document.getElementById("contraseñaN");
    var contraN2 = document.getElementById("contraseñaN2");
    var envios = document.getElementById("enviars");
    ema.value = user.email;
    envios.onclick = function(e)
    {
        var userss = {
            Email: user.email,
            Passw: contraN.value
        }
        userRef.orderByKey().equalTo(user.key).on('child_added', snapshot => {
            if (contra.value.trim() != "" && contraN.value.trim() != "" && contraN2.value.trim() != "")
            {
                if (contra.value == snapshot.val().Passw) {

                    if (contraN.value==contraN2.value && contraN.value != contra.value) {
                        userRef.child(user.key).update(userss);
                        Swal.fire({
                            title: 'Hecho!',
                            text: 'Cambio hecho Correctamente',
                            icon: 'success',
                            confirmButtonText: 'Yes!'
                            })
                    }
                    else
                    {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Error al autenticar la contraseña',
                            icon: 'error',
                            confirmButtonText: 'Entendido'
                            })
                    }
                }
                else{
                   Swal.fire({
                       title: 'Error!',
                       text: 'Contraseña antigua incorrecta',
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
                       
           snapshot.val().Passw;
       });
    }
}

window.onload = colorCategory();