# Rádio Alo Voce - Sistema Completo

Sistema completo para rádio online com funcionalidades avançadas de administração, gerenciamento de conteúdo, eventos, vagas de emprego e muito mais.

## 🎯 Visão Geral

Este projeto é um sistema completo para uma rádio online chamada "Rádio Alo Voce", composto por múltiplos componentes integrados:

1. **Painel Administrativo** - Interface moderna para gerenciamento completo
2. **Site da Rádio** - Player de música com integração Spotify
3. **Portal de Empresas** - Sistema para anunciantes e parceiros
4. **Sistema de Login** - Autenticação segura para administradores

## 🚀 Componentes do Sistema

### 1. Painel Administrativo (`pages/admin.html`)
- Interface moderna com tema claro/escuro
- Dashboard com estatísticas em tempo real
- Gerenciamento de:
  - Propagandas
  - Notícias
  - Eventos
  - Falecimentos
  - Vagas de Emprego
  - Mural de Vendas
  - Promoções
  - Recados

### 2. Site da Rádio (`pages/radio.html`)
- Player de música com integração Spotify
- Anúncios dinâmicos
- Sistema de eventos
- Notícias e promoções
- Recados dos ouvintes

### 3. Portal de Empresas (`pages/empresas.html`)
- Sistema para anunciantes
- Cadastro de vagas
- Promoções e eventos
- Contato com a rádio

### 4. Sistema de Login (`pages/login.html`)
- Autenticação segura
- Sessões persistentes
- Recuperação de senha

## 📁 Estrutura do Projeto

```
radio-4m-contabilidade/
├── index.html                 # Página inicial do servidor
├── server.py                  # Servidor local Python
├── backup.bat                 # Script de backup
├── backup.ps1                 # Script de backup PowerShell
├── INSTRUCOES.txt             # Instruções de uso
├── [DIR] assets/              # Recursos (imagens, ícones)
│   ├── LOGO.png
│   └── logosemfundo.png
├── [DIR] css/                 # Arquivos de estilo
│   ├── turismo-styles.css
│   └── vagas-styles.css
├── [DIR] docs/                # Documentação
│   └── *.md
├── [DIR] js/                  # Scripts JavaScript
│   ├── admin-sistema.js
│   ├── eventos-system.js
│   ├── promocoes-system.js
│   ├── radio-anuncios-dinamicos.js
│   ├── recados-system.js
│   ├── turismo-system.js
│   ├── vagas-system.js
│   └── vendas-system.js
└── [DIR] pages/               # Páginas HTML
    ├── admin.html
    ├── empresas.html
    ├── login.html
    └── radio.html
```

## 🎨 Recursos Técnicos

### Frontend
- HTML5 semântico
- CSS3 com variáveis e animações
- JavaScript ES6+ (sem frameworks)
- Design responsivo mobile-first
- Ícones Font Awesome
- Gráficos Chart.js

### Backend (Simulado)
- Armazenamento em localStorage
- Sistema de sessão
- Dados persistentes no navegador

### Funcionalidades Avançadas
- Modo claro/escuro
- Sistema de busca em tempo real
- Filtros e ordenação
- Modais elegantes
- Sistema de notificações toast
- Backup de dados
- Sincronização automática

## 🛠️ Como Usar

### Acesso ao Sistema
1. **Painel Admin**: `pages/admin.html` (usuário: admin, senha: admin)
2. **Site da Rádio**: `pages/radio.html`
3. **Portal Empresas**: `pages/empresas.html`
4. **Login Admin**: `pages/login.html`

### Servidor Local
Para acessar o sistema na rede local:
1. Execute `server.py`
2. Acesse `http://localhost:8000` no navegador
3. Outros dispositivos na mesma rede podem acessar usando o IP local

### Funcionalidades Principais

#### Dashboard Administrativo
- Visão geral das métricas da rádio
- Gráficos de audiência e receita
- Atividades recentes
- Estatísticas em tempo real

#### Gerenciamento de Conteúdo
- **Propagandas**: Cadastro, aprovação e controle de anúncios
- **Notícias**: Publicação de notícias patrocinadas
- **Eventos**: Agenda completa de eventos da cidade
- **Falecimentos**: Notas de falecimento e condolências
- **Vagas**: Sistema de oportunidades de trabalho
- **Vendas**: Classificados de produtos e serviços
- **Promoções**: Ofertas e descontos das empresas
- **Recados**: Mensagens dos ouvintes

#### Sistema de Usuários
- Autenticação segura
- Perfis de administradores
- Controle de permissões
- Histórico de atividades

## 📱 Design e Experiência

### Interface Moderna
- Tema claro/escuro adaptável
- Microinterações e animações suaves
- Design responsivo para todos os dispositivos
- Sistema de notificações em tempo real

### Componentes Visuais
- Cards interativos com hover effects
- Gráficos animados
- Tabelas modernizadas
- Modais elegantes
- Badges de status
- Botões com feedback visual

## 🔧 Personalização

### Tema
- Toggle claro/escuro no header
- Cores personalizadas em CSS
- Fontes otimizadas

### Configurações
- Perfil de administrador
- Preferências de sistema
- Backup de dados

## 📈 Melhorias Recentes

### Interface
- Design moderno com gradientes
- Animações suaves e microinterações
- Sistema de notificações melhorado
- Gráficos interativos

### Funcionalidades
- Busca em tempo real
- Filtros avançados
- Sistema de backup
- Sincronização automática

### Performance
- Código otimizado
- Carregamento rápido
- Cache eficiente

## 🎯 Próximos Passos

### Fase 1 - Funcionalidades
- Drag & Drop para uploads
- Filtros avançados nas tabelas
- Exportar dados (PDF/Excel)
- Dashboard customizável

### Fase 2 - Visual
- Mais animações (Framer Motion style)
- Gradientes animados
- Parallax effects
- 3D transforms em cards

### Fase 3 - Features
- Real-time updates via WebSocket
- PWA - Funcionar offline
- Multi-idioma
- Atalhos de teclado

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Este projeto é de uso interno da Rádio Alo Voce.

---

**Desenvolvido com ❤️ para Rádio Alo Voce** 🎵