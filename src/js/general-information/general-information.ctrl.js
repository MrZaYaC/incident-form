angular.module('app').controller('GeneralInformationController', GeneralInformationController);

GeneralInformationController.$inject = ['MainFormModel'];

function GeneralInformationController(MainFormModel) {
  var vm = this;
  vm.form = MainFormModel.attributes;
  vm.formErrors = MainFormModel.errors;
  vm.wellList = MainFormModel.wellList;
  vm.onWellChange = onWellChange;
  vm.onCheckboxChange = onCheckboxChange;
  vm.isOpenedDatePicker = false;
  vm.openDatePicker = openDatePicker;
  vm.usPhoneRegex = /^\(?(\d{3})\)?[- .]?(\d{3})[- .]?(\d{4})$/;

  function onWellChange() {
    if(vm.form.wellNumber){
      var tmp = vm.wellList.filter(function(item){return item.id === vm.form.wellNumber});
      vm.form.region = tmp[0].region;
      vm.form.state = tmp[0].state;
      vm.form.fieldOffice = tmp[0].fieldOffice;
    } else {
      vm.form.region = vm.form.state = vm.form.fieldOffice = undefined;
    }
  }
  function onCheckboxChange() {

  }
  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    vm.isOpenedDatePicker = true;
  }
}