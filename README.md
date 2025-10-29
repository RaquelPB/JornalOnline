# 📰 Mundo DEV — Jornal Web Responsivo - Avaliação UC2 Front-End

Mundo DEV é um site estilo jornal digital, desenvolvido como parte da **Avaliação Final das Unidades Curriculares UC1 e UC2 - Front-End**, do curso *Jovem Programador Senac*. A proposta simula um jornal impresso clássico, com visual elegante e navegação entre duas páginas.


## 📋 Descrição do Projeto

O projeto consiste em uma página web (somente Front-end) que replica o design de um jornal clássico, com:

- Layout elegante e profissional
- Tipografia serifada para simular impressão
- Duas páginas de conteúdo navegáveis
- Design totalmente responsivo
- Navegação por botões e teclado


## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização e layout responsivo (Grid Layout)
- **JavaScript**: Navegação entre páginas e interatividade


## 📁 Estrutura de Arquivos

```
mundo-dev/
├── index.html             # Página principal do jornal
├── styles.css             # Estilos gerais
├── patoStyle.css          # Estilo do pato animado (página 2)
├── script.js              # Scripts de navegação
├── animacaoCursor.js      # Animação de digitação no título
├── patoScript.js          # Script da animação do pato
├── assets/                # Imagens, ícones e vídeos
└── README.md              # Documentação do projeto
```


## 🎨 Destaques de Design

### Página 1 — Notícias
- Logotipo e título principal animado “MUNDO DEV”
- Artigo de destaque com imagem grande
- Artigo secundário com imagem
- Sessão de eventos e resumos em colunas

### Página 2 — Variedades
- Seções: Horóscopo DEV, Receita de café, Filmes temáticos
- Layout dinâmico com grid e imagens
- Elemento animado (pato tech) com balão de fala


## 🖱️ Navegação

### Por Botões
- Botão **→** (seta direita): Próxima página
- Botão **←** (seta esquerda): Página anterior

### Por Teclado
- **Seta Direita** ou **Espaço**: Próxima página
- **Seta Esquerda**: Página anterior


## 📱 Responsividade

A interface se adapta a todos os tamanhos de tela:

- **Desktop** (>1024px): layout em colunas múltiplas
- **Tablet** (768px - 1024px): colunas adaptadas
- **Mobile** (<768px): layout em coluna única, com imagens e texto otimizados


## 🔧 Como Usar

### Opção 1: Abrir Localmente
1. Baixe todos os arquivos
2. Abra `index.html` em seu navegador preferido

### Opção 2: Servidor Local
```bash
# Com Python 3
python3 -m http.server 5500

# Com Node.js (http-server)
npx http-server
```

Acesse `http://localhost:5500` no navegador.


## 📤 Deploy

Este projeto pode ser facilmente hospedado em:

- **GitHub Pages**: Faça upload para um repositório e ative o GitHub Pages
- **Netlify**: Arraste a pasta para o Netlify Drop
- **Vercel**: Conecte o repositório GitHub ao Vercel
- Qualquer servidor web estático


## 🧪 Considerações

- Algumas imagens e conteúdos são fictícios ou ilustrativos
- Todo o código é comentado e acessível para fins didáticos
- Desenvolvido sem frameworks (apenas HTML, CSS e JS puros)
- O projeto foi desenvolvido seguindo as especificações da avaliação


## 👨‍💻 Desenvolvimento

Projeto desenvolvido por:
- **Leiliane Costa** • https://github.com/leilianelcs
- **Raquel Pereira** • https://github.com/raquelpb
- **Gabriella Garcia** • https://github.com/Grcgabi07
- **Natashia Romanzini** • https://github.com/natashiaromanzini

Para a disciplina de Front-End do *Jovem Programador do Senac*, conforme requisitos da **AVALIAÇÃO FINAL - UC1 & UC2**.

## 📅 Conclusão: 29 de outubro de 2025

---
## ✅ Licença

Projeto acadêmico, livre para fins de estudo e demonstração.
Orientado por **Regina Gravina**