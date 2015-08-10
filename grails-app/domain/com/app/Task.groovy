package com.app

class Task {
	String complete = false
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

    def as_Array() {
        return [id: this.id, nome: this.nome, data: this.data.format('yyyy-MM-dd'), complete: this.complete, categoria_nome: this.categoria.nome, categoria: this.categoria.id]
    }
}