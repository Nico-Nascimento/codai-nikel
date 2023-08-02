//Propriedade do bootstrap para invocar a modal pelo id
const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Ops! Verifique o usuário ou a senha.")
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Ops! Verifique o usuário ou a senha.")
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    
    if(email.length <5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if(password.length < 4) {
        alert("Utilize uma senha com no mínimo 4 dígitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso!")
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
};

//Salvando os dados da conta na própria aplicação / Com localStorage os dados ficam salvos(na máquina) mesmo que a aplicação seja encerrada. Já com sessionStorage os dados são armazenados na sessão e não ficam salvos quando a mesma é encerrada.
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
};

function getAccount (key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
};