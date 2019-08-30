import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../utils/rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlZX5JlzqgaIib0qe18aAV-mrJCbchjKY";

const Login = () => {
  const [postData, signIn] = usePost(url);

  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem("token", postData.data.idToken);
    }
  }, [postData]);

  const login = async () => {
    await signIn({
      email: "patrciayumi@gmail.com",
      password: "fel0812",
      returnSecureToken: true
    });
  };

  return (
    <div>
      <h1>Login</h1>
      {JSON.stringify(postData)}
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
