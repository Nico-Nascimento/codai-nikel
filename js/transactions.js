const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso!");

});

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
};

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
};

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item, index) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>

                    <td class="d-flex">
                        <button class="delete-button" data-transaction-index="${index}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `
        });
    };

    document.getElementById("transactions-list").innerHTML = transactionsHtml;

    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => {
      button.addEventListener('click', removeItem)
    });
};

function removeItem() {
    const transactionIndex = parseInt(this.getAttribute('data-transaction-index'), 10)
  
    if (!isNaN(transactionIndex)) {
      data.transactions.splice(transactionIndex, 1)
  
      saveData(data)
      
      getTransactions()
  
      alert('Transação excluída com sucesso!')
    }
};

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};