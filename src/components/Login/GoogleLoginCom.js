import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";


export default function GoogleLoginCom() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const login = useGoogleLogin({
      onSuccess: tokenResponse => console.log(tokenResponse),
    });

  return (
    <>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <button onClick={() => login()}>Sign in with Google 🚀</button>;
    </>
  );
}
