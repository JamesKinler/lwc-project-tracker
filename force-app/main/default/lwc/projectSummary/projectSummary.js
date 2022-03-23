import { LightningElement,wire,track,api} from 'lwc';
import getProjectSummary from '@salesforce/apex/projectSummaryClass.getProjectSummary';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const DELAY = 300;

let tr;
export default class ProjectSummary extends  NavigationMixin(LightningElement) {
    projectSummaryData;
    @api selectedAccountId;
    @track selectedProject ='AP-Add';
    @track currentStepSort = false;
    @track nextStepSorted = false;
    @track projectGoLiveSorted = false;
    @track projectNameSort = false;
    @track casePrioritySorted = false;
    @track noChildern = true;
    newSummaryArray;
    selectedCase;
    highlightRow;
    tr;
    highlightTh;
    
    get options() {
        return [
                { label: 'AP-Add', value: 'AP-Add'},
                { label: 'Backbone-Add  ', value: 'Backbone-Add'},
                { label: 'AP-Add-Dedicated', value: 'AP-Add-Dedicated'},
                { label: 'AP-Replace', value: 'AP-Replace' },
                { label: 'Backbone-Replace', value: 'Backbone-Replace' },
                { label: 'New Site', value: 'New Site' },
                { label: 'All', value: 'All' },
            ];
      }
    @wire(getProjectSummary,{projectType: '$selectedProject'})
    projectHandler(response){
        this.projectResponse = response;
        let data = response.data;
        let error = response.error;

        if(this.selectedProject === 'All'){
            this.noChildern = false;
        }else{
            this.noChildern = true;
        }

        if(data){

            this.projectSummaryData = data;
            // console.log(this.projectSummaryData);

            this.count = this.projectSummaryData.length;

            let tempSummary = Object.assign([], this.projectSummaryData);
            for(let p = 0; p < this.projectSummaryData.length; p++){
                let tempRec = Object.assign({}, tempSummary[p]);
                tempSummary[p] = tempRec;
            }
            this.newSummaryArray = tempSummary;

            console.log(this.newSummaryArray);

            this.acutalResults = this.newSummaryArray.map(e => {
                let parentProject = e.Parent_Project__c === false;
                let aheadOfSchedule = e.Completion_Difference_Color__c === 'green';
                let onSchedule = e.Completion_Difference_Color__c === '#E1AD01';
                let behindSchedule = e.Completion_Difference_Color__c === 'red';

                if(aheadOfSchedule){
                    e.styleColor = 'background-color:#096c09; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                }

                if(onSchedule){
                    e.styleColor = 'background-color:#E1AD01; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                }

                if(behindSchedule){
                    e.styleColor = 'background-color:#cb1515; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                }

                if(parentProject){
                    e.hideChild = 'display: none;';
                }
               
                return e;
            });
            
        }
        if(error){
            console.log('error');
        }
    }
    
    navLink(event) {
        event.stopPropagation();
        let url = event.target.dataset.id;
        this[NavigationMixin.GenerateUrl]({
          type: 'standard__recordPage',
          attributes: {
              recordId: url,
              actionName: 'view',
          },
      }).then(url => {window.open(url)});
    }

    handleClose(){
        this.template.querySelector('[data-id="divblock"]').classList.remove('showSideBar');
      }

    //   buttonclicked(){
    //       console.log('button clicked');
    //   }

    userSorted(event){
        console.log(this.newSummaryArray);
        // console.log(event.target.textContent);
        

        if(event.target.textContent === "Project Name" || event.target.name === "Project Name"){

            if(this.projectNameSort === false){

                this.currentStepSort = false;

                this.projectGoLiveSorted = false;

                this.nextStepSorted = false;

                this.casePrioritySorted = false;

                this.projectNameSort = true;

                this.template.querySelector('[data-id="projectLiveId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="nextStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="currentStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="casePriorityId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="projectNameId"]').classList.add('thHighlight');

                this.newSummaryArray.sort(function(a, b) {
                    return a.Name.localeCompare(b.Name);
                });

            }else{

                this.newSummaryArray.sort(function(a, b) {
                    return b.Name.localeCompare(a.Name);
                });

                this.projectNameSort = false;
            }
        }
        if(event.target.textContent === "Current Step" || event.target.name === "Current Step"){
            
            if(this.currentStepSort === false){

                this.currentStepSort = true;

                this.projectGoLiveSorted = false;

                this.nextStepSorted = false;

                this.projectNameSort = false;

                this.casePrioritySorted = false;

                this.template.querySelector('[data-id="projectLiveId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="nextStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="projectNameId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="casePriorityId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="currentStepId"]').classList.add('thHighlight');
    
                this.newSummaryArray.sort(function(a, b) {
                    return a.Current_Step_Label__c.localeCompare(b.Current_Step_Label__c);
                });
    
            }else{
                this.newSummaryArray.sort(function(a, b) {
                    return b.Current_Step_Label__c.localeCompare(a.Current_Step_Label__c);
                });
                this.currentStepSort = false;
            }
        }else if(event.target.textContent === "Next Step" ||  event.target.name === "Next Step"){

            if(this.nextStepSorted === false){

                this.nextStepSorted = true;

                this.projectGoLiveSorted = false;

                this.currentStepSort = false;

                this.projectNameSort = false;

                this.casePrioritySorted = false;

                this.template.querySelector('[data-id="projectLiveId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="currentStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="projectNameId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="currentStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="casePriorityId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="nextStepId"]').classList.add('thHighlight');

                this.newSummaryArray.sort(function(a, b) {
                    return a.Next_Step_Label__c.localeCompare(b.Next_Step_Label__c);
                });

            }else{
                this.nextStepSorted = false;
                this.newSummaryArray.sort(function(a, b) {
                    return b.Next_Step_Label__c.localeCompare(a.Next_Step_Label__c);
                });
                
            }
        }else if(event.target.textContent === "Project GoLive Date" || event.target.name === "Project GoLive Date"){

            if(this.projectGoLiveSorted === false){

                this.projectGoLiveSorted = true;

                this.nextStepSorted = false;

                this.currentStepSort = false;

                this.projectNameSort = false;

                this.casePrioritySorted = false;

                this.template.querySelector('[data-id="currentStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="nextStepId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="projectNameId"]').classList.remove('thHighlight'); 

                this.template.querySelector('[data-id="casePriorityId"]').classList.remove('thHighlight');

                this.template.querySelector('[data-id="projectLiveId"]').classList.add('thHighlight');


                this.newSummaryArray.sort(function(a, b) {
                    return new Date(a.Projected_Completion_Date__c) - new Date(b.Projected_Completion_Date__c);
                });
            }else{
                this.projectGoLiveSorted = false;
                this.newSummaryArray.sort(function(a, b) {
                    return new Date(b.Projected_Completion_Date__c) - new Date(a.Projected_Completion_Date__c);
                });
            }
        }else if(event.target.textContent === "Case Priority" || event.target.name === "Case Priority"){
            if(this.casePrioritySorted === false){

                    this.casePrioritySorted = true;

                    this.projectGoLiveSorted = false;

                    this.nextStepSorted = false;

                    this.currentStepSort = false;

                    this.projectNameSort = false;

                    this.template.querySelector('[data-id="currentStepId"]').classList.remove('thHighlight');

                    this.template.querySelector('[data-id="nextStepId"]').classList.remove('thHighlight');

                    this.template.querySelector('[data-id="projectNameId"]').classList.remove('thHighlight'); 

                    this.template.querySelector('[data-id="projectLiveId"]').classList.remove('thHighlight');

                    this.template.querySelector('[data-id="casePriorityId"]').classList.add('thHighlight');

                    this.newSummaryArray.sort(function(a, b) {
                        return a.Case_Priority__c.localeCompare(b.Case_Priority__c);
                    });
            }else{
                this.casePrioritySorted = false;
                this.newSummaryArray.sort(function(a, b) {
                    return b.Case_Priority__c.localeCompare(a.Case_Priority__c);
                });
            }
        }
    }

    projectSelected(event) {
        window.clearTimeout(this.delayTimeout);
        const selectedProjectList = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.selectedProject = selectedProjectList;
        }, DELAY);
        this.template.querySelector('[data-id="divblock"]').classList.remove('showSideBar');
      }

      onReportedClosed(){
        this.template.querySelector('[data-id="divblock"]').classList.remove('showSideBar');
      }

      handleAccountClick(event){
        this.selectedAccountId = event.currentTarget.getAttribute("data-key");
        this.template.querySelector('[data-id="divblock"]').classList.add('showSideBar');
        this.toggleListItems('rowhighlighted');
       
        event.stopPropagation();
        tr = event.target.closest("tr");
        console.log(tr);
        tr.classList.toggle('highlight');
        console.log(tr);

        this.unselect(tr);
        this.selected = tr;

      }

    unselect(target){
        if (this.selected && this.selected !== target) {
            this.selected.classList.remove('highlight');
            this.selected = null;
        }
    }

      onParentRefresh(){
        this.template.querySelector("c-project-Power-Construction").handlePowerConstRefresh();
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Case Updated',
            variant: 'success'
        })
          this.dispatchEvent(evt);
          return refreshApex(this.projectResponse);
      }

      handlePowerConstId(event){
          this.selectedAccountId = event.detail.keyId;
          this.template.querySelector('[data-id="divblock"]').classList.add('showSideBar');

          const parentPowerId = event.detail.keyParentId;
          this.selectedCase = this.newSummaryArray.find(record => record.Case_c === parentPowerId);
          this.toggleListItems('rowhighlighted', parentPowerId);

      }

      toggleListItems(property, parentPowerId) {
        this.template.querySelectorAll('c-project-Power-Construction').forEach(element => {
            if (element.getPowerConstId === parentPowerId) {
                element[property] = true;
                if(tr != undefined){
                    tr.classList.remove('highlight');
                }
            } else {
                element[property] = false;
            }
        });
    }
}