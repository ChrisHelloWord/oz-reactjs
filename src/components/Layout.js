import './Layout.scss';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleUser, Bell, LogOut, LayoutGrid } from "lucide-react";
import DateTime from "./DateTime";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import NotificationBar from "./NotificationBar";
import { Tooltip } from "react-tooltip";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const handleNotificationsShow = () => {
        setShowNotifications((prev) => !prev);
    };

    const pageTitles = {
        "/dashboard": "Dashboard",
        "/profile": "Profile"
    };

    const matchedPath = Object.keys(pageTitles).find(path => location.pathname.startsWith(path));
    const currentTitle = matchedPath ? pageTitles[matchedPath] : "Dashboard";


    return (
        <div className="container dashboard-container">
            <div className="head">
                <div className="taskbar frosted">
                    <div className="title">
                        <h4>{currentTitle}</h4>
                    </div>
                    <div className="date-time">
                        <DateTime />
                    </div>
                    <div className="controls">
                        <CircleUser
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Profile"
                            className={location.pathname === "/profile" ? "active" : ""}
                            onClick={() => navigate("/profile")}
                        />
                        <Bell
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Notifications"
                            className={showNotifications ? "active" : ""}
                            onClick={handleNotificationsShow}
                        />
                        <LogOut
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Logout"
                            onClick={handleLogout}
                        />
                        <Tooltip id="tooltip" place="bottom" className="tooltip" />
                    </div>
                </div>
            </div>

            <div className="body">
                <Outlet />
            </div>

            <div className="foot">
                <div className="taskbar frosted">
                    <LayoutGrid
                        onClick={() => navigate("/dashboard")}
                        className={location.pathname === "/dashboard" ? "active" : ""}
                        data-tooltip-id="taskbar"
                        data-tooltip-content="Dashboard"
                    />
                    <Tooltip id="taskbar" place="top" className="tooltip" />
                </div>
            </div>

            <NotificationBar
                isOpen={showNotifications}
                onClose={handleNotificationsShow}
            />
        </div>
    );
};

export default Layout;
