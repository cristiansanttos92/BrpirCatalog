<!-- Modal para Criação/Edição de Perfil -->
<div id="modal-profile" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modal-profile-title">Criar Perfil</h2>
            <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
            <form id="profile-form">
                <input type="hidden" id="profile-id">
                
                <div class="form-group">
                    <label for="profile-avatar">Avatar</label>
                    <div class="avatar-upload">
                        <div class="avatar-preview">
                            <img id="avatar-preview-img" src="assets/img/default-avatar.png" alt="Avatar Preview">
                        </div>
                        <input type="file" id="profile-avatar" accept="image/*">
                        <button type="button" class="btn-secondary" id="avatar-upload-btn">Escolher Imagem</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="profile-name">Nome do Perfil</label>
                    <input type="text" id="profile-name" required>
                </div>
                
                <div class="form-group">
                    <label for="profile-bio">Bio (opcional)</label>
                    <textarea id="profile-bio" rows="3"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="profile-cancel">Cancelar</button>
                    <button type="submit" class="btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>