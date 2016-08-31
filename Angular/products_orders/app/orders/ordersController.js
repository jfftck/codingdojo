angular.module('app').controller('OrdersController',
        ['StoreFactory', OrdersController]);

function OrdersController(StoreFactory) {
    var vm = this;

    vm.products = [];
    vm.buy = buy;

    getProducts();

    function buy(index) {
        StoreFactory.buy(index);
    }

    function getProducts() {
        StoreFactory.index(function(data) {
            vm.products = data;
        });
    }
}
