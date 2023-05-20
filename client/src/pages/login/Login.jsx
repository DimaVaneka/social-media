import "./login.scss"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Github from "../../assets/github.png";


const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/');
        } catch (err) {
            setErr(err.response.data);
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Sign in with</h1>
                    <div className="loginButton google">
                        <img src={Google} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginButton facebook">
                        <img src={Facebook} alt="" className="icon" />
                        Facebook
                    </div>
                    <div className="loginButton github" >
                        <img src={Github} alt="" className="icon" />
                        Github
                    </div>
                    <p>Don't you have an account?</p>
                    <Link to="/register"><button>Register</button></Link>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login