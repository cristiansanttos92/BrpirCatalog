/**
 * Módulo de gerenciamento de modais para o BrpirCatalog
 * Controla a exibição e interação com os modais da aplicação
 */

class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.isOpen = false;
        
        // Adicionar eventos
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Fechar ao clicar fora do modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }
    
    open() {
        this.modal.classList.add('show');
        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Impedir rolagem do body
    }
    
    close() {
        this.modal.classList.remove('show');
        this.isOpen = false;
        document.body.style.overflow = ''; // Restaurar rolagem do body
    }
    
    setTitle(title) {
        const titleElement = this.modal.querySelector('h2');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }
}

// Modal de Perfil
class ProfileModal extends Modal {
    constructor() {
        super('modal-profile');
        
        // Elementos do formulário
        this.form = document.getElementById('profile-form');
        this.idInput = document.getElementById('profile-id');
        this.nameInput = document.getElementById('profile-name');
        this.bioInput = document.getElementById('profile-bio');
        this.avatarInput = document.getElementById('profile-avatar');
        this.avatarPreview = document.getElementById('avatar-preview-img');
        this.avatarUploadBtn = document.getElementById('avatar-upload-btn');
        this.cancelBtn = document.getElementById('profile-cancel');
        
        // Dados do perfil atual
        this.currentProfile = null;
        this.avatarBase64 = null;
        
        // Adicionar eventos
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.close());
        this.avatarUploadBtn.addEventListener('click', () => this.avatarInput.click());
        this.avatarInput.addEventListener('change', (e) => this.handleAvatarChange(e));
    }
    
    // Abrir modal para criar novo perfil
    openForCreate() {
        this.setTitle('Criar Perfil');
        this.resetForm();
        this.open();
    }
    
    // Abrir modal para editar perfil existente
    openForEdit(profile) {
        this.setTitle('Editar Perfil');
        this.currentProfile = profile;
        
        // Preencher formulário
        this.idInput.value = profile.id;
        this.nameInput.value = profile.name;
        this.bioInput.value = profile.bio || '';
        
        // Exibir avatar
        if (profile.avatar) {
            this.avatarPreview.src = profile.avatar;
            this.avatarBase64 = profile.avatar;
        } else {
            this.avatarPreview.src = 'assets/img/default-avatar.png';
            this.avatarBase64 = null;
        }
        
        this.open();
    }
    
    // Resetar formulário
    resetForm() {
        this.form.reset();
        this.idInput.value = '';
        this.avatarPreview.src = 'assets/img/default-avatar.png';
        this.avatarBase64 = null;
        this.currentProfile = null;
    }
    
    // Lidar com mudança de avatar
    handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            Utils.imageToBase64(file, (base64) => {
                this.avatarPreview.src = base64;
                this.avatarBase64 = base64;
            });
        }
    }
    
    // Lidar com envio do formulário
    handleSubmit(e) {
        e.preventDefault();
        
        const name = this.nameInput.value.trim();
        const bio = this.bioInput.value.trim();
        
        if (!name) {
            alert('Por favor, informe o nome do perfil.');
            return;
        }
        
        const currentUser = Storage.users.getCurrentUser();
        if (!currentUser) {
            alert('Você precisa estar logado para criar um perfil.');
            return;
        }
        
        // Criar ou atualizar perfil
        const profileData = {
            id: this.idInput.value || Utils.generateId(),
            userId: currentUser.id,
            name: name,
            bio: bio,
            avatar: this.avatarBase64,
            createdAt: this.idInput.value ? (this.currentProfile?.createdAt || Date.now()) : Date.now(),
            updatedAt: Date.now()
        };
        
        // Salvar no storage
        const savedProfile = Storage.profiles.save(profileData);
        
        // Fechar modal
        this.close();
        
        // Disparar evento de perfil salvo
        const event = new CustomEvent('profileSaved', { detail: savedProfile });
        document.dispatchEvent(event);
    }
}

// Modal de Jogo
class GameModal extends Modal {
    constructor() {
        super('modal-game');
        
        // Elementos do formulário serão inicializados quando o modal for criado na página de catálogo
    }
    
    // Inicializar elementos do formulário
    initElements() {
        // Elementos do formulário
        this.form = document.getElementById('game-form');
        this.idInput = document.getElementById('game-id');
        this.nameInput = document.getElementById('game-name');
        this.statusSelect = document.getElementById('game-status');
        this.platformSelect = document.getElementById('game-platform');
        this.subplatformSelect = document.getElementById('game-subplatform');
        this.notesInput = document.getElementById('game-notes');
        this.coverInput = document.getElementById('game-cover');
        this.coverPreview = document.getElementById('cover-preview-img');
        this.coverUploadBtn = document.getElementById('cover-upload-btn');
        this.cancelBtn = document.getElementById('game-cancel');
        this.ratingContainer = document.getElementById('rating-stars');
        this.ratingStars = this.ratingContainer.querySelectorAll('.rating-star');
        
        // Dados do jogo atual
        this.currentGame = null;
        this.coverBase64 = null;
        this.currentRating = 0;
        this.profileId = null;
        
        // Adicionar eventos
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.close());
        this.coverUploadBtn.addEventListener('click', () => this.coverInput.click());
        this.coverInput.addEventListener('change', (e) => this.handleCoverChange(e));
        
