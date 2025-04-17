import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignIn
        signUpUrl="/signup"
      />
    </div>
  );
};

export default LoginPage;
