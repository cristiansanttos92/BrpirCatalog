/**
 * Módulo de gerenciamento de perfis para o BrpirCatalog
 * Controla a exibição e interação com os perfis do usuário
 */

class ProfilesManager {
    constructor() {
        // Elementos do DOM
        this.profilesList = document.getElementById('profiles-list');
        this.createProfileBtn = document.getElementById('create-profile-btn');
        this.logoutBtn = document.getElementById('logout-btn');
        
        // Referência ao modal de perfil
        this.profileModal = window.profileModal;
        
        // Usuário atual
        this.currentUser = Storage.users.getCurrentUser();
        
        // Adicionar eventos
        this.createProfileBtn.addEventListener('click', () => this.handleCreateProfile());
        this.logoutBtn.addEventListener('click', () => logout());
        
        // Ouvir eventos de perfil salvo
        document.addEventListener('profileSaved', () => this.loadProfiles());
        
        // Carregar perfis
        this.loadProfiles();
    }
    
    // Carregar perfis do usuário atual
    loadProfiles() {
        if (!this.currentUser) {
            window.location.href = 'index.php';
            return;
        }
        
        const profiles = Storage.profiles.getByUserId(this.currentUser.id);
        
        // Limpar lista
        this.profilesList.innerHTML = '';
        
        if (profiles.length === 0) {
            this.profilesList.innerHTML = `
                <div class="empty-message">
                    <p>Você ainda não tem perfis.</p>
                    <p>Clique em "+ Criar Perfil" para começar.</p>
                </div>
            `;
            return;
        }
        
        // Renderizar cada perfil
        profiles.forEach(profile => {
            this.renderProfileCard(profile);
        });
    }
    
    // Renderizar card de perfil
    renderProfileCard(profile) {
        const card = document.createElement('div');
        card.className = 'profile-card';
        
        const avatar = profile.avatar || 'assets/img/default-avatar.png';
        
        card.innerHTML = `
            <img src="${avatar}" alt="${profile.name}" class="profile-avatar">
            <h3 class="profile-name">${profile.name}</h3>
            ${profile.bio ? `<p class="profile-bio">${profile.bio}</p>` : ''}
            <div class="profile-actions">
                <button class="btn-primary open-catalog">🕹️ Abrir Catálogo</button>
                <button class="btn-secondary edit-profile">✏️ Editar Perfil</button>
                <button class="btn-secondary delete-profile">🗑️ Excluir Perfil</button>
            </div>
        `;
        
        // Adicionar eventos aos botões
        const openCatalogBtn = card.querySelector('.open-catalog');
        const editProfileBtn = card.querySelector('.edit-profile');
        const deleteProfileBtn = card.querySelector('.delete-profile');
        
        openCatalogBtn.addEventListener('click', () => this.openCatalog(profile.id));
        editProfileBtn.addEventListener('click', () => this.editProfile(profile));
        deleteProfileBtn.addEventListener('click', () => this.deleteProfile(profile));
        
        this.profilesList.appendChild(card);
    }
    
    // Abrir catálogo de um perfil
    openCatalog(profileId) {
        window.location.href = `catalog.php?profile=${profileId}&mode=edit`;
    }
    
    // Editar perfil
    editProfile(profile) {
        this.profileModal.openForEdit(profile);
    }
    
    // Excluir perfil
    deleteProfile(profile) {
        const confirm = window.confirm(`Tem certeza que deseja excluir o perfil "${profile.name}"? Esta ação não pode ser desfeita e todos os jogos associados serão excluídos.`);
        
        if (confirm) {
            Storage.profiles.delete(profile.id);
            this.loadProfiles();
        }
    }
    
    // Lidar com criação de perfil
    handleCreateProfile() {
        this.profileModal.openForCreate();
    }
}

// Inicializar gerenciador de perfis quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de perfis
    if (window.location.pathname.endsWith('home.php')) {
        window.profilesManager = new ProfilesManager();
    }
});