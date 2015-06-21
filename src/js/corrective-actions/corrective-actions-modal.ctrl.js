angular.module('app').controller('CorrectiveActionsModalController', CorrectiveActionsModalController);

CorrectiveActionsModalController.$inject = ['MainFormModel', '$modalInstance'];

function CorrectiveActionsModalController(MainFormModel, $modalInstance) {
  var vm = this;
  vm.form = MainFormModel.tempCorrectiveAction;
  vm.isOpenedDatePicker = false;
  vm.openDatePicker = openDatePicker;
  vm.save = save;
  vm.cancel = cancel;

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    vm.isOpenedDatePicker = true;
  }
  function save() {
    if(vm.formHandler.$invalid){
      vm.formHandler.description.$setDirty();
      vm.formHandler.action.$setDirty();
      vm.formHandler.company.$setDirty();
      vm.formHandler.date.$setDirty();
      return false;
    }
    $modalInstance.close();
  }
  function cancel() {
    $modalInstance.dismiss('cancel');
  }
}