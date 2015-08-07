package com.app

class Task {
	Boolean completada = false
	Category categoria
	Date data
	String nome

	//static belongsTo = [categoria: Category]

	static mapping = {
    	categoria lazy:false
	}
    static constraints = {
		//categoria(inList: ["Pessoal", "Profissional"])
		//sort data: "desc"
    }
}