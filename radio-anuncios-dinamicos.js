// Sistema de Sincronização com Admin - Rádio Alo Voce
// Conecta os anúncios do admin com a página principal da rádio

class RadioAnunciosSystem {
    constructor() {
        this.propagandasAtivas = [];
        this.estatisticasEmpresa = {}; // Sistema de estatísticas
        this.intervalosAtualizacao = {}; // Controle de intervalos
        this.carregarPropagandas();
        this.inicializarCarrossel();
        console.log('🎯 Sistema de Anúncios Dinâmicos Carregado!');
    }

    // Carregar propagandas do localStorage (vindas do admin)
    carregarPropagandas() {
        const propagandasAdmin = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        
        // Filtrar apenas propagandas ativas e aprovadas
        const propagandasFiltradas = propagandasAdmin.filter(p => 
            p.status === 'ativa' && p.aprovado === true
        );

        console.log(`📊 Propagandas encontradas: ${propagandasAdmin.length}, ativas: ${propagandasFiltradas.length}`);

        // Se não há propagandas do admin, usar exemplos padrão
        if (propagandasFiltradas.length === 0) {
            this.propagandasAtivas = this.obterPropagandasPadrao();
        } else {
            this.propagandasAtivas = this.adaptarPropagandas(propagandasFiltradas);
        }

        this.renderizarAnuncios();
        this.atualizarEstatisticas();
        
        // Inicializar sistema de estatísticas DEPOIS de carregar propagandas
        this.inicializarSistemaEstatisticas();
    }

    // Adaptar dados do admin para o formato do radio
    adaptarPropagandas(propagandas) {
        const categorias = {
            'supermercado': { icon: 'fas fa-shopping-cart', categoria: 'Alimentação & Bebidas' },
            'farmacia': { icon: 'fas fa-pills', categoria: 'Saúde & Bem-estar' },
            'auto escola': { icon: 'fas fa-car', categoria: 'Educação no Trânsito' },
            'autoescola': { icon: 'fas fa-car', categoria: 'Educação no Trânsito' },
            'imobiliaria': { icon: 'fas fa-home', categoria: 'Imóveis & Investimentos' },
            'restaurante': { icon: 'fas fa-utensils', categoria: 'Alimentação' },
            'loja': { icon: 'fas fa-shopping-bag', categoria: 'Varejo' },
            'clinica': { icon: 'fas fa-stethoscope', categoria: 'Saúde' },
            'default': { icon: 'fas fa-store', categoria: 'Comércio & Serviços' }
        };

        return propagandas.map((prop, index) => {
            const empresaNome = prop.empresa.toLowerCase();
            let categoriaInfo = categorias.default;
            
            // Detectar categoria baseada no nome da empresa
            for (const [tipo, info] of Object.entries(categorias)) {
                if (empresaNome.includes(tipo)) {
                    categoriaInfo = info;
                    break;
                }
            }

            return {
                id: `empresa_${prop.id}`,
                nome: prop.empresa,
                categoria: categoriaInfo.categoria,
                logo: categoriaInfo.icon,
                imagem: prop.imagem || null,
                titulo: prop.descricao ? prop.descricao.split('!')[0] + '!' : `Promoção Especial da ${prop.empresa}!`,
                descricao: prop.descricao || `Aproveite as melhores ofertas da ${prop.empresa}! Produtos de qualidade com preços especiais. Não perca essa oportunidade única!`,
                frequencia: `A cada ${3 + (index % 3)} músicas`,
                visualizacoes: `+${Math.floor(Math.random() * 200) + 100}/hora`,
                tempo: `${prop.duracao}s`,
                alcance: `${(Math.random() * 2 + 1.5).toFixed(1)}K`,
                detalhes: [
                    `Campanha ativa desde ${new Date(prop.dataInicio).toLocaleDateString('pt-BR')}`,
                    `Válida até ${new Date(prop.dataFim).toLocaleDateString('pt-BR')}`,
                    `Valor investido: R$ ${prop.valor.toFixed(2)}`,
                    `Duração: ${prop.duracao} segundos`,
                    `Status: Ativa e aprovada`,
                    `Arquivo: ${prop.arquivo || 'audio-propaganda.mp3'}`
                ],
                telefone: prop.telefone || "(11) 99999-9999",
                website: prop.website || "#",
                dados: prop
            };
        });
    }

