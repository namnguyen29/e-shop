import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Delete from './Delete';
const pStyle = {
  'background-color': 'orange'
}
const imgSize = {
  'width' : '100px',
  'height': '90px'
}
class List extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userID: '', thumbnail:[],
      getData: {}, newData:{}, currentData:{}
    }
    this.getNewData = this.getNewData.bind(this);
    this.renderCart = this.renderCart.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
  }
  getNewData(newData){
    this.setState ({
      getData : newData
    })
  };
  componentDidMount() {
    let userID = this.state.userID;
    let accessToken = JSON.parse(localStorage.getItem("auth_token"));
    let getInfo = JSON.parse(localStorage.getItem("appState"));
    this.setState ({
        userID: getInfo['id']
    });
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    let url = "http://localhost/laravel/public/api/user/my-product";
    axios.get(url, config)
    .then(response => {
      console.log(response);
      this.setState({
        getData: response.data.data
      })
    })
    .catch(error => console.log(error));
  }
  renderCart() {
    let thumbnail = this.state.thumbnail;
    let getData = this.state.getData;
    if(Object.keys(getData).length > 0){
      return Object.keys(getData).map((key, index) => {
        thumbnail = JSON.parse(getData[key]['image']);
        return (
          <tr>
            <td>
              <p>{getData[key]['id']}</p>
            </td>
            <td className="cart_description">
              <p>{getData[key]['name']}</p>
            </td>
            <td className="cart_product">
              <img style={imgSize} src={"http://localhost/laravel/public/upload/user/product/" +this.state.userID + "/"+ thumbnail[0] } 
              alt="12345"/>
            </td>
            <td className="cart_price">
              <p>{getData[key]['price']} VND</p>
            </td>
            <td>
              <Link to={"/account/product/edit/" + getData[key]['id']} ><i className="fa fa-edit" /></Link>
              &emsp;
              <Delete getNewData= {this.getNewData} cartID= {this.state.getData[key]['id']}/>
            </td>
        </tr>
        );
      })
    }
  
  }
    render() {
        return (
          <div className="col-sm-9">
            <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead style={pStyle}>
                <tr className="cart_menu">
                  <td className="id">ID</td>
                  <td className="description">Name</td>
                  <td className="image">Image</td>
                  <td className="price">Price</td>
                  <td className="quantity">Action</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {this.renderCart()}
              </tbody>
            </table>
          </div>
          <Link to={"/account/product/add-edit/" + this.state.userID} className="btn btn-default">Add Product</Link> {/*add button */}
          </div>
        );
    }
}
export default List