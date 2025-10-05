/**
 * Módulo de utilitários para o BrpirCatalog
 * Contém funções auxiliares usadas em todo o aplicativo
 */

const Utils = {
    // Gerar ID único
    generateId: function() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    },
    
    // Formatar data
    formatDate: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR');
    },
    
    // Converter imagem para Base64
    imageToBase64: function(file, callback) {
        if (!file) {
            callback(null);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },
    
    // Validar se o usuário está logado
    requireAuth: function() {
        const currentUser = Storage.users.getCurrentUser();
        if (!currentUser) {
            window.location.href = 'index.php';
            return false;
        }
        return true;
    },
    
    // Alternar modo claro/escuro
    toggleDarkMode: function() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        
        // Salvar preferência
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        return isDarkMode;
    },
    
    // Aplicar modo claro/escuro com base na preferência salva
    applyDarkMode: function() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    },
    
    // Filtrar array por texto
    filterArrayByText: function(array, searchText, properties) {
        if (!searchText) return array;
        
        searchText = searchText.toLowerCase();
        return array.filter(item => {
            return properties.some(prop => {
                const value = item[prop];
                return value && value.toLowerCase().includes(searchText);
            });
        });
    },
    
    // Obter parâmetros da URL
    getUrlParams: function() {
        const params = {};
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }
        
        return params;
    },
    
    // Mostrar/ocultar elemento
    toggleElement: function(element, show) {
        if (show) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    },
    
    // Criar elemento HTML com atributos
    createElement: function(tag, attributes = {}, textContent = '') {
        const element = document.createElement(tag);
        
        // Definir atributos
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        
        // Definir conteúdo de texto
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    }
};

// Aplicar modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    Utils.applyDarkMode();
});