import React from "react";
import axios from "axios";
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      newInfo: {},
      file: "",
      formErrors: {}, // all error
      /*-------------------------------------------------*/
    };
    this.renderInfo = this.renderInfo.bind(this);
    this.updateInfo = this.updateInfo.bind(this); //sumbit function
    this.handleInput = this.handleInput.bind(this);
    this.handleUserInputFile = this.handleUserInputFile.bind(this); //input anh moi
  }
  componentDidMount() {
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (!isLogin) {
      alert("Vui long dang nhap truoc");
      this.props.history.push("/login");
    } else {
      let getInfo = JSON.parse(localStorage.getItem("appState"));
      this.setState({
        info: getInfo,
        name: getInfo["name"],
        regEmail: getInfo["email"],
        email: getInfo["email"],
        address: getInfo["address"],
        phone: getInfo["phone"],
      });
    }
  }
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
  ///////////////////////////////////////
  updateInfo(event) {
    event.preventDefault();
    let info = this.state.info;
    let flag = true;
    let name = this.state.name;
    let email = this.state.email;
    let phone = this.state.phone;
    let address = this.state.address;
    let password = this.state.password;
    let errorSubmit = this.state.formErrors;
    let regEmail = this.state.regEmail;
    if (!name) {
      flag = false;
      errorSubmit.name = "error name";
    } else {
      errorSubmit.name = "";
    }
    if (email == regEmail) {
      errorSubmit.email = "";
    } else {
      flag = false;
      errorSubmit.email = "khong duoc thay doi email";
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
    /*---------------------------------------------------------------------------*/
    if (!flag) {
      this.setState({ formErrors: errorSubmit });
    } else {
      console.log("du thong tin update");
      let token = JSON.parse(localStorage.getItem("auth_token"));
      let url = "http://localhost/laravel/public/api/user/update/" + info["id"];
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("password", password);
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response.data.Auth);
          if (response.data.errors) {
            this.setState({ formErrors: response.data.errors });
          }
          let cvtInfo = JSON.stringify(response.data.Auth);
          localStorage.setItem("appState", cvtInfo);
        })
        .catch((error) => console.log(error));
    }
  }
  renderInfo() {
    // let info = this.state.info;
    return (
      <>
        <div className="col-sm-2"></div>
        <div className="col-sm-7">
          <div className="signup-form">
            {/*sign up form*/}
            <h2>User Information!</h2>
            {/* <FormErrors formErrors={this.state.formErrors}/> */}
            <form action="#" onSubmit={this.updateInfo}>
              <input
                value={this.state.name}
                type="text"
                name="name"
                onChange={this.handleInput}
              />
              <input
                value={this.state.regEmail}
                type="email"
                name="regEmail"
                onChange={this.handleInput}
              />
              <input value="xxxxxxxx" type="password" name="password" />
              <input
                value={this.state.phone}
                type="text"
                name="phone"
                onChange={this.handleInput}
              />
              <input
                value={this.state.address}
                type="text"
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
                Update
              </button>
            </form>
          </div>
          {/*/sign up form*/}
        </div>
      </>
    );
  }
  render() {
    return <>{this.renderInfo()}</>;
  }
}
export default Update;
