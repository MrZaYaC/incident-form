angular.module('app').service('mainFormService', mainFormService);

mainFormService.$inject = ['MainFormModel', '$window', '$filter'];

function mainFormService(MainFormModel, $window, $filter) {
  var service = {
    send: send
  };

  return service;

  function send() {
    var output = {
      workflowCreationInformation: {
        workflowTypeName: "Incident Report",
        name: "Report - " + $filter('date')(MainFormModel.attributes.date, 'yyyy/MM/dd')
      },
      workflowStepUpdateInformation: {
        stepIdOrName: "Initial Step",
        fields: [
          {"name":"Date and Time of Incident","values":[MainFormModel.attributes.date]},
          {"name":"Reported By","values":[MainFormModel.attributes.reportedBy]},
          {"name":"Company of Reporter","values":[MainFormModel.company]},
          {"name":"Contact Number","values":[MainFormModel.attributes.phone]},
          {"name":"Supervisor Name","values":[MainFormModel.attributes.supervisorName]},
          {"name":"High Level Description of Incident","values":[MainFormModel.attributes.description]},
          {"name":"Well Number","values":[MainFormModel.attributes.wellNumber]},
          {"name":"Region","values":[MainFormModel.attributes.region]},
          {"name":"State","values":[MainFormModel.attributes.state]},
          {"name":"Field Office","values":[MainFormModel.attributes.fieldOffice]},
          {"name":"Incident Severity (Check all that Apply)","values":getIncidentSeverityList()},
        ]
      }
    };
    for(var i = 0; i < MainFormModel.attributes.correctiveActions.length; i++) {
      output.workflowStepUpdateInformation.fields.push({
        name: "Description of Corrective Action (" + (i + 1) + ")",
        values: [MainFormModel.attributes.correctiveActions[i].description]
      });
      output.workflowStepUpdateInformation.fields.push({
        name: "Action Taken By (name) (" + (i + 1) + ")",
        values: [MainFormModel.attributes.correctiveActions[i].action]
      });
      output.workflowStepUpdateInformation.fields.push({
        name: "Company (" + (i + 1) + ")",
        values: [MainFormModel.attributes.correctiveActions[i].company]
      });
      output.workflowStepUpdateInformation.fields.push({
        name: "Date (" + (i + 1) + ")",
        values: [MainFormModel.attributes.correctiveActions[i].date]
      });
    }
    $window.open('data:application/json,' + encodeURIComponent(JSON.stringify(output, null, 4)));
  }
  function getIncidentSeverityList() {
    var list = [];
    for(var key in MainFormModel.attributes.incidentSeverity){
      if(MainFormModel.attributes.incidentSeverity[key]){
        list.push(MainFormModel.labels[key]);
      }
    }
    return list;
  }
}