ajaxDBEngine = function() {
	var initialized = false;
	var initializedObjectStores = {};
	function getStorageObject(type) {
	    var item = localStorage.getItem(type); 
	    var parsedItem = JSON.parse(item); 
	    return parsedItem;	
	}

	
	return {
		init : function(successCallback, errorCallback) {
			if (window.localStorage) {
				initialized = true;
				console.log("ajaxDBEngine engine loaded. Using localStorage.")
				successCallback(null);
			} else {
				errorCallback('storage_api_not_supported', 'The web storage api is not supported');
			}
		},
	    initObjectStore : function(type, successCallback, errorCallback) {
	    	if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!localStorage.getItem(type)) {
	    		localStorage.setItem(type, JSON.stringify({}));
	    	}
	    	initializedObjectStores[type] = true;
	    	successCallback(null);
	    },
	    save: function(type, obj, successCallback, errorCallback) { 
	        // if (!initialized) {
	       	//    errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
	        // } 
	       //  else if (!initializedObjectStores[type]) {
	    	  // errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
	       //  }	
	        console.log("init save")

			// $.ajax({
			// 	method:"POST",
			// 	url:"task/save",
			// 	data:obj
			// }).done(function(type){
			// 	console.log("Done save: Data "+obj+" saved.")
			// 	successCallback(obj)
			// })

			 console.log("after save")

	        // if (!obj.id) { 
	        //     obj.id = $.now(); 
	        // } 
	        // var storageItem = getStorageObject(type); 
	        // storageItem[obj.id] = obj; 
	        // localStorage.setItem(type, JSON.stringify(storageItem)); 
	        // successCallback(obj);
	    },
		findAll : function(type, successCallback, errorCallback) { 

			// findAll:function(a,b,c){
			// $.ajax({
			// 	method:"get",
			// 	dataType:"json",
			// 	url:"task/index",
			// 	success:function(type){
			// 		var result=[];
			// 		$.each(type,function(type,successCallback){
			// 			result.push(successCallback)
			// 		});
			// 		successCallback(result)
			// 	}
			// })

			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			var result = [];
			var storageItem = getStorageObject(type); 
			$.each(storageItem, function(i, v) {
				result.push(v);
			});
			successCallback(result);
		},
		delete : function(type, id, successCallback, errorCallback) { 
		    if (!initialized) {
		        errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
		    } else if (!initializedObjectStores[type]) {
		        errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
		    }

		    $.ajax({
				method:"delete",
				dataType:"json",
				url:"task/delete/"+($(id.target).attr("href")).replace("#",""),
				success:function(type){
					console.log("removed "+type+":"+id);
					successCallback(id)
				}
			})

		 //    var storageItem = getStorageObject(type); 
			// if (storageItem[id]) {
			//     delete storageItem[id];
			//     localStorage.setItem(type, JSON.stringify(storageItem)); 
			// 	successCallback(id);
			// } else {
		 //        errorCallback("object_not_found","The object requested could not be found");
		 //    }
		},
		findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			var result = [];
			var storageItem = getStorageObject(type); 
			$.each(storageItem, function(i, v) {
				if (v[propertyName] === propertyValue) {
					result.push(v);
				}
			}); 
			successCallback(result);
		},
		findById : function (type, id, successCallback, errorCallback)	{
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}	
			var storageItem = getStorageObject(type); 
			var result = storageItem[id];
			successCallback(result);
		}

	}
}();
