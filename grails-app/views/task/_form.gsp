<%@ page import="com.app.Task" %>



<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'categoria', 'error')} required">
	<label for="categoria">
		<g:message code="task.categoria.label" default="Categoria" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="categoria" name="categoria.id" from="${com.app.Category.list()}" optionKey="id" required="" value="${taskInstance?.categoria?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'completada', 'error')} ">
	<label for="completada">
		<g:message code="task.completada.label" default="Completada" />
		
	</label>
	<g:checkBox name="completada" value="${taskInstance?.completada}" />

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

