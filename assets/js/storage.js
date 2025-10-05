// Modificação do storage.js para usar Supabase
class Storage {
  // Métodos para usuários
  static async getUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;// Exemplo de upload de avatar
async function uploadAvatar(file, profileId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${profileId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  const { error } = await supabase.storage
    .from('brpircatalog')
    .upload(filePath, file, { upsert: true });
  
  if (error) throw error;
  
  const { data } = supabase.storage.from('brpircatalog').getPublicUrl(filePath);
  return data.publicUrl;
}
    return data;
  }
  
  static async saveUser(user) {
    const { data, error } = await supabase.from('users').insert(user).select();
    if (error) throw error;
    return data[0];
  }
  
  // Métodos para perfis
  static async getProfiles(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
  
  // ... outros métodos para perfis e jogos
}/**
 * Módulo de armazenamento para o BrpirCatalog
 * Gerencia o armazenamento e recuperação de dados do localStorage
 */

const Storage = {
    // Chaves de armazenamento
    keys: {
        USERS: 'users',
        CURRENT_USER: 'currentUser',
        PROFILES: 'profiles',
        GAMES: 'games'
    },
    
    // Métodos para usuários
    users: {
        getAll: function() {
            return JSON.parse(localStorage.getItem(Storage.keys.USERS)) || [];
        },
        save: function(users) {
            localStorage.setItem(Storage.keys.USERS, JSON.stringify(users));
        },
        getCurrentUser: function() {
            return JSON.parse(localStorage.getItem(Storage.keys.CURRENT_USER)) || null;
        },
        setCurrentUser: function(user) {
            localStorage.setItem(Storage.keys.CURRENT_USER, JSON.stringify(user));
        },
        logout: function() {
            localStorage.removeItem(Storage.keys.CURRENT_USER);
        }
    },
    
    // Métodos para perfis
    profiles: {
        getAll: function() {
            return JSON.parse(localStorage.getItem(Storage.keys.PROFILES)) || [];
        },
        getByUserId: function(userId) {
            const profiles = Storage.profiles.getAll();
            return profiles.filter(profile => profile.userId === userId);
        },
        getById: function(profileId) {
            const profiles = Storage.profiles.getAll();
            return profiles.find(profile => profile.id === profileId) || null;
        },
        save: function(profile) {
            const profiles = Storage.profiles.getAll();
            const index = profiles.findIndex(p => p.id === profile.id);
            
            if (index !== -1) {
                // Atualizar perfil existente
                profiles[index] = profile;
            } else {
                // Adicionar novo perfil
                profiles.push(profile);
            }
            
            localStorage.setItem(Storage.keys.PROFILES, JSON.stringify(profiles));
            return profile;
        },
        delete: function(profileId) {
            let profiles = Storage.profiles.getAll();
            profiles = profiles.filter(profile => profile.id !== profileId);
            localStorage.setItem(Storage.keys.PROFILES, JSON.stringify(profiles));
            
            // Também excluir jogos associados a este perfil
            Storage.games.deleteByProfileId(profileId);
        }
    },
    
    // Métodos para jogos
    games: {
        getAll: function() {
            return JSON.parse(localStorage.getItem(Storage.keys.GAMES)) || [];
        },
        getByProfileId: function(profileId) {
            const games = Storage.games.getAll();
            return games.filter(game => game.profileId === profileId);
        },
        getById: function(gameId) {
            const games = Storage.games.getAll();
            return games.find(game => game.id === gameId) || null;
        },
        save: function(game) {
            const games = Storage.games.getAll();
            const index = games.findIndex(g => g.id === game.id);
            
            if (index !== -1) {
                // Atualizar jogo existente
                games[index] = game;
            } else {
                // Adicionar novo jogo
                games.push(game);
            }
            
            localStorage.setItem(Storage.keys.GAMES, JSON.stringify(games));
            return game;
        },
        delete: function(gameId) {
            let games = Storage.games.getAll();
            games = games.filter(game => game.id !== gameId);
            localStorage.setItem(Storage.keys.GAMES, JSON.stringify(games));
        },
        deleteByProfileId: function(profileId) {
            let games = Storage.games.getAll();
            games = games.filter(game => game.profileId !== profileId);
            localStorage.setItem(Storage.keys.GAMES, JSON.stringify(games));
        }
    },
    
    // Método para inicializar o armazenamento com dados padrão se necessário
    init: function() {
        // Verificar se já existem usuários
        const users = Storage.users.getAll();
        if (users.length === 0) {
            // Criar estruturas vazias iniciais
            localStorage.setItem(Storage.keys.USERS, JSON.stringify([]));
            localStorage.setItem(Storage.keys.PROFILES, JSON.stringify([]));
            localStorage.setItem(Storage.keys.GAMES, JSON.stringify([]));
        }
    }
};

// Inicializar o armazenamento quando o script for carregado
Storage.init();