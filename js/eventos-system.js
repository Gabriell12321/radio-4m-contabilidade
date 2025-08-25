// 📅 SISTEMA DE EVENTOS COM SINCRONIZAÇÃO ADMIN
// =============================================

class EventosSystem {
    constructor() {
        this.eventos = [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isAutoPlaying = false;
        this.lastSyncTimestamp = null;
        this.elementos = {
            wrapper: document.getElementById('eventosCarouselWrapper'),
            indicators: document.getElementById('eventosIndicators'),
            prevBtn: document.getElementById('eventosPrevBtn'),
            nextBtn: document.getElementById('eventosNextBtn'),
            controls: document.getElementById('eventosControls'),
            counter: document.getElementById('eventosCounter')
        };
        
        console.log('📅 Sistema de Eventos inicializado');
        this.sincronizarEventos();
        this.iniciarAutoPlay();
        this.configurarEventListeners();
        this.configurarSincronizacaoAutomatica();
    }

    // Sincronizar eventos com o sistema administrativo
    async sincronizarEventos() {
        try {
            console.log('📅 Sincronizando eventos...');
            
            // Dados de exemplo - em produção, isso viria do servidor
            const eventosData = localStorage.getItem('eventos');
            if (eventosData) {
                this.eventos = JSON.parse(eventosData);
            } else {
                this.eventos = this.criarEventosExemplo();
                localStorage.setItem('eventos', JSON.stringify(this.eventos));
            }

            this.atualizarCarrossel();
            console.log('✅ Eventos sincronizados:', this.eventos.length);
        } catch (error) {
            console.error('❌ Erro ao sincronizar eventos:', error);
        }
    }

    // Criar eventos de exemplo
    criarEventosExemplo() {
        return [
            {
                id: 1,
                titulo: 'Show de Fim de Ano',
                descricao: 'Grande show com os melhores artistas da região para celebrar a chegada do novo ano',
                data: '31/12/2024',
                hora: '20:00',
                local: 'Praça Central',
                categoria: 'Música',
                preco: 'Entrada Gratuita',
                organizador: 'Rádio Alo Voce',
                ativo: true
            },
            {
                id: 2,
                titulo: 'Festival de Verão',
                descricao: 'Três dias de música e diversão para toda a família com artistas locais',
                data: '15/01/2025',
                hora: '16:00',
                local: 'Parque da Cidade',
                categoria: 'Festival',
                preco: 'A partir de R$ 25,00',
                organizador: 'Prefeitura Municipal',
                ativo: true
            }
        ];
    }

    // Atualizar o carrossel de eventos
    atualizarCarrossel() {
        if (!this.elementos.wrapper) return;

        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        
        // Limpar wrapper
        this.elementos.wrapper.innerHTML = '';

        if (eventosAtivos.length === 0) {
            // Mostrar placeholder
            this.elementos.wrapper.innerHTML = `
                <div class="evento-card evento-placeholder">
                    <div class="evento-placeholder-icon">
                        <i class="fas fa-calendar-plus"></i>
                    </div>
                    <div class="evento-placeholder-text">
                        EVENTOS EM BREVE
                    </div>
                    <div class="evento-placeholder-subtitle">
                        Aguarde novos eventos incríveis
                    </div>
                    <div class="evento-logo">
                        Alo Voce
                    </div>
                </div>
            `;
            this.esconderControles();
            return;
        }

        // Adicionar eventos ativos
        eventosAtivos.forEach(evento => {
            const card = this.criarCardEvento(evento);
            this.elementos.wrapper.appendChild(card);
        });

        // Atualizar indicadores e controles
        this.atualizarIndicadores();
        this.mostrarControles();
        
        // Resetar posição do carrossel
        this.currentIndex = 0;
        this.atualizarPosicao();
        this.atualizarContador();
    }

    // Criar card de evento
    criarCardEvento(evento) {
        const card = document.createElement('div');
        card.className = 'evento-card evento-ativo';
        card.innerHTML = `
            <div class="evento-header">
                <div class="evento-data">${evento.data} • ${evento.hora}</div>
                <div class="evento-titulo">${evento.titulo}</div>
                <div class="evento-categoria">${evento.categoria}</div>
            </div>
            <div class="evento-content">
                <div class="evento-descricao">${evento.descricao}</div>
                <div class="evento-local">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${evento.local}</span>
                </div>
                <div class="evento-preco">${evento.preco}</div>
            </div>
        `;
        return card;
    }

    // Configurar event listeners
    configurarEventListeners() {
        // Botões de navegação
        if (this.elementos.prevBtn) {
            this.elementos.prevBtn.addEventListener('click', () => this.mudarSlide(-1));
        }
        if (this.elementos.nextBtn) {
            this.elementos.nextBtn.addEventListener('click', () => this.mudarSlide(1));
        }

        // Pausar auto-play ao interagir
        if (this.elementos.wrapper) {
            this.elementos.wrapper.addEventListener('mouseenter', () => this.pausarAutoPlay());
            this.elementos.wrapper.addEventListener('mouseleave', () => this.iniciarAutoPlay());
        }
    }

    // Configurar sincronização automática
    configurarSincronizacaoAutomatica() {
        // Detectar mudanças no localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'eventos' || e.key === 'eventos_sync_timestamp') {
                console.log('🔄 Mudança detectada no localStorage, sincronizando eventos...');
                this.sincronizarEventos();
            }
        });

        // Verificar mudanças por polling (como backup)
        let mudancasInterval = setInterval(() => {
            this.verificarMudancas();
        }, 10000); // Aumentado para 10 segundos para reduzir carga // Verificar a cada 5 segundos

        // Escutar eventos personalizados do admin
        window.addEventListener('eventosSincronizados', (e) => {
            console.log('📡 Sincronização recebida do admin:', e.detail);
            this.sincronizarEventos();
        });
    }

    // Verificar mudanças no timestamp
    verificarMudancas() {
        const currentTimestamp = localStorage.getItem('eventos_sync_timestamp');
        if (currentTimestamp && currentTimestamp !== this.lastSyncTimestamp) {
            console.log('🔄 Timestamp mudou, sincronizando eventos...');
            this.lastSyncTimestamp = currentTimestamp;
            this.sincronizarEventos();
        }
    }

    // Mudar slide
    mudarSlide(direction) {
        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        if (eventosAtivos.length <= 1) return;

        this.pausarAutoPlay();

        if (direction > 0) {
            this.currentIndex = (this.currentIndex + 1) % eventosAtivos.length;
        } else {
            this.currentIndex = this.currentIndex === 0 ? eventosAtivos.length - 1 : this.currentIndex - 1;
        }

        this.atualizarPosicao();
        this.atualizarIndicadores();
        this.atualizarContador();

        // Reiniciar auto-play após interação
        this.iniciarAutoPlay();
    }

    // Ir para slide específico
    irParaSlide(index) {
        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        if (index < 0 || index >= eventosAtivos.length) return;

        this.pausarAutoPlay();
        this.currentIndex = index;

        this.atualizarPosicao();
        this.atualizarIndicadores();
        this.atualizarContador();

        // Reiniciar auto-play após interação
        this.iniciarAutoPlay();
    }

    // Atualizar posição do carrossel
    atualizarPosicao() {
        if (!this.elementos.wrapper) return;

        const cardWidth = 300; // 280px + 20px gap
        const translateX = -this.currentIndex * cardWidth;
        this.elementos.wrapper.style.transform = `translateX(${translateX}px)`;
    }

    // Atualizar indicadores
    atualizarIndicadores() {
        if (!this.elementos.indicators) return;

        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        
        // Limpar indicadores existentes
        this.elementos.indicators.innerHTML = '';

        // Criar novos indicadores
        for (let i = 0; i < eventosAtivos.length; i++) {
            const indicator = document.createElement('span');
            indicator.className = `eventos-indicator ${i === this.currentIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.irParaSlide(i));
            this.elementos.indicators.appendChild(indicator);
        }
    }

    // Atualizar contador
    atualizarContador() {
        if (this.elementos.counter) {
            const eventosAtivos = this.eventos.filter(evento => evento.ativo);
            this.elementos.counter.textContent = `${this.currentIndex + 1} de ${eventosAtivos.length}`;
        }
    }

    // Iniciar auto-play
    iniciarAutoPlay() {
        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        if (eventosAtivos.length <= 1 || this.isAutoPlaying) return;

        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.mudarSlide(1);
        }, 12000); // Muda a cada 12 segundos (aumentado para reduzir carga)
    }

    // Pausar auto-play
    pausarAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
            this.isAutoPlaying = false;
        }
    }

    // Mostrar controles
    mostrarControles() {
        const eventosAtivos = this.eventos.filter(evento => evento.ativo);
        if (this.elementos.controls && eventosAtivos.length > 1) {
            this.elementos.controls.style.display = 'flex';
        }
    }

    // Esconder controles
    esconderControles() {
        if (this.elementos.controls) {
            this.elementos.controls.style.display = 'none';
        }
    }

    // Obter estatísticas
    getEstatisticas() {
        return {
            total: this.eventos.length,
            ativos: this.eventos.filter(e => e.ativo).length,
            slideAtual: this.currentIndex,
            autoPlay: this.isAutoPlaying
        };
    }
}

// Inicializar sistema de eventos
let eventosSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    eventosSystem = new EventosSystem();
    console.log('🚀 Sistema de Eventos inicializado!');
});

// Funções globais para navegação
function changeEvento(direction) {
    if (eventosSystem) {
        eventosSystem.mudarSlide(direction);
    }
}

function currentEvento(index) {
    if (eventosSystem) {
        eventosSystem.irParaSlide(index);
    }
}

// Expor funções globalmente
window.changeEvento = changeEvento;
window.currentEvento = currentEvento;
window.getEventosStats = () => eventosSystem ? eventosSystem.getEstatisticas() : null; 