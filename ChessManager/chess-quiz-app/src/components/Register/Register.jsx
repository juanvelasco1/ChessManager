const Register = () => {
    return (
        <>
            <div className="register-form">
                <div className="header-register">
                    <img src="" alt="" />
                    <span>La estrategia, en tus manos.</span>
                    <div className="select-rol">
                        <button>Jugador</button>
                        <button>Administrador</button>
                    </div>
                </div>
                <div className="body-register">
                    <form>
                        <input type="text" name="apodo" id="nickname" placeholder="Apodo" required/>
                        <input type="email" name="email" id="user-email" placeholder="Correo" required/>
                        <input type="password" name="contraseña" id="user-password" placeholder="Contraseña" required/>
                        <input type="password" name="confirmar" id="user-confirm-password" placeholder="Confirmar contraseña" required/>
                        <button type="submit">Crear</button>
                        <button>Ya tengo una cuenta</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Register;