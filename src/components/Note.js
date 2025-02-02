import "./NotificationBar.scss";
import { UserCircle } from "lucide-react";
import { format } from "date-fns";

const Note = ({ user, timestamp }) => {
    const formattedTime = timestamp?.toDate ? format(timestamp.toDate(), "EEEE HH:mm") : "Unknown time";

    return (
        <div className="note">
            <div className="head">
                <div className="user online">
                    <UserCircle />
                </div>
                <div className="content">
                    <p><strong>{user}</strong> logged in</p>
                    <span>{formattedTime}</span>
                </div>
            </div>
            <div className="body"></div>
        </div>
    );
};

export default Note;
