// 🎯 SISTEMA DE PROMOÇÕES COM SINCRONIZAÇÃO ADMIN
// ===============================================

class PromocoesSystem {
    constructor() {
        this.promocoes = [];
        this.categoriaAtiva = 'todas';
        this.lastSyncTimestamp = null;
        
        console.log('🎯 Sistema de Promoções inicializado');
        this.carregarPromocoesDoStorage();
        this.configurarSincronizacao();
        this.atualizarEstatisticas();
        this.renderizarPromocoes();
        this.adicionarEstilosPromocoes();
    }

    // Carregar promoções do localStorage ou criar exemplos
    carregarPromocoesDoStorage() {
        const promocoesArmazenadas = localStorage.getItem('admin_promocoes');
        if (promocoesArmazenadas) {
            this.promocoes = JSON.parse(promocoesArmazenadas);
        } else {
            this.promocoes = this.criarPromocoesExemplo();
            localStorage.setItem('promocoes', JSON.stringify(this.promocoes));
        }
    }

    // Criar promoções de exemplo se não houver dados
    criarPromocoesExemplo() {
        return [
            {
                id: 1,
                titulo: 'Black Friday - 70% OFF em Todos os Produtos',
                categoria: 'alimentacao',
                empresa: 'Supermercado Central',
                descricao: 'Mega promoção de Black Friday com descontos de até 70% em todos os produtos. Válido para compras acima de R$ 100.',
                desconto: '70%',
                validade: '2024-12-31',
                telefone: '(11) 99999-1111',
                endereco: 'Rua Principal, 123 - Centro',
                website: 'https://supermercadocentral.com.br',
                status: 'ativo',
                destaque: true,
                dataCriacao: new Date().toISOString()
            },
            {
                id: 2,
                titulo: 'Corte + Escova por R$ 25,00',
                categoria: 'moda',
                empresa: 'Salão Beleza Total',
                descricao: 'Promoção especial para novos clientes: corte feminino + escova por apenas R$ 25,00. Agendamento obrigatório.',
                desconto: 'R$ 25,00',
                validade: '2024-12-25',
                telefone: '(11) 98888-2222',
                endereco: 'Avenida das Flores, 456',
                website: 'https://instagram.com/belezatotal',
                status: 'ativo',
                destaque: false,
                dataCriacao: new Date().toISOString()
            },
            {
                id: 3,
                titulo: 'Consulta Médica com 50% de Desconto',
                categoria: 'saude',
                empresa: 'Clínica São Paulo',
                descricao: 'Consultas médicas com desconto especial para todas as especialidades. Válido para novos pacientes.',
                desconto: '50%',
                validade: '2025-01-15',
                telefone: '(11) 97777-3333',
                endereco: 'Rua da Saúde, 789',
                website: 'https://clinicasaopaulo.com.br',
                status: 'ativo',
                destaque: true,
                dataCriacao: new Date().toISOString()
            },
            {
                id: 4,
                titulo: 'Smartphone Samsung com 40% OFF',
                categoria: 'tecnologia',
                empresa: 'TechStore',
                descricao: 'Smartphones Samsung Galaxy com desconto imperdível! Parcelamento em até 12x sem juros.',
                desconto: '40%',
                validade: '2024-12-20',
                telefone: '(11) 96666-4444',
                endereco: 'Shopping Center, Loja 45',
                website: 'https://techstore.com.br',
                status: 'ativo',
                destaque: false,
                dataCriacao: new Date().toISOString()
            }
        ];
    }

