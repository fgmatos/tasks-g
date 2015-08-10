tasksController = function() { 
	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	
	var taskPage;
	var initialised = false;
	var dataEngine = 'ajaxDB'; 		//	'indexeddb', 'webstorage' ou 'ajaxDB'
	
	// #2 - metodo para limpar o formulario fazendo-o receber um objeto vazio.
	function clearTaskForm() {
		$(taskPage).find('form').fromObject({}); 
	}
	
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
				// dataEngine = storage;

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
					
					storageEngine.findById('task', evt, // $(evt.target).data().taskId, 
						function(task) {							
							storageEngine.complete("task", task, function(){								
								$(evt.target).data.taskId.parents().eq(1).siblings().addClass('taskCompleted');								
								$(evt.target).data.taskId.fadeOut(1000);								
								$(evt.target).data.taskId.parent().find(".editRow").fadeOut(1000);								
								tasksController.countTasks();
							}, errorLogger);
						}, errorLogger);

					// storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
					// 	task.complete = true;
					// 	storageEngine.save('task',task,function(){
					// 		tasksController.loadTasks();
					// 		document.location.reload(true); 
					// 	},errorLogger);
					// },errorLogger);
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
					if ($(taskPage).find('#taskForm').valid()) {
						var task = $(taskPage).find('#taskForm').toObject();		
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

		// #5 - implementada ordenacao das tarefas. Ao pesquisar comparamos as datas ordenando pela menor
		loadTasks : function() {
			storageEngine.findAll('task', function(tasks) {
				// tasks.sort(function(d1,d2){
				// 	return Date.parse(d1.requiredBy).compareTo(Date.parse(d2.requiredBy));
				// });

				$.each(tasks, function(index, task) { //Percorre todos os dados da tabela
						$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));						
						if ((Date.today().compareTo(Date.parse(task.data))) == 1){ //Pinta a lina da dabela com a cor avermelhada se requiredBy) comparado com a data atual der um numero menor que 0 (ou seja a data da tarefa é menor que a data atual tarefa em atrazo)
						 	$('tr[row-task-id="'+task.id+'"]').addClass('overdue');
						// Caso falso, testa novamente se a tarefa irá vencer nos próximos 3 dias, caso verdade atribui a classe CSS "warning"
						} else if (Date.parse(task.data).between(Date.today(), Date.today().add({ days: 3 }))){
							$('tr[row-task-id="'+task.id+'"]').addClass('warning'); //Pinta de amarela a linha caso a data da tarefa (day) em comparação com o intrvalo da data atual e mais dois dias retornar um valor menor ou igual 0 (ou seja comparará a data da tarefa com o intervalo de data atual mais dois dias implicando que a data do Deadline da tarefa esta proximo ou é o dia)
						}
						//Metodo que completa umam tarefa (Questão 4)
						if (task.complete == 'Ok'){
							$('tr[row-task-id="'+task.id+'"]').addClass('taskCompleted');
							$('a[data-task-id="'+task.id+'"]').first().next().hide();
							$('a[data-task-id="'+task.id+'"]').first().hide();
						}
					});

				tasksController.taskCountRow();
			}, errorLogger);
		},

		taskCountRow : function() {
			storageEngine.countTasks(function(data){
				$('#taskCount').text(data.count);
			}, errorLogger);
		}
	} 
}();
