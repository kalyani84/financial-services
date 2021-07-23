({
	onInit : function(component,event,helper){
       component.set("v.accountColumns",[
            {
                label : 'Account Name',
                fieldName: 'linkName',
                type: 'url',
                typeAttributes: { label: { fieldName: 'Name' },target: '_blank' } ,
                sortable : true
            },
            {
                label : 'Account Owner',
                fieldName : 'OwnerId',
                type : 'text',
                sortable : true
            },
            {
                label : 'Phone',
                fieldName : 'Phone',
                type : 'Number'
                
            },
            {
                label : 'Website',
                fieldName : 'Website',
                type : 'Email'
               
            },
            {
                label : 'Annual Revenue',
                fieldName : 'AnnualRevenue',
                type : 'number'
                
            }
        ]);
        // call helper function to fetch account data from apex
        helper.getAccountData(component);
    },
    
    //Method gets called by onsort action,
    handleSort : function(component,event,helper){
        //Returns the field which has to be sorted
        var sortBy = event.getParam("fieldName");
        //returns the direction of sorting like asc or desc
        var sortDirection = event.getParam("sortDirection");
        //Set the sortBy and SortDirection attributes
        component.set("v.sortBy",sortBy);
        component.set("v.sortDirection",sortDirection);
        // call sortData helper function
        helper.sortData(component,sortBy,sortDirection);
    },
    
    doSearch: function(component,event,helper){
         var action = component.get("c.fetchAccount");
      	action.setParams({
            'srchVal': component.get("v.searchVal")
        });
        
        action.setCallback(this,function(response){
            console.log('test');
            var state = response.getState();
            if(state == "SUCCESS"){
                var accountlst = response.getReturnValue();
                console.log('accountlst'+accountlst);
                    //Setting data to be displayed in table
                    component.set("v.accountData",accountlst);
                   
                }
               
           
            
        });
        $A.enqueueAction(action);
        
    }
})