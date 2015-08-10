ajaxDBEngine = function() {
	var initialized = false;
	
	return {
		init : function(successCallback, errorCallback) {
			if (jQuery.support.ajax) {
				initialized = true;
				console.log("AJAX is supported, ajaxDB engine loaded.")

				successCallback(null);
				
			} else {
				errorCallback('ajax_api_not_supported', 'The ajax api is not supported');
			}
		},
	  
	    countTasks : function(successCallback, errorCallback){
    		$.ajax({
				method: 'GET', 
				dataType: 'JSON', 
				// url: window.urlPath + 'task/countTasks', 
				url: 'task/countTasks', 
				success: function(data){
					successCallback(data);
				}
			});
	    },

	    complete : function(type, obj, successCallback, errorCallback){
			$.ajax({
				method: "PUT", 
				// url: window.urlPath + "task/complete/"+obj.id
				url: "task/complete/"+obj.id
			}).done(function(msg){
				successCallback(obj)
			});	
		},

	    save: function(type, obj, successCallback, errorCallback) { 
	        // if (!initialized) {
	       	//    errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
	        // } 
	       //  else if (!initializedObjectStores[type]) {
	    	  // errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
	       //  }	
	        console.log("init save")

			$.ajax({
				method:"POST",
				url:"task/save",
				data:obj
			}).done(function(type){
				console.log("Done save: Data "+obj+" saved.")
				successCallback(obj)
			})

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


		// 	findAll : function(type, successCallback, errorCallback) {
		// 		var aTasks = [];
		// 	$.ajax({method: 'GET', dataType: "JSON", url: window.urlPath + "task/list", 
		// 			success: function (data) {
		// 				var tasks = [];
		// 				$.each(data, function(k, v){
		// 					tasks.push(v);
		// 				});
		// 				successCallback(tasks);
		// 			}
		// 		});
		// },

			$.ajax({
				method:"GET",
				dataType:"json",
				url:"task/list",
				success:function(type){
					var result=[];
					$.each(type, function(type, successCallback){
						result.push(successCallback)
					});
					successCallback(result)
				}
			})

			// if (!initialized) {
			// 	errorCallback('ajax_api_not_supported', 'The ajax api is not supported');
			// } 

			// var result = [];
			// var storageItem = getStorageObject(type); 
			// $.each(storageItem, function(i, v) {
			// 	result.push(v);
			// });
			// successCallback(result);
		},

		delete : function(type, id, successCallback, errorCallback) { 
		    if (!initialized) {
		        errorCallback('ajax_api_not_supported', 'The ajax api is not supported');
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
				errorCallback('ajax_api_not_supported', 'The ajax api is not supported');
			} 
			// var result = [];
			// var storageItem = getStorageObject(type); 
			// $.each(storageItem, function(i, v) {
			// 	if (v[propertyName] === propertyValue) {
			// 		result.push(v);
			// 	}
			// }); 
			// successCallback(result);
		},
		findById : function (type, id, successCallback, errorCallback)	{
			if (!initialized) {
				errorCallback('ajax_api_not_supported', 'The ajax api is not supported');
			} else {
				$.ajax({
					method: 'GET', 
					dataType: 'JSON', 
					// url: 'task/getById/'+id, 
					url: 'task/getById/'+($(id.target).attr("href")).replace("#",""),
					success: function(task){
						console.log(task);
						successCallback(task);
					}
				});

			}
		}

	}
}();
