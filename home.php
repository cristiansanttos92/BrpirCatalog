<?php include 'includes/header.php'; ?>

<div class="profiles-container">
    <div class="profiles-header">
        <div class="logo-container">
            <img src="assets/img/logo.png" alt="BrpirCatalog Logo" class="logo">
            <h1>🎮 BrpirCatalog</h1>
        </div>
        <div class="header-actions">
            <button id="create-profile-btn" class="btn-primary">+ Criar Perfil</button>
            <button id="logout-btn" class="btn-secondary">Sair</button>
        </div>
    </div>
    
    <div class="profiles-list" id="profiles-list">
        <!-- Os perfis serão renderizados aqui via JavaScript -->
        <div class="loading-message">Carregando perfis...</div>
    </div>
</div>

<?php include 'includes/modal-profile.php'; ?>
<?php include 'includes/footer.php'; ?>