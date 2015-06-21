angular.module('app').controller('CorrectiveActionsController', CorrectiveActionsController);

CorrectiveActionsController.$inject = ['MainFormModel', '$modal'];

function CorrectiveActionsController(MainFormModel, $modal) {
  var vm = this;
  vm.form = MainFormModel.attributes;
  vm.addCorrectiveAction = addCorrectiveAction;
  vm.remove = remove;
  vm.edit = edit;
  checkAvailable();

  function addCorrectiveAction(){
    if(vm.form.correctiveActions.length >= 5){
      return false;
    }
    var modalInstance = $modal.open({
      templateUrl: 'modal/corrective-actions-modal.html',
      controller: 'CorrectiveActionsModalController as vm',
      backdrop: 'static'
    });
    modalInstance.result.then(function () {
      MainFormModel.attributes.correctiveActions.push(angular.copy(MainFormModel.tempCorrectiveAction));
      MainFormModel.eraseTempCorrectiveActions();
      checkAvailable();
    }, function() {
      MainFormModel.eraseTempCorrectiveActions();
    });
  }
  function checkAvailable() {
    vm.actionsAvailable = 5 - MainFormModel.attributes.correctiveActions.length;
  }
  function remove($index) {
    vm.form.correctiveActions.splice($index, 1);
    checkAvailable();
  }
  function edit($index) {
    MainFormModel.tempCorrectiveAction = angular.copy(vm.form.correctiveActions[$index]);
    var modalInstance = $modal.open({
      templateUrl: 'modal/corrective-actions-modal.html',
      controller: 'CorrectiveActionsModalController as vm',
      backdrop: 'static'
    });
    modalInstance.result.then(function () {
      MainFormModel.attributes.correctiveActions[$index] = angular.copy(MainFormModel.tempCorrectiveAction);
      MainFormModel.eraseTempCorrectiveActions();
    }, function() {
      MainFormModel.eraseTempCorrectiveActions();
    });
  }
}