angular.module('app').controller('CorrectiveActionsController', CorrectiveActionsController);

CorrectiveActionsController.$inject = ['MainFormModel'];

function CorrectiveActionsController(MainFormModel) {
    var vm = this;
    vm.form = MainFormModel.attributes;
}