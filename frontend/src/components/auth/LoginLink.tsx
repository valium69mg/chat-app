import { Link } from "react-router-dom";

export default function LoginLink() {
  return (
    <p className="text-sm text-center mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-400 hover:underline">
        Login
      </Link>
    </p>
  );
}
