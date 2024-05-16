function onCreated() {
    if (browser.runtime.lastError) {
        console.error(`Erro ao criar o menu : ${browser.runtime.lastError}`);
    } else {
        console.info("Menu criado com sucesso");
    }
}

function success() {
    console.info("Atualização bem-sucedida da página de pesquisa");
}

function error(error) {
    console.error(`Erro ao executar a busca : ${error}`)
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