

module.exports = app => {

    // get count of eventsList total, unconfirmed, confirmed belonging to some checher
    app.get('/tenantTemplate/api/v1/eventsList/count/checker/:userId', 'eventsList.getCount');

    // get last day's count in dealing and completed of eventsList belonging to some store manager or distrcit manager
    app.get('/tenantTemplate/api/v1/eventsList/count/manager/:userId', 'eventsList.getDayCount');

    // get statistics graph of eventsList belonging to checker(day: 'day', 'month', 'week')
    app.get('/tenantTemplate/api/v1/eventsList/countGraph/checker/:day', 'eventsList.getEventsListGraph');

    // get statistics graph of eventsList belonging to store manager and district manager(day, week, month)
    app.get('/tenantTemplate/api/v1/eventsList/countGraph/manager/:userId/:day', 'eventsList.getManageDealCount');
    
    // get the error rate graph statistic of shops
    app.get('/tenantTemplate/api/v1/eventsList/errorRate/graph/:userId', 'eventsList.getErrorRateGraph');

    // get the error rate of list of shops(day: 'week', 'month', '3month', '6month')
    app.get('/tenantTemplate/api/v1/eventsList/errorRate/list/:userId/:day', 'eventsList.getErrorRateList');

    // get the rate of events count during some time(day: 'week', 'month', '3month', '6month')
    app.get('/tenantTemplate/api/v1/eventsList/rate/:userId/:day', 'eventsList.getEventsRate');

    // get list of eventList record by status
    app.get('/tenantTemplate/api/v1/eventsList/list/checker/common/:status/:userId', 'eventsList.getEventListByStatus');

    // get list of store manager and district manager
    app.get('/tenantTemplate/api/v1/eventsList/list/manager/:status/:userId', 'eventsList.getManageEventListByStatus');

    // get list of eventList record by status and result used to filer
    app.get('/tenantTemplate/api/v1/eventsList/list/checker/filter/:status/:result', 'eventsList.getEventList');
    
    // get some event's edit information
    app.get('/tenantTemplate/api/v1/eventsList/editInfo/:sysKey', 'eventsList.getEditInfo');

    // modify some eventList's info
    app.put('/tenantTemplate/api/v1/eventsList/editInfo/:sysKey', 'eventsList.eventEdit'); 
    
    // commit some eventList, set its status to 2
    app.put('/tenantTemplate/api/v1/eventsList/status/commit/:sysKey', 'eventsList.commitEventList');

    // store some eventList, set its status to 1
    app.put('/tenantTemplate/api/v1/eventsList/status/store/:sysKey', 'eventsList.storeEventList');

    // commit some eventsList, set their status to 2
    app.put('/tenantTemplate/api/v1/eventsList/status/commit', 'eventsList.commitEventsList');

    // store some eventsList, set their status to 1
    app.put('/tenantTemplate/api/v1/eventsList/status/store', 'eventsList.StoreEventsList');
}