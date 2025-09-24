// Função para carregar documentos
async function loadDocument(documentName) {
    const loading = document.getElementById('loading');
    const documentViewer = document.getElementById('document-viewer');
    
    // Mostrar loading
    loading.classList.add('show');
    
    // Remover classe active de todos os itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adicionar classe active ao item clicado
    event.target.closest('.menu-item').classList.add('active');
    
    try {
        // Simular delay de carregamento para melhor UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Carregar o documento HTML
        const response = await fetch(`docs/${documentName}.html`);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar documento: ${response.status}`);
        }
        
        const htmlContent = await response.text();
        
        // Extrair apenas o conteúdo do body do documento
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const bodyContent = doc.body.innerHTML;
        
        // Exibir o conteúdo no viewer
        documentViewer.innerHTML = `
            <div class="document-content">
                ${bodyContent}
            </div>
        `;
        
        // Scroll para o topo do documento
        documentViewer.scrollTop = 0;
        
    } catch (error) {
        console.error('Erro ao carregar documento:', error);
        documentViewer.innerHTML = `
            <div class="error-message">
                <h2>Erro ao Carregar Documento</h2>
                <p>Não foi possível carregar o documento "${getDocumentTitle(documentName)}". Verifique se o arquivo existe e tente novamente.</p>
                <div class="error-details">
                    <strong>Erro:</strong> ${error.message}
                </div>
            </div>
        `;
    } finally {
        // Esconder loading
        loading.classList.remove('show');
    }
}

// Função para obter o título amigável do documento
function getDocumentTitle(documentName) {
    const titles = {
        'CONFERENCIARECEBIMENTOCOLETOR': 'Conferência Recebimento Coletor',
        'ARMAZENAGEMDEPALETESHORIZONTAL': 'Armazenagem de Paletes Horizontal',
        'ARMAZENAGEMDEPALETESVERTICAL': 'Armazenagem de Paletes Vertical',
        'TREINAMENTOSEPARACAO': 'Treinamento Separação',
        'RECONFERENCIAEXPEDICAO': 'Reconferência Expedição',
        'BUSCAPENDENCIA': 'Busca Pendência',
        'CARREGAMENTO': 'Carregamento',
        'INVENTARIOGERALCOLETOR': 'Inventário Geral Coletor',
        'AbastecimentodePickings': 'Abastecimento de Pickings'
    };
    
    return titles[documentName] || documentName;
}

// Função para toggle do menu em dispositivos móveis
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Adicionar botão de menu para dispositivos móveis
function addMobileMenuButton() {
    const header = document.querySelector('header .container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.onclick = toggleMenu;
    
    // Adicionar estilos para o botão
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2c3e50;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
        }
        
        .error-message {
            text-align: center;
            padding: 3rem 2rem;
            color: #e74c3c;
        }
        
        .error-message h2 {
            color: #e74c3c;
            margin-bottom: 1rem;
        }
        
        .error-message p {
            color: #7f8c8d;
            margin-bottom: 1.5rem;
        }
        
        .error-details {
            background: #fdf2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            text-align: left;
            color: #991b1b;
        }
    `;
    
    document.head.appendChild(style);
    header.appendChild(menuButton);
}

// Fechar menu ao clicar fora dele em dispositivos móveis
function setupMobileMenuClose() {
    document.addEventListener('click', (event) => {
        const sidebar = document.querySelector('.sidebar');
        const menuButton = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(event.target) && 
            !menuButton.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    addMobileMenuButton();
    setupMobileMenuClose();
    
    // Adicionar event listeners para os itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar menu em dispositivos móveis após seleção
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    });
});

// Função para melhorar a acessibilidade
function setupAccessibility() {
    // Adicionar navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Fechar menu móvel com ESC
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
    
    // Adicionar foco visível para navegação por teclado
    const style = document.createElement('style');
    style.textContent = `
        .menu-item:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .mobile-menu-btn:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Configurar acessibilidade quando a página carrega
document.addEventListener('DOMContentLoaded', setupAccessibility);
