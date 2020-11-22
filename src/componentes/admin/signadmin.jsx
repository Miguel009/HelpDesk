import React, {useState } from "react";
import Swal from "sweetalert2"
function AdminSignIn() {
    const usuario = {
      Email:'',
      Passw: ''
    }
    const [values, setValues] = useState(usuario);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
        if (values.Email === "root@superuser.com") {
            
        if ("12345678910"===values.Passw) {
            Swal.fire({
                title: 'Bienvenido Admin!',
                text: 'Inicio Correctamente',
                icon: 'success',
                confirmButtonText: 'Yes!'
                }).then((result) => {
                    var user={
                        email: values.Email,
                    }
                    if (result.isConfirmed) {
                       localStorage.setItem('admin', JSON.stringify(user));
                        window.location.href = "./faqsemployee";
                    } else if (result.isDenied) {
                        localStorage.setItem('admin', JSON.stringify(user));
                        window.location.href = "./faqsemployee";
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
    };


    return (
        <div className="container">
        <div className="row">
            <div className="col col-lg-8 col-sm-12 col-sm-12 offset-lg-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" className="form-control" id="Email" name="Email" onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      <input type="password" name="Passw" onChange={handleInputChange}  className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary flag_background" id="signin">Ingresar</button>
                  </form>
            </div>
        </div>
    </div>
    );
  }
  
  export default AdminSignIn;