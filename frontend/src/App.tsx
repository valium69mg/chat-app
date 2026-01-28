import { Routes, Route} from "react-router-dom";
import ChatPage from "./components/chat/ChatPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import { UserProvider } from "./providers/UserProvider";
import HomeComponent from "./components/home/HomeComponent";

function App() {
  
  return (
    <div className="min-h-screen bg-black text-white">
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/" element={<HomeComponent/>} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
