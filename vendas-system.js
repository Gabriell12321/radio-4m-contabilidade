// 🛒 SISTEMA DE MURAL DE VENDAS COM SINCRONIZAÇÃO ADMIN
// ====================================================

class VendasSystem {
    constructor() {
        this.vendas = [];
        this.categoriaAtiva = 'todas';
        this.lastSyncTimestamp = null;
        
        console.log('🛒 Sistema de Vendas inicializado');
        this.carregarVendasDoStorage();
        this.configurarSincronizacao();
        this.atualizarEstatisticas();
        this.renderizarVendas();
        this.adicionarEstilosVendas();
    }

    // Carregar vendas do localStorage ou criar exemplos
    carregarVendasDoStorage() {
        const vendasArmazenadas = localStorage.getItem('admin_vendas');
        if (vendasArmazenadas) {
            this.vendas = JSON.parse(vendasArmazenadas);
        } else {
            this.vendas = this.criarVendasExemplo();
            localStorage.setItem('vendas', JSON.stringify(this.vendas));
        }
    }

    // Criar vendas de exemplo se não houver dados
    criarVendasExemplo() {
        return [
            {
                id: 1,
                titulo: 'Honda Civic 2018 Automático',
                categoria: 'veiculos',
                descricao: 'Veículo em excelente estado, revisões em dia, único dono. IPVA 2024 pago.',
                preco: 'R$ 65.000,00',
                condicao: 'usado',
                vendedor: 'João Silva',
                telefone: '(11) 99999-1111',
                email: 'joao@email.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: true
            },
            {
                id: 2,
                titulo: 'Apartamento 2 Dormitórios',
                categoria: 'imoveis',
                descricao: 'Apartamento amplo, sacada gourmet, vaga coberta, próximo ao metrô.',
                preco: 'R$ 350.000,00',
                condicao: 'novo',
                vendedor: 'Maria Santos',
                telefone: '(11) 98888-2222',
                email: 'maria@email.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: false
            },
            {
                id: 3,
                titulo: 'iPhone 13 Pro Max 256GB',
                categoria: 'eletronicos',
                descricao: 'Celular semi-novo, com caixa e acessórios originais, sem arranhões.',
                preco: 'R$ 4.500,00',
                condicao: 'seminovo',
                vendedor: 'Carlos Oliveira',
                telefone: '(11) 97777-3333',
                email: 'carlos@email.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: true
            },
            {
                id: 4,
                titulo: 'Serviços de Jardinagem',
                categoria: 'servicos',
                descricao: 'Corte de grama, poda de árvores, plantio, manutenção de jardins. Orçamento gratuito.',
                preco: 'A partir de R$ 50,00',
                condicao: 'novo',
                vendedor: 'Pedro Jardins',
                telefone: '(11) 96666-4444',
                email: 'pedro@jardins.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: false
            },
            {
                id: 5,
                titulo: 'Sofá 3 Lugares Novo',
                categoria: 'casa',
                descricao: 'Sofá retrátil e reclinável, tecido suede, cor cinza, ainda na embalagem.',
                preco: 'R$ 1.200,00',
                condicao: 'novo',
                vendedor: 'Ana Costa',
                telefone: '(11) 95555-5555',
                email: 'ana@email.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: false
            },
            {
                id: 6,
                titulo: 'Roupas Infantis Usadas',
                categoria: 'roupas',
                descricao: 'Lote com 20 peças de roupas infantis, tamanhos 2 a 4 anos, marca famosa.',
                preco: 'R$ 150,00',
                condicao: 'usado',
                vendedor: 'Lucia Mendes',
                telefone: '(11) 94444-6666',
                email: 'lucia@email.com',
                dataCriacao: new Date().toISOString(),
                status: 'ativo',
                destaque: false
            }
        ];
    }

