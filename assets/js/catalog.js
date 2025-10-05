/**
 * Módulo de gerenciamento do catálogo de jogos para o BrpirCatalog
 * Controla a exibição e interação com os jogos de um perfil
 */

class CatalogManager {
    constructor() {
        // Elementos do DOM
        this.gamesContainer = document.getElementById('games-container');
        this.backBtn = document.getElementById('back-btn');
        this.addGameBtn = document.getElementById('add-game-btn');
        this.viewToggleBtn = document.getElementById('view-toggle-btn');
        this.searchInput = document.getElementById('search-input');
        this.platformFilter = document.getElementById('platform-filter');
        this.statusFilter = document.getElementById('status-filter');
        this.profileAvatar = document.getElementById('profile-avatar');
        this.profileName = document.getElementById('profile-name');
        this.profileBio = document.getElementById('profile-bio');
        
        // Referência ao modal de jogo
        this.gameModal = window.gameModal;
        
        // Parâmetros da URL
        this.urlParams = Utils.getUrlParams();
        this.profileId = this.urlParams.profile;
        this.viewMode = this.urlParams.mode || 'view'; // 'edit' ou 'view'
        
        // Verificar se temos um ID de perfil
        if (!this.profileId) {
            window.location.href = 'home.php';
            return;
        }
        
        // Carregar perfil
        this.profile = Storage.profiles.getById(this.profileId);
        if (!this.profile) {
            alert('Perfil não encontrado!');
            window.location.href = 'home.php';
            return;
        }
        
        // Verificar permissões
        this.currentUser = Storage.users.getCurrentUser();
        const isOwner = this.currentUser && this.profile.userId === this.currentUser.id;
        
        // Se o modo for 'edit' mas o usuário não é o dono, forçar modo 'view'
        if (this.viewMode === 'edit' && !isOwner) {
            this.viewMode = 'view';
        }
        
        // Configurar o modal de jogo
        this.gameModal.setProfileId(this.profileId);
        
        // Esconder botão de adicionar jogo se estiver no modo visualização
        if (this.viewMode === 'view') {
            this.addGameBtn.style.display = 'none';
        }
        
        // Adicionar eventos
        this.backBtn.addEventListener('click', () => this.goBack());
        this.addGameBtn.addEventListener('click', () => this.handleAddGame());
        this.viewToggleBtn.addEventListener('click', () => this.toggleView());
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.platformFilter.addEventListener('change', () => this.applyFilters());
        this.statusFilter.addEventListener('change', () => this.applyFilters());
        
        // Ouvir eventos de jogo salvo
        document.addEventListener('gameSaved', () => this.loadGames());
        
        // Carregar informações do perfil
        this.loadProfileInfo();
        
        // Carregar jogos
        this.loadGames();
        
        // Definir visualização padrão (grade)
        this.currentView = localStorage.getItem('catalogView') || 'grid';
        this.applyViewMode();
    }
    
    // Carregar informações do perfil
    loadProfileInfo() {
        this.profileAvatar.src = this.profile.avatar || 'assets/img/default-avatar.png';
        this.profileName.textContent = this.profile.name;
        
        if (this.profile.bio) {
            this.profileBio.textContent = this.profile.bio;
            this.profileBio.style.display = 'block';
        } else {
            this.profileBio.style.display = 'none';
        }
    }
    
    // Carregar jogos do perfil atual
    loadGames() {
        const games = Storage.games.getByProfileId(this.profileId);
        this.allGames = games; // Armazenar todos os jogos para filtragem
        
        // Aplicar filtros atuais
        this.applyFilters();
    }
    
    // Aplicar filtros aos jogos
    applyFilters() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const platformFilter = this.platformFilter.value;
        const statusFilter = this.statusFilter.value;
        
        // Filtrar jogos
        let filteredGames = this.allGames;
        
        // Aplicar filtro de busca
        if (searchTerm) {
            filteredGames = filteredGames.filter(game => 
                game.name.toLowerCase().includes(searchTerm) ||
                (game.notes && game.notes.toLowerCase().includes(searchTerm))
            );
        }
        
