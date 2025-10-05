<?php include 'includes/header.php'; ?>

<div class="auth-container">
    <div class="auth-logo">
        <img src="assets/img/logo.png" alt="BrpirCatalog Logo">
        <h1>🎮 BrpirCatalog</h1>
    </div>
    
    <div class="auth-forms">
        <!-- Formulário de Login (visível por padrão) -->
        <form id="login-form" class="auth-form active">
            <h2>Login</h2>
            <div class="form-group">
                <label for="login-email">Email/Usuário</label>
                <input type="text" id="login-email" required>
            </div>
            <div class="form-group">
                <label for="login-password">Senha</label>
                <input type="password" id="login-password" required>
            </div>
            <button type="submit" class="btn-primary">Entrar</button>
            <p class="form-switch">Não tem uma conta? <a href="#" id="show-register">Criar conta</a></p>
        </form>
        
        <!-- Formulário de Cadastro (oculto por padrão) -->
        <form id="register-form" class="auth-form">
            <h2>Criar Conta</h2>
            <div class="form-group">
                <label for="register-email">Email/Usuário</label>
                <input type="text" id="register-email" required>
            </div>
            <div class="form-group">
                <label for="register-password">Senha</label>
                <input type="password" id="register-password" required>
            </div>
            <div class="form-group">
                <label for="register-confirm-password">Confirmar Senha</label>
                <input type="password" id="register-confirm-password" required>
            </div>
            <button type="submit" class="btn-primary">Cadastrar</button>
            <p class="form-switch">Já tem uma conta? <a href="#" id="show-login">Entrar</a></p>
        </form>
    </div>
</div>

<?php include 'includes/footer.php'; ?>