        // Evento para plataforma
        this.platformSelect.addEventListener('change', () => this.updateSubplatforms());
        
        // Eventos para estrelas de classificação
        this.ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => this.setRating(index + 1));
        });
    }
    
    // Definir o ID do perfil atual
    setProfileId(profileId) {
        this.profileId = profileId;
    }
    
    // Abrir modal para criar novo jogo
    openForCreate() {
        if (!this.form) this.initElements();
        
        this.setTitle('Adicionar Jogo');
        this.resetForm();
        this.updateSubplatforms();
        this.open();
    }
    
    // Abrir modal para editar jogo existente
    openForEdit(game) {
        if (!this.form) this.initElements();
        
        this.setTitle('Editar Jogo');
        this.currentGame = game;
        
        // Preencher formulário
        this.idInput.value = game.id;
        this.nameInput.value = game.name;
        this.statusSelect.value = game.status;
        this.platformSelect.value = game.platform;
        this.updateSubplatforms();
        this.subplatformSelect.value = game.subplatform;
        this.notesInput.value = game.notes || '';
        
        // Definir classificação
        this.setRating(game.rating || 0);
        
        // Exibir capa
        if (game.cover) {
            this.coverPreview.src = game.cover;
            this.coverBase64 = game.cover;
        } else {
            this.coverPreview.src = 'assets/img/default-cover.png';
            this.coverBase64 = null;
        }
        
        this.open();
    }
    
    // Resetar formulário
    resetForm() {
        this.form.reset();
        this.idInput.value = '';
        this.coverPreview.src = 'assets/img/default-cover.png';
        this.coverBase64 = null;
        this.currentGame = null;
        this.setRating(0);
    }
    
    // Atualizar subplataformas com base na plataforma selecionada
    updateSubplatforms() {
        const platform = this.platformSelect.value;
        this.subplatformSelect.innerHTML = '';
        
        let options = [];
        
        switch (platform) {
            case 'PlayStation':
                options = ['PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PSP', 'PS Vita'];
                break;
            case 'Xbox':
                options = ['Xbox Clássico', 'Xbox 360', 'Xbox One', 'Xbox Series'];
                break;
            case 'Nintendo':
                options = ['NES', 'SNES', 'N64', 'GameCube', 'Wii', 'Wii U', 'Switch', 'Switch 2', '3DS'];
                break;
            case 'PC':
                options = ['Windows', 'Linux', 'Mac'];
                break;
            case 'Outros':
                // Adicionar campo de texto para entrada livre
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'custom-subplatform';
                input.placeholder = 'Especifique a plataforma';
                this.subplatformSelect.parentNode.replaceChild(input, this.subplatformSelect);
                this.subplatformSelect = input;
                return;
        }
        
        // Adicionar opções ao select
        options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            this.subplatformSelect.appendChild(optElement);
        });
    }
    
    // Lidar com mudança de capa
    handleCoverChange(e) {
        const file = e.target.files[0];
        if (file) {
            Utils.imageToBase64(file, (base64) => {
                this.coverPreview.src = base64;
                this.coverBase64 = base64;
            });
        }
    }
    
    // Definir classificação
    setRating(rating) {
        this.currentRating = rating;
        
        // Atualizar estrelas
        this.ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Lidar com envio do formulário
    handleSubmit(e) {
        e.preventDefault();
        
        const name = this.nameInput.value.trim();
        const status = this.statusSelect.value;
        const platform = this.platformSelect.value;
        let subplatform;
        
        // Obter subplataforma (pode ser select ou input)
        if (platform === 'Outros') {
            subplatform = document.getElementById('custom-subplatform').value.trim();
        } else {
            subplatform = this.subplatformSelect.value;
        }
        
        const notes = this.notesInput.value.trim();
        
        if (!name) {
            alert('Por favor, informe o nome do jogo.');
            return;
        }
        
        if (!this.profileId) {
            alert('Erro: ID do perfil não definido.');
            return;
        }
        
        // Criar ou atualizar jogo
        const gameData = {
            id: this.idInput.value || Utils.generateId(),
            profileId: this.profileId,
            name: name,
            status: status,
            platform: platform,
            subplatform: subplatform,
            notes: notes,
            rating: this.currentRating,
            cover: this.coverBase64,
            createdAt: this.idInput.value ? (this.currentGame?.createdAt || Date.now()) : Date.now(),
            updatedAt: Date.now()
        };
        
        // Salvar no storage
        const savedGame = Storage.games.save(gameData);
        
        // Fechar modal
        this.close();
        
        // Disparar evento de jogo salvo
        const event = new CustomEvent('gameSaved', { detail: savedGame });
        document.dispatchEvent(event);
    }
}

// Inicializar modal de perfil quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de perfis
    if (window.location.pathname.endsWith('home.php')) {
        window.profileModal = new ProfileModal();
    }
    
    // O modal de jogos será inicializado na página de catálogo
});