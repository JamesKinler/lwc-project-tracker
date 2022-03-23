public with sharing class projectDetailsClass {
    @AuraEnabled(cacheable=true)
    public static List<Project_Tracker__c> getProjectDetails(string recordId){
       return [SELECT Id,Name,Scope__c,Step_1_Actual__c,Step_1_AStyle__c,Step_1_Label__c,Step_1_Order__c,Step_1_Projected__c,Step_1_PStyle__c,Step_1_Status__c,Step_2_Actual__c,Step_2_AStyle__c,Step_2_Label__c,Step_2_Order__c,Step_2_Projected__c,Step_2_PStyle__c,Step_2_Status__c,Step_3_Actual__c,Step_3_AStyle__c,Step_3_Label__c,Step_3_Order__c,Step_3_Projected__c,Step_3_PStyle__c,Step_3_Status__c,Step_4_Actual__c,Step_4_AStyle__c,Step_4_Label__c,Step_4_Order__c,Step_4_Projected__c,Step_4_PStyle__c,Step_4_Status__c,Step_5_Actual__c,Step_5_AStyle__c,Step_5_Label__c,Step_5_Order__c,Step_5_Projected__c,Step_5_PStyle__c,Step_5_Status__c,Step_6_Actual__c,Step_6_AStyle__c,Step_6_Label__c,Step_6_Order__c,Step_6_Projected__c,Step_6_PStyle__c,Step_6_Status__c,Step_7_Actual__c,Step_7_AStyle__c,Step_7_Label__c,Step_7_Order__c,Step_7_Projected__c,Step_7_PStyle__c,Step_7_Status__c,Step_8_Actual__c,Step_8_AStyle__c,Step_8_Label__c,Step_8_Order__c,Step_8_Projected__c,Step_8_PStyle__c,Step_8_Status__c,Step_9_Actual__c,Step_9_AStyle__c,Step_9_Label__c,Step_9_Order__c,Step_9_Projected__c,Step_9_PStyle__c,Step_9_Status__c,Step_10_Actual__c,Step_10_AStyle__c,Step_10_Label__c,Step_10_Order__c,Step_10_Projected__c,Step_10_PStyle__c,Step_10_Status__c,Step_11_Actual__c,Step_11_AStyle__c,Step_11_Label__c,Step_11_Order__c,Step_11_Projected__c,Step_11_PStyle__c,Step_11_Status__c,Step_12_Actual__c,Step_12_AStyle__c,Step_12_Label__c,Step_12_Order__c,Step_12_Projected__c,Step_12_PStyle__c,Step_12_Status__c,Step_13_Actual__c,Step_13_AStyle__c,Step_13_Label__c,Step_13_Order__c,Step_13_Projected__c,Step_13_PStyle__c,Step_13_Status__c,Step_14_Actual__c,Step_14_AStyle__c,Step_14_Label__c,Step_14_Order__c,Step_14_Projected__c,Step_14_PStyle__c,Step_14_Status__c,Step_15_Actual__c,Step_15_AStyle__c,Step_15_Label__c,Step_15_Order__c,Step_15_Projected__c,Step_15_PStyle__c,Step_15_Status__c,Step_16_Actual__c,Step_16_AStyle__c,Step_16_Label__c,Step_16_Order__c,Step_16_Projected__c,Step_16_PStyle__c,Step_16_Status__c,Step_17_Actual__c,Step_17_AStyle__c,Step_17_Label__c,Step_17_Order__c,Step_17_Projected__c,Step_17_PStyle__c,Step_17_Status__c,Step_18_Actual__c,Step_18_AStyle__c,Step_18_Label__c,Step_18_Order__c,Step_18_Projected__c,Step_18_PStyle__c,Step_18_Status__c,Step_19_Actual__c,Step_19_AStyle__c,Step_19_Label__c,Step_19_Order__c,Step_19_Projected__c,Step_19_PStyle__c,Step_19_Status__c,Step_20_Actual__c,Step_20_AStyle__c,Step_20_Label__c,Step_20_Order__c,Step_20_Projected__c,Step_20_PStyle__c,Step_20_Status__c,Step_21_Actual__c,Step_21_AStyle__c,Step_21_Label__c,Step_21_Order__c,Step_21_Projected__c,Step_21_PStyle__c,Step_21_Status__c,Step_22_Actual__c,Step_22_AStyle__c,Step_22_Label__c,Step_22_Order__c,Step_22_Projected__c,Step_22_PStyle__c,Step_22_Status__c,Step_23_Actual__c,Step_23_AStyle__c,Step_23_Label__c,Step_23_Order__c,Step_23_Projected__c,Step_23_PStyle__c,Step_23_Status__c,Step_24_Actual__c,Step_24_AStyle__c,Step_24_Label__c,Step_24_Order__c,Step_24_Projected__c,Step_24_PStyle__c,Step_24_Status__c,Step_25_Actual__c,Step_25_AStyle__c,Step_25_Label__c,Step_25_Order__c,Step_25_Projected__c,Step_25_PStyle__c,Step_25_Status__c,Custom_Step_1_Actual__c,Custom_Step_1_AStyle__c,Custom_Step_1_Label__c,Custom_Step_1_Order__c,Custom_Step_1_Projected__c,Custom_Step_1_PStyle__c,Custom_Step_1_Status__c,Current_Step_Datevalue__c,Current_Step_Label__c,Next_Step_Datevalue__c,Next_Step_Label__c,Description__c,Case_Number__c,Case__c,Completion_Difference_Text__c,Completion_Difference_Color__c,Projected_Completion_Date__c,Reported__c,Equipment_Status__c,Tower_Case_Created__c,Tower_Case_Closed__c,Case_Status__c,Case_Status_Color__c, Project_Notes__c, Custom_Step_2_Actual__c,Custom_Step_2_AStyle__c,Custom_Step_2_Label__c,Custom_Step_2_Order__c,Custom_Step_2_Projected__c,Custom_Step_2_PStyle__c,Custom_Step_2_Status__c	 FROM Project_Tracker__c WHERE Id = :recordId AND Reported__c = false];
    }
}