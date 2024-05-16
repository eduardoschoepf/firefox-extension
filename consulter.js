function onCreated() {
    if (browser.runtime.lastError) {
        console.error(`Erreur lors de la création d'un élément : ${browser.runtime.lastError}`);
    } else {
        console.info("L'élément a été créé avec succès");
    }
}

function success() {
    console.info("Onglet mis à jour");
}

function error(error) {
    console.error(`Erreur : ${error}`)
}

browser.menus.create({
    id: "id_example",
    title: "title example",
    contexts: ["selection"]
}, onCreated)

browser.menus.onClicked.addListener((info, tab) => {
    let url = "";
    cases(url, tab);
})

function cases(url, tab) {
    browser.tabs.create({ "active": true, "url": url, "index": tab.index + 1 }).then(success, error);
}