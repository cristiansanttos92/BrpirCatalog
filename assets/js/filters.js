/**
 * Módulo de filtros para o BrpirCatalog
 * Fornece funcionalidades de filtragem para o catálogo de jogos
 */

class FiltersManager {
    constructor(catalogManager) {
        this.catalogManager = catalogManager;
        
        // Elementos do DOM
        this.searchInput = document.getElementById('search-input');
        this.platformFilter = document.getElementById('platform-filter');
        this.statusFilter = document.getElementById('status-filter');
        
        // Adicionar eventos
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.platformFilter.addEventListener('change', () => this.applyFilters());
        this.statusFilter.addEventListener('change', () => this.applyFilters());
        
        // Inicializar filtros
        this.initFilters();
    }
    
    // Inicializar filtros com opções baseadas nos dados existentes
    initFilters() {
        // Obter todos os jogos do perfil atual
        const games = this.catalogManager.allGames;
        
        // Extrair plataformas únicas
        const platforms = [...new Set(games.map(game => game.platform))];
        
        // Extrair status únicos
        const statuses = [...new Set(games.map(game => game.status))];
        
        // Preencher filtro de plataforma
        this.populateFilter(this.platformFilter, platforms, 'Todas as Plataformas');
        
        // Preencher filtro de status
        this.populateFilter(this.statusFilter, statuses, 'Todos os Status');
    }
    
    // Preencher um filtro com opções
    populateFilter(selectElement, options, defaultOption) {
        // Manter apenas a opção padrão
        selectElement.innerHTML = `<option value="">${defaultOption}</option>`;
        
        // Adicionar opções
        options.sort().forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            selectElement.appendChild(optElement);
        });
    }
    
    // Aplicar filtros
    applyFilters() {
        this.catalogManager.applyFilters();
    }
}

// A inicialização é feita pelo CatalogManager