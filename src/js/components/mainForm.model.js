angular.module('app').factory('MainFormModel', MainFormModel);

MainFormModel.$inject = ['$rootScope'];

function MainFormModel($rootScope){
  var defaultAttributes = {
    date: new Date(),
    phone: undefined,
    reportedBy: undefined,
    company: undefined,
    supervisorName: '',
    description: undefined
  };
  var formModel = {
    attributes: angular.copy(defaultAttributes),
    erase: erase,
    errors: {}
  };
  $rootScope.$watchCollection(function(){return formModel.attributes}, function(newVal, oldVal){
    for(var key in newVal){
      if(typeof newVal[key] == 'undefined'){
        formModel.errors[key] = true;
      } else {
        delete formModel.errors[key];
      }
    }
  });
  return formModel;

  function erase (){
    formModel.attributes = angular.copy(defaultAttributes);
  }
}