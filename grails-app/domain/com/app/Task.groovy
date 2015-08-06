package com.app

class Task {
	String nome
	Date data
	String categoria
	Date created_at

    static constraints = {
		//categoria(inList: ["Pessoal", "Profissional"])
		//sort data: "desc"
    }
}