import { Link } from "react-router-dom";

export default function RegisterLink() {
  return (
    <p className="text-sm text-center mt-4">
      Don’t have an account?{" "}
      <Link to="/register" className="text-blue-400 hover:underline">
        Register
      </Link>
    </p>
  );
}
