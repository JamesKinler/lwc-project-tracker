import { LightningElement,wire,track,api } from 'lwc';
import getProjectDetails from '@salesforce/apex/projectDetailsClass.getProjectDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {updateRecord} from "lightning/uiRecordApi";
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import ID_FIELD from '@salesforce/schema/Project_Tracker__c.Id';
import STEP_1_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_1_Actual__c';
import STEP_2_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_2_Actual__c';
import STEP_3_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_3_Actual__c';
import STEP_4_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_4_Actual__c';
import STEP_5_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_5_Actual__c';
import STEP_6_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_6_Actual__c';
import STEP_7_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_7_Actual__c';
import STEP_8_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_8_Actual__c';
import STEP_9_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_9_Actual__c';
import STEP_10_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_10_Actual__c';
import STEP_11_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_11_Actual__c';
import STEP_12_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_12_Actual__c';
import STEP_13_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_13_Actual__c';
import STEP_14_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_14_Actual__c';
import STEP_15_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_15_Actual__c';
import STEP_16_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_16_Actual__c';
import STEP_17_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_17_Actual__c';
import STEP_18_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_18_Actual__c';
import STEP_19_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_19_Actual__c';
import STEP_20_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_20_Actual__c';
import STEP_21_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_21_Actual__c';
import STEP_22_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_22_Actual__c';
import STEP_23_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_23_Actual__c';
import STEP_24_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_24_Actual__c';
import STEP_25_ACTUAL from '@salesforce/schema/Project_Tracker__c.Step_25_Actual__c';
import CUSTOM_STEP_1_ACTUAL from '@salesforce/schema/Project_Tracker__c.Custom_Step_1_Actual__c';
import CUSTOM_STEP_2_ACTUAL from '@salesforce/schema/Project_Tracker__c.Custom_Step_2_Actual__c';
import EQUIP_STATUS_FIELD from '@salesforce/schema/Project_Tracker__c.Equipment_Status__c';
import REPORTED_FIELD from '@salesforce/schema/Project_Tracker__c.Reported__c';
import NOTES_FIELD from '@salesforce/schema/Project_Tracker__c.Project_Notes__c';
import User_Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import PROFILE_ID from '@salesforce/schema/User.ProfileId';
import { getRecord } from 'lightning/uiRecordApi';

let reportedChecked;
export default class ProjectDetails extends NavigationMixin(LightningElement) {
    empty;
    projectDetailsData;
    @api getIdFromParent;
    @track editFields = false;
    @track mainArray = [];
    @track userEdit = false;
    jobInfoArray = [];
    sortedArray;

    get equipmentStatus(){
        return [
            { label: 'Need to Order', value: 'Need to Order'},
            { label: 'Ordered', value: 'Ordered'},
            { label: 'Configured', value: 'Configured'},
            { label: 'Installed', value: 'Installed'}

        ];
    }

    @wire(getRecord,{recordId: User_Id, fields: [NAME_FIELD, PROFILE_ID]})
    userDetails(response){
        let userData = response.data;
        let dataError = response.error;

        if(userData){
            this.userData = userData;
            this.profileId = this.userData.fields.ProfileId.value;
            if(this.profileId === '00eU0000000lcPNIAY' || this.profileId === '00eU0000000Mxn4IAC' || this.profileId === '00eU0000000NEFXIA4'){
                this.userEdit = true;
            }
        }
        if(dataError){
            console.log('error');
        }
    }

