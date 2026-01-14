import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export default function PrivateRoutes() {
    const [ok, setOk] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("/api/v1/auth/user-auth");

                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setOk(false);
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}
