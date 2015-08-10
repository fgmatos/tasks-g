package com.app



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TaskController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", 
                             countTasks: "GET", complete: "PUT", getById: "GET",
                             list: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Task.list(params), model:[taskInstanceCount: Task.count()]
    }

    def show(Task taskInstance) {
        respond taskInstance
    }

    def create() {
        respond new Task(params)
    }

    @Transactional
    def save(){
        def task
        if (params?.id){
            task = Task.get(params.id) 
        } else{
            task = new Task()
        }
        //def categoria = new Category()
        //def pcategoria = params.categoria
        def categoria = Category.get(params.categoria)
        task.nome = params.nome
        task.complete = params.complete
        task.categoria = categoria
        task.data = new Date().parse('yyyy-MM-dd', params.data)
        task.save flsuh: true
        render(contentType: "text/json"){
            json
        }
    }

    def edit(Task taskInstance) {
        respond taskInstance
    }

    @Transactional
    def update(Task taskInstance) {
        if (taskInstance == null) {
            notFound()
            return
        }

        if (taskInstance.hasErrors()) {
            respond taskInstance.errors, view:'edit'
            return
        }

        taskInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Task.label', default: 'Task'), taskInstance.id])
                redirect taskInstance
            }
            '*'{ respond taskInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Task taskInstance) {

        if (taskInstance == null) {
            notFound()
            return
        }

        taskInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Task.label', default: 'Task'), taskInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    def countTasks() {
        def tasks = Task.where{( upper(complete) != "OK" )}
        def count = tasks.count()
        render(contentType: "text/json"){
            [count: count]
        }
    }

    def getById(){
        def task = Task.get(params.id)     
        render(contentType: "text/json") {
             task.as_Array()
        }         
    }

    @Transactional
    def complete(){
        def task
        if(params?.id){
            task = Task.get(params.id)
            task.complete = "Ok"
            task.save( flush: true, failOnError: true )
            if (task.hasErrors()) {
                println task.errors
            }
        } 
        render (contentType: "text/json"){
            json
        }
    }

    def list(String propertyName, String propertyValue){
        def map = [:]
        Task.list(sort: "data", order: "desc").each(){
            map.put(it.id, it.as_Array());
        }
        render(contentType: "text/json"){ map }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'task.label', default: 'Task'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
