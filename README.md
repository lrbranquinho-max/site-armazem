# Sistema de Armazém - Documentação

Este é um site de documentação para processos de armazém que permite visualizar documentos Word convertidos para HTML através de uma interface web moderna e responsiva.

## Funcionalidades

- **Menu de Navegação Lateral**: 8 itens de menu organizados por processo
- **Visualização de Documentos**: Documentos Word convertidos para HTML
- **Design Responsivo**: Funciona em desktop e dispositivos móveis
- **Interface Moderna**: Design com gradientes, efeitos hover e animações

## Estrutura do Projeto

```
site-armazem/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── docs/               # Documentos HTML convertidos
│   ├── CONFERENCIARECEBIMENTOCOLETOR.html
│   ├── ARMAZENAGEMDEPALETESHORIZONTAL.html
│   ├── ARMAZENAGEMDEPALETESVERTICAL.html
│   ├── TREINAMENTOSEPARAÇÃO.html
│   ├── RECONFERENCIAEXPEDIÇÃO.html
│   ├── BUSCAPENDÊNCIA.html
│   ├── CARREGAMENTO.html
│   └── INVENTARIOGERALCOLETOR.html
└── README.md           # Este arquivo
```

## Itens do Menu

1. **📋 Conferência Recebimento Coletor**
2. **📦 Armazenagem de Paletes Horizontal**
3. **📚 Armazenagem de Paletes Vertical**
4. **🎓 Treinamento Separação**
5. **✅ Reconferência Expedição**
6. **🔍 Busca Pendência**
7. **🚛 Carregamento**
8. **📊 Inventário Geral Coletor**

## Como Usar

### Executar Localmente

1. Navegue até o diretório do projeto:
   ```bash
   cd site-armazem
   ```

2. Inicie um servidor HTTP local:
   ```bash
   python3 -m http.server 8080
   ```

3. Abra o navegador e acesse:
   ```
   http://localhost:8080
   ```

### Navegação

- Clique em qualquer item do menu lateral para visualizar o documento correspondente
- Em dispositivos móveis, use o botão de menu (☰) para abrir/fechar o menu lateral
- Os documentos são carregados dinamicamente sem recarregar a página

## Características Técnicas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Gradientes, flexbox, grid, animações e responsividade
- **JavaScript ES6+**: Fetch API, async/await, DOM manipulation
- **Responsivo**: Breakpoints para tablet e mobile
- **Acessibilidade**: Navegação por teclado e foco visível
- **Performance**: Carregamento assíncrono de documentos

## Compatibilidade

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Personalização

### Cores e Temas

As cores principais podem ser alteradas no arquivo `styles.css`:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cores de destaque */
color: #2c3e50; /* Texto principal */
color: #7f8c8d; /* Texto secundário */
```

### Adicionar Novos Documentos

1. Converta o documento Word para HTML usando pandoc:
   ```bash
   pandoc -s documento.docx -o docs/documento.html
   ```

2. Adicione o item no menu em `index.html`:
   ```html
   <li>
       <a href="#" onclick="loadDocument('documento')" class="menu-item">
           <span class="menu-icon">📄</span>
           <span class="menu-text">Nome do Documento</span>
       </a>
   </li>
   ```

3. Adicione o mapeamento de título em `script.js`:
   ```javascript
   const titles = {
       'documento': 'Nome do Documento',
       // ... outros títulos
   };
   ```

## Suporte

Para questões técnicas ou melhorias, consulte a documentação dos arquivos individuais ou entre em contato com a equipe de desenvolvimento.
