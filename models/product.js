const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      // console.log(this,'products ====>')
      if(this.id){
        // console.log(this.id,'products Id ====>')
        let existingProduct = products.findIndex(item=>item.id == this.id)
        const updatedProduct = [...products]
        updatedProduct[existingProduct] = this
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        })
      }else{
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      })}
    });
  }

  delete(){
    getProductsFromFile((products)=>{
 let deletableId = products.findIndex(item=>item.id == this.id) 
 const allProduct = [...products]
//  console.log(allProduct)
 allProduct.splice(deletableId,1)
 fs.writeFile(p,JSON.stringify(allProduct),(err=>{
  console.log(err)
 }))
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
