import './Login.scss';
import { useState } from "react";
import { auth, db } from "../../firebase/config";
import {
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, LoaderCircle, Eye, EyeClosed } from "lucide-react";

const LoginSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    const navigate = useNavigate();

    const handleAuth = async () => {
        setError("");
        setIsLoading(true);
        if (!email || !password || (!isLogin && !name)) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    name: name,
                    email: userCredential.user.email,
                    createdAt: serverTimestamp(),
                });
            }

            await setDoc(doc(db, "user_logs", `${userCredential.user.uid}_${Date.now()}`), {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                loginAt: serverTimestamp(),
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Authentication Error:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Password Reset Function
    const handlePasswordReset = async () => {
        if (!email) {
            setError("Please enter your email to reset your password.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage("A password reset email has been sent.");
        } catch (error) {
            console.error("Password Reset Error:", error);
            setError("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="header">
                    <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                </div>
                <div className="body">
                    {error && <p className="alert error">{error}</p>}
                    {resetMessage && <p className="alert success">{resetMessage}</p>}

                    {!isLogin && (
                        <div className="input-holder">
                            <User />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>Full Name</label>
                        </div>
                    )}
                    <div className="input-holder">
                        <Mail />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-holder">
                        <Lock />
                        <input
                            type={showPassword ? "text" : "password"} // Toggle input type
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        {showPassword ? (
                            <EyeClosed className="eye-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                            <Eye className="eye-icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>

                    {isLogin && (
                        <p className="btn btn-link" onClick={handlePasswordReset}>
                            Forgot password?
                        </p>
                    )}

                    <button onClick={handleAuth} className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? <LoaderCircle className="spinner" /> : (isLogin ? "Login" : "Sign Up")}
                    </button>
                </div>
                <div className="foot">
                    <p>Don't have an account?</p>
                    <p onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
                        {isLogin ? "Create an account" : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