    // Configurar sincronização com admin
    configurarSincronizacao() {
        // Detectar mudanças no localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'admin_promocoes' || e.key === 'promocoes_sync_timestamp') {
                console.log('🔄 Mudança detectada em promoções, sincronizando...');
                this.sincronizarPromocoes();
            }
        });

        // Verificar mudanças por polling
        this.mudancasInterval = setInterval(() => {
            this.verificarMudancas();
        }, 10000); // Aumentado para 10 segundos para reduzir carga

        // Escutar eventos personalizados do admin
        window.addEventListener('promocoesSincronizadas', (e) => {
            console.log('📡 Sincronização de promoções recebida do admin:', e.detail);
            this.sincronizarPromocoes();
        });

        // Escutar evento geral de atualização do admin
        window.addEventListener('adminDataUpdated', (e) => {
            if (e.detail.promocoes) {
                console.log('📦 Promoções atualizadas pelo admin:', e.detail.promocoes.length);
                this.promocoes = e.detail.promocoes;
                this.atualizarEstatisticas();
                this.renderizarPromocoes();
            }
        });
    }

    // Sincronizar promoções
    sincronizarPromocoes() {
        try {
            const promocoesAdmin = localStorage.getItem('admin_promocoes');
            if (promocoesAdmin) {
                this.promocoes = JSON.parse(promocoesAdmin);
                this.atualizarEstatisticas();
                this.renderizarPromocoes();
                console.log('✅ Promoções sincronizadas:', this.promocoes.length);
            }
        } catch (error) {
            console.error('❌ Erro ao sincronizar promoções:', error);
        }
    }

    // Verificar mudanças
    verificarMudancas() {
        const currentTimestamp = localStorage.getItem('promocoes_sync_timestamp');
        if (currentTimestamp && currentTimestamp !== this.lastSyncTimestamp) {
            this.lastSyncTimestamp = currentTimestamp;
            this.sincronizarPromocoes();
        }
    }

    // Atualizar estatísticas
    atualizarEstatisticas() {
        const empresasUnicas = new Set(this.promocoes.map(p => p.empresa)).size;
        const promocoesAtivas = this.promocoes.filter(p => p.status === 'ativo');
        
        // Calcular desconto médio
        const descontos = promocoesAtivas
            .map(p => p.desconto)
            .filter(d => d.includes('%'))
            .map(d => parseInt(d.replace('%', '')))
            .filter(d => !isNaN(d));
        
        const descontoMedio = descontos.length > 0 
            ? Math.round(descontos.reduce((a, b) => a + b, 0) / descontos.length)
            : 0;
        
        const totalPromocoesEl = document.getElementById('totalPromocoes');
        const empresasPromocoesEl = document.getElementById('empresasPromocoes');
        const descontoMedioEl = document.getElementById('descontoMedio');
        
        if (totalPromocoesEl) totalPromocoesEl.textContent = promocoesAtivas.length;
        if (empresasPromocoesEl) empresasPromocoesEl.textContent = empresasUnicas;
        if (descontoMedioEl) descontoMedioEl.textContent = descontoMedio + '%';
    }

    // Filtrar promoções por categoria
    filtrarPorCategoria(categoria) {
        this.categoriaAtiva = categoria;
        this.renderizarPromocoes();
        
        // Atualizar botões de filtro
        document.querySelectorAll('.promocoes-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const btn = document.querySelector(`[data-categoria="${categoria}"]`);
        if (btn) btn.classList.add('active');
    }

    // Renderizar promoções
    renderizarPromocoes() {
        const promocoesGrid = document.getElementById('promocoesGrid');
        if (!promocoesGrid) return;

        const promocoesFiltradas = this.categoriaAtiva === 'todas' 
            ? this.promocoes.filter(p => p.status === 'ativo')
            : this.promocoes.filter(p => p.categoria === this.categoriaAtiva && p.status === 'ativo');

        if (promocoesFiltradas.length === 0) {
            promocoesGrid.innerHTML = `
                <div class="loading-promocoes">
                    <i class="fas fa-tags" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <p>Nenhuma promoção encontrada nesta categoria.</p>
                </div>
            `;
            return;
        }

        promocoesGrid.innerHTML = promocoesFiltradas.map(promocao => `
            <div class="promocao-card" onclick="abrirModalPromocao(${promocao.id})">
                <div class="promocao-header">
                    <div class="promocao-badge ${promocao.destaque ? 'destaque' : ''}">
                        ${promocao.destaque ? '🔥 DESTAQUE' : this.getCategoriaLabel(promocao.categoria)}
                    </div>
                    <div class="promocao-desconto">
                        ${promocao.desconto}
                    </div>
                </div>
                <div class="promocao-content">
                    <h3 class="promocao-titulo">${promocao.titulo}</h3>
                    <div class="promocao-empresa">
                        <i class="fas fa-store"></i>
                        ${promocao.empresa}
                    </div>
                    <p class="promocao-descricao">${promocao.descricao}</p>
                    <div class="promocao-footer">
                        <div class="promocao-validade">
                            <i class="fas fa-clock"></i>
                            Válida até ${new Date(promocao.validade).toLocaleDateString()}
                        </div>
                        <div class="promocao-actions">
                            <button class="btn-contato" onclick="event.stopPropagation(); window.open('tel:${promocao.telefone}')">
                                <i class="fas fa-phone"></i>
                            </button>
                            ${promocao.website ? `<button class="btn-site" onclick="event.stopPropagation(); window.open('${promocao.website}', '_blank')">
                                <i class="fas fa-globe"></i>
                            </button>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Renderizar carrossel de destaque
        this.renderizarCarrosselDestaque(promocoesFiltradas.filter(p => p.destaque));
    }

    // Renderizar carrossel de destaque
    renderizarCarrosselDestaque(promocoesDestaque) {
        const carousel = document.getElementById('destaqueCarousel');
        if (!carousel || promocoesDestaque.length === 0) return;

        carousel.innerHTML = promocoesDestaque.map(promocao => `
            <div class="destaque-item">
                <div class="destaque-desconto">${promocao.desconto}</div>
                <div class="destaque-info">
                    <h4>${promocao.empresa}</h4>
                    <p>${promocao.titulo}</p>
                </div>
                <button onclick="abrirModalPromocao(${promocao.id})" class="destaque-btn">
                    Ver Oferta
                </button>
            </div>
        `).join('');
    }

    // Obter label da categoria
    getCategoriaLabel(categoria) {
        const labels = {
            alimentacao: 'Alimentação',
            moda: 'Moda & Beleza',
            saude: 'Saúde & Bem-estar',
            tecnologia: 'Tecnologia',
            servicos: 'Serviços',
            casa: 'Casa & Decoração',
            outros: 'Outros'
        };
        return labels[categoria] || 'Outros';
    }

    // Obter promoção por ID
    getPromocaoPorId(id) {
        return this.promocoes.find(p => p.id === parseInt(id));
    }

    // Adicionar estilos CSS
    adicionarEstilosPromocoes() {
        const style = document.createElement('style');
        style.textContent = `
            /* ============================== */
            /* ESTILOS PARA SEÇÃO PROMOÇÕES */
            /* ============================== */
            
            .promocoes-section {
                padding: 6rem 2rem;
                background: linear-gradient(135deg, 
                    var(--bg-secondary) 0%, 
                    rgba(255, 87, 51, 0.03) 30%,
                    var(--bg-secondary) 70%,
                    rgba(255, 193, 7, 0.05) 100%);
                position: relative;
                overflow: hidden;
            }

            .promocoes-background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }

            .promocoes-wave-pattern {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 30%, rgba(255, 87, 51, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.06) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(255, 87, 51, 0.04) 0%, transparent 50%);
                animation: waveAnimation 20s ease-in-out infinite;
            }

            .floating-promo {
                position: absolute;
                width: 40px;
                height: 40px;
                background: rgba(255, 87, 51, 0.1);
                border: 1px solid rgba(255, 87, 51, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 87, 51, 0.6);
                font-size: 1.2rem;
                animation: floatElements 6s ease-in-out infinite;
                backdrop-filter: blur(10px);
            }

            .floating-promo:nth-child(1) { animation-delay: 0s; }
            .floating-promo:nth-child(2) { animation-delay: 1.5s; }
            .floating-promo:nth-child(3) { animation-delay: 3s; }
            .floating-promo:nth-child(4) { animation-delay: 4.5s; }

            .promocoes-container {
                max-width: 1200px;
                margin: 0 auto;
                position: relative;
                z-index: 2;
            }

            .promocoes-title h2 {
                font-size: 3rem;
                font-weight: 800;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, #ff5733, #ffc107);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 4px 20px rgba(255, 87, 51, 0.3);
            }

            .promocoes-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }

            .promocoes-stats .stat-item {
                background: var(--bg-card);
                border: 1px solid rgba(255, 87, 51, 0.2);
                border-radius: 20px;
                padding: 2rem;
                text-align: center;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
            }

            .promocoes-stats .stat-item:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border-color: rgba(255, 87, 51, 0.4);
            }

            .promocoes-stats .stat-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #ff5733, #ffc107);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                font-size: 1.5rem;
                color: white;
                animation: promoPulse 3s ease-in-out infinite;
            }

            .promocoes-stats .stat-number {
                font-size: 2.5rem;
                font-weight: 800;
                color: #ff5733;
                margin-bottom: 0.5rem;
            }

            .promocoes-filters {
                margin-bottom: 3rem;
                text-align: center;
            }

            .promocoes-filters h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
            }

            .promocoes-filters .filter-btn {
                background: var(--bg-card);
                border: 2px solid rgba(255, 87, 51, 0.2);
                color: var(--text-primary);
                padding: 0.75rem 1.5rem;
                border-radius: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0.5rem;
            }

            .promocoes-filters .filter-btn:hover {
                background: rgba(255, 87, 51, 0.1);
                border-color: rgba(255, 87, 51, 0.5);
                transform: translateY(-2px);
            }

            .promocoes-filters .filter-btn.active {
                background: linear-gradient(135deg, #ff5733, #ffc107);
                color: white;
                border-color: transparent;
            }

            .promocoes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }

            .promocao-card {
                background: var(--bg-card);
                border: 1px solid rgba(255, 87, 51, 0.2);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.4s ease;
                position: relative;
                cursor: pointer;
            }

            .promocao-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border-color: rgba(255, 87, 51, 0.4);
            }

            .promocao-header {
                background: linear-gradient(135deg, #ff5733, #ffc107);
                padding: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
            }

            .promocao-badge {
                background: rgba(255, 255, 255, 0.2);
                padding: 0.5rem 1rem;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .promocao-badge.destaque {
                background: rgba(255, 255, 255, 0.9);
                color: #ff5733;
                animation: promoPulse 2s ease-in-out infinite;
            }

            .promocao-desconto {
                font-size: 2rem;
                font-weight: 800;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }

            .promocao-content {
                padding: 1.5rem;
            }

            .promocao-titulo {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1rem;
                line-height: 1.3;
            }

            .promocao-empresa {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #ff5733;
                font-weight: 600;
                margin-bottom: 1rem;
            }

            .promocao-descricao {
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: 1.5rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .promocao-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid var(--border);
            }

            .promocao-validade {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .promocao-actions {
                display: flex;
                gap: 0.5rem;
            }

            .btn-contato, .btn-site {
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btn-contato {
                background: #25D366;
                color: white;
            }

            .btn-site {
                background: #007bff;
                color: white;
            }

            .btn-contato:hover, .btn-site:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }

            .promocoes-banner {
                background: linear-gradient(135deg, rgba(255, 87, 51, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
                border: 1px solid rgba(255, 87, 51, 0.2);
                border-radius: 25px;
                padding: 3rem;
                margin-bottom: 4rem;
                position: relative;
                overflow: hidden;
            }

            .banner-content {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 2rem;
                align-items: center;
                margin-bottom: 2rem;
            }

            .banner-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #ff5733, #ffc107);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: white;
            }

            .banner-text h3 {
                color: var(--text-primary);
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }

            .banner-text p {
                color: var(--text-secondary);
                font-size: 1.1rem;
            }

            .banner-btn {
                background: linear-gradient(135deg, #ff5733, #ffc107);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 15px;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .banner-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(255, 87, 51, 0.4);
            }

            .banner-features {
                display: flex;
                justify-content: center;
                gap: 2rem;
                flex-wrap: wrap;
            }

            .feature-badge {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 87, 51, 0.1);
                padding: 0.75rem 1.5rem;
                border-radius: 15px;
                color: #ff5733;
                font-weight: 600;
            }

            .promocoes-destaque {
                text-align: center;
            }

            .promocoes-destaque h3 {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 2rem;
            }

            .destaque-carousel {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }

            .destaque-item {
                background: linear-gradient(135deg, #ff5733, #ffc107);
                border-radius: 15px;
                padding: 1.5rem;
                color: white;
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .destaque-desconto {
                font-size: 2.5rem;
                font-weight: 800;
                margin-bottom: 1rem;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }

            .destaque-info h4 {
                font-weight: 700;
                margin-bottom: 0.5rem;
            }

            .destaque-info p {
                opacity: 0.9;
                margin-bottom: 1.5rem;
            }

            .destaque-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 0.75rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .destaque-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }

            /* Modais */
            .promocao-modal, .promocao-form-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }

            .promocao-modal-content, .promocao-form-content {
                background: var(--bg-card);
                margin: 5% auto;
                padding: 0;
                border: none;
                border-radius: 20px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }

            .promocao-modal-close, .promocao-form-close {
                position: absolute;
                right: 1rem;
                top: 1rem;
                color: var(--text-secondary);
                font-size: 2rem;
                font-weight: bold;
                cursor: pointer;
                z-index: 1001;
                width: 40px;
                height: 40px;
                background: var(--bg-secondary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .promocao-modal-close:hover, .promocao-form-close:hover {
                background: var(--danger);
                color: white;
            }

            .promocao-form-header {
                padding: 2rem 2rem 1rem;
                text-align: center;
                border-bottom: 1px solid var(--border);
            }

            .promocao-form-header h3 {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .promocao-form-header p {
                color: var(--text-secondary);
                font-size: 1.1rem;
            }

            .promocao-form {
                padding: 2rem;
            }

            .promocao-form .form-group {
                margin-bottom: 1.5rem;
            }

            .promocao-form label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .promocao-form label i {
                color: #ff5733;
            }

            .promocao-form input,
            .promocao-form textarea,
            .promocao-form select {
                width: 100%;
                padding: 1rem;
                border: 2px solid rgba(255, 87, 51, 0.2);
                border-radius: 12px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-size: 1rem;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            .promocao-form input:focus,
            .promocao-form textarea:focus,
            .promocao-form select:focus {
                outline: none;
                border-color: #ff5733;
                box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.1);
            }

            .promocao-form textarea {
                min-height: 120px;
                resize: vertical;
            }

            .submit-promocao-btn {
                width: 100%;
                padding: 1.25rem;
                background: linear-gradient(135deg, #ff5733, #ffc107);
                border: none;
                border-radius: 15px;
                color: white;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
            }

            .submit-promocao-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 30px rgba(255, 87, 51, 0.4);
            }

            @keyframes promoPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            /* Responsive */
            @media (max-width: 1024px) {
                .promocoes-stats {
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                }
                
                .promocoes-grid {
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                
                .banner-content {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
            }

            @media (max-width: 768px) {
                .promocoes-section {
                    padding: 3rem 1rem;
                }
                
                .promocoes-title h2 {
                    font-size: 2.2rem;
                }
                
                .promocoes-grid {
                    grid-template-columns: 1fr;
                }
                
                .banner-features {
                    flex-direction: column;
                }
                
                .destaque-carousel {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 480px) {
                .promocoes-title h2 {
                    font-size: 1.8rem;
                }
                
                .promocoes-stats .stat-item {
                    padding: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar sistema de promoções quando o DOM estiver carregado
let promocoesSystem = null;

// Funções globais para promoções
function filtrarPromocoes(categoria) {
    if (promocoesSystem) {
        promocoesSystem.filtrarPorCategoria(categoria);
    }
}

function abrirModalPromocao(id) {
    if (!promocoesSystem) return;
    
    const promocao = promocoesSystem.getPromocaoPorId(id);
    if (!promocao) return;

    const modal = document.getElementById('promocaoModal');
    const modalBody = modal.querySelector('.promocao-modal-body');
    
    modalBody.innerHTML = `
        <div class="promocao-modal-header" style="background: linear-gradient(135deg, #ff5733, #ffc107); padding: 2rem; color: white; text-align: center;">
            <div class="promocao-desconto-modal" style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">${promocao.desconto}</div>
            <h2 style="margin-bottom: 0.5rem;">${promocao.titulo}</h2>
            <div style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 15px; display: inline-block;">
                <i class="fas fa-store"></i> ${promocao.empresa}
            </div>
        </div>
        <div class="promocao-modal-content-body" style="padding: 2rem;">
            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">📝 Detalhes da Promoção</h3>
                <p style="color: var(--text-secondary); line-height: 1.6;">${promocao.descricao}</p>
            </div>
            
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">ℹ️ Informações Importantes</h4>
                <div style="display: grid; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                        <i class="fas fa-calendar" style="color: #ff5733;"></i>
                        <span>Válida até: ${new Date(promocao.validade).toLocaleDateString()}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                        <i class="fas fa-map-marker-alt" style="color: #ff5733;"></i>
                        <span>${promocao.endereco}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                        <i class="fas fa-tag" style="color: #ff5733;"></i>
                        <span>Categoria: ${promocoesSystem.getCategoriaLabel(promocao.categoria)}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(255, 87, 51, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%); padding: 1.5rem; border-radius: 15px;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">📞 Entre em Contato</h4>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="tel:${promocao.telefone}" style="background: #25D366; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fas fa-phone"></i> ${promocao.telefone}
                    </a>
                    <a href="https://wa.me/55${promocao.telefone.replace(/\D/g, '')}" target="_blank" style="background: #25D366; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    ${promocao.website ? `<a href="${promocao.website}" target="_blank" style="background: #007bff; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fas fa-globe"></i> Site
                    </a>` : ''}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function fecharModalPromocao() {
    document.getElementById('promocaoModal').style.display = 'none';
}

function abrirFormularioPromocao() {
    document.getElementById('promocaoFormModal').style.display = 'block';
}

function fecharFormularioPromocao() {
    document.getElementById('promocaoFormModal').style.display = 'none';
}

function enviarPromocao(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const promocao = {
        empresa: formData.get('empresa'),
        categoria: formData.get('categoria'),
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        desconto: formData.get('desconto') || 'Oferta especial',
        validade: formData.get('validade'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco') || 'Não informado',
        website: formData.get('website') || ''
    };
    
    // Validação básica
    if (!promocao.empresa || !promocao.categoria || !promocao.titulo || !promocao.descricao || !promocao.validade || !promocao.telefone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio
    const btn = form.querySelector('.submit-promocao-btn');
    const btnText = btn.querySelector('span');
    const originalText = btnText.textContent;
    
    btnText.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`🎉 Promoção enviada com sucesso!

🏢 Empresa: ${promocao.empresa}
🎯 Promoção: ${promocao.titulo}
📱 Contato: ${promocao.telefone}
📅 Válida até: ${new Date(promocao.validade).toLocaleDateString()}

✅ Sua promoção será analisada e aprovada em até 24 horas.
📻 Promoções aprovadas são divulgadas no ar!
🔄 Validade conforme informado no cadastro.

Obrigado por usar nosso sistema de promoções! 🎯`);
        
        form.reset();
        fecharFormularioPromocao();
        
        btnText.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 2000);
}

// Tornar funções globais
window.filtrarPromocoes = filtrarPromocoes;
window.abrirModalPromocao = abrirModalPromocao;
window.fecharModalPromocao = fecharModalPromocao;
window.abrirFormularioPromocao = abrirFormularioPromocao;
window.fecharFormularioPromocao = fecharFormularioPromocao;
window.enviarPromocao = enviarPromocao;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que outros sistemas estejam carregados
    setTimeout(() => {
        promocoesSystem = new PromocoesSystem();
        console.log('🎯 Sistema de Promoções inicializado e pronto!');
    }, 1200);
});

console.log('🎯 Módulo de Promoções carregado!'); 