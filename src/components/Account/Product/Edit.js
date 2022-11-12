import React from 'react';
import axios from 'axios';
import FormErrors from '../FormErrors';
const imgSize = {
    'width' : '120px',
    'height': '120px'
}
const renderImg = {
    'width': '100%',
    'display': 'inline'
}
class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            brand: '', category: '', msg:'', sub:'',
            avatar: {} , name:'', price:'',
            status:'', sale:'', company: '', company1:'' , detail:'', status1:'',
            formErrors:{}, cartID:'', avatar1: [], avatarCheckBox: []
        }
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.renderBrand = this.renderBrand.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        /*Check status and show sale input */
        this.checkStatus = this.checkStatus.bind(this);
        this.renderSale = this.renderSale.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
        this.renderCurrentImg = this.renderCurrentImg.bind(this);
        /*Check click */
        this.checkClick = this.checkClick.bind(this);
        /*kiem tra so anh uncheck */
        this.uncheckImg = this.uncheckImg.bind(this);
    }
    //hien thi anh
    renderCurrentImg(){
        let avatar1 = this.state.avatar1;
        let getInfo = JSON.parse(localStorage.getItem("appState"));
        if(avatar1.length > 0){
            return avatar1.map((value,key) =>{
                return (
                    <>
                        <input type="checkbox" name={avatar1[key]} onChange={this.uncheckImg} onClick={this.checkClick} />
                        <img style={imgSize} alt="456" src={"http://localhost/laravel/public/upload/user/product/" + getInfo['id']
                        + '/' + avatar1[key]} />
                        <br />
                    </>
                );
            })
        }
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
        //lay 1 product
        let token = JSON.parse(localStorage.getItem("auth_token"));
            let url = "http://localhost/laravel/public/api/user/product/" +  this.props.match.params.id;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
        axios.get(url, config)
        .then(res =>{
            console.log(res);
            this.setState({
                name: res.data.data.name,
                price: res.data.data.price,
                company: res.data.data.company_profile,
                detail: res.data.data.detail,
                avatar1: res.data.data.image,
                cartID: res.data.data.id,
                brand1: res.data.data.id_brand,
                category1: res.data.data.id_category,
                sale: res.data.data.sale,
                status1: res.data.data.status
            })
        })
        .catch (error => console.log(error));

    }
    handleUserInputFile(event) {
        this.setState({
            avatar : event.target.files
        })
    }
    //check click
    checkClick(event) {
        let avatarCheckBox = this.state.avatarCheckBox;
        let checkCurrentImg = event.target.checked;
        if(checkCurrentImg) {
            let getImg = event.target.name;
            avatarCheckBox.push(getImg);
            console.log(avatarCheckBox);
            this.setState({
                avatarCheckBox: avatarCheckBox
            })
        }
        else {
            console.log("uncheck");
            let getImg = event.target.name;
            const index = avatarCheckBox.indexOf(getImg);
            if (index > -1 ){
                avatarCheckBox.splice(index, 1);
            }
            console.log(avatarCheckBox);
            this.setState({
                avatarCheckBox: avatarCheckBox
            })
        }
    }
    uncheckImg(event) {
        // let avatar1 = this.state.avatar1;
        // let sub = this.state.sub;
        // sub = avatar1.length;
        // let checkCurrentImg = event.target.checked;
        // if(checkCurrentImg) {
        //     sub = sub -1;
        //     console.log(sub);
        //     this.setState({
        //         sub : sub
        //     })
        // }
    }
    renderBrand() {
        let brand1 = this.state.brand1;
        let brand = this.state.brand;
        if (Object.keys(brand).length > 0){
            return Object.keys(brand).map(function(key, index) {
                if(brand1 == brand[key]['id']){
                    return(
                        <option value={brand[key]['id']} selected>{brand[key]['brand']}</option>
                    );
                }
                return (
                    <option value={brand[key]['id']}>{brand[key]['brand']}</option>
                );
            })
        }
    }
    renderCategory() {
        let category1 = this.state.category1;
        let category = this.state.category;
        if (Object.keys(category).length > 0){
            return Object.keys(category).map(function(key, index) {
                if(category1 == category[key]['id']){
                return (
                    <>
                    <option value={category[key]['id']} selected>{category[key]['category']}</option>
                    </>
                );
                }
            return(
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
    renderStatus(){
        let status1 = this.state.status1;
        if (status1 == 1){
            return(
                <>
                    <option value={status1} selected>new</option>
                    <option value="0">sale</option>
                </>
            );
        }
        else {
            return(
                <>
                    <option value="1">new</option>
                    <option value={status1} selected>sale</option>
                </>
            );
        }
    }
    renderSale(){
        let sale = this.state.sale;
        let status = this.state.status;
        if (status == 0 && status != ""){
            return (
              <input value={sale} placeholder="Sale" type="text" name="sale" onChange={this.handleInput}/>
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
        let avatarCheckBox = this.state.avatarCheckBox;
        let avatar1 = this.state.avatar1;
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
            //avatar1: so luong anh ban dau, checkbox: anh sap xoa, avatar: anh moi up len
            let allPhoto = parseInt(avatar.length) + (parseInt(avatar1.length) - parseInt(avatarCheckBox.length))
            if (avatar.length > 3){
                flag = false;
                errorSubmit.avatar ="toi da upload 3 anh"
            }
            else{
                //kiem tra tong so anh;
                if (allPhoto > 3){
                    flag = false;
                    alert("Moi product toi da 3 anh, toi thieu 1 anh");
                }
                else {
                    errorSubmit.avatar = "";
                    const format = ["JPG", "png", "jpeg", "PNG", "jpg" ]
                    if (avatar.length > 0){
                        for (let index = 0 ; index < avatar.length ; index++){
                            let getFormat = avatar[index].name.split(".");
                            let imgFormat = getFormat[1];
                            //check img format
                            for (let j = 0; j <= format.length; j++){
                                if (imgFormat == format[j]) {
                                    console.log("co ho tro dinh dang "+ imgFormat);
                                    break;
                                }
                                if (j == format.length) {
                                    errorSubmit.avatar = "k ho tro dinh dang anh " + avatar[index].name;
                                }
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
            let url = "http://localhost/laravel/public/api/user/edit-product/" + this.state.cartID;
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
            //anh muon xoa
            Object.keys(avatarCheckBox).map((key, index) => {
                formData.append("avatarCheckBox[]", avatarCheckBox[key]);
            })
            axios.post(url, formData, config)
            .then(response => {
                console.log(response);
                if(response.data.errors) {
                    this.setState({ formErrors: response.data.errors });
                }  
                else {
                    let msg = this.state.msg;
                    msg = "update thanh cong";
                    // this.props.history.push("/account/product/edit/" + this.state.cartID);
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
                                <input value={this.state.name} placeholder="Name" type="text" name="name" onChange={this.handleInput} />
                                <input value ={this.state.price} placeholder="Price" type="text" name="price" onChange={this.handleInput}/>
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
                                    {this.renderStatus()};
                                </select>
                                {/*if status == 0 => show sale input */}
                                {this.renderSale()}
                                <input value={this.state.company} placeholder="Company profile" type="text" name="company" onChange={this.handleInput} />
                                <input type="file" id="img" name="file[]" multiple onChange={this.handleUserInputFile} />
                                <div style={renderImg}>
                                    {this.renderCurrentImg()}
                                </div>
                                <textarea value={this.state.detail} placeholder="Detail" type="text" name="detail" row="4" cols="40" onChange={this.handleInput} />
                                <button type="submit" className="text-center btn btn-default">Update</button>
                            </form>
                    </div>{/*/sign up form*/}
                </div>
        );
    }
}
export default Edit