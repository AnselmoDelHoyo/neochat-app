
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";

export default function PrivatePage() {
    const { user, token } = useAuth();

    if (!user && !token) return <Navigate to="/login" replace />;

    return (
        <SocketProvider>
            <Outlet /> {/* Aquí se renderizan Chats, Chat, etc */}
        </SocketProvider>
    );
}
