public with sharing class projectSummaryClass {
    @AuraEnabled(cacheable=true)
    public static List<Project_Tracker__c> getProjectSummary(string projectType){
        if(projectType == 'All'){
            return [SELECT Id,Name,Scope__c,Current_Step_Datevalue__c,Current_Step_Label__c,Next_Step_Datevalue__c,Next_Step_Label__c,Description__c,Case_Number__c,Case__c,Completion_Difference_Text__c,Completion_Difference_Color__c,Projected_Completion_Date__c, Case_Notes__c, Project_Notes__c,Case_Priority__c FROM Project_Tracker__c WHERE Reported__c = false];
        }else{
            return [SELECT Id,Name,Scope__c,Current_Step_Datevalue__c,Current_Step_Label__c,Next_Step_Datevalue__c,Next_Step_Label__c,Description__c,Case_Number__c,Case__c,Completion_Difference_Text__c,Completion_Difference_Color__c,Projected_Completion_Date__c, Case_Notes__c, Project_Notes__c,Case_Priority__c,Parent_Project__c FROM Project_Tracker__c WHERE Project_Type__c = :projectType AND Reported__c = false];
        }
    }
}

