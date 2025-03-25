import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <LoginForm />
        <div className="text-center">
          <a
            href="/register"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Criar uma conta
          </a>
        </div>
      </div>
    </div>
  );
}
