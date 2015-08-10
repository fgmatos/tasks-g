
<%@ page import="com.app.Task" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'task.label', default: 'Task')}" />

		<g:set var="categryName" value="${message(code: 'category.label', default: 'Category')}" />

		<title><g:message code="default.list.label" args="[entityName]" /></title>
 
		<asset:javascript src="date.js"/>
		<asset:javascript src="jquery.min.js"/>
		<asset:javascript src="jquery-serialization.js"/>
		<asset:javascript src="jquery-tmpl.js"/>
		<asset:javascript src="jquery.validate.js"/>

		<asset:javascript src="tasks-controller.js"/>
		<asset:javascript src="tasks-indexedDB.js"/>
		<asset:javascript src="tasks-webstorage.js"/>
		<asset:javascript src="tasks-ajaxDB.js"/>
	</head>
	<body>
		<a href="#list-task" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>

				<li><g:link class="create" controller="category" action="create"><g:message code="default.new.label" args="[categryName]" /></g:link></li>

			</ul>
		</div>


		<section id="taskCreation" class="not">


			<!-- <g:formRemote  name="newTask" url="[resource:taskInstance, action:'save']" >
				<fieldset class="form">
					<g:render template="form"/>
				</fieldset>
				<fieldset class="buttons">
					<g:remoteLink action="save" update="result">Salvar Tarefa</g:remoteLink>
					<g:submitButton name="create" class="save" value="${message(code: 'default.button.create.label', default: 'Create')}" />
				</fieldset>
			</g:formRemote> -->

			<form id="taskForm">
				<!--<input type="hidden" name="id"/>-->
				<div>
					<label>Tarefa<span class="required">*</span></label> 
					<input type="text" required="required" name="nome" id="nome" class="large" placeholder="Estudar e programar" maxlength="200">
				</div>
				<div>
					<label>Finalizar até<span class="required">*</span></label>
					<input id="data" type="date" required="required" name="data">
				</div>
				<div>
					<!-- <label>Categoria<span class="required">*</span></label> 
					<select name="category" required="required">
						<option value="Pessoal">Pessoal</option>
						<option value="Profissional">Profissional</option>
					</select> -->

					<label for="categoria">
						<g:message code="task.categoria.label" default="Categoria" />
						<span class="required-indicator">*</span>
					</label>
					<g:select id="categoria" name="categoria.id" from="${com.app.Category.list()}" optionKey="id" required="" optionValue="nome" value="${taskInstance?.categoria?.id}"  class="many-to-one"/>

				</div>
	                        <!-- <input type="hidden" name="id"> -->
				<nav id="nav-task">
					<!-- <g:remoteLink action="save" update="result">Salvar Tarefa</g:remoteLink> -->
					<a href="#" id="saveTask">Salvar tarefa</a>	
					<a href="#" id="clearTask">Limpar tarefas</a>
					<a href="#" id="hideTask">Ocultar</a>
				</nav>
			</form>

			<div id="result">result</div>
		</section>


		<div id="list-task" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table id="tblTasks">
			<thead>
					<tr>
						<g:sortableColumn property="nome" title="${message(code: 'task.nome.label', default: 'Nome')}" />

						<g:sortableColumn property="data" title="${message(code: 'task.data.label', default: 'Data')}" />

						<th><g:message code="task.categoria.label" default="Categoria" /></th>
					
						<!-- <g:sortableColumn property="completada" title="${message(code: 'task.completada.label', default: 'Completada')}" />  -->

						<th><g:message code="default.taskpage.actions.label"  /></th>
						
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${taskInstanceList}" status="i" var="taskInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
						
						<td>${fieldValue(bean: taskInstance, field: "nome")}</td>

						<td>
							<time datetime="<g:formatDate format="dd-MM-YYYY" type="date" date="${taskInstance.data}" />" >
								<g:formatDate format="dd-MM-YYYY" type="date" date="${taskInstance.data}" /> 
							</time>

						</td>

						<td><g:link action="show" id="${taskInstance.id}">${fieldValue(bean: taskInstance, field: "categoria.nome")}</g:link></td>
					
						<!-- <td><g:formatBoolean boolean="${taskInstance.completada}" /></td> -->

						<!-- <td>
							<div class="nav buttons">
								<li>
									<g:link class="editRow edit btn btn-primary" url="#">
										<g:message code="default.button.edit.label"/>
									</g:link>
								</li>

								<li>
									<g:link class="completeRow create btn btn-primary" url="#">
										<g:message code="default.button.complete.label"/>
									</g:link>
								</li>

								<li>
									<g:link class="deleteRow delete btn btn-primary" url="#">
										<g:message code="default.button.delete.label"/>
									</g:link>
								</li>
							</div>
						</td> -->
					
						<td>

							<g:link class="editRow edit" url="#">
								<g:message code="default.button.edit.label"/>
							</g:link>
						
							<g:link class="completeRow create" url="#">
								<g:message code="default.button.complete.label"/>
							</g:link>
							
							<!-- <g:remoteLink action="delete" id="${taskInstance.id}">
								<g:message code="default.button.delete.label"/>
							</g:remoteLink> -->

							<g:link class="deleteRow delete" url="#${taskInstance.id}">
								<g:message code="default.button.delete.label"/>
							</g:link>
						
						</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>

			<div class="nav">
				<ul>
					<li>
						<g:link elementId="btnAddTask" class="create" url="#">Adicionar Tarefa</g:link>
					</li>
				</ul>
			</div>

			<div class="pagination">
				<g:paginate total="${taskInstanceCount ?: 0}" />
				<span id="taskCount">0</span>
			</div>
		</div>

		<script>
		$(document).ready(function() {

			// #6 - Implementada engine IndexedDB para salvar os dados. Existe a opção de vc escolher uma das API's ao charmar o
			//		tasksController.init, ou se não informado, será utilizada a API webstorage por padrão por ser suportada
			// 		por mais browsers que as demais.
		
			// Descricao da funcao: (ex.)
			// 		tasksController.init( element, dataEngine, function loadTasks )
			//			params: 
			//				Element, => Informa o elemento HTML utilizado pelo TASKSCONTROLLER 
			//				dataEngine => Informa qual lib de armazenamento de dados será utilizada. (disponível 'indexeddb' e 'webstorage'. Valor default é "webstorage")
			
			tasksController.init($('body'), "ajaxDB", function() {
				// tasksController.loadTasks();
			});		
		});


</script>


	</body>
</html>
