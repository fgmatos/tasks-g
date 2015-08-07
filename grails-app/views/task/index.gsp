
<%@ page import="com.app.Task" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'task.label', default: 'Task')}" />

		<g:set var="categryName" value="${message(code: 'category.label', default: 'Category')}" />

		<title><g:message code="default.list.label" args="[entityName]" /></title>
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


		<section id="taskCreation" class="not" style="display:none">
			<form id="taskForm">
				<!--<input type="hidden" name="id"/>-->
				<div>
					<label>Tarefa<span class="required">*</span></label> 
					<input type="text" required="required" name="task" class="large" placeholder="Estudar e programar" maxlength="200">
				</div>
				<div>
					<label>Finalizar até<span class="required">*</span></label> <input type="date" required="required" name="requiredBy">
				</div>
				<div>
					<label>Categoria<span class="required">*</span></label> 
					<select name="category" required="required">
						<option value="Pessoal">Pessoal</option>
						<option value="Profissional">Profissional</option>
					</select>
				</div>
	                        <input type="hidden" name="id">
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a>	<a href="#" id="clearTask">Limpar tarefas</a>
				</nav>
			</form>
		</section>


		<div id="list-task" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
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

						<td><g:formatDate date="${taskInstance.data}" /></td>

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

							<g:link class="editRow edit btn btn-primary" url="#">
								<g:message code="default.button.edit.label"/>
							</g:link>
						
							<g:link class="completeRow create btn btn-primary" url="#">
								<g:message code="default.button.complete.label"/>
							</g:link>
						
							<g:link class="deleteRow delete btn btn-primary" url="#">
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
			</div>
		</div>
	</body>
</html>
