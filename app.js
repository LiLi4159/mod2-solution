(function(){
    'use strict';
    angular.module('shopping-app',[])
    .service('ShoppingListCheckOffService', shoppingListCheckOffService)
    .controller("ToBuyController", toBuyController)
    .controller('AlreadyBoughtController', alreadyBoughtController);

    toBuyController.$inject=['ShoppingListCheckOffService'];
    alreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function toBuyController(ShoppingListCheckOffService){
        var ctrl=this;
        ctrl.list=ShoppingListCheckOffService.getToBuyList();
        ctrl.boughtItem=function(item){
            ShoppingListCheckOffService.addBoughtItem(item);
            ShoppingListCheckOffService.removeFromToBuyList(item);
        }
    }

    function alreadyBoughtController(ShoppingListCheckOffService){
        var ctrl=this;
        ctrl.list=ShoppingListCheckOffService.getBoughtList();
    }

    function shoppingListCheckOffService(){
        var service=this;
        service.toBuy=[{name:'cookies', quantity:10},
                   {name:'water', quantity:3},
                   {name:'chips', quantity:2},
                   {name:'juice box', quantity:4}];
        service.bought=[];

        service.getToBuyList=function(){
            return service.toBuy;
        };
        service.getBoughtList=function(){
            return service.bought;
        };
        service.removeFromToBuyList=function(item){
            var idx=service.toBuy.indexOf(item);
            if(idx>=0){
                service.toBuy.splice(idx,1)
                return item;
            }
            return null;
        };
        service.addBoughtItem=function(item){
            service.bought.push(item);
        };

    }
})();