        // Aplicar filtro de plataforma
        if (platformFilter) {
            filteredGames = filteredGames.filter(game => game.platform === platformFilter);
        }
        
        // Aplicar filtro de status
        if (statusFilter) {
            filteredGames = filteredGames.filter(game => game.status === statusFilter);
        }
        
        // Renderizar jogos filtrados
        this.renderGames(filteredGames);
    }
    
    // Renderizar jogos
    renderGames(games) {
        // Limpar container
        this.gamesContainer.innerHTML = '';
        
        if (games.length === 0) {
            this.gamesContainer.innerHTML = `
                <div class="empty-message">
                    <p>Nenhum jogo encontrado.</p>
                    ${this.viewMode === 'edit' ? '<p>Clique em "+ Adicionar Jogo" para começar.</p>' : ''}
                </div>
            `;
            return;
        }
        
        // Renderizar cada jogo
        games.forEach(game => {
            this.renderGameCard(game);
        });
    }
    
    // Renderizar card de jogo
    renderGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        const cover = game.cover || 'assets/img/default-cover.png';
        
        // Gerar estrelas para a avaliação
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= game.rating ? 'active' : '';
            ratingStars += `<span class="star ${starClass}">★</span>`;
        }
        
        card.innerHTML = `
            <img src="${cover}" alt="${game.name}" class="game-cover">
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <div class="game-meta">
                    <span class="game-status">${game.status}</span>
                    <span class="game-platform">${game.platform} ${game.subplatform ? `(${game.subplatform})` : ''}</span>
                </div>
                <div class="game-rating">${ratingStars}</div>
                ${game.notes ? `<p class="game-description">${game.notes}</p>` : ''}
                ${this.viewMode === 'edit' ? `
                    <div class="game-actions">
                        <button class="btn-icon edit-game">✏️</button>
                        <button class="btn-icon delete-game">🗑️</button>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Adicionar eventos aos botões (apenas no modo edição)
        if (this.viewMode === 'edit') {
            const editGameBtn = card.querySelector('.edit-game');
            const deleteGameBtn = card.querySelector('.delete-game');
            
            editGameBtn.addEventListener('click', () => this.editGame(game));
            deleteGameBtn.addEventListener('click', () => this.deleteGame(game));
        }
        
        this.gamesContainer.appendChild(card);
    }
    
    // Alternar entre visualização em grade e lista
    toggleView() {
        this.currentView = this.currentView === 'grid' ? 'list' : 'grid';
        localStorage.setItem('catalogView', this.currentView);
        this.applyViewMode();
    }
    
    // Aplicar modo de visualização atual
    applyViewMode() {
        if (this.currentView === 'grid') {
            this.gamesContainer.className = 'games-grid';
            document.body.classList.add('view-grid');
            document.body.classList.remove('view-list');
        } else {
            this.gamesContainer.className = 'games-list';
            document.body.classList.add('view-list');
            document.body.classList.remove('view-grid');
        }
    }
    
    // Voltar para a tela de perfis
    goBack() {
        window.location.href = 'home.php';
    }
    
    // Lidar com adição de jogo
    handleAddGame() {
        this.gameModal.openForCreate();
    }
    
    // Editar jogo
    editGame(game) {
        this.gameModal.openForEdit(game);
    }
    
    // Excluir jogo
    deleteGame(game) {
        const confirm = window.confirm(`Tem certeza que deseja excluir o jogo "${game.name}"? Esta ação não pode ser desfeita.`);
        
        if (confirm) {
            Storage.games.delete(game.id);
            this.loadGames();
        }
    }
}

// Inicializar gerenciador de catálogo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de catálogo
    if (window.location.pathname.endsWith('catalog.php')) {
        // Inicializar modal de jogo
        window.gameModal = new GameModal();
        
        // Inicializar gerenciador de catálogo
        window.catalogManager = new CatalogManager();
    }
});