// Função para mostrar a página específica
function showPage(pageNumber) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Mostra a página solicitada
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.style.display = 'block';
        // Rola para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    const currentPage = document.querySelector('.page[style="display: block;"], .page:not([style*="display: none"])');
    
    if (!currentPage) return;
    
    const currentPageId = currentPage.id;
    const currentPageNumber = parseInt(currentPageId.replace('page', ''));
    
    // Seta direita ou espaço - próxima página
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        if (currentPageNumber < 2) {
            showPage(currentPageNumber + 1);
        }
    }
    
    // Seta esquerda - página anterior
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (currentPageNumber > 1) {
            showPage(currentPageNumber - 1);
        }
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Garante que a primeira página esteja visível
    showPage(1);

    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Sempre inicia em modo claro
    document.body.classList.remove('dark-mode');
    darkModeIcon.classList.remove('fa-sun');
    darkModeIcon.classList.add('fa-moon');
    localStorage.removeItem('darkMode');

    // Adiciona o evento de clique
    darkModeToggle.addEventListener('click', () => {
        // Toggle da classe dark-mode
        document.body.classList.toggle('dark-mode');
        
        // Toggle do ícone
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    });
});

