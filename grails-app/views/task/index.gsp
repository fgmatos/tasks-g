<%@ page import="tasks.Task" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
	<title>Tarefas</title>
	<meta name="layout" content="main-task">
	<g:set var="entityName" value="${message(code: 'task.label', default: 'Task')}" />
	<title><g:message code="default.list.label" args="[entityName]" /></title>
</head>
<body>
	<main id="taskPage">
		<section id="taskCreation" class="not">
			<form id="taskForm">
				<input type="hidden" name="id" />
				<!-- Adicionei este novo campo em forma de hidden para tratar as tarefas concluidas e também poder contar as tarefas "não concluídas" -->
				<input type="hidden" name="complete">
				<div>
					<label>Tarefa</label> 
					<input type="text" required="required" name="task" maxlength="200" class="large" placeholder="Estudar e programar" />
				</div>
				<div>
					<label>Finalizar até</label> <input type="date" required="required" name="requiredBy" />
				</div>
				<div>
					<label>Categoria</label> 
					<g:select id="categoria" name="categoria" from="${tasks.Categoria.list()}" optionKey="id" required="" value="${taskInstance?.categoria?.id}" class="many-to-one"/>
				</div>
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a> 
					<a href="#" id="clearTask">Limpar tarefa</a>
					<a href="#" id="hideTask">Ocultar</a>
				</nav>
			</form>
		</section>
		<section>
			<table id="tblTasks">
					<colgroup>
						<col width="40%">
						<col width="15%">
						<col width="15%">
						<col width="30%">
					</colgroup>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Deadline</th>
						<th>Categoria</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			<nav class="bottom">
				<a href="#" id="btnAddTask">Adicionar tarefa</a>
				<g:link controller="categoria" action="index">Gerenciar Categoria</g:link>
			</nav>
		</section>
	</main>
	<footer>Você tem <span id="taskCount">0</span> tarefa(s) pendente(s)</footer>
     
<script id="taskRow" type="text/x-jQuery-tmpl">
<tr row-task-id="{{= id }}">
	<td>{{= task }}</td>
	<td><time datetime="{{= requiredBy }}"> {{= requiredBy }}</time></td>
	<td>{{= categoria_nome }}</td>
	<td>
		<nav>
			<a href="#" class="editRow" data-task-id="{{= id }}">Editar</a>
			<a href="#" class="completeRow" data-task-id="{{= id }}">Completar</a>
			<a href="#" class="uncompleteRow {{if complete != 'OK'}} not {{/if}}" data-task-id="{{= id }}">Descompletar</a>
			<a href="#" class="deleteRow" data-task-id="{{= id }}">Deletar</a>
		</nav>
	</td>
</tr>
</script>

<script>
	$(document).ready(function() {
		tasksController.init($('#taskPage'));
	});
</script>


</body>

</html>
