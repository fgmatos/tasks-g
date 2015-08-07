package com.app

class Category {

	String nome
	
	static hasMany = [task: Task]

    static constraints = {
    }
}
