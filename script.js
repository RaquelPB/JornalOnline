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
document.addEventListener('DOMContentLoaded', function() {
    // Garante que a primeira página esteja visível
    showPage(1);
});

