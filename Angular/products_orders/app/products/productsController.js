angular.module('app').controller('ProductsController',
        ['StoreFactory', ProductsController]);

function ProductsController(StoreFactory) {
    var vm = this;

    vm.products = [];
    vm.addProduct = addProduct;
    vm.deleteProduct = deleteProduct;
    vm.newDelivery = newDelivery;

    getProducts();

    function addProduct() {
        StoreFactory.add({name: vm.name, price: vm.price});
        vm.name = '';
        vm.price = '';
    }

    function deleteProduct(index) {
        StoreFactory.delete(index);
    }

    function getProducts() {
        StoreFactory.index(function(data) {
            vm.products = data;
        });
    }

    function newDelivery(index) {
        StoreFactory.update(index, vm.products[index]);
    }
}
