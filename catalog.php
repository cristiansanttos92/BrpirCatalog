<?php include 'includes/header.php'; ?>

<div class="catalog-container">
    <div class="catalog-header">
        <div class="profile-info">
            <img id="profile-avatar" src="assets/img/default-avatar.png" alt="Avatar do Perfil" class="profile-avatar">
            <div class="profile-details">
                <h2 id="profile-name">Nome do Perfil</h2>
                <p id="profile-bio" class="profile-bio">Bio do perfil</p>
            </div>
        </div>
        
        <div class="header-actions">
            <button id="back-btn" class="btn-secondary">← Voltar</button>
            <button id="view-toggle-btn" class="btn-secondary" title="Alternar visualização">
                <span class="grid-icon">⊞</span>
                <span class="list-icon">≡</span>
            </button>
            <button id="add-game-btn" class="btn-primary">+ Adicionar Jogo</button>
        </div>
    </div>
    
    <div class="catalog-filters">
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar jogos..." class="search-input">
        </div>
        
        <div class="filter-container">
            <select id="platform-filter" class="filter-select">
                <option value="">Todas as Plataformas</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo">Nintendo</option>
                <option value="PC">PC</option>
                <option value="Outros">Outros</option>
            </select>
            
            <select id="status-filter" class="filter-select">
                <option value="">Todos os Status</option>
                <option value="Jogando">Jogando</option>
                <option value="Completo">Completo</option>
                <option value="Abandonado">Abandonado</option>
                <option value="Desejo">Desejo</option>
                <option value="Backlog">Backlog</option>
            </select>
        </div>
    </div>
    
    <div id="games-container" class="games-grid">
        <!-- Os jogos serão renderizados aqui via JavaScript -->
        <div class="loading-message">Carregando jogos...</div>
    </div>
</div>

<!-- Incluir o modal de jogo -->
<div id="modal-game" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modal-game-title">Adicionar Jogo</h2>
            <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="game-form">
                <input type="hidden" id="game-id">
                
                <div class="form-group">
                    <label for="game-cover">Capa do Jogo</label>
                    <div class="cover-upload">
                        <div class="cover-preview">
                            <img id="cover-preview-img" src="assets/img/default-cover.png" alt="Capa do Jogo">
                        </div>
                        <input type="file" id="game-cover" accept="image/*">
                        <button type="button" class="btn-secondary" id="cover-upload-btn">Escolher Imagem</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="game-name">Nome do Jogo</label>
                    <input type="text" id="game-name" required>
                </div>
                
                <div class="form-group">
                    <label for="game-status">Status</label>
                    <select id="game-status" required>
                        <option value="Jogando">Jogando</option>
                        <option value="Completo">Completo</option>
                        <option value="Abandonado">Abandonado</option>
                        <option value="Desejo">Desejo</option>
                        <option value="Backlog">Backlog</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="game-platform">Plataforma</label>
                    <select id="game-platform" required>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="PC">PC</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="game-subplatform">Sub-plataforma</label>
                    <select id="game-subplatform" required>
                        <!-- Opções serão preenchidas via JavaScript -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Avaliação</label>
                    <div id="rating-stars" class="rating-container">
                        <span class="rating-star">★</span>
                        <span class="rating-star">★</span>
                        <span class="rating-star">★</span>
                        <span class="rating-star">★</span>
                        <span class="rating-star">★</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="game-notes">Descrição/Notas</label>
                    <textarea id="game-notes" rows="3"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="game-cancel">Cancelar</button>
                    <button type="submit" class="btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>