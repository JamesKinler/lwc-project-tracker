public with sharing class projectPowerConstClass {
    @AuraEnabled(cacheable=true)
    public static List<Project_Tracker__c> getProjectPowerConst(string parentPower){
       return [SELECT Id,Name,Scope__c,Current_Step_Datevalue__c,Current_Step_Label__c,Next_Step_Datevalue__c,Next_Step_Label__c,Description__c,Case_Number__c,Case__c,Completion_Difference_Text__c,Completion_Difference_Color__c,Projected_Completion_Date__c,Case_Notes__c,Project_Notes__c,Case_Priority__c,Case__r.ParentId FROM Project_Tracker__c WHERE Case__r.ParentId = :parentPower AND Reported__c = false];
    }
}

