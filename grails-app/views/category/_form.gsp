<%@ page import="com.app.Category" %>



<div class="fieldcontain ${hasErrors(bean: categoryInstance, field: 'nome', 'error')} required">
	<label for="nome">
		<g:message code="category.nome.label" default="Nome" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nome" required="" value="${categoryInstance?.nome}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: categoryInstance, field: 'task', 'error')} ">
	<label for="task">
		<g:message code="category.task.label" default="Task" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${categoryInstance?.task?}" var="t">
    <li><g:link controller="task" action="show" id="${t.id}">${t?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="task" action="create" params="['category.id': categoryInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'task.label', default: 'Task')])}</g:link>
</li>
</ul>


</div>

