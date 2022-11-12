import React from "react";
import FormErrors from "../Error/FormErrors";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      level: "",
      appState: "",
      formErrors: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(event) {
    const nameInput = event.target.name;
    const value = event.target.value;
    console.log(event.target);
    this.setState({
      [nameInput]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let errorSubmit = this.state.formErrors;
    let flag = true;
    if (!email) {
      flag = false;
      errorSubmit.email = "wrong email";
    } else {
      errorSubmit.email = "";
    }
    if (!password) {
      flag = false;
      errorSubmit.password = "wrong password";
    } else {
      errorSubmit.password = "";
    }
    if (!flag) {
      this.setState({ FormErrors: errorSubmit });
    } else {
      const account = {
        email: this.state.email,
        password: this.state.password,
        level: 0,
      };
      console.log(account);

      axios
        .post("http://localhost/laravel/public/api/login", account)
        .then((response) => {
          console.log(response);
          if (response.data.errors) {
            this.setState({ formErrors: response.data.errors });
          } else {
            let status = true;
            let cvtJSON = JSON.stringify(status);
            localStorage.setItem("isLogin", cvtJSON);
            let cvtToken = JSON.stringify(response.data.success.token);
            localStorage.setItem("auth_token", cvtToken);
            let cvtAuth = JSON.stringify(response.data.Auth);
            localStorage.setItem("appState", cvtAuth);
            this.props.history.push("/");
          }
        })
        .catch((error) => console.log(error));
    }
  }
  render() {
    return (
      <section id="form">
        {/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-1">
              <div className="login-form">
                {/*login form*/}
                <h1>Login to your account</h1>
                <FormErrors formErrors={this.state.formErrors} />
                <form action="#" onSubmit={this.handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={this.handleInput}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInput}
                  />
                  <span>
                    <input type="checkbox" className="checkbox" />
                    Keep me signed in
                  </span>
                  <button type="submit" className="btn btn-default">
                    Login
                  </button>
                  <span>
                    New Customer? <Link to="/register">Click here</Link>
                  </span>
                </form>
              </div>
              {/*/login form*/}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Login;
