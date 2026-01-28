import { useNavigate } from "react-router-dom";
import { useUser } from "@/Context/UserContext";
import { useEffect } from "react";

export default function HomeComponent() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
    navigate("/login");
  }, [user, navigate]);

  return (<></>)
}
