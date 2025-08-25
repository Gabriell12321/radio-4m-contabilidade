// ====== SISTEMA DE PONTOS TURÍSTICOS ======

// Função para filtrar pontos turísticos
function filtrarPontos(categoria) {
    const pontos = document.querySelectorAll('.ponto-card');
    const buttons = document.querySelectorAll('.turismo-filters .filter-btn');
    
    // Atualizar botões ativos
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-categoria="${categoria}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Filtrar pontos com animação
    pontos.forEach((ponto, index) => {
        const pontoCategoria = ponto.getAttribute('data-categoria');
        
        if (categoria === 'todos' || pontoCategoria === categoria) {
            ponto.style.display = 'block';
            setTimeout(() => {
                ponto.style.opacity = '1';
                ponto.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            ponto.style.opacity = '0';
            ponto.style.transform = 'translateY(20px)';
            setTimeout(() => {
                ponto.style.display = 'none';
            }, 300);
        }
    });
}

// Animação de contadores estatísticos
function animateCounters() {
    const counters = document.querySelectorAll('.turismo-stats .stat-number');
    counters.forEach(counter => {
        const text = counter.textContent;
        const isPlus = text.includes('+');
        const target = parseInt(text.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + (isPlus ? '+' : '');
            }
        }, 100); // Aumentado para 100ms para reduzir carga
    });
}

// Adicionar efeitos hover aos cards
function addCardEffects() {
    const cards = document.querySelectorAll('.ponto-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Adicionar click event para mostrar mais detalhes
        card.addEventListener('click', function() {
            const titulo = this.querySelector('h3').textContent;
            const descricao = this.querySelector('.ponto-descricao').textContent;
            const categoria = this.getAttribute('data-categoria');
            
            alert(`${titulo}\n\nCategoria: ${categoria}\n\n${descricao}\n\n🚧 Modal de detalhes em desenvolvimento!`);
        });
    });
}

// Adicionar CSS de animação
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .ponto-card {
            transition: all 0.3s ease;
            opacity: 1;
            transform: translateY(0);
        }
        
        .turismo-filters .filter-btn.active {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.6);
            transform: translateY(-2px);
        }
        
        .floating-tour {
            animation: float-work 6s ease-in-out infinite;
        }
        
        @keyframes float-work {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar sistema quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a seção de turismo existe
    const turismoSection = document.querySelector('.turismo-section');
    if (!turismoSection) {
        console.log('Seção de turismo não encontrada');
        return;
    }
    
    console.log('🏞️ Sistema de Pontos Turísticos Inicializado');
    
    // Adicionar estilos de animação
    addAnimationStyles();
    
    // Adicionar efeitos aos cards
    addCardEffects();
    
    // Observador para animar contadores quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observar seção de estatísticas
    const statsSection = document.querySelector('.turismo-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Inicializar com todos os pontos visíveis
    filtrarPontos('todos');
}); 