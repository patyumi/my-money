import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { usePost } from "../utils/rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlZX5JlzqgaIib0qe18aAV-mrJCbchjKY";

const Login = () => {
  const [postData, signIn] = usePost(url);
  const [logado, setLogado] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem("token", postData.data.idToken);
      window.location.reload();
    }
  }, [postData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    }
  }, []);
  const login = async () => {
    await signIn({
      email,
      password: senha,
      returnSecureToken: true
    });
  };

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
  };

  const onChangeSenha = evt => {
    setSenha(evt.target.value);
  };

  if (logado) {
    return <Redirect to="/" />;
  }

  return (
    <div className="d-flex p-2 flex-column justify-content-center">
      <h1>Login</h1>
      {postData.error && postData.error.length > 0 && <p>Dados inválidos!</p>}
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={onChangeEmail}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={senha}
            onChange={onChangeSenha}
          />
        </div>
        <button type="button" onClick={login} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
