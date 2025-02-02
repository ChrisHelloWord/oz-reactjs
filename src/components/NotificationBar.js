import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import Note from "./Note";

const NotificationBar = ({ isOpen, onClose }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            if (auth.currentUser) {
                const logsRef = collection(db, "user_logs");
                const q = query(
                    logsRef,
                    where("uid", "==", auth.currentUser.uid),
                    orderBy("loginAt", "desc"),
                    limit(10)
                );

                const querySnapshot = await getDocs(q);
                const logData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setLogs(logData);
            }
        };

        if (isOpen) {
            fetchLogs();
        }
    }, [isOpen]);

    return (
        <div className={`notification-bar ${isOpen ? "open" : ""}`}>
            <div className="head">
                <h4>Notifications</h4>
                <ChevronRight onClick={onClose} />
            </div>
            <div className="note-list">
                {logs.length > 0 ? (
                    logs.map(log => (
                        <Note key={log.id} user={log.email} timestamp={log.loginAt} />
                    ))
                ) : (
                    <p className="no-notifications">No recent activity</p>
                )}
            </div>
        </div>
    );
};

export default NotificationBar;
