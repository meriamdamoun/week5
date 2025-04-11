const products = require('./products.js');

function findProductByName(name) {
    const searchProduct = name.lowerCase();
    const foundProduct = products.find(product =>
        product.name.toLowerCase().includes(searchProduct)
    );
    if (foundProduct) {
        return foundProduct;
    }
    else 
        return `Product "${name}" not found.`;
}

findProductByName('Laptop');
findProductByName('Smartphone');
findProductByName('Tablet');