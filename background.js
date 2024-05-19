function notifications(title, message) {
    browser.notifications.create({
        type:"basic",
        title: title,
        message: message
    })
}

function onCreated() {
    if (browser.runtime.lastError) {
        notifications("Erro", browser.runtime.lastError);
    } else {
        notifications("Info", "Menu criado com sucesso");
    }
}

function success() {
    notifications("Info", "Atualização bem-sucedida da página de pesquisa");
}

function error(error) {
    notifications("Erro", `Erro ao executar a busca : ${error}`)
}

browser.menus.create({
    id: "linkedIn",
    title: "Buscar no LinkedIn",
    contexts: ["selection"]
}, onCreated)

browser.menus.onClicked.addListener((info, tab) => {
    let url = "https://www.linkedin.com/jobs/search/?keywords=" + info.selectionText;
    cases(url, tab);
})

function cases(url, tab) {
    browser.tabs.create({ "active": true, "url": url, "index": tab.index + 1 }).then(success, error);
}