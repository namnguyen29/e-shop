import React from "react";
const pStyle = { color: "red" };
class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }
  renderError() {
    let formErrors = this.props.formErrors;
    if (Object.keys(formErrors).length > 0) {
      return Object.keys(formErrors).map((key, index) => {
        return (
          <li key={key} style={pStyle}>
            {formErrors[key]}
          </li>
        );
      });
    }
  }
  render() {
    return <ul>{this.renderError()}</ul>;
  }
}
export default FormErrors;
