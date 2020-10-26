function SignIn() {
    return (
        <div class="container">
        <div class="row">
            <div class="col col-lg-8 col-sm-12 col-sm-12 offset-lg-2">
                <form action="javascript:void(0)">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group">
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      <input type="password" class="form-control" id="password"/>
                    </div>
                    <button type="submit" class="btn btn-primary flag_background" id="signin">Ingresar</button>
                  </form>
            </div>
        </div>
    </div>
    );
  }
  
  export default SignIn;