import "./login.scss"
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div className="login">
            <div className="card">
            <div className="left">
                <h1>Hello World</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt error cupiditate explicabo fugit praesentium, natus quos exercitationem tempore cum! Magni nobis perspiciatis iusto quis quas dolorum quia commodi voluptate perferendis.</p>
                <span>Don't you have an account?</span>
                <Link to = "/register"><button>Register</button></Link>
                
            </div>

            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login