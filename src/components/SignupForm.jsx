import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../api/script'
import { loginUser } from '../api/script'
import { UserContext } from '../contexts/UserContext'
import '../css/LoginSignup.css'

function SignupForm({ setToggleForm }) {
    const { login } = useContext(UserContext); // retrieve login function
    const navigate = useNavigate(); // for redirect
    const [email, setEmail] = useState(''); // for email input
    const [password, setPassword] = useState(''); // for password input
    const [signupMessage, setSignupMessage] = useState(''); // for message at the bottom of screen
    const [showPassword, setShowPassword] = useState(false); // for un/hiding password input

    /*---Submit func---*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. signup first
        const signupResult = await signupUser(email, password);

        if (!signupResult.ok) {
            setSignupMessage(signupResult.data?.error || 'Signup failed');
            return;
        }

        // 2. automatically login after successful signup and redirect to Activities
        const loginResult = await loginUser(email, password);

        if (loginResult.ok) {
            setSignupMessage('Signup and login successful!');
            
            // wait 1.5 seconds to show the message before redirecting to Activities
            setTimeout(() => {
                login(loginResult.data); // store user in context
                setEmail('');
                setPassword('');
                navigate('/user/activities');
            }, 1500);
        } else {
            setSignupMessage('Signup successful, but login failed: ' + (loginResult.data?.error || 'Unknown error'));
        }
    };
    /*---*/

    return <div className="Signup">
        <div className="form-container signup">
            <form onSubmit={handleSubmit} id="signupForm">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="show-password-btn"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <svg
                            className="password-icon lock"
                            viewBox="0 0 512 512"
                            width="20"
                            height="20"
                            fill="currentColor"
                            >
                                <path d="M0 0 C51.15 0 102.3 0 155 0 C155 16.83 155 33.66 155 51 C171.83 51 188.66 51 206 51 C206.0273313 61.43752059 206.05091472 71.8749614 206.0625 82.3125 C206.06335602 83.07831516 206.06421204 83.84413033 206.06509399 84.63315201 C206.08764222 107.44409883 205.85629621 130.20111343 205 153 C222.16 153 239.32 153 257 153 C257 254.97 257 356.94 257 462 C138.53 462 20.06 462 -102 462 C-102 360.03 -102 258.06 -102 153 C-85.17 153 -68.34 153 -51 153 C-51 119.34 -51 85.68 -51 51 C-34.17 51 -17.34 51 0 51 C0 34.17 0 17.34 0 0 Z M1 52 C1 85.33 1 118.66 1 153 C51.16 153 101.32 153 153 153 C153.33 119.67 153.66 86.34 154 52 C103.51 52 53.02 52 1 52 Z M-50 206 C-50 272.99 -50 339.98 -50 409 C34.15 409 118.3 409 205 409 C205 341.33251232 204.62652396 273.66458717 204 206 C120.18 206 36.36 206 -50 206 Z " transform="translate(181,25)"/>
                                <path d="M0 0 C17.16 0 34.32 0 52 0 C52 33.99 52 67.98 52 103 C34.84 103 17.68 103 0 103 C0 69.01 0 35.02 0 0 Z " transform="translate(232,281)"/>
                        </svg>
                    ) : (
                        <svg
                            className="password-icon key"
                            viewBox="0 0 512 512"
                            width="24"
                            height="24"
                            fill="currentColor"
                            >
                                <path d="M0 0 C10.56 0 21.12 0 32 0 C32 10.56 32 21.12 32 32 C42.56 32 53.12 32 64 32 C64 42.89 64 53.78 64 65 C53.44 65 42.88 65 32 65 C32 74.9 32 84.8 32 95 C42.56 95 53.12 95 64 95 C64 105.89 64 116.78 64 128 C53.44 128 42.88 128 32 128 C32 159.02 32 190.04 32 222 C42.56 222 53.12 222 64 222 C64 232.56 64 243.12 64 254 C74.56 254 85.12 254 96 254 C96 285.68 96 317.36 96 350 C85.44 350 74.88 350 64 350 C64 360.56 64 371.12 64 382 C21.76 382 -20.48 382 -64 382 C-64 371.44 -64 360.88 -64 350 C-74.56 350 -85.12 350 -96 350 C-96 318.32 -96 286.64 -96 254 C-85.44 254 -74.88 254 -64 254 C-64 243.44 -64 232.88 -64 222 C-53.44 222 -42.88 222 -32 222 C-32 159.3 -32 96.6 -32 32 C-21.44 32 -10.88 32 0 32 C0 21.44 0 10.88 0 0 Z M-63 255 C-63 286.02 -63 317.04 -63 349 C-21.42 349 20.16 349 63 349 C63 317.98 63 286.96 63 255 C21.42 255 -20.16 255 -63 255 Z " transform="translate(256,65)"/>
                                <path d="M0 0 C21.12 0 42.24 0 64 0 C64 10.56 64 21.12 64 32 C42.88 32 21.76 32 0 32 C0 21.44 0 10.88 0 0 Z " transform="translate(224,351)"/>
                        </svg>
                    )}
                </button>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>

            <p>
                Already have an account?
                <button type="button" className="link-btn" onClick={() => setToggleForm(true)}>Login</button>
            </p>

            {signupMessage && <p id="errorMessage">{signupMessage}</p>}
        </div>
    </div>
}

export default SignupForm