import React from "react";
import FormErrors from "../Error/FormErrors";
import axios from "axios";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      avatar: "",
      level: 0,
      msg: "",
      file: "",
      formErrors: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInputFile = this.handleUserInputFile.bind(this);
  }

  handleUserInputFile(event) {
    const file = event.target.files;
    let reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        avatar: event.target.result,
        file: file[0],
      });
    };
    reader.readAsDataURL(file[0]);
  }

  handleInput(event) {
    const nameInput = event.target.name;
    const value = event.target.value;
    this.setState({
      [nameInput]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let flag = true;
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let phone = this.state.phone;
    let address = this.state.address;
    let avatar = this.state.avatar;
    let errorSubmit = this.state.formErrors;
    let file = this.state.file;
    //check dinh dang va size cua anh
    if (!file) {
      flag = false;
      errorSubmit.file = "chua tai anh len";
    } else {
      console.log(file);
      if (file.size > 1024 * 1024) {
        alert("Upload smaller size photo");
      } else {
        console.log(file.size);
      }
      const format = ["JPG", "png", "jpg", "jpeg", "PNG"];
      let getFormat = file.name.split(".");
      let imgFormat = getFormat[1];
      console.log(imgFormat);
      for (let index = 0; index <= format.length; index++) {
        if (imgFormat == format[index]) {
          console.log("co ho tro dinh dang nay");
          break;
        }
        if (index == format.length) {
          alert("k ho tro ding dang " + imgFormat);
        }
      }
    }
    if (!name) {
      flag = false;
      errorSubmit.name = "error name";
    } else {
      errorSubmit.name = "";
    }
    if (!email) {
      flag = false;
      //errorSubmit.push("nhap mail vao") /*array only */
      errorSubmit.email = "Invalid or wrong email";
    } else {
      errorSubmit.email = "";
    }
    if (!password) {
      flag = false;
      errorSubmit.password = "Ivanlid or wrong password";
    } else {
      errorSubmit.password = "";
    }
    if (!phone) {
      flag = false;
      errorSubmit.phone = "error phone number";
    } else {
      errorSubmit.phone = "";
    }
    if (!address) {
      flag = false;
      errorSubmit.address = "error address";
    } else {
      errorSubmit.address = "";
    }
    if (!avatar) {
      flag = false;
      errorSubmit.avatar = "error avatar";
    } else {
      errorSubmit.avatar = "";
    }
    if (!flag) {
      this.setState({ formErrors: errorSubmit });
    } else {
      const userInfo = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        address: this.state.address,
        avatar: this.state.avatar,
        level: this.state.level,
      };
      axios
        .post("http://localhost/laravel/public/api/register", userInfo)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            this.setState({ formErrors: res.data.errors });
          } else {
            this.setState({
              msg: "Dang ki thanh cong",
              name: "",
            });
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
            <div className="col-lg-6 mx-auto">
              <div className="signup-form">
                {/*sign up form*/}
                <h1>New User Signup!</h1>
                <p>{this.state.msg}</p>
                <FormErrors formErrors={this.state.formErrors} />
                <form action="#" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleInput}
                  />
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
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={this.handleInput}
                  />
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={this.handleUserInputFile}
                  />
                  <button type="submit" className="text-center btn btn-default">
                    Sign up
                  </button>
                </form>
              </div>
              {/*/sign up form*/}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Register;
