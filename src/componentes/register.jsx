function Register() {
    return (
        <div class="container">
        <div class="row">
            <div class="col col-lg-8 col-sm-12 col-sm-12 offset-lg-2">
                <form action="javascript:void(0)">
                    <div class="form-group">
                      <label htmlFor="Email">Email address</label>
                      <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group">
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      <input type="password" class="form-control" id="password"/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="exampleInputPassword1">Confirmar Contraseña</label>
                        <input type="password" class="form-control" id="confirmpassword"/>
                      </div>
                    <button type="submit" class="btn btn-primary flag_background" id="register">Registrar</button>
                  </form>
            </div>
        </div>
    </div>
    );
  }
  
  export default Register;