    // Configurar sincronização com admin
    configurarSincronizacao() {
        // Detectar mudanças no localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'admin_vendas' || e.key === 'vendas_sync_timestamp') {
                console.log('🔄 Mudança detectada em vendas, sincronizando...');
                this.sincronizarVendas();
            }
        });

        // Verificar mudanças por polling
        this.mudancasInterval = setInterval(() => {
            this.verificarMudancas();
        }, 10000); // Aumentado para 10 segundos para reduzir carga

        // Escutar eventos personalizados do admin
        window.addEventListener('vendasSincronizadas', (e) => {
            console.log('📡 Sincronização de vendas recebida do admin:', e.detail);
            this.sincronizarVendas();
        });

        // Escutar evento geral de atualização do admin
        window.addEventListener('adminDataUpdated', (e) => {
            if (e.detail.vendas) {
                console.log('📦 Vendas atualizadas pelo admin:', e.detail.vendas.length);
                this.vendas = e.detail.vendas;
                this.atualizarEstatisticas();
                this.renderizarVendas();
            }
        });
    }

    // Sincronizar vendas
    sincronizarVendas() {
        try {
            const vendasAdmin = localStorage.getItem('admin_vendas');
            if (vendasAdmin) {
                this.vendas = JSON.parse(vendasAdmin);
                this.atualizarEstatisticas();
                this.renderizarVendas();
                console.log('✅ Vendas sincronizadas:', this.vendas.length);
            }
        } catch (error) {
            console.error('❌ Erro ao sincronizar vendas:', error);
        }
    }

    // Verificar mudanças
    verificarMudancas() {
        const currentTimestamp = localStorage.getItem('vendas_sync_timestamp');
        if (currentTimestamp && currentTimestamp !== this.lastSyncTimestamp) {
            this.lastSyncTimestamp = currentTimestamp;
            this.sincronizarVendas();
        }
    }

    // Atualizar estatísticas
    atualizarEstatisticas() {
        const vendedoresUnicos = new Set(this.vendas.map(v => v.vendedor)).size;
        const vendasAtivas = this.vendas.filter(v => v.status === 'ativo');
        
        const totalProdutosEl = document.getElementById('totalProdutos');
        const vendedoresAtivosEl = document.getElementById('vendedoresAtivos');
        const vendasRealizadasEl = document.getElementById('vendasRealizadas');
        
        if (totalProdutosEl) totalProdutosEl.textContent = vendasAtivas.length;
        if (vendedoresAtivosEl) vendedoresAtivosEl.textContent = vendedoresUnicos;
        if (vendasRealizadasEl) vendasRealizadasEl.textContent = Math.floor(Math.random() * 50) + 20;
    }

    // Filtrar vendas por categoria
    filtrarPorCategoria(categoria) {
        this.categoriaAtiva = categoria;
        this.renderizarVendas();
        
        // Atualizar botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const btn = document.querySelector(`[data-categoria="${categoria}"]`);
        if (btn) btn.classList.add('active');
    }

    // Renderizar vendas
    renderizarVendas() {
        const vendasGrid = document.getElementById('vendasGrid');
        if (!vendasGrid) return;

        const vendasFiltradas = this.categoriaAtiva === 'todas' 
            ? this.vendas.filter(v => v.status === 'ativo')
            : this.vendas.filter(v => v.categoria === this.categoriaAtiva && v.status === 'ativo');

        if (vendasFiltradas.length === 0) {
            vendasGrid.innerHTML = `
                <div class="loading-vendas">
                    <i class="fas fa-box-open" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <p>Nenhum produto encontrado nesta categoria.</p>
                </div>
            `;
            return;
        }

        vendasGrid.innerHTML = vendasFiltradas.map(venda => `
            <div class="produto-card" onclick="abrirModalProduto(${venda.id})">
                <div class="produto-image">
                    ${this.getCategoriaIcon(venda.categoria)}
                    ${venda.destaque ? '<div class="produto-badge">DESTAQUE</div>' : ''}
                </div>
                <div class="produto-content">
                    <div class="produto-categoria">${this.getCategoriaLabel(venda.categoria)}</div>
                    <h3 class="produto-titulo">${venda.titulo}</h3>
                    <p class="produto-descricao">${venda.descricao}</p>
                    <div class="produto-preco">${venda.preco}</div>
                    <div class="produto-vendedor">
                        <div class="vendedor-avatar">
                            ${venda.vendedor.charAt(0).toUpperCase()}
                        </div>
                        <div class="vendedor-info">
                            <h4>${venda.vendedor}</h4>
                            <span>${venda.condicao}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Obter ícone da categoria
    getCategoriaIcon(categoria) {
        const icons = {
            veiculos: '<i class="fas fa-car"></i>',
            imoveis: '<i class="fas fa-home"></i>',
            eletronicos: '<i class="fas fa-laptop"></i>',
            casa: '<i class="fas fa-couch"></i>',
            roupas: '<i class="fas fa-tshirt"></i>',
            servicos: '<i class="fas fa-tools"></i>',
            outros: '<i class="fas fa-box"></i>'
        };
        return icons[categoria] || icons.outros;
    }

    // Obter label da categoria
    getCategoriaLabel(categoria) {
        const labels = {
            veiculos: 'Veículos',
            imoveis: 'Imóveis',
            eletronicos: 'Eletrônicos',
            casa: 'Casa & Jardim',
            roupas: 'Roupas',
            servicos: 'Serviços',
            outros: 'Outros'
        };
        return labels[categoria] || 'Outros';
    }

    // Obter venda por ID
    getVendaPorId(id) {
        return this.vendas.find(v => v.id === parseInt(id));
    }

    // Adicionar estilos CSS
    adicionarEstilosVendas() {
        const style = document.createElement('style');
        style.textContent = `
            /* ============================== */
            /* ESTILOS PARA SEÇÃO DE VENDAS */
            /* ============================== */
            
            .vendas-section {
                padding: 6rem 2rem;
                background: linear-gradient(135deg, 
                    var(--bg-secondary) 0%, 
                    rgba(52, 152, 219, 0.03) 30%,
                    var(--bg-secondary) 70%,
                    rgba(52, 152, 219, 0.05) 100%);
                position: relative;
                overflow: hidden;
            }

            .vendas-background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }

            .vendas-wave-pattern {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 30%, rgba(52, 152, 219, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(52, 152, 219, 0.06) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(52, 152, 219, 0.04) 0%, transparent 50%);
                animation: waveAnimation 20s ease-in-out infinite;
            }

            .floating-coin {
                position: absolute;
                width: 40px;
                height: 40px;
                background: rgba(52, 152, 219, 0.1);
                border: 1px solid rgba(52, 152, 219, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(52, 152, 219, 0.6);
                font-size: 1.2rem;
                animation: floatElements 6s ease-in-out infinite;
                backdrop-filter: blur(10px);
            }

            .floating-coin:nth-child(1) { animation-delay: 0s; }
            .floating-coin:nth-child(2) { animation-delay: 1.5s; }
            .floating-coin:nth-child(3) { animation-delay: 3s; }
            .floating-coin:nth-child(4) { animation-delay: 4.5s; }

            .vendas-container {
                max-width: 1200px;
                margin: 0 auto;
                position: relative;
                z-index: 2;
            }

            .vendas-title h2 {
                font-size: 3rem;
                font-weight: 800;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, #3498db, #2ecc71);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
            }

            .vendas-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }

            .stat-item {
                background: var(--bg-card);
                border: 1px solid rgba(52, 152, 219, 0.2);
                border-radius: 20px;
                padding: 2rem;
                text-align: center;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
            }

            .stat-item:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border-color: rgba(52, 152, 219, 0.4);
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #3498db, #2ecc71);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                font-size: 1.5rem;
                color: white;
                animation: coinPulse 3s ease-in-out infinite;
            }

            .stat-number {
                font-size: 2.5rem;
                font-weight: 800;
                color: #3498db;
                margin-bottom: 0.5rem;
            }

            .stat-label {
                color: var(--text-secondary);
                font-weight: 600;
                font-size: 1.1rem;
            }

            .vendas-filters {
                margin-bottom: 3rem;
                text-align: center;
            }

            .vendas-filters h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
            }

            .filter-buttons {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .filter-btn {
                background: var(--bg-card);
                border: 2px solid rgba(52, 152, 219, 0.2);
                color: var(--text-primary);
                padding: 0.75rem 1.5rem;
                border-radius: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .filter-btn:hover {
                background: rgba(52, 152, 219, 0.1);
                border-color: rgba(52, 152, 219, 0.5);
                transform: translateY(-2px);
            }

            .filter-btn.active {
                background: linear-gradient(135deg, #3498db, #2ecc71);
                color: white;
                border-color: transparent;
            }

            .vendas-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .produto-card {
                background: var(--bg-card);
                border: 1px solid rgba(52, 152, 219, 0.2);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.4s ease;
                position: relative;
                cursor: pointer;
            }

            .produto-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border-color: rgba(52, 152, 219, 0.4);
            }

            .produto-image {
                height: 200px;
                background: linear-gradient(135deg, #3498db, #2ecc71);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: white;
                position: relative;
            }

            .produto-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255, 255, 255, 0.9);
                color: #3498db;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .produto-content {
                padding: 1.5rem;
            }

            .produto-categoria {
                background: rgba(52, 152, 219, 0.1);
                color: #3498db;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
                display: inline-block;
                margin-bottom: 1rem;
            }

            .produto-titulo {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }

            .produto-descricao {
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .produto-preco {
                font-size: 1.5rem;
                font-weight: 800;
                color: #2ecc71;
                margin-bottom: 1rem;
            }

            .produto-vendedor {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border);
            }

            .vendedor-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #3498db, #2ecc71);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
            }

            .vendedor-info h4 {
                color: var(--text-primary);
                font-weight: 600;
                margin-bottom: 0.25rem;
            }

            .vendedor-info span {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .loading-vendas {
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(52, 152, 219, 0.2);
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }

            .ver-mais-vendas {
                text-align: center;
                margin-bottom: 4rem;
            }

            .ver-mais-vendas-btn {
                background: transparent;
                border: 2px solid rgba(52, 152, 219, 0.3);
                color: #3498db;
                padding: 1rem 2rem;
                border-radius: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }

            .ver-mais-vendas-btn:hover {
                background: rgba(52, 152, 219, 0.1);
                border-color: rgba(52, 152, 219, 0.5);
                transform: translateY(-2px);
            }

            .vendas-cta {
                background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%);
                border: 1px solid rgba(52, 152, 219, 0.2);
                border-radius: 25px;
                padding: 3rem;
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .cta-content h3 {
                font-size: 2rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }

            .cta-content p {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin-bottom: 2rem;
            }

            .cta-buttons {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }

            .cta-btn {
                padding: 1rem 2rem;
                border-radius: 15px;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                border: none;
            }

            .cta-btn.primary {
                background: linear-gradient(135deg, #3498db, #2ecc71);
                color: white;
            }

            .cta-btn.secondary {
                background: transparent;
                color: #3498db;
                border: 2px solid #3498db;
            }

            .cta-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
            }

            .cta-features {
                display: flex;
                justify-content: center;
                gap: 2rem;
                flex-wrap: wrap;
            }

            .feature-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-weight: 600;
            }

            .feature-item i {
                color: #3498db;
                font-size: 1.2rem;
            }

            /* Modais */
            .produto-modal, .venda-form-modal {
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

            .produto-modal-content, .venda-form-content {
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

            .produto-modal-close, .venda-form-close {
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

            .produto-modal-close:hover, .venda-form-close:hover {
                background: var(--danger);
                color: white;
            }

            .venda-form-header {
                padding: 2rem 2rem 1rem;
                text-align: center;
                border-bottom: 1px solid var(--border);
            }

            .venda-form-header h3 {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .venda-form-header p {
                color: var(--text-secondary);
                font-size: 1.1rem;
            }

            .venda-form {
                padding: 2rem;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .venda-form .form-group {
                margin-bottom: 1.5rem;
            }

            .venda-form label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .venda-form label i {
                color: #3498db;
            }

            .venda-form input,
            .venda-form textarea,
            .venda-form select {
                width: 100%;
                padding: 1rem;
                border: 2px solid rgba(52, 152, 219, 0.2);
                border-radius: 12px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-size: 1rem;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            .venda-form input:focus,
            .venda-form textarea:focus,
            .venda-form select:focus {
                outline: none;
                border-color: #3498db;
                box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
            }

            .venda-form textarea {
                min-height: 120px;
                resize: vertical;
            }

            .submit-venda-btn {
                width: 100%;
                padding: 1.25rem;
                background: linear-gradient(135deg, #3498db, #2ecc71);
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

            .submit-venda-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 30px rgba(52, 152, 219, 0.4);
            }

            @keyframes coinPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Responsive para seção de vendas */
            @media (max-width: 1024px) {
                .vendas-stats {
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                }
                
                .vendas-grid {
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                }
                
                .filter-buttons {
                    gap: 0.5rem;
                }
            }

            @media (max-width: 768px) {
                .vendas-section {
                    padding: 3rem 1rem;
                }
                
                .vendas-title h2 {
                    font-size: 2.2rem;
                }
                
                .vendas-grid {
                    grid-template-columns: 1fr;
                }
                
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .cta-features {
                    flex-direction: column;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 480px) {
                .vendas-title h2 {
                    font-size: 1.8rem;
                }
                
                .stat-item {
                    padding: 1.5rem;
                }
                
                .filter-buttons {
                    flex-direction: column;
                    max-width: 300px;
                    margin: 0 auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar sistema de vendas quando o DOM estiver carregado
let vendasSystem = null;

// Funções globais para vendas
function filtrarVendas(categoria) {
    if (vendasSystem) {
        vendasSystem.filtrarPorCategoria(categoria);
    }
}

function carregarMaisVendas() {
    const btn = document.querySelector('.ver-mais-vendas-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Todos os produtos carregados';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }, 1500);
}

function abrirModalProduto(id) {
    if (!vendasSystem) return;
    
    const venda = vendasSystem.getVendaPorId(id);
    if (!venda) return;

    const modal = document.getElementById('produtoModal');
    const modalBody = modal.querySelector('.produto-modal-body');
    
    modalBody.innerHTML = `
        <div class="produto-modal-image" style="height: 200px; background: linear-gradient(135deg, #3498db, #2ecc71); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; position: relative;">
            ${vendasSystem.getCategoriaIcon(venda.categoria)}
            ${venda.destaque ? '<div class="produto-badge" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9); color: #3498db; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">DESTAQUE</div>' : ''}
        </div>
        <div class="produto-modal-content-body" style="padding: 2rem;">
            <div class="produto-categoria" style="background: rgba(52, 152, 219, 0.1); color: #3498db; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">${vendasSystem.getCategoriaLabel(venda.categoria)}</div>
            <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">${venda.titulo}</h2>
            <p class="produto-descricao-completa" style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">${venda.descricao}</p>
            <div class="produto-preco-modal" style="font-size: 2rem; font-weight: 800; color: #2ecc71; margin-bottom: 1.5rem;">${venda.preco}</div>
            <div class="produto-detalhes" style="margin-bottom: 2rem;">
                <div class="detalhe-item" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
                    <i class="fas fa-star" style="color: #3498db;"></i>
                    <span>Condição: ${venda.condicao}</span>
                </div>
                <div class="detalhe-item" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                    <i class="fas fa-calendar" style="color: #3498db;"></i>
                    <span>Anunciado em: ${new Date(venda.dataCriacao).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="vendedor-contato" style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 15px;">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Contato do Vendedor</h3>
                <div class="vendedor-info-modal" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div class="vendedor-avatar-modal" style="width: 60px; height: 60px; background: linear-gradient(135deg, #3498db, #2ecc71); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.5rem;">
                        ${venda.vendedor.charAt(0).toUpperCase()}
                    </div>
                    <div class="vendedor-dados">
                        <h4 style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; font-size: 1.2rem;">${venda.vendedor}</h4>
                    </div>
                </div>
                <div class="contato-botoes" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="tel:${venda.telefone}" class="contato-btn" style="background: #3498db; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fas fa-phone"></i> ${venda.telefone}
                    </a>
                    ${venda.email ? `<a href="mailto:${venda.email}" class="contato-btn email" style="background: #e74c3c; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fas fa-envelope"></i> E-mail
                    </a>` : ''}
                    <a href="https://wa.me/55${venda.telefone.replace(/\D/g, '')}" target="_blank" class="contato-btn whatsapp" style="background: #25D366; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function fecharModalProduto() {
    document.getElementById('produtoModal').style.display = 'none';
}

function abrirFormularioVenda() {
    document.getElementById('vendaFormModal').style.display = 'block';
}

function fecharFormularioVenda() {
    document.getElementById('vendaFormModal').style.display = 'none';
}

function verComoFunciona() {
    alert(`📋 COMO FUNCIONA O MURAL DE VENDAS

✅ ANUNCIAR É GRÁTIS
• Preencha o formulário simples
• Seu anúncio é aprovado em até 24h
• Fica disponível por 30 dias

📻 DIVULGAÇÃO NO AR
• Anúncios em destaque são lidos no ar
• Alcance milhares de ouvintes
• Maior visibilidade para seus produtos

📞 CONTATO DIRETO
• Interessados entram em contato direto
• Seus dados ficam protegidos
• Negocie diretamente com o comprador

🔄 RENOVAÇÃO AUTOMÁTICA
• Renove gratuitamente a cada 30 dias
• Mantenha seu anúncio sempre ativo
• Edite informações quando quiser

Entre em contato: (11) 99999-9999`);
}

function enviarAnuncio(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const anuncio = {
        titulo: formData.get('titulo'),
        categoria: formData.get('categoria'),
        descricao: formData.get('descricao'),
        preco: formData.get('preco') || 'A combinar',
        condicao: formData.get('condicao'),
        vendedor: formData.get('vendedor'),
        telefone: formData.get('telefone'),
        email: formData.get('email')
    };
    
    // Validação básica
    if (!anuncio.titulo || !anuncio.categoria || !anuncio.descricao || !anuncio.vendedor || !anuncio.telefone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio
    const btn = form.querySelector('.submit-venda-btn');
    const btnText = btn.querySelector('span');
    const originalText = btnText.textContent;
    
    btnText.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`🎉 Anúncio enviado com sucesso!

📦 Produto: ${anuncio.titulo}
👤 Vendedor: ${anuncio.vendedor}
📱 Contato: ${anuncio.telefone}

✅ Seu anúncio será analisado e aprovado em até 24 horas.
📻 Anúncios em destaque podem ser lidos no ar!
🔄 Validade: 30 dias (renovação gratuita)

Obrigado por usar nosso Mural de Vendas! 🛒`);
        
        form.reset();
        fecharFormularioVenda();
        
        btnText.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 2000);
}

// Tornar funções globais
window.filtrarVendas = filtrarVendas;
window.carregarMaisVendas = carregarMaisVendas;
window.abrirModalProduto = abrirModalProduto;
window.fecharModalProduto = fecharModalProduto;
window.abrirFormularioVenda = abrirFormularioVenda;
window.fecharFormularioVenda = fecharFormularioVenda;
window.verComoFunciona = verComoFunciona;
window.enviarAnuncio = enviarAnuncio;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que outros sistemas estejam carregados
    setTimeout(() => {
        vendasSystem = new VendasSystem();
        console.log('🛒 Sistema de Vendas inicializado e pronto!');
    }, 1000);
});

console.log('🛒 Módulo de Vendas carregado!'); 