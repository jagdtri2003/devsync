import { SignUp} from '@clerk/clerk-react';
const SignupPage = () => {
  return (
            
            <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <SignUp 
                signInUrl="/login"
              />
            </div>
  );
};

export default SignupPage; 