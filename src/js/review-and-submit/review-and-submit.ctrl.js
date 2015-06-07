angular.module('app').controller('ReviewAndSubmitRouteController', ReviewAndSubmitRouteController);

ReviewAndSubmitRouteController.$inject = ['MainFormModel', 'moment'];

function ReviewAndSubmitRouteController(MainFormModel, moment) {
  var vm = this;
  vm.form = MainFormModel.attributes;
  vm.formErrors = MainFormModel.errors;
  vm.getDate = getDate;
  vm.onSubmit = onSubmit;
  vm.isHasErrors = isHasErrors;

  function getDate(){
    return moment(vm.form.date).format('MM/DD/YYYY hh:mm a');
  }
  function onSubmit(){
    console.log('Form: ', vm.form);
    console.log('Errors: ', vm.formErrors);
  }
  function isHasErrors(){
    for(var key in vm.formErrors){
      if (hasOwnProperty.call(vm.formErrors, key)) return true;
    }
    return false;
  }
}