tasksController = function() { 
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	
	var taskPage;
	var initialised = false;
	// variavel para escolha do tipo de armazenamento a ser utilizado
	var dataEngine = ''; 		//	'indexeddb', 'webstorage' ou 'ajaxDB'
	
	// #2 - metodo para limpar o formulario fazendo-o receber um objeto vazio.
	function clearTaskForm() {
		$(taskPage).find('form').fromObject({}); 
	}
	
	
	// #3 - Destacar tarefas que passaram do deadline. Percorremos cada linha da tabela atribuindo seu valor a varial 'row'
    //			Nesta linha (row) recolhemos a data realizando uma conversao para o tipo Date.
    //			Por fim comparamos: se data da tarefa for igual a hoje. Adicionamos a classe 'overdue' para alertar.
    //			se for menor que a data atual, adicionamos a classe 'warning' avisando que está pendente+
	function tasksMakeColor() {
		// $.each($(taskPage).find('#tblTasks tbody tr'), function(idx, row){ 
		// 	var day = Date.parse($(row).find('[datetime]').text()); 

		// 	if (day.compareTo(Date.today()) < 0) {
		// 		$(row).addClass("overdue"); 
		// 	} else if (day.compareTo((2).days().fromNow()) <= 0) {
		// 		$(row).addClass("warning"); 
		// 	}

		// });
	}
	

	return { 
		init : function(page, storage, callback) { 
			if (initialised) {
				callback()
			} else {

				taskPage = page;
				dataEngine = storage;

				if (dataEngine == "indexeddb" || dataEngine == "webstorage" || dataEngine== "ajaxDB") {
					if (dataEngine == 'indexeddb' && window.indexedDB) {
							console.log("loading API indexedDB engine");
							storageEngine = indexeddbEngine
					}
					if (dataEngine == 'webstorage' ) {
							console.log("loading API webstorage engine");
							storageEngine = webstorageEngine
					} 
					if (dataEngine == 'ajaxDB' ) {
							console.log("loading API ajaxDB engine");
							storageEngine = ajaxDBEngine
					} 
				} else {
					// engine default para dados
					console.log("API requested not supported or not implemented. Using webstorage engine");
					storageEngine = webstorageEngine
				}

				// storage engine continua sendo a interface de acesso aos dados
				storageEngine.init( function() { tasksController.loadTasks(); }, errorLogger );

				// storageEngine.init(function() {
				// 	storageEngine.initObjectStore('task', function() {
				// 		callback();
				// 	}, errorLogger) 
				// }, errorLogger);
				
				$(taskPage).find('[required="required"]').prev('label').append( '<span>*</span>').children( 'span').addClass('required');
				$(taskPage).find('tbody tr:even').addClass( 'even');
				
				$(taskPage).find('#btnAddTask').click(function(evt) {
					evt.preventDefault();
					$(taskPage).find('#taskCreation').removeClass('not');
				});

				$(taskPage).find('tbody').on('click','tr',function(evt) {
					$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHighlight');
				});

				// CLEAR TASK - limpar o form de nova tarefa
				$(taskPage).find('#clearTask').click(function(evt) {
					evt.preventDefault();
					clearTaskForm(); 
				});

				// HIDE TASK - Ocultar form de nova tarefa
				$(taskPage).find('#hideTask').click(function(evt) {
					evt.preventDefault();
					$(taskPage).find('#taskCreation').addClass('not');
				});
				
				// DELETE TASK
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', function(evt) {
					console.log('call .deleteRow'); 		
					// var txt = $(evt.target).attr("href")			
					storageEngine.delete('task', evt, 
						function(evt) {
							$(evt.target).parents('tr').remove(); 
							taskCountRow();
						}, errorLogger);
					}
				);

				// COMPLETE TASK
				$(taskPage).find('#tblTasks tbody').on('click', '.completeRow', function(evt) { 
					console.log('call .completeRow');					
					storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
						task.complete = true;
						storageEngine.save('task',task,function(){
							tasksController.loadTasks();
							document.location.reload(true); 
						},errorLogger);
					},errorLogger);
				}); 
							
				// EDIT TASK	
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow', function(evt) { 
					console.log('call .editRow');
					$(taskPage).find('#taskCreation').removeClass('not');
					storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
						$(taskPage).find('form').fromObject(task);
					}, errorLogger);
				});
						
				// SAVE TASK		
				$(taskPage).find('#saveTask').click(function(evt) {
					evt.preventDefault();
					console.log("saveTask click")
					if ($(taskPage).find('form').valid()) {
						var task = $(taskPage).find('form').toObject();		
						storageEngine.save('task', task, function() {
							// $(taskPage).find('#tblTasks tbody').empty();
							// tasksController.loadTasks();
							// $(':input').val('');
							// clearTaskForm();
							$(taskPage).find('#taskCreation').addClass('not');
						}, errorLogger);
					}
				});

				// taskCountRow();
				// tasksMakeColor();

				initialised = true;
			}
		},

		 taskCountRow : function() {
			storageEngine.countTasks(function(data){
				$('#taskCount').text(data.count);
			}, errorLogger);
		},

		// #5 - implementada ordenacao das tarefas. Ao pesquisar comparamos as datas ordenando pela menor
		loadTasks : function() {
			storageEngine.findAll('task', function(tasks) {
				tasks.sort(function(d1,d2){
					return Date.parse(d1.requiredBy).compareTo(Date.parse(d2.requiredBy));
				});

				$.each(tasks, function(index, task) {
					if(!task.complete){
						task.complete = false;
					}
					$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
			
				});
			// taskCountRow();
			// tasksMakeColor();
			
			}, errorLogger);
		}
	} 
}();
