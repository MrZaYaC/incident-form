angular.module('app').controller('ReviewAndSubmitRouteController', ReviewAndSubmitRouteController);

ReviewAndSubmitRouteController.$inject = ['MainFormModel', 'mainFormService', '$scope'];

function ReviewAndSubmitRouteController(MainFormModel, mainFormService) {
  var vm = this;
  vm.form = MainFormModel.attributes;
  vm.formErrors = MainFormModel.errors;
  vm.onSubmit = onSubmit;
  vm.isHasErrors = isHasErrors;
  vm.getIncidentSeverityList = getIncidentSeverityList;

  function onSubmit(){
    if(isHasErrors()){
      return false;
    }
    mainFormService.send();
  }
  function isHasErrors(){
    for(var key in vm.formErrors){
      if (hasOwnProperty.call(vm.formErrors, key)) return true;
    }
    return false;
  }
  function getIncidentSeverityList() {
    var list = [];
    for(var key in vm.form.incidentSeverity){
      if(vm.form.incidentSeverity[key]){
        list.push(MainFormModel.labels[key]);
      }
    }
    return list.join(', ');
  }
}