const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const setLocalStorage = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))

// ----Read------ 
 const readCLient = () => getLocalStorage() 

// ----Update------ 
const updateClient = (index, client) => {
    const db_cliente = readCLient()
    db_cliente[index] = client
    setLocalStorage(db_cliente)
} 

// ----delete-----
const deleteClient = (index) => {
    const db_cliente = readCLient()
    db_cliente.splice(index, 1)
    setLocalStorage(db_cliente)
} 

// ----create------ 
const createCliente = (client) => {
    const db_cliente = getLocalStorage()
    db_cliente.push(client)
    setLocalStorage (db_cliente)
      
}


// interação com o layout

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = ()=> {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach((intem) => {
        intem.value = ''
    })
}
const saveCliente = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cell: document.getElementById('cell').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
            if (index==='new') {
        createCliente(client)
        clearFields()
        updateTable()
        fecharmodal()
        } else {
            updateClient(index, client)
            updateTable()
            fecharmodal()
        }
    }
    
}

// Mostrar os dados na tela, lendo do banco de dados.

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.cell}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id='edit-${index}'>editar</button>
            <button type="button" class="button red" id='delete-${index}'>excluir</button>
         </td>`

    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const row = document.querySelectorAll('#tableClient>tbody tr')
    row.forEach(intem => {
        intem.parentNode.removeChild(intem)
    })
}
const updateTable = () => {
    const db_client = readCLient()
    clearTable()
    db_client.forEach(createRow)
} 

updateTable()


// Action of edit and Delete

const fillFilds = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('cell').value = client.cell
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index

}

const editClient = (index) => {
    const client = readCLient()[index]
    client.index = index
    fillFilds(client)
    abrirModal()

}

const editDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-')
            if (action==='edit') {
                editClient(index)
            }
            else {
                const client = readCLient()[index]
                const response = confirm(`Deseja realmente excluir o cliente ${client.nome}?`)
                    if (response) {
                        deleteClient(index)
                        updateTable()
                }
            }
    }
}

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)


// ------EVENTOS---------- 

const buttonAbrir = document.querySelector('#cadastrarCliente')
    buttonAbrir.addEventListener('click',abrirModal)

    function abrirModal(){
        const modal = document.querySelector('.modal')
        modal.classList.add('active')
    }

const buttonFechar = document.querySelector("#modalClose")
    buttonFechar.addEventListener('click', fecharmodal)

    function fecharmodal() {
        clearFields()
        const modal = document.querySelector('.modal')
            modal.classList.remove('active')
    }

document.getElementById('cancelar').addEventListener('click', fecharmodal)
document.getElementById('buttonCadastrar').addEventListener('click', saveCliente) 



