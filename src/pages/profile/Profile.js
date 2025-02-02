import './Profile.scss';
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { UserCircle, UserPen, X, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Tooltip } from "react-tooltip";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createdAt, setCreatedAt] = useState("");
    const [resetMessage, setResetMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, "users", auth.currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setUserData(userData);
                    setNewName(userData.name);
                    setNewEmail(userData.email);

                    if (userData.createdAt?.toDate) {
                        setCreatedAt(format(userData.createdAt.toDate(), "PPpp")); // Example: Jan 30, 2025, 10:45 AM
                    }
                }
            }
        };

        fetchUserData();
    }, []);

    const triggerEditUser = () => {
        setIsEditing(true);
    };

    const confirmUpdate = () => {
        setShowConfirmation(true);
    };

    const cancelUpdate = () => {
        setIsEditing(false);
        setShowConfirmation(false);
        setNewName(userData.name);
        setNewEmail(userData.email);
    };

    const handleUpdateUser = async () => {
        setIsLoading(true);
        try {
            if (auth.currentUser) {
                const userRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userRef, { name: newName, email: newEmail });
                setUserData({ ...userData, name: newName, email: newEmail });
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Something went wrong. Please try again.");
        }
        setIsLoading(false);
        setIsEditing(false);
        setShowConfirmation(false);
    };

    // Handle Password Reset Request
    const handlePasswordReset = async () => {
        if (!auth.currentUser?.email) {
            alert("No email found for this account.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, auth.currentUser.email);
            setResetMessage("A password reset email has been sent.");
        } catch (error) {
            console.error("Password Reset Error:", error);
            setResetMessage("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className="profile-card frosted">
            <div className="left">
                <UserCircle />
                <p>User created: <strong>{createdAt || "Loading..."}</strong></p>
            </div>
            <div className="right">
                {isEditing ? (
                    <X id="close_edit"
                       onClick={cancelUpdate}
                       className="clickable close-icon"
                       data-tooltip-id="user"
                       data-tooltip-content="Cancel Edit"
                    />
                ) : (
                    <UserPen
                        id="edit_user"
                        onClick={triggerEditUser}
                        className="clickable edit-icon"
                        data-tooltip-id="user"
                        data-tooltip-content="Edit Details"
                    />
                )}
                <Tooltip id="user" place="top" className="tooltip" />

                <div className="name">
                    {isEditing ? (
                        <p>
                            <span>Name:</span>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </p>
                    ) : (
                        <h2>{userData ? userData.name : "User"}</h2>
                    )}
                </div>
                <div className="details">
                    <p>
                        <span>Email:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        ) : (
                            userData ? userData.email : "No email found"
                        )}
                    </p>
                </div>

                <button onClick={handlePasswordReset} className="btn btn-sml btn-outline btn-reset">
                    Reset Password
                </button>

                {resetMessage && <p className="alert success">{resetMessage}</p>}

                {isEditing && (
                    <button onClick={confirmUpdate} className="btn btn-sml btn-submit">
                        Submit Changes
                    </button>
                )}

                {showConfirmation && (
                    <div className="confirmation-box">
                        {isLoading ? (
                            <LoaderCircle className="spinner"/>
                        ) : (
                            <>
                                <p>Are you sure?</p>
                                <div className="btn-holder">
                                    <button className="btn btn-sml btn-confirm" onClick={handleUpdateUser}>Yes</button>
                                    <button className="btn btn-sml btn-cancel" onClick={cancelUpdate}>No</button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            <button className="btn btn-sml btn-back" onClick={() => navigate("/dashboard")}>Back</button>
        </div>
    );
};

export default Profile;
