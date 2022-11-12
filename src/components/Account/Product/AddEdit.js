import React from 'react';
import axios from 'axios';
import FormErrors from '../FormErrors';
class AddEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            brand: '', category: '',
            avatar: {} , name:'', price:'',
            status:'', sale:'', company: '', detail:'',
            formErrors:{} , img: []
        }
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.renderBrand = this.renderBrand.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        /*Check status and show sale input */
        this.checkStatus = this.checkStatus.bind(this);
        this.renderSale = this.renderSale.bind(this);
    }
    componentDidMount(){
        axios.get("http://localhost/laravel/public/api/category-brand")
        .then(response => {
            console.log(response);
            this.setState({
                brand: response.data.brand,
                category: response.data.category
            })
        })
        .catch(error => console.log(error));
    }
    handleUserInputFile(event) {
        this.setState({
            avatar : event.target.files
        })
    }
    renderBrand() {
        let brand = this.state.brand;
        if (Object.keys(brand).length > 0){
            return Object.keys(brand).map(function(key, index) {
                return (
                    <option value={brand[key]['id']}>{brand[key]['brand']}</option>
                );
            })
        }
    }
    renderCategory() {
        let category = this.state.category;
        if (Object.keys(category).length > 0){
            return Object.keys(category).map(function(key, index) {
                return (
                    <option value={category[key]['id']}>{category[key]['category']}</option>
                );
            })
        }
    }
    checkStatus(){
        let getStatus = document.getElementById("status").value;
        this.setState ({
            status: getStatus
        })
    }
    renderSale(){
        let status = this.state.status;
        if (status == 0 && status != ""){
            return (
              <input placeholder="Sale" type="text" name="sale" onChange={this.handleInput}/>
            );
        }
    }
    handleInput(event) {
        const nameInput = event.target.name;
        const value = event.target.value;
        this.setState ({
            [nameInput]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        let flag = true;
        let name = this.state.name;
        let price = this.state.price;
        let sale = this.state.sale;
        let company = this.state.company;
        let detail = this.state.detail;
        let avatar = this.state.avatar;
        let errorSubmit = this.state.formErrors;
        let status = this.state.status;

        if(!name){
            flag = false;
            errorSubmit.name= "error name";
        }
        else {
            errorSubmit.name= "";
        }
        if (!price){
            flag = false;
            errorSubmit.price= "error price";
        }
        else{
            errorSubmit.price ="";
        }
        //check category
        let getCategory = document.getElementById("category").value;
        if ( getCategory == ""){
            flag = false;
            errorSubmit.category = "error category";
        }
        else {
            errorSubmit.category = "";
        }
        //check brand
        let getBrand = document.getElementById("brand").value;
        if (getBrand == ""){
            flag = false;
            errorSubmit.brand = "error brand";
        }
        else {
            errorSubmit.brand = "";
        }
        //check status
        let getStatus = document.getElementById("status").value;
        if (getStatus == ""){
            flag = false;
            errorSubmit.status = "error status";
        }
        else {
            if (getStatus == 0){
                errorSubmit.status = "";
                if(!sale){
                    flag = false;
                    errorSubmit.sale = "error sale";
                }
                else {
                    errorSubmit.sale = "";
                }
            }
        }
        if (!company) {
            flag = false;
            errorSubmit.company= "error company"
        }
        else {
            errorSubmit.company = "";
        }
        if (!detail) {
            flag = false;
            errorSubmit.detail= "error detail"
        }
        else {
            errorSubmit.detail = "";
        }
        if (avatar == ""){
            flag = false;
            errorSubmit.avatar = "chua tai anh len";
        }
        else{
            if (avatar.length > 3){
                alert("chi duoc tai toi da 3 anh");
                flag = false;
            }
            else{
                errorSubmit.avatar = "";
                //copy img to 3 part
                let {img} = this.state;
                for(let j = 0; j < avatar.length; j++) {
                    console.log(avatar);
                }

                const format = ["JPG", "png", "jpeg", "PNG", "jpg" ]
                if (avatar.length > 0){
                    for (let index = 0 ; index < avatar.length ; index++){
                        let getFormat = avatar[index].name.split(".");
                        let imgFormat = getFormat[1];
                        //check img format
                        for (let j = 0; j <= format.length; j++){
                            if (imgFormat === format[j]) {
                                console.log("co ho tro dinh dang "+ imgFormat);
                                break;
                            }
                            if (j === format.length) {
                                errorSubmit.avatar = "k ho tro dinh dang anh " + avatar[index].name;
                            }                        
                        }
                    }
                }
            }
        }

        if (!flag){
            this.setState({ formErrors:errorSubmit });
        } 
        else {
            let token = JSON.parse(localStorage.getItem("auth_token"));
            let url = "http://localhost/laravel/public/api/user/add-product";
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", getCategory);
            formData.append("brand", getBrand);
            formData.append("company", company);
            formData.append("detail", detail);
            formData.append("status", status);
            formData.append("sale", sale);
            Object.keys(avatar).map((key, index) => {
                formData.append("file[]", avatar[key])
            })
            axios.post(url, formData, config)
            .then(response => {
                console.log(response);
                if(response.data.errors) {
                    this.setState({ formErrors: response.data.errors });
                }  
                else {
                    let msg = "add thanh cong";
                    // this.props.history.push("/account/product/list");
                }

            })
            .catch(error => console.log(error));
        }
    }
    render() {
        return (
                <div className="col-sm-9">
                    <div className="signup-form">{/*sign up form*/}
                        <h2>Update Product</h2>
                            <p>{this.state.msg}</p>
                            <FormErrors formErrors={this.state.formErrors} />
                            <form action="#" onSubmit ={this.handleSubmit} >
                                <input placeholder="Name" type="text" name="name" onChange={this.handleInput} />
                                <input placeholder="Price" type="text" name="price" onChange={this.handleInput}/>
                                <select id="category" name="" onChange={this.handleInput}>
                                    <option value="">Choose your category</option>
                                    {this.renderCategory()}
                                </select>
                                <select id="brand" onChange={this.handleInput}>
                                    <option value="">Choose your brand</option>
                                    {this.renderBrand()}
                                </select>
                                <select id="status" name="status" onClick={this.checkStatus} onChange={this.handleInput}>
                                    <option value="">Status</option>
                                    <option value="1">new</option>
                                    <option value="0">sale</option>
                                </select>
                                {/*if status == 0 => show sale input */}
                                {this.renderSale()}
                                <input placeholder="Company profile" type="text" name="company" onChange={this.handleInput} />
                                <input type="file" id="img" name="file[]" multiple onChange={this.handleUserInputFile} />
                                <textarea placeholder="Detail" type="text" name="detail" row="4" cols="40" onChange={this.handleInput} />
                                <button type="submit" className="text-center btn btn-default">Update</button>
                            </form>
                    </div>{/*/sign up form*/}
                </div>
        );
    }
}
export default AddEdit