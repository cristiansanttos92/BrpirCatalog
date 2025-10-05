/**
 * Script principal do BrpirCatalog
 * Contém funcionalidades comuns a todas as páginas
 */

// Criar botão de alternar modo escuro
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de alternar modo escuro
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    document.body.appendChild(darkModeToggle);
    
    // Adicionar evento de clique
    darkModeToggle.addEventListener('click', function() {
        Utils.toggleDarkMode();
    });
    
    // Verificar se estamos na página de autenticação
    const isAuthPage = window.location.pathname.endsWith('index.php');
    
    // Se não estiver na página de autenticação, verificar se o usuário está logado
    if (!isAuthPage) {
        Utils.requireAuth();
    }
});

// Função para fazer logout
function logout() {
    Storage.users.logout();
    window.location.href = 'index.php';
}