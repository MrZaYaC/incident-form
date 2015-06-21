angular.module('app').service('MainFormModel', MainFormModel);

MainFormModel.$inject = ['$rootScope'];

function MainFormModel($rootScope){
  var defaultAttributes = {
    date: new Date(),
    phone: undefined,
    reportedBy: undefined,
    company: undefined,
    supervisorName: '',
    description: undefined,
    wellNumber: undefined,
    region: undefined,
    state: undefined,
    fieldOffice: undefined,
    incidentSeverity: {
      loss: false,
      fatality: false,
      hospitalization: false,
      spillOffsite: false,
      spillToWater: false,
      damage: false,
      noneApply: false
    },
    correctiveActions: []
  };
  var labels = {
    loss: 'Loss of well controll',
    fatality: 'Fatality(ies)',
    hospitalization: 'Hospitalization or medical treatment',
    spillOffsite: 'Spill offsite > 50 Bbls',
    spillToWater: 'Spill to water, any amount',
    damage: 'Property damage',
    noneApply: 'None Apply'
  };
  var tempCorrectiveAction = {
    description: undefined,
    action: undefined,
    company: undefined,
    date: new Date()
  };
  var formModel = {
    attributes: angular.copy(defaultAttributes),
    labels: angular.copy(labels),
    tempCorrectiveAction: angular.copy(tempCorrectiveAction),
    wellList: getWellList(),
    erase: erase,
    eraseTempCorrectiveActions: eraseTempCorrectiveActions,
    errors: {
      correctiveActions: true
    }
  };
  $rootScope.$watchCollection(function(){return formModel.attributes}, function(newVal, oldVal){
    for(var key in newVal){
      if(typeof newVal[key] == 'undefined'){
        formModel.errors[key] = true;
      } else if(typeof newVal[key] !== 'object') {
        delete formModel.errors[key];
      }
    }
  });
  $rootScope.$watchCollection(function(){return formModel.attributes.incidentSeverity}, function(newVal, oldVal){
    for(var key in formModel.attributes.incidentSeverity){
      if(formModel.attributes.incidentSeverity[key]){
        delete formModel.errors['incidentSeverity'];
        return false;
      }
    }
    formModel.errors['incidentSeverity'] = true;
  });
  $rootScope.$watchCollection(function(){return formModel.attributes.correctiveActions}, function(newVal, oldVal) {
    if(newVal.length){
      delete formModel.errors['correctiveActions'];
    } else {
      formModel.errors['correctiveActions'] = true;
    }
  });

  return formModel;

  function erase (){
    formModel.attributes = angular.copy(defaultAttributes);
  }
  function eraseTempCorrectiveActions() {
    formModel.tempCorrectiveAction = angular.copy(tempCorrectiveAction);
  }
  function getWellList(){
    return [
      {
        id: 'Well-01',
        region: 'South',
        state: 'Oklahoma',
        fieldOffice: 'Ringwood'
      },
      {
        id: 'Well-02',
        region: 'North',
        state: 'Montana',
        fieldOffice: 'Sidney'
      },
      {
        id: 'Well-03',
        region: 'North',
        state: 'North Dakota',
        fieldOffice: 'Tioga'
      }
    ]
  }
}