import {observable, computed, action} from "mobx";

class CartStore {
    @observable products = [];

    @action addProduct = (product) => {
        let productExists = this.products.find(entry => entry._id === product._id);
        if(!productExists){
            product.quantity = product.quantity ? product.quantity : 1;
            this.products.push(product);
        }else{
            productExists.quantity += product.quantity ? product.quantity : 1;
        }
    };

    @action removeProduct = (product) => {
        this.products.splice(this.products.findIndex(function(item){
            return item._id === product._id;
        }), 1);
    };

    @action updateProduct = (product) => {
        console.log(product);
        if(product.quantity === "0"){
            this.removeProduct(product);
        }else{
            let productExists = this.products.find(entry => entry._id === product._id);
            if(productExists){
                productExists.quantity = product.quantity;
            }
        }
    };

    @computed get cartCount(){
      return this.products.length;
    };
}

const store = new CartStore();
export default store;
