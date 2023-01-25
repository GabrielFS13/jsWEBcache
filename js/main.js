const form = document.querySelector("#novoItem")
const list = document.querySelector("#lista")
const itens = JSON.parse(localStorage.getItem('itens')) || []


itens.forEach(elemento =>{
    criaElemento(elemento)
})

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)

    const item = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    if(existe){
        item.id = existe.id
        atualiza(item)

        itens[itens.findIndex(el => el.id === existe.id)] = item

    }else{
        item.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
        criaElemento(item)
        itens.push(item)
    }


    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

    
})


function criaElemento(item){

    const newItem = document.createElement('li')
    const numItem = document.createElement('strong')
    newItem.classList.add('item')
    numItem.innerHTML = item.quantidade
    numItem.dataset.id = item.id
    newItem.appendChild(numItem)
    newItem.innerHTML += item.nome
    newItem.appendChild(btnDeleta(item.id))

    list.appendChild(newItem)

    
}


function atualiza(item){
    document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade
}

function btnDeleta(id){
    const botao = document.createElement('button')
    botao.innerText = "X"

    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return botao
}


function deletaElemento(elemento, id){
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))

}   