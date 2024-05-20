/**
 * Cria uma notificação no navegador.
 * 
 * @param {string} title - O título da notificação.
 * @param {string} message - A mensagem da notificação.
 */
function notifications(title, message) {
    browser.notifications.create({
        type:"basic",
        title: title,
        message: message
    })
}

/**
 * Callback para a criação do menu de contexto.
 * 
 * Cria uma notificação indicando sucesso ou erro ao criar o menu.
 */
function onCreated() {
    if (browser.runtime.lastError) {
        notifications("Erro", browser.runtime.lastError);
    } else {
        notifications("Info", "Menu criado com sucesso");
    }
}

/**
 * Callback de sucesso para a criação de uma nova aba.
 * 
 * Cria uma notificação informando que a atualização da página de pesquisa foi bem-sucedida.
 */
function success() {
    notifications("Info", "Atualização bem-sucedida da página de pesquisa");
}

/**
 * Callback de erro para a criação de uma nova aba.
 * 
 * @param {Error} error - O erro ocorrido durante a criação da nova aba.
 * 
 * Cria uma notificação informando o erro ao executar a busca.
 */
function error(error) {
    notifications("Erro", `Erro ao executar a busca : ${error}`)
}

/**
 * Cria um item no menu de contexto que aparece ao selecionar texto.
 * 
 * O item do menu de contexto permite buscar o texto selecionado no LinkedIn.
 */
browser.menus.create({
    id: "linkedIn",
    title: "Buscar no LinkedIn",
    contexts: ["selection"]
}, onCreated)

/**
 * Listener para cliques no item do menu de contexto.
 * 
 * @param {Object} info - Informações sobre o item do menu e o contexto do clique.
 * @param {Object} tab - A aba onde o clique ocorreu.
 * 
 * Constrói a URL de busca no LinkedIn com o texto selecionado e chama a função `cases`.
 */
browser.menus.onClicked.addListener((info, tab) => {
    let url = "https://www.linkedin.com/jobs/search/?keywords=" + info.selectionText;
    cases(url, tab);
})

/**
 * Abre uma nova aba com a URL de busca no LinkedIn.
 * 
 * @param {string} url - A URL para abrir na nova aba.
 * @param {Object} tab - A aba atual a partir da qual a nova aba será aberta.
 * 
 * Abre uma nova aba ao lado da aba atual e define callbacks para sucesso e erro.
 */
function cases(url, tab) {
    browser.tabs.create({ "active": true, "url": url, "index": tab.index + 1 }).then(success, error);
}