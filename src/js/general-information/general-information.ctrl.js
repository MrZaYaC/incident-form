angular.module('app').controller('GeneralInformationController', GeneralInformationController);

GeneralInformationController.$inject = ['MainFormModel'];

function GeneralInformationController(MainFormModel) {
  var vm = this;
  vm.form = MainFormModel.attributes;
  vm.formErrors = MainFormModel.errors;
  vm.isOpenedDatePicker = false;
  vm.openDatePicker = openDatePicker;
  vm.usPhoneRegex = /^\(?(\d{3})\)?[- .]?(\d{3})[- .]?(\d{4})$/;

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    vm.isOpenedDatePicker = true;
  }
}