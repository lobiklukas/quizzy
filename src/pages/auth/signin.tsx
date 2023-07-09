// import { signIn } from "next-auth/react";
// import GoogleLogo from "../../components/icons/google";

import { SignIn } from "@clerk/nextjs";

const Login: React.FC = () => {
  return (
      <SignIn redirectUrl="/app" />
    // <div className="from-primary/40 via-primary-focus/40 to-secondary/40 h-screen w-full bg-gradient-to-bl">
    //   <div className="flex h-full flex-col items-center justify-center">
    //     <div className="bg-base-200 m-2 flex flex-col items-center justify-center rounded-lg p-8 shadow-lg">
    //       <h1 className="mb-4 text-3xl font-bold">Welcome Back!</h1>
    //       <p className="mb-4 text-center">
    //         Login to your account to continue using our services
    //       </p>
    //       <div className="flex flex-col items-center justify-center">
    //         {/* style login form using daisyui it will have option to login with gmail */}
    //         <button
    //           id="google-login"
    //           className="btn-primary btn-outline btn-wide btn fill-primary hover:fill-primary-content gap-2 border-2"
    //           onClick={() => signIn("google")}
    //         >
    //           <span className="h-6 w-6 ">
    //             <GoogleLogo />
    //           </span>
    //           Login with Google
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
