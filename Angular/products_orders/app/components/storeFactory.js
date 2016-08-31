var QTY_AMOUNT = 50;

angular.module('app').factory('StoreFactory', StoreFactory);

function StoreFactory() {
    var factory = {};
    var products = [
        {name: 'Laptop', price: 699, qty: 10}
    ];

    factory.add = addProduct;
    factory.buy = buy;
    factory.delete = deleteProduct;
    factory.index = indexProducts;
    factory.update = updateProduct;

    function addProduct(product) {
        if (parseInt(product.price, 10) == product.price) {
            product.price = parseInt(product.price, 10);
            product.qty = QTY_AMOUNT;
        } else {
            return;
        }

        products.push(product);
    }

    function buy(index) {
        products[index].qty--;
    }

    function deleteProduct(index) {
        products.splice(index, 1);
    }

    function indexProducts(callback) {
        callback(products);
    }

    function updateProduct(index, product) {
        product.qty += QTY_AMOUNT;

        products.splice(index, 1, product);
    }

    return factory;
}
