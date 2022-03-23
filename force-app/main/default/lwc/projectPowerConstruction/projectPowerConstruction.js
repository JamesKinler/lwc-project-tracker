import { LightningElement,wire,api,track } from 'lwc';
import getProjectPowerConst from '@salesforce/apex/projectPowerConstClass.getProjectPowerConst';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';


export default class ProjectPowerConstruction extends NavigationMixin(LightningElement){
    @api getPowerConstId;
    @track hideRow = false;
    projectPowerConstData;
    selected;
    listenerAttached = false;
    @api rowhighlighted;

    @wire(getProjectPowerConst, {parentPower: '$getPowerConstId'})
    projectPowerConstsHandler(response){
        let data = response.data;
        let error = response.error;
        this.projectResponse = response;
        if(data){
            if(data.length != 0){
                this.hideRow = true;
                this.projectPowerConstData = data;
                console.log(this.projectPowerConstData);

                let powerConstTempSummary = Object.assign([], this.projectPowerConstData);

                for(let x = 0; x < this.projectPowerConstData.length; x++){
                    let tempPowerConstRec = Object.assign({}, powerConstTempSummary[x]);

                    powerConstTempSummary[x] = tempPowerConstRec;
                }

                this.newProjectConstSummary = powerConstTempSummary;

                this.acutalResults = this.newProjectConstSummary.map(e => {
                    let powerConstAheadOfSchedule = e.Completion_Difference_Color__c === 'green';
                    let powerConstOnSchedule = e.Completion_Difference_Color__c === '#E1AD01';
                    let powerConstBehindSchedule = e.Completion_Difference_Color__c === 'red';

                    if(powerConstAheadOfSchedule){
                        e.styleColor = 'background-color:#096c09; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                    }

                    if(powerConstOnSchedule){
                        e.styleColor = 'background-color:#E1AD01; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                    }

                    if(powerConstBehindSchedule){
                        e.styleColor = 'background-color:#cb1515; color: #fff; border-radius: 15px; padding: 5px 8px; font-size: 12px;';
                    }
                    return e;
                });
            }
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

    powerConstSideBar(event){
        this.powerConstId = event.currentTarget.getAttribute("data-key");
        
        this.parentId= event.currentTarget.getAttribute("data-id");
        

        const powerClickEvent = new CustomEvent('powerconstid',{
            detail: {
                keyId: this.powerConstId,
                keyParentId: this.parentId
            }
        });
        this.dispatchEvent(powerClickEvent);
    }

    get selectedClass(){
        if (this.rowhighlighted) {
            return this.highLcss += ' childHighlight';
        }
    }

    @api handlePowerConstRefresh(){
        return refreshApex(this.projectResponse);
    }
}