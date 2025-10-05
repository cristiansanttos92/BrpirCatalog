// Elementos do DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Alternar entre formulários
showRegisterLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Manipulação do formulário de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validação básica
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Verificar se o usuário existe no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Armazenar informação de login
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            email: user.email
        }));
        
        // Redirecionar para a página de perfis
        window.location.href = 'home.php';
    } else {
        alert('Email ou senha incorretos.');
    }
});

// Manipulação do formulário de registro
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validação básica
    if (!email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }
    
    // Verificar se o usuário já existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        alert('Este email já está em uso.');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        id: Date.now().toString(),
        email: email,
        password: password // Em uma aplicação real, a senha seria criptografada
    };
    
    // Adicionar ao localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Fazer login automático
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        email: newUser.email
    }));
    
    // Redirecionar para a página de perfis
    window.location.href = 'home.php';
});

// Verificar se o usuário já está logado
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        // Usuário já está logado, redirecionar para a página de perfis
        window.location.href = 'home.php';
    }
});