    @wire(getProjectDetails,{recordId: '$getIdFromParent'})
    projectDetialsHandler(response){
        this.projectResponse = response;
        let data = response.data;
        let error = response.error;

        if(data){
            this.projectDetailsData = data;
            console.log(data);
            this.empty = this.mainArray.length = 0;
            for(let l = 0; l < this.projectDetailsData.length; l++){

                this.fieldId = this.projectDetailsData[l].Id;

                this.projectInfo = {Id : this.projectDetailsData[l].Id, case_name:this.projectDetailsData[l].Name, case_number:this.projectDetailsData[l].Case_Number__c, case_c:this.projectDetailsData[l].Case__c, case_status:this.projectDetailsData[l].Case_Status__c,  case_status_color:this.projectDetailsData[l].Case_Status_Color__c}
                this.jobInfoArray = [this.projectInfo];

                // console.log(this.jobInfoArray);

                if(this.projectDetailsData[l].Step_1_Order__c != undefined){
                    this.step_1 = {step: "step 1", name: "Step_1_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_1_Label__c, AStyle: this.projectDetailsData[l].Step_1_AStyle__c, Acutal: this.projectDetailsData[l].Step_1_Actual__c, Order: this.projectDetailsData[l].Step_1_Order__c, PStyle: this.projectDetailsData[l].Step_1_PStyle__c, Projected: this.projectDetailsData[l].Step_1_Projected__c, Status:this.projectDetailsData[l].Step_1_Status__c}
                    this.mainArray.push(this.step_1);
                }

                if(this.projectDetailsData[l].Step_2_Order__c != undefined){
                    this.step_2 = {step: "step 2", name: "Step_2_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_2_Label__c, AStyle: this.projectDetailsData[l].Step_2_AStyle__c, Acutal: this.projectDetailsData[l].Step_2_Actual__c, Order: this.projectDetailsData[l].Step_2_Order__c, PStyle: this.projectDetailsData[l].Step_2_PStyle__c, Projected: this.projectDetailsData[l].Step_2_Projected__c, Status:this.projectDetailsData[l].Step_2_Status__c}
                    this.mainArray.push(this.step_2);
                }
                
                if(this.projectDetailsData[l].Step_3_Order__c != undefined){
                    this.step_3 = {step: "step 3", name: "Step_3_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_3_Label__c, AStyle: this.projectDetailsData[l].Step_3_AStyle__c, Acutal: this.projectDetailsData[l].Step_3_Actual__c, Order: this.projectDetailsData[l].Step_3_Order__c, PStyle: this.projectDetailsData[l].Step_3_PStyle__c, Projected: this.projectDetailsData[l].Step_3_Projected__c, Status:this.projectDetailsData[l].Step_3_Status__c}
                    this.mainArray.push(this.step_3);
                }

                if(this.projectDetailsData[l].Step_4_Order__c != undefined){
                    this.step_4 = {step: "step 4", name: "Step_4_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_4_Label__c, AStyle: this.projectDetailsData[l].Step_4_AStyle__c, Acutal: this.projectDetailsData[l].Step_4_Actual__c, Order: this.projectDetailsData[l].Step_4_Order__c, PStyle: this.projectDetailsData[l].Step_4_PStyle__c, Projected: this.projectDetailsData[l].Step_4_Projected__c, Status:this.projectDetailsData[l].Step_4_Status__c}
                    this.mainArray.push(this.step_4);
                }

                if(this.projectDetailsData[l].Step_5_Order__c != undefined){
                    this.step_5 = {step: "step 5", name: "Step_5_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_5_Label__c, AStyle: this.projectDetailsData[l].Step_5_AStyle__c, Acutal: this.projectDetailsData[l].Step_5_Actual__c, Order: this.projectDetailsData[l].Step_5_Order__c, PStyle: this.projectDetailsData[l].Step_5_PStyle__c, Projected: this.projectDetailsData[l].Step_5_Projected__c, Status:this.projectDetailsData[l].Step_5_Status__c}
                    this.mainArray.push(this.step_5);
                }

                if(this.projectDetailsData[l].Step_6_Order__c != undefined){
                    this.step_6 = {step: "step 6", name: "Step_6_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_6_Label__c, AStyle: this.projectDetailsData[l].Step_6_AStyle__c, Acutal: this.projectDetailsData[l].Step_6_Actual__c, Order: this.projectDetailsData[l].Step_6_Order__c, PStyle: this.projectDetailsData[l].Step_6_PStyle__c, Projected: this.projectDetailsData[l].Step_6_Projected__c, Status:this.projectDetailsData[l].Step_6_Status__c}
                    this.mainArray.push(this.step_6);
                }

                if(this.projectDetailsData[l].Step_7_Order__c != undefined){
                    this.step_7 = {step: "step 7", name: "Step_7_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_7_Label__c, AStyle: this.projectDetailsData[l].Step_7_AStyle__c, Acutal: this.projectDetailsData[l].Step_7_Actual__c, Order: this.projectDetailsData[l].Step_7_Order__c, PStyle: this.projectDetailsData[l].Step_7_PStyle__c, Projected: this.projectDetailsData[l].Step_7_Projected__c, Status:this.projectDetailsData[l].Step_7_Status__c}
                    this.mainArray.push(this.step_7);
                }

                if(this.projectDetailsData[l].Step_8_Order__c != undefined){
                    this.step_8 = {step: "step 8", name: "Step_8_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_8_Label__c, AStyle: this.projectDetailsData[l].Step_8_AStyle__c, Acutal: this.projectDetailsData[l].Step_8_Actual__c, Order: this.projectDetailsData[l].Step_8_Order__c, PStyle: this.projectDetailsData[l].Step_8_PStyle__c, Projected: this.projectDetailsData[l].Step_8_Projected__c, Status:this.projectDetailsData[l].Step_8_Status__c}
                    this.mainArray.push(this.step_8);
                }

                if(this.projectDetailsData[l].Step_9_Order__c != undefined){
                    this.step_9 = {step: "step 9", name: "Step_9_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_9_Label__c, AStyle: this.projectDetailsData[l].Step_9_AStyle__c, Acutal: this.projectDetailsData[l].Step_9_Actual__c, Order: this.projectDetailsData[l].Step_9_Order__c, PStyle: this.projectDetailsData[l].Step_9_PStyle__c, Projected: this.projectDetailsData[l].Step_9_Projected__c, Status:this.projectDetailsData[l].Step_9_Status__c}
                    this.mainArray.push(this.step_9);
                }

                if(this.projectDetailsData[l].Step_10_Order__c != undefined){
                    this.step_10 = {step: "step 10", name: "Step_10_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_10_Label__c, AStyle: this.projectDetailsData[l].Step_10_AStyle__c, Acutal: this.projectDetailsData[l].Step_10_Actual__c, Order: this.projectDetailsData[l].Step_10_Order__c, PStyle: this.projectDetailsData[l].Step_10_PStyle__c, Projected: this.projectDetailsData[l].Step_10_Projected__c, Status:this.projectDetailsData[l].Step_10_Status__c}
                    this.mainArray.push(this.step_10);
                }

                if(this.projectDetailsData[l].Step_11_Order__c != undefined){
                    this.step_11 = {step: "step 11", name: "Step_11_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_11_Label__c, AStyle: this.projectDetailsData[l].Step_11_AStyle__c, Acutal: this.projectDetailsData[l].Step_11_Actual__c, Order: this.projectDetailsData[l].Step_11_Order__c, PStyle: this.projectDetailsData[l].Step_11_PStyle__c, Projected: this.projectDetailsData[l].Step_11_Projected__c, Status:this.projectDetailsData[l].Step_11_Status__c}
                    this.mainArray.push(this.step_11);
                }

                if(this.projectDetailsData[l].Step_12_Order__c != undefined){
                    this.step_12 = {step: "step 12", name: "Step_12_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_12_Label__c, AStyle: this.projectDetailsData[l].Step_12_AStyle__c, Acutal: this.projectDetailsData[l].Step_12_Actual__c, Order: this.projectDetailsData[l].Step_12_Order__c, PStyle: this.projectDetailsData[l].Step_12_PStyle__c, Projected: this.projectDetailsData[l].Step_12_Projected__c, Status:this.projectDetailsData[l].Step_12_Status__c}
                    this.mainArray.push(this.step_12);
                }

                if(this.projectDetailsData[l].Step_13_Order__c != undefined){
                    this.step_13 = {step: "step 13", name: "Step_13_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_13_Label__c, AStyle: this.projectDetailsData[l].Step_13_AStyle__c, Acutal: this.projectDetailsData[l].Step_13_Actual__c, Order: this.projectDetailsData[l].Step_13_Order__c, PStyle: this.projectDetailsData[l].Step_13_PStyle__c, Projected: this.projectDetailsData[l].Step_13_Projected__c, Status:this.projectDetailsData[l].Step_13_Status__c}
                    this.mainArray.push(this.step_13);
                }


                if(this.projectDetailsData[l].Step_14_Order__c != undefined){
                    this.step_14 = {step: "step 14", name: "Step_14_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_14_Label__c, AStyle: this.projectDetailsData[l].Step_14_AStyle__c, Acutal: this.projectDetailsData[l].Step_14_Actual__c, Order: this.projectDetailsData[l].Step_14_Order__c, PStyle: this.projectDetailsData[l].Step_14_PStyle__c, Projected: this.projectDetailsData[l].Step_14_Projected__c, Status:this.projectDetailsData[l].Step_14_Status__c}
                    this.mainArray.push(this.step_14);
                }

                if(this.projectDetailsData[l].Step_15_Order__c != undefined){
                    this.step_15 = {step: "step 15", name: "Step_15_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_15_Label__c, AStyle: this.projectDetailsData[l].Step_15_AStyle__c, Acutal: this.projectDetailsData[l].Step_15_Actual__c, Order: this.projectDetailsData[l].Step_15_Order__c, PStyle: this.projectDetailsData[l].Step_15_PStyle__c, Projected: this.projectDetailsData[l].Step_15_Projected__c, Status:this.projectDetailsData[l].Step_15_Status__c}
                    this.mainArray.push(this.step_15);
                }

                if(this.projectDetailsData[l].Step_16_Order__c != undefined){
                    this.step_16 = {step: "step 16", name: "Step_16_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_16_Label__c, AStyle: this.projectDetailsData[l].Step_16_AStyle__c, Acutal: this.projectDetailsData[l].Step_16_Actual__c, Order: this.projectDetailsData[l].Step_16_Order__c, PStyle: this.projectDetailsData[l].Step_16_PStyle__c, Projected: this.projectDetailsData[l].Step_16_Projected__c, Status:this.projectDetailsData[l].Step_16_Status__c}
                    this.mainArray.push(this.step_16);
                }

                if(this.projectDetailsData[l].Step_17_Order__c != undefined){
                    this.step_17 = {step: "step 17", name: "Step_17_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_17_Label__c, AStyle: this.projectDetailsData[l].Step_17_AStyle__c, Acutal: this.projectDetailsData[l].Step_17_Actual__c, Order: this.projectDetailsData[l].Step_17_Order__c, PStyle: this.projectDetailsData[l].Step_17_PStyle__c, Projected: this.projectDetailsData[l].Step_17_Projected__c, Status:this.projectDetailsData[l].Step_17_Status__c}
                    this.mainArray.push(this.step_17);
                }

                if(this.projectDetailsData[l].Step_18_Order__c != undefined){
                    this.step_18 = {step: "step 18", name: "Step_18_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_18_Label__c, AStyle: this.projectDetailsData[l].Step_18_AStyle__c, Acutal: this.projectDetailsData[l].Step_18_Actual__c, Order: this.projectDetailsData[l].Step_18_Order__c, PStyle: this.projectDetailsData[l].Step_18_PStyle__c, Projected: this.projectDetailsData[l].Step_18_Projected__c, Status:this.projectDetailsData[l].Step_18_Status__c}
                    this.mainArray.push(this.step_18);
                }

                if(this.projectDetailsData[l].Step_19_Order__c != undefined){
                    this.step_19 = {step: "step 19", name: "Step_19_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_19_Label__c, AStyle: this.projectDetailsData[l].Step_19_AStyle__c, Acutal: this.projectDetailsData[l].Step_19_Actual__c, Order: this.projectDetailsData[l].Step_19_Order__c, PStyle: this.projectDetailsData[l].Step_19_PStyle__c, Projected: this.projectDetailsData[l].Step_19_Projected__c, Status:this.projectDetailsData[l].Step_19_Status__c}
                    this.mainArray.push(this.step_19);
                }

                if(this.projectDetailsData[l].Step_20_Order__c != undefined){
                    this.step_20 = {step: "step 20", name: "Step_20_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_20_Label__c, AStyle: this.projectDetailsData[l].Step_20_AStyle__c, Acutal: this.projectDetailsData[l].Step_20_Actual__c, Order: this.projectDetailsData[l].Step_20_Order__c, PStyle: this.projectDetailsData[l].Step_20_PStyle__c, Projected: this.projectDetailsData[l].Step_20_Projected__c, Status:this.projectDetailsData[l].Step_20_Status__c}
                    this.mainArray.push(this.step_20);
                }

                if(this.projectDetailsData[l].Step_21_Order__c != undefined){
                    this.step_21 = {step: "step 21", name: "Step_21_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_21_Label__c, AStyle: this.projectDetailsData[l].Step_21_AStyle__c, Acutal: this.projectDetailsData[l].Step_21_Actual__c, Order: this.projectDetailsData[l].Step_21_Order__c, PStyle: this.projectDetailsData[l].Step_21_PStyle__c, Projected: this.projectDetailsData[l].Step_21_Projected__c, Status:this.projectDetailsData[l].Step_21_Status__c}
                    this.mainArray.push(this.step_21);
                }

                if(this.projectDetailsData[l].Step_22_Order__c != undefined){
                    this.step_22 = {step: "step 22", name: "Step_22_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_22_Label__c, AStyle: this.projectDetailsData[l].Step_22_AStyle__c, Acutal: this.projectDetailsData[l].Step_22_Actual__c, Order: this.projectDetailsData[l].Step_22_Order__c, PStyle: this.projectDetailsData[l].Step_22_PStyle__c, Projected: this.projectDetailsData[l].Step_22_Projected__c, Status:this.projectDetailsData[l].Step_22_Status__c}
                    this.mainArray.push(this.step_22);
                }

                if(this.projectDetailsData[l].Step_23_Order__c != undefined){
                    this.step_23 = {step: "step 23", name: "Step_23_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_23_Label__c, AStyle: this.projectDetailsData[l].Step_23_AStyle__c, Acutal: this.projectDetailsData[l].Step_23_Actual__c, Order: this.projectDetailsData[l].Step_23_Order__c, PStyle: this.projectDetailsData[l].Step_23_PStyle__c, Projected: this.projectDetailsData[l].Step_23_Projected__c, Status:this.projectDetailsData[l].Step_23_Status__c}
                    this.mainArray.push(this.step_23);
                }

                if(this.projectDetailsData[l].Step_24_Order__c != undefined){
                    this.step_24 = {step: "step 24", name: "Step_24_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_24_Label__c, AStyle: this.projectDetailsData[l].Step_24_AStyle__c, Acutal: this.projectDetailsData[l].Step_24_Actual__c, Order: this.projectDetailsData[l].Step_24_Order__c, PStyle: this.projectDetailsData[l].Step_24_PStyle__c, Projected: this.projectDetailsData[l].Step_24_Projected__c, Status:this.projectDetailsData[l].Step_24_Status__c}
                    this.mainArray.push(this.step_24);
                }

                if(this.projectDetailsData[l].Step_25_Order__c != undefined){
                    this.step_25 = {step: "step 25", name: "Step_25_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Step_25_Label__c, AStyle: this.projectDetailsData[l].Step_25_AStyle__c, Acutal: this.projectDetailsData[l].Step_25_Actual__c, Order: this.projectDetailsData[l].Step_25_Order__c, PStyle: this.projectDetailsData[l].Step_25_PStyle__c, Projected: this.projectDetailsData[l].Step_25_Projected__c, Status:this.projectDetailsData[l].Step_25_Status__c}
                    this.mainArray.push(this.step_25);
                }

                if(this.projectDetailsData[l].Custom_Step_1_Order__c != undefined){
                    this.custom_step_1 = {step: "custom step 1", name: "Custom_Step_1_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Custom_Step_1_Label__c, AStyle: this.projectDetailsData[l].Custom_Step_1_AStyle__c, Acutal: this.projectDetailsData[l].Custom_Step_1_Actual__c, Order: this.projectDetailsData[l].Custom_Step_1_Order__c, PStyle: this.projectDetailsData[l].Custom_Step_1_PStyle__c, Projected: this.projectDetailsData[l].Custom_Step_1_Projected__c, Status:this.projectDetailsData[l].Custom_Step_1_Status__c}
                    this.mainArray.push(this.custom_step_1);
                }

                if(this.projectDetailsData[l].Custom_Step_2_Order__c != undefined){
                    this.custom_step_2 = {step: "custom step 2", name: "Custom_Step_2_Actual__c", Id : this.projectDetailsData[l].Id, Label: this.projectDetailsData[l].Custom_Step_2_Label__c, AStyle: this.projectDetailsData[l].Custom_Step_2_AStyle__c, Acutal: this.projectDetailsData[l].Custom_Step_2_Actual__c, Order: this.projectDetailsData[l].Custom_Step_2_Order__c, PStyle: this.projectDetailsData[l].Custom_Step_2_PStyle__c, Projected: this.projectDetailsData[l].Custom_Step_2_Projected__c, Status:this.projectDetailsData[l].Custom_Step_2_Status__c}
                    this.mainArray.push(this.custom_step_2);
                }
                
                this.sortedArray = this.mainArray;
                this.sortedArray.sort(function(a, b) {
                    return parseFloat(a.Order) - parseFloat(b.Order);
                });
               
            }
            
        }
        if(error){
            console.log('error');
        }
    }

    handleEdit(){
        this.editFields = true;
    }

    navLink(event) {
        event.stopPropagation();
        let url = event.target.dataset.id;
        this[NavigationMixin.GenerateUrl]({
          type: 'standard__recordPage',
          attributes: {
              recordId: url,
              actionName: 'view',
          }
      }).then(url => {window.open(url)});
    }

    updateProjectFields(){
  
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.fieldId;
        let inputFields = this.template.querySelectorAll("lightning-input");
        let comboBoxFields = this.template.querySelectorAll("lightning-combobox");
        let notesBoxFields = this.template.querySelectorAll("lightning-input-rich-text");


      
        inputFields.forEach(function(element){
            // console.log(element.name);

            if(element.name === "Step_1_Actual__c"){
                let Step1_Value = element.value;
                fields[STEP_1_ACTUAL.fieldApiName] = Step1_Value;
            }
    
            if(element.name === "Step_2_Actual__c"){
                let Step2_Value = element.value;
                fields[STEP_2_ACTUAL.fieldApiName] = Step2_Value;
            }

            if(element.name === "Step_3_Actual__c"){
                let Step3_Value = element.value;
                fields[STEP_3_ACTUAL.fieldApiName] = Step3_Value;
            }

            if(element.name === "Step_4_Actual__c"){
                let Step4_Value = element.value;
                fields[STEP_4_ACTUAL.fieldApiName] = Step4_Value;
            }

            if(element.name === "Step_5_Actual__c"){
                let Step5_Value = element.value;
                fields[STEP_5_ACTUAL.fieldApiName] = Step5_Value;
            }

            if(element.name === "Step_6_Actual__c"){
                let Step6_Value = element.value;
                fields[STEP_6_ACTUAL.fieldApiName] = Step6_Value;
            }

            if(element.name === "Step_7_Actual__c"){
                let Step7_Value = element.value;
                fields[STEP_7_ACTUAL.fieldApiName] = Step7_Value;
            }

            if(element.name === "Step_8_Actual__c"){
                let Step8_Value = element.value;
                fields[STEP_8_ACTUAL.fieldApiName] = Step8_Value;
            }

            if(element.name === "Step_9_Actual__c"){
                let Step9_Value = element.value;
                fields[STEP_9_ACTUAL.fieldApiName] = Step9_Value;
            }

            if(element.name === "Step_10_Actual__c"){
                let Step10_Value = element.value;
                fields[STEP_10_ACTUAL.fieldApiName] = Step10_Value;
            }

            if(element.name === "Step_11_Actual__c"){
                let Step11_Value = element.value;
                fields[STEP_11_ACTUAL.fieldApiName] = Step11_Value;
            }

            if(element.name === "Step_12_Actual__c"){
                let Step12_Value = element.value;
                fields[STEP_12_ACTUAL.fieldApiName] = Step12_Value;
            }

            if(element.name === "Step_13_Actual__c"){
                let Step13_Value = element.value;
                fields[STEP_13_ACTUAL.fieldApiName] = Step13_Value;
            }

            if(element.name === "Step_14_Actual__c"){
                let Step14_Value = element.value;
                fields[STEP_14_ACTUAL.fieldApiName] = Step14_Value;
            }

            if(element.name === "Step_15_Actual__c"){
                let Step15_Value = element.value;
                fields[STEP_15_ACTUAL.fieldApiName] = Step15_Value;
            }

            if(element.name === "Step_16_Actual__c"){
                let Step16_Value = element.value;
                fields[STEP_16_ACTUAL.fieldApiName] = Step16_Value;
            }

            if(element.name === "Step_17_Actual__c"){
                let Step17_Value = element.value;
                fields[STEP_17_ACTUAL.fieldApiName] = Step17_Value;
            }

            if(element.name === "Step_18_Actual__c"){
                let Step18_Value = element.value;
                fields[STEP_18_ACTUAL.fieldApiName] = Step18_Value;
            }

            if(element.name === "Step_19_Actual__c"){
                let Step19_Value = element.value;
                fields[STEP_19_ACTUAL.fieldApiName] = Step19_Value;
            }

            if(element.name === "Step_20_Actual__c"){
                let Step20_Value = element.value;
                fields[STEP_20_ACTUAL.fieldApiName] = Step20_Value;
            }

            if(element.name === "Step_21_Actual__c"){
                let Step21_Value = element.value;
                fields[STEP_21_ACTUAL.fieldApiName] = Step21_Value;
            }

            if(element.name === "Step_22_Actual__c"){
                let Step22_Value = element.value;
                fields[STEP_22_ACTUAL.fieldApiName] = Step22_Value;
            }

            if(element.name === "Step_23_Actual__c"){
                let Step23_Value = element.value;
                fields[STEP_23_ACTUAL.fieldApiName] = Step23_Value;
            }

            if(element.name === "Step_24_Actual__c"){
                let Step24_Value = element.value;
                fields[STEP_24_ACTUAL.fieldApiName] = Step24_Value;
            }

            if(element.name === "Step_25_Actual__c"){
                let Step25_Value = element.value;
                fields[STEP_25_ACTUAL.fieldApiName] = Step25_Value;
            }

            if(element.name === "Custom_Step_1_Actual__c"){
                let CustomStep1_Value = element.value;
                fields[CUSTOM_STEP_1_ACTUAL.fieldApiName] = CustomStep1_Value;
            }

            if(element.name === "Custom_Step_2_Actual__c"){
                let CustomStep2_Value = element.value;
                fields[CUSTOM_STEP_2_ACTUAL.fieldApiName] = CustomStep2_Value;
            }

            if(element.name === 'Reported__c'){
                reportedChecked = element.checked;
                fields[REPORTED_FIELD.fieldApiName] = reportedChecked;
            }
        });
        comboBoxFields.forEach(function(element){
            if(element.name == "Equipment_Status__c"){
                let equipmentStatus = element.value;
                fields[EQUIP_STATUS_FIELD.fieldApiName] = equipmentStatus;
            }
        });
        notesBoxFields.forEach(function(element){
            if(element.name == "Project_Notes__c"){
                let notesValue = element.value;
                fields[NOTES_FIELD.fieldApiName] = notesValue;
            }  
        });

        if(reportedChecked == true){
            const reportedEvent = new CustomEvent('reportedclosed', {
                detail: {key: 'reported'}
                });
            this.dispatchEvent(reportedEvent);
        }
        

        
        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            const selectEvent = new CustomEvent('parentrefresh', {
                detail: {refresh: this.projectResponse}
              });
          this.dispatchEvent(selectEvent);
          this.editFields = false;
          return refreshApex(this.projectResponse);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
     }
     
}
