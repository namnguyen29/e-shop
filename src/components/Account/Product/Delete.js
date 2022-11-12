import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Delete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID : ''
        }
        this.deleteItem = this.deleteItem.bind(this);        
    }
    deleteItem() {
        let cartID = this.props.cartID;
        console.log(cartID);
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
        let url = "http://localhost/laravel/public/api/user/delete-product/" + cartID;
        axios.get(url, config)
        .then(response => {
            console.log(response);
            if(response.data.errors) {
                this.setState({ formErrors: response.data.errors });
                }  
            else {
                this.props.getNewData(response.data.data);
            }
        })
        .catch(error => console.log(error));
      }
    render () {
        return (
        <Link onClick = {this.deleteItem}>
        <i className="fa fa-times" />
        </Link>
        );
    }
}
export default Delete