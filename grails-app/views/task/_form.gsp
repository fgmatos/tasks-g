<%@ page import="com.app.Task" %>



<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'categoria', 'error')} required">
	<label for="categoria">
		<g:message code="task.categoria.label" default="Categoria" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="categoria" required="" value="${taskInstance?.categoria}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'created_at', 'error')} required">
	<label for="created_at">
		<g:message code="task.created_at.label" default="Createdat" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="created_at" precision="day"  value="${taskInstance?.created_at}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'data', 'error')} required">
	<label for="data">
		<g:message code="task.data.label" default="Data" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="data" precision="day"  value="${taskInstance?.data}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'nome', 'error')} required">
	<label for="nome">
		<g:message code="task.nome.label" default="Nome" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nome" required="" value="${taskInstance?.nome}"/>

</div>

