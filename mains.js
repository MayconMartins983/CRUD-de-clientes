


/* -----------------------CRUD-------------------- */
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const setLocalStorage = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))

/* ----Read------ */
 const readCLient = () => getLocalStorage() 

/* ----Update------ */

 const updateClient = (index, client) => {
    const db_cliente = readCLient()
    db_cliente[index] = client
    setLocalStorage(db_cliente)
} 

/* ----delete----- */
 const deleteClient = (index) => {
    const db_cliente = readCLient()
    db_cliente.splice(index, 1)
    setLocalStorage(db_cliente)
} 

/* ----create------ */
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
        createCliente(client)
        clearFields()
        updateTable()
        fecharmodal()
    }
    
}

//mostrar os dados na tela do banco de dados

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.cell}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
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
/*  */

updateTable()

/* ------EVENTOS---------- */

//modal
const buttonAbrir = document.querySelector('#cadastrarCliente')
    buttonAbrir.addEventListener('click', () => {
        const modal = document.querySelector('.modal')
        modal.classList.add('active')
})

const buttonFechar = document.querySelector("#modalClose")
    buttonFechar.addEventListener('click', fecharmodal)

document.getElementById('cancelar').addEventListener('click', fecharmodal)

function fecharmodal() {
    clearFields()
    const modal = document.querySelector('.modal')
        modal.classList.remove('active')
}

document.getElementById('buttonCadastrar').addEventListener('click', saveCliente) //Botão de cadastrar

//--------------------------