    // Propagandas padrão quando não há dados do admin
    obterPropagandasPadrao() {
        return [
            {
                id: "exemplo_1",
                nome: "Sua Empresa Aqui",
                categoria: "Comércio Local",
                logo: "fas fa-store",
                imagem: null,
                titulo: "Anuncie na Rádio!",
                descricao: "Este é um exemplo de como sua propaganda aparecerá na rádio. Entre em contato conosco e faça parte dos nossos parceiros anunciantes!",
                frequencia: "A cada 4 músicas",
                visualizacoes: "+200/hora",
                tempo: "30s",
                alcance: "2.5K",
                detalhes: [
                    "Este é um exemplo demonstrativo",
                    "Sua empresa pode estar aqui",
                    "Contrate já: (11) 99999-9999",
                    "Primeira propaganda GRÁTIS",
                    "Resultados garantidos"
                ],
                telefone: "(11) 99999-9999",
                website: "#"
            }
        ];
    }

    // Renderizar anúncios dinamicamente
    renderizarAnuncios() {
        const carouselContainer = document.querySelector('.anuncios-carousel-inner');
        if (!carouselContainer) {
            console.warn('⚠️ Container .anuncios-carousel-inner não encontrado');
            return;
        }

        carouselContainer.innerHTML = '';

        this.propagandasAtivas.forEach((empresa, index) => {
            const anuncioCard = document.createElement('div');
            anuncioCard.className = `anuncio-card ${index === 0 ? 'active' : ''}`;
            anuncioCard.onclick = () => this.abrirModal(empresa.id);
            
            // Definir imagem ou logo
            let logoContent = '';
            if (empresa.imagem) {
                logoContent = `<img src="${empresa.imagem}" alt="${empresa.nome}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                logoContent = `<i class="${empresa.logo}"></i>`;
            }
            
            anuncioCard.innerHTML = `
                <div class="click-indicator">
                    <i class="fas fa-mouse-pointer"></i> Clique para mais detalhes
                </div>
                <div class="anuncio-header">
                    <div class="empresa-logo">
                        ${logoContent}
                    </div>
                    <div class="empresa-info">
                        <h3>${empresa.nome}</h3>
                        <p>${empresa.categoria}</p>
                    </div>
                    <div class="anuncio-status">
                        <div class="status-live">
                            <div class="live-dot"></div>
                            AO VIVO
                        </div>
                    </div>
                </div>
                <div class="anuncio-content">
                    <h4>"${empresa.titulo}"</h4>
                    <p>${empresa.descricao}</p>
                    <div class="anuncio-meta">
                        <span><i class="fas fa-clock"></i> ${empresa.frequencia}</span>
                        <span><i class="fas fa-eye"></i> ${empresa.visualizacoes}</span>
                    </div>
                    <div class="anuncio-preview">
                        <span><i class="fas fa-phone"></i> ${empresa.telefone}</span>
                        <span><i class="fas fa-globe"></i> Site disponível</span>
                    </div>
                </div>
            `;
            
            carouselContainer.appendChild(anuncioCard);
        });

        // Inicializar carrossel após renderizar
        this.inicializarCarrossel();
    }

    // Inicializar carrossel
    inicializarCarrossel() {
        if (this.propagandasAtivas.length === 0) return;

        this.currentSlide = 0;
        this.totalSlides = this.propagandasAtivas.length;

        console.log(`🎠 Carrossel inicializado com ${this.totalSlides} slides`);

        // Auto-play do carrossel (só se tiver mais de 1 slide)
        if (this.totalSlides > 1) {
            this.carouselInterval = setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarrossel();
            }, 12000); // 12 segundos (aumentado para reduzir carga)
        }

        // Atualizar indicadores se existirem
        this.updateIndicators();
        
        // Mostrar primeiro slide
        this.updateCarrossel();
    }

    // Atualizar carrossel
    updateCarrossel() {
        const carouselInner = document.querySelector('.anuncios-carousel-inner');
        if (carouselInner) {
            const translateX = -this.currentSlide * 100;
            carouselInner.style.transform = `translateX(${translateX}%)`;
            console.log(`🔄 Carrossel atualizado - Slide ${this.currentSlide + 1}/${this.totalSlides}`);
        } else {
            console.warn('⚠️ Elemento .anuncios-carousel-inner não encontrado para atualização');
        }
        this.updateIndicators();
    }

    // Atualizar indicadores
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
            console.log(`📍 Indicadores atualizados - Ativo: ${this.currentSlide}`);
        }
    }

    // Abrir modal com dados dinâmicos
    abrirModal(empresaId) {
        const empresa = this.propagandasAtivas.find(e => e.id === empresaId);
        if (!empresa) return;

        // Criar modal se não existir
        if (!document.getElementById('modalAnuncioAvancado')) {
            this.criarModalAvancado();
        }

        // Inicializar estatísticas se não existir
        if (!this.estatisticasEmpresa[empresaId]) {
            this.inicializarEstatisticasEmpresa(empresaId, empresa);
        }

        // Atualizar estatísticas antes de mostrar
        this.atualizarEstatisticasEmpresa(empresaId);

        // Preencher dados básicos do modal
        document.getElementById('modalEmpresaLogo').innerHTML = empresa.imagem ? 
            `<img src="${empresa.imagem}" alt="${empresa.nome}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">` : 
            `<i class="${empresa.logo}"></i>`;
        document.getElementById('modalEmpresaNome').textContent = empresa.nome;
        document.getElementById('modalEmpresaCategoria').textContent = empresa.categoria;
        document.getElementById('modalEmpresaTitulo').textContent = empresa.titulo;
        document.getElementById('modalEmpresaDescricao').textContent = empresa.descricao;
        document.getElementById('modalEmpresaTelefone').textContent = empresa.telefone;
        document.getElementById('modalEmpresaWebsite').textContent = empresa.website !== '#' ? empresa.website : 'Site em breve';

        // Preencher estatísticas DINÂMICAS
        this.atualizarEstatisticasModal(empresaId, empresa);

        const detalhesElement = document.getElementById('modalEmpresaDetalhes');
        detalhesElement.innerHTML = '';
        empresa.detalhes.forEach(detalhe => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${detalhe}`;
            detalhesElement.appendChild(li);
        });

        // Mostrar modal
        document.getElementById('modalAnuncioAvancado').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Salvar empresa atual
        window.currentEmpresa = empresa;
        window.currentEmpresaId = empresaId;
        
        // Registrar visualização
        this.registrarVisualizacao(empresaId);

        // Iniciar atualizações automáticas das estatísticas
        this.iniciarAtualizacaoAutomatica(empresaId);
    }

    // Criar modal avançado
    criarModalAvancado() {
        const modalHTML = `
            <div id="modalAnuncioAvancado" class="modal-anuncio-avancado">
                <div class="modal-anuncio-content">
                    <div class="modal-anuncio-header">
                        <button class="modal-close-btn" onclick="fecharModalAvancado()">&times;</button>
                    </div>
                    
                    <div class="modal-anuncio-body">
                        <div class="modal-empresa-info">
                            <div class="modal-empresa-logo" id="modalEmpresaLogo">
                                <i class="fas fa-store"></i>
                            </div>
                            <div class="modal-empresa-dados">
                                <h2 id="modalEmpresaNome">Nome da Empresa</h2>
                                <p id="modalEmpresaCategoria">Categoria</p>
                                <div class="modal-empresa-badges">
                                    <span class="badge-verificado">
                                        <i class="fas fa-check-circle"></i> Verificado
                                    </span>
                                    <span class="badge-ativo">
                                        <i class="fas fa-broadcast-tower"></i> Ao Vivo
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-anuncio-stats">
                            <div class="stat-item">
                                <i class="fas fa-clock"></i>
                                <span>Frequência</span>
                                <strong id="modalEmpresaFrequencia">-</strong>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-eye"></i>
                                <span>Visualizações</span>
                                <strong id="modalEmpresaVisualizacoes">-</strong>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-stopwatch"></i>
                                <span>Duração</span>
                                <strong id="modalEmpresaTempo">-</strong>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-users"></i>
                                <span>Alcance</span>
                                <strong id="modalEmpresaAlcance">-</strong>
                            </div>
                        </div>
                        
                        <div class="modal-anuncio-main">
                            <div class="modal-anuncio-text">
                                <h3 id="modalEmpresaTitulo">Título do Anúncio</h3>
                                <p id="modalEmpresaDescricao">Descrição completa...</p>
                            </div>
                            
                            <div class="modal-anuncio-detalhes">
                                <h4>Detalhes da Campanha</h4>
                                <ul id="modalEmpresaDetalhes"></ul>
                            </div>
                        </div>
                        
                        <div class="modal-anuncio-contato">
                            <h4>Entre em Contato</h4>
                            <div class="contato-info">
                                <div class="contato-item">
                                    <i class="fas fa-phone"></i>
                                    <span id="modalEmpresaTelefone">Telefone</span>
                                </div>
                                <div class="contato-item">
                                    <i class="fas fa-globe"></i>
                                    <span id="modalEmpresaWebsite">Website</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-anuncio-actions">
                            <button class="btn-action btn-primary" onclick="ligarEmpresa()">
                                <i class="fas fa-phone"></i> Ligar Agora
                            </button>
                            <button class="btn-action btn-secondary" onclick="visitarSite()">
                                <i class="fas fa-globe"></i> Visitar Site
                            </button>
                            <button class="btn-action btn-share" onclick="compartilharAnuncio()">
                                <i class="fas fa-share-alt"></i> Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Adicionar CSS do modal
        this.adicionarCSSModal();
    }

    // Adicionar CSS do modal
    adicionarCSSModal() {
        const modalCSS = `
            <style>
                .modal-anuncio-avancado {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 20000;
                    backdrop-filter: blur(10px);
                }
                
                .modal-anuncio-content {
                    background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 1px solid var(--border);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    position: relative;
                }
                
                .modal-anuncio-header {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 1rem;
                }
                
                .modal-close-btn {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .modal-close-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                }
                
                .modal-empresa-info {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    align-items: center;
                }
                
                .modal-empresa-logo {
                    width: 120px;
                    height: 120px;
                    border-radius: 15px;
                    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    color: white;
                    box-shadow: 0 8px 32px rgba(29, 185, 84, 0.3);
                }
                
                .modal-empresa-dados h2 {
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    font-size: 1.8rem;
                }
                
                .modal-empresa-dados p {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }
                
                .modal-empresa-badges {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .badge-verificado, .badge-ativo {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .badge-verificado {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                    border: 1px solid rgba(34, 197, 94, 0.3);
                }
                
                .badge-ativo {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
                
                .modal-anuncio-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                
                .stat-item {
                    background: var(--bg-primary);
                    padding: 1rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid var(--border);
                }
                
                .stat-item strong {
                    color: var(--text-primary);
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }

                .stat-item strong.updating {
                    color: #1db954;
                    transform: scale(1.1);
                }

                .stat-item {
                    background: var(--bg-primary);
                    padding: 1rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid var(--border);
                    transition: all 0.3s ease;
                }

                .stat-item.pulse {
                    animation: statPulse 0.6s ease-in-out;
                }

                @keyframes statPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                .stat-item i {
                    color: var(--accent);
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                }

                .stat-item.pulse i {
                    color: #1db954;
                    animation: iconSpin 0.6s ease-in-out;
                }

                @keyframes iconSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .modal-anuncio-main {
                    margin-bottom: 2rem;
                }
                
                .modal-anuncio-text h3 {
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                    font-size: 1.4rem;
                }
                
                .modal-anuncio-text p {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                
                .modal-anuncio-detalhes h4 {
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }
                
                .modal-anuncio-detalhes ul {
                    list-style: none;
                    padding: 0;
                }
                
                .modal-anuncio-detalhes li {
                    color: var(--text-secondary);
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .modal-anuncio-detalhes li i {
                    color: var(--accent);
                }
                
                .modal-anuncio-contato {
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: var(--bg-primary);
                    border-radius: 12px;
                    border: 1px solid var(--border);
                }
                
                .modal-anuncio-contato h4 {
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }
                
                .contato-info {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                
                .contato-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                }
                
                .contato-item i {
                    color: var(--accent);
                }
                
                .modal-anuncio-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .btn-action {
                    flex: 1;
                    min-width: 140px;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .btn-primary {
                    background: var(--accent);
                    color: white;
                }
                
                .btn-primary:hover {
                    background: var(--accent-hover);
                    transform: translateY(-2px);
                }
                
                .btn-secondary {
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    border: 1px solid var(--border);
                }
                
                .btn-secondary:hover {
                    background: var(--bg-secondary);
                    transform: translateY(-2px);
                }
                
                .btn-share {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                    border: 1px solid rgba(59, 130, 246, 0.3);
                }
                
                .btn-share:hover {
                    background: rgba(59, 130, 246, 0.2);
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .modal-anuncio-content {
                        width: 95%;
                        padding: 1.5rem;
                    }
                    
                    .modal-empresa-info {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .modal-empresa-logo {
                        width: 80px;
                        height: 80px;
                        font-size: 2rem;
                    }
                    
                    .modal-anuncio-stats {
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .contato-info {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .modal-anuncio-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', modalCSS);
    }

    // Registrar visualização
    registrarVisualizacao(empresaId) {
        const views = JSON.parse(localStorage.getItem('anunciosVisualizacoes') || '{}');
        views[empresaId] = (views[empresaId] || 0) + 1;
        localStorage.setItem('anunciosVisualizacoes', JSON.stringify(views));
        
        console.log(`👁️ Visualização registrada para ${empresaId}`);
    }

    // Atualizar estatísticas
    atualizarEstatisticas() {
        const statsElements = document.querySelectorAll('.stat-number');
        if (statsElements.length > 0) {
            statsElements[0].textContent = this.propagandasAtivas.length;
            statsElements[1].textContent = `${(Math.random() * 1000 + 1500).toFixed(0)}`;
        }
    }

    // Novo: Sistema de estatísticas em tempo real
    inicializarSistemaEstatisticas() {
        // Carregar estatísticas do localStorage
        this.estatisticasEmpresa = JSON.parse(localStorage.getItem('estatisticasAnuncios') || '{}');
        
        // Inicializar estatísticas para cada empresa
        this.propagandasAtivas.forEach(empresa => {
            if (!this.estatisticasEmpresa[empresa.id]) {
                this.estatisticasEmpresa[empresa.id] = {
                    visualizacoes: Math.floor(Math.random() * 50) + 100, // Inicial entre 100-150
                    alcance: (Math.random() * 1000 + 1000).toFixed(0), // Entre 1K-2K
                    ultimaAtualizacao: Date.now(),
                    tempoTotalExibicao: 0,
                    cliques: 0
                };
            }
        });
        
        // Salvar estatísticas atualizadas
        this.salvarEstatisticas();
        
        console.log('📊 Sistema de estatísticas inicializado');
    }

    // Novo: Salvar estatísticas no localStorage
    salvarEstatisticas() {
        localStorage.setItem('estatisticasAnuncios', JSON.stringify(this.estatisticasEmpresa));
    }

    // Novo: Atualizar estatísticas em tempo real
    atualizarEstatisticasEmpresa(empresaId) {
        if (!this.estatisticasEmpresa[empresaId]) return;
        
        const agora = Date.now();
        const stats = this.estatisticasEmpresa[empresaId];
        const tempoDecorrido = agora - stats.ultimaAtualizacao;
        
        // Atualizar visualizações (simular crescimento orgânico)
        const incrementoVisualizacoes = Math.floor(Math.random() * 3) + 1; // 1-3 por atualização
        stats.visualizacoes += incrementoVisualizacoes;
        
        // Atualizar alcance baseado nas visualizações
        stats.alcance = Math.max(stats.visualizacoes * 4, parseInt(stats.alcance));
        
        // Atualizar tempo de exibição
        stats.tempoTotalExibicao += tempoDecorrido;
        
        stats.ultimaAtualizacao = agora;
        
        this.salvarEstatisticas();
        
        console.log(`📈 Estatísticas atualizadas para ${empresaId}:`, stats);
    }

    // Novo: Calcular visualizações por hora
    calcularVisualizacoesPorHora(empresaId) {
        const stats = this.estatisticasEmpresa[empresaId];
        if (!stats) return '+150/hora';
        
        // Simular variação baseada no horário
        const hora = new Date().getHours();
        let multiplicador = 1;
        
        if (hora >= 7 && hora <= 9) multiplicador = 1.5; // Manhã
        else if (hora >= 12 && hora <= 14) multiplicador = 1.8; // Almoço
        else if (hora >= 17 && hora <= 19) multiplicador = 2.2; // Tarde/Noite
        else if (hora >= 20 && hora <= 22) multiplicador = 1.7; // Noite
        else multiplicador = 0.8; // Madrugada
        
        const visualizacoesPorHora = Math.floor((stats.visualizacoes / 24) * multiplicador);
        return `+${visualizacoesPorHora}/hora`;
    }

    // Novo: Formatar alcance
    formatarAlcance(numero) {
        if (numero >= 1000000) {
            return (numero / 1000000).toFixed(1) + 'M';
        } else if (numero >= 1000) {
            return (numero / 1000).toFixed(1) + 'K';
        }
        return numero.toString();
    }

    // Novo: Calcular frequência dinâmica
    calcularFrequencia(empresaId, duracao) {
        // Baseado na duração e valor investido
        const stats = this.estatisticasEmpresa[empresaId];
        if (!stats) return 'A cada 4 músicas';
        
        let frequencia = 4; // Padrão
        
        if (duracao <= 15) frequencia = 5;
        else if (duracao <= 30) frequencia = 4;
        else if (duracao <= 45) frequencia = 3;
        else frequencia = 2;
        
        // Ajustar baseado no desempenho
        if (stats.visualizacoes > 300) frequencia = Math.max(2, frequencia - 1);
        
        return `A cada ${frequencia} músicas`;
    }

    // Método para navegação manual do carrossel
    mudarSlide(direction) {
        if (this.totalSlides <= 1) return;
        
        this.currentSlide += direction;
        if (this.currentSlide >= this.totalSlides) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.totalSlides - 1;
        
        console.log(`👆 Navegação manual - Direção: ${direction}, Novo slide: ${this.currentSlide + 1}/${this.totalSlides}`);
        this.updateCarrossel();
    }

    // Ir para slide específico
    irParaSlide(index) {
        if (this.totalSlides <= 1 || index < 0 || index >= this.totalSlides) return;
        
        this.currentSlide = index;
        console.log(`🎯 Navegação direta - Slide: ${this.currentSlide + 1}/${this.totalSlides}`);
        this.updateCarrossel();
    }

    // Nova função: Inicializar estatísticas para uma empresa específica
    inicializarEstatisticasEmpresa(empresaId, empresa) {
        this.estatisticasEmpresa[empresaId] = {
            visualizacoes: Math.floor(Math.random() * 100) + 150, // 150-250 inicial
            alcance: Math.floor(Math.random() * 1500) + 1000, // 1K-2.5K inicial
            ultimaAtualizacao: Date.now(),
            tempoTotalExibicao: 0,
            cliques: 0,
            duracaoAnuncio: empresa.dados ? empresa.dados.duracao : 30
        };
        this.salvarEstatisticas();
    }

    // Nova função: Atualizar estatísticas no modal
    atualizarEstatisticasModal(empresaId, empresa) {
        const stats = this.estatisticasEmpresa[empresaId];
        if (!stats) return;

        // Calcular frequência dinâmica
        const frequencia = this.calcularFrequencia(empresaId, stats.duracaoAnuncio);
        
        // Calcular visualizações por hora
        const visualizacoesPorHora = this.calcularVisualizacoesPorHora(empresaId);
        
        // Formatar duração
        const duracao = `${stats.duracaoAnuncio}s`;
        
        // Formatar alcance
        const alcance = this.formatarAlcance(stats.alcance);

        // Adicionar animação de atualização
        const elementos = [
            'modalEmpresaFrequencia',
            'modalEmpresaVisualizacoes', 
            'modalEmpresaTempo',
            'modalEmpresaAlcance'
        ];

        elementos.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.style.transition = 'all 0.3s ease';
                elemento.style.transform = 'scale(1.05)';
                elemento.style.color = '#1db954';
                
                setTimeout(() => {
                    elemento.style.transform = 'scale(1)';
                    elemento.style.color = '';
                }, 300);
            }
        });

        // Atualizar elementos do modal
        document.getElementById('modalEmpresaFrequencia').textContent = frequencia;
        document.getElementById('modalEmpresaVisualizacoes').textContent = visualizacoesPorHora;
        document.getElementById('modalEmpresaTempo').textContent = duracao;
        document.getElementById('modalEmpresaAlcance').textContent = alcance;

        // Mostrar notificação de atualização (opcional)
        this.mostrarNotificacaoEstatisticas();

        console.log(`📊 Estatísticas atualizadas no modal para ${empresaId}:`, {
            frequencia, visualizacoesPorHora, duracao, alcance
        });
    }

    // Nova função: Mostrar notificação de estatísticas atualizadas
    mostrarNotificacaoEstatisticas() {
        // Criar ou atualizar indicador de atualização
        let indicador = document.getElementById('indicadorAtualizacao');
        
        if (!indicador) {
            indicador = document.createElement('div');
            indicador.id = 'indicadorAtualizacao';
            indicador.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: linear-gradient(135deg, #1db954 0%, #1ed760 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                z-index: 25000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 16px rgba(29, 185, 84, 0.3);
                opacity: 0;
                transition: all 0.3s ease;
            `;
            indicador.innerHTML = '<i class="fas fa-sync-alt"></i> Estatísticas atualizadas';
            document.body.appendChild(indicador);
        }

        // Animar entrada
        indicador.style.opacity = '1';
        indicador.style.transform = 'translateX(0)';
        
        // Animar saída após 2 segundos
        setTimeout(() => {
            indicador.style.opacity = '0';
            indicador.style.transform = 'translateX(100%)';
        }, 2000);
    }

    // Nova função: Iniciar atualização automática
    iniciarAtualizacaoAutomatica(empresaId) {
        // Limpar intervalo anterior se existir
        if (this.intervalosAtualizacao[empresaId]) {
            clearInterval(this.intervalosAtualizacao[empresaId]);
        }

        // Criar novo intervalo para atualizar a cada 10 segundos (reduzido para evitar sobrecarga)
        this.intervalosAtualizacao[empresaId] = setInterval(() => {
            // Verificar se o modal ainda está aberto
            const modal = document.getElementById('modalAnuncioAvancado');
            if (!modal || modal.style.display === 'none') {
                clearInterval(this.intervalosAtualizacao[empresaId]);
                delete this.intervalosAtualizacao[empresaId];
                return;
            }

            // Verificar se ainda é a mesma empresa
            if (window.currentEmpresaId !== empresaId) {
                clearInterval(this.intervalosAtualizacao[empresaId]);
                delete this.intervalosAtualizacao[empresaId];
                return;
            }

            // Atualizar estatísticas
            this.atualizarEstatisticasEmpresa(empresaId);
            
            // Atualizar modal
            const empresa = this.propagandasAtivas.find(e => e.id === empresaId);
            if (empresa) {
                this.atualizarEstatisticasModal(empresaId, empresa);
            }

            console.log(`🔄 Estatísticas atualizadas automaticamente para ${empresaId}`);
        }, 10000); // Atualizar a cada 10 segundos (reduzido para evitar sobrecarga)

        console.log(`⏰ Atualização automática iniciada para ${empresaId}`);
    }
}

// Instância global
let radioAnuncios;

// Funções globais para compatibilidade
function fecharModalAvancado() {
    const modal = document.getElementById('modalAnuncioAvancado');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Parar atualizações automáticas
        if (radioAnuncios && window.currentEmpresaId) {
            const empresaId = window.currentEmpresaId;
            if (radioAnuncios.intervalosAtualizacao[empresaId]) {
                clearInterval(radioAnuncios.intervalosAtualizacao[empresaId]);
                delete radioAnuncios.intervalosAtualizacao[empresaId];
                console.log(`⏹️ Atualizações automáticas paradas para ${empresaId}`);
            }
        }
        
        // Limpar variáveis globais
        window.currentEmpresa = null;
        window.currentEmpresaId = null;
    }
}

function ligarEmpresa() {
    if (window.currentEmpresa && window.currentEmpresa.telefone) {
        window.location.href = `tel:${window.currentEmpresa.telefone}`;
    }
}

function visitarSite() {
    if (window.currentEmpresa && window.currentEmpresa.website && window.currentEmpresa.website !== '#') {
        window.open(window.currentEmpresa.website, '_blank');
    } else {
        alert('Site em breve! Entre em contato pelo telefone.');
    }
}

function compartilharAnuncio() {
    if (window.currentEmpresa) {
        const texto = `Confira este anúncio da ${window.currentEmpresa.nome} na Rádio Alo Voce! ${window.currentEmpresa.telefone}`;
        if (navigator.share) {
            navigator.share({
                title: window.currentEmpresa.nome,
                text: texto,
                url: window.location.href
            });
        } else {
            // Fallback para copiar para área de transferência
            navigator.clipboard.writeText(texto).then(() => {
                alert('Informações copiadas para a área de transferência!');
            });
        }
    }
}

// Funções de compatibilidade
function openModal(empresaId) {
    if (radioAnuncios) {
        radioAnuncios.abrirModal(empresaId);
    }
}

function closeModal() {
    fecharModalAvancado();
}

function visitarEmpresa() {
    visitarSite();
}

// Funções de navegação do carrossel
function changeAnuncio(direction) {
    console.log(`🔄 changeAnuncio chamada com direção: ${direction}`);
    if (radioAnuncios) {
        radioAnuncios.mudarSlide(direction);
    } else {
        console.error('❌ radioAnuncios não está inicializado!');
    }
}

function currentAnuncio(index) {
    console.log(`🎯 currentAnuncio chamada com índice: ${index}`);
    if (radioAnuncios) {
        radioAnuncios.irParaSlide(index);
    } else {
        console.error('❌ radioAnuncios não está inicializado!');
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log('📡 Inicializando sistema de anúncios...');
    
    // Aguardar um pouco para garantir que o DOM esteja totalmente carregado
    setTimeout(() => {
        radioAnuncios = new RadioAnunciosSystem();
        console.log('✅ Sistema de anúncios inicializado com sucesso!');
        
        // Verificar se os elementos existem
        const carouselInner = document.querySelector('.anuncios-carousel-inner');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        
        console.log('🔍 Elementos encontrados:', {
            carouselInner: !!carouselInner,
            indicators: indicators.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });
    }, 500);
    
    // Recarregar propagandas a cada 60 segundos (reduzido para evitar sobrecarga)
    let propagandaReloadInterval = setInterval(() => {
        if (radioAnuncios) {
            radioAnuncios.carregarPropagandas();
        }
    }, 60000);
});

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalAnuncioAvancado');
    if (modal && e.target === modal) {
        fecharModalAvancado();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModalAvancado();
    }
});

console.log('📡 Sistema de Anúncios Dinâmicos Carregado - Conectado ao Admin!');

// Função de teste para debug
window.testarCarrossel = function() {
    console.log('🧪 TESTE DO CARROSSEL:');
    console.log('radioAnuncios existe:', !!radioAnuncios);
    
    if (radioAnuncios) {
        console.log('Slides totais:', radioAnuncios.totalSlides);
        console.log('Slide atual:', radioAnuncios.currentSlide);
        console.log('Testando navegação para frente...');
        radioAnuncios.mudarSlide(1);
    } else {
        console.error('❌ radioAnuncios não inicializado!');
    }
};

// Nova função de teste para estatísticas
window.testarEstatisticas = function() {
    console.log('📊 TESTE DAS ESTATÍSTICAS:');
    
    if (radioAnuncios) {
        console.log('Sistema de estatísticas:', radioAnuncios.estatisticasEmpresa);
        console.log('Propagandas ativas:', radioAnuncios.propagandasAtivas.length);
        
        // Testar estatísticas para primeira empresa
        if (radioAnuncios.propagandasAtivas.length > 0) {
            const empresaId = radioAnuncios.propagandasAtivas[0].id;
            console.log(`Testando estatísticas para: ${empresaId}`);
            
            // Simular abertura do modal
            radioAnuncios.abrirModal(empresaId);
            
            setTimeout(() => {
                console.log('Modal aberto! Estatísticas atualizando automaticamente...');
            }, 1000);
        }
    } else {
        console.error('❌ radioAnuncios não inicializado!');
    }
};

// Função para mostrar estatísticas atuais
window.mostrarEstatisticas = function() {
    if (radioAnuncios && radioAnuncios.estatisticasEmpresa) {
        console.table(radioAnuncios.estatisticasEmpresa);
    } else {
        console.log('Estatísticas não disponíveis');
    }
};

// Nova função: Teste completo do sistema de estatísticas
window.testarSistemaCompleto = function() {
    console.log('🧪 TESTE COMPLETO DO SISTEMA DE ESTATÍSTICAS:');
    
    if (!radioAnuncios) {
        console.error('❌ radioAnuncios não inicializado!');
        return;
    }

    console.log('✅ Sistema carregado');
    console.log('📊 Propagandas ativas:', radioAnuncios.propagandasAtivas.length);
    console.log('📈 Estatísticas:', Object.keys(radioAnuncios.estatisticasEmpresa).length);
    
    if (radioAnuncios.propagandasAtivas.length > 0) {
        const empresa = radioAnuncios.propagandasAtivas[0];
        console.log(`🎯 Testando com empresa: ${empresa.nome}`);
        
        // Abrir modal
        radioAnuncios.abrirModal(empresa.id);
        
        console.log('🔄 Modal aberto! As estatísticas começarão a se atualizar a cada 3 segundos.');
        console.log('👁️ Observe as mudanças em:');
        console.log('   - Frequência (varia por duração e desempenho)');
        console.log('   - Visualizações (varia por horário do dia)');
        console.log('   - Alcance (cresce com visualizações)');
        console.log('   - Duração (baseada nos dados da empresa)');
        
        // Mostrar estatísticas atuais
        setTimeout(() => {
            console.log('📊 Estatísticas atuais:');
            console.table(radioAnuncios.estatisticasEmpresa);
        }, 1000);
    } else {
        console.warn('⚠️ Nenhuma propaganda ativa encontrada');
    }
};

// Adicionar teste aos botões para debug
setTimeout(() => {
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('🖱️ Botão NEXT clicado!');
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('🖱️ Botão PREV clicado!');
        });
    }
}, 1000); 