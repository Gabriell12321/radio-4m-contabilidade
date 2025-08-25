/**
 * SISTEMA DE VAGAS DE EMPREGO - RÁDIO 4M CONTABILIDADE
 * ====================================================
 * 
 * Sistema completo de gerenciamento de vagas de emprego
 * - Frontend para exibição das vagas
 * - Filtros por categoria
 * - Modal de detalhes
 * - Formulário de envio
 * - Sincronização com admin
 * 
 * Autor: Assistente AI
 * Data: 2024
 */

class VagasSystem {
    constructor() {
        this.vagas = [];
        this.categoriaAtual = 'todos';
        this.vagasCarregadas = 6; // Quantas vagas mostrar inicialmente
        this.totalVagasPorPagina = 6;
        this.lastSync = null;
        this.isLoading = false;
        
        // Estatísticas
        this.stats = {
            totalVagas: 0,
            totalEmpresas: 0,
            vagasPreenchidas: 0
        };
        
        console.log('📋 Sistema de Vagas inicializado');
        this.init();
    }
    
    async init() {
        try {
            await this.loadVagas();
            this.setupEventListeners();
            this.startPeriodicSync();
            this.updateStats();
            this.renderVagas();
            this.renderVagasDestaque();
            this.setupFormValidation();
            
            console.log('✅ Sistema de Vagas carregado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar sistema de vagas:', error);
            this.showError('Erro ao carregar vagas. Tente novamente mais tarde.');
        }
    }
    
    // === CARREGAMENTO DE DADOS ===
    async loadVagas() {
        try {
            this.isLoading = true;
            this.showLoading();
            
            // Verificar dados no localStorage primeiro
            const savedVagas = localStorage.getItem('vagasData');
            if (savedVagas) {
                this.vagas = JSON.parse(savedVagas);
                console.log(`📥 ${this.vagas.length} vagas carregadas do cache`);
            }
            
            // Se não há dados ou são muito antigos, usar dados de exemplo
            if (!this.vagas.length || this.isDataStale()) {
                await this.loadExampleData();
            }
            
            this.lastSync = Date.now();
            this.isLoading = false;
            
        } catch (error) {
            console.error('❌ Erro ao carregar vagas:', error);
            this.isLoading = false;
            throw error;
        }
    }
    
    async loadExampleData() {
        // Dados de exemplo realistas
        this.vagas = [
            {
                id: 'vaga_001',
                empresa: 'TechSolutions Ltda',
                cargo: 'Desenvolvedor Front-end',
                area: 'tecnologia',
                salario: 'R$ 4.500,00 - R$ 6.000,00',
                descricao: 'Buscamos desenvolvedor front-end com experiência em React, JavaScript e CSS. Conhecimento em TypeScript será um diferencial. Trabalho remoto flexível.',
                requisitos: ['React', 'JavaScript', 'CSS', 'Git'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Home office'],
                contato: '(11) 98765-4321',
                cidade: 'São Paulo - SP',
                urgente: true,
                destaque: true,
                publicadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
                status: 'ativo'
            },
            {
                id: 'vaga_002',
                empresa: 'Comércio Central',
                cargo: 'Vendedor(a)',
                area: 'vendas',
                salario: 'R$ 2.200,00 + comissões',
                descricao: 'Vaga para vendedor com experiência em atendimento ao cliente. Oferecemos excelente ambiente de trabalho e oportunidade de crescimento.',
                requisitos: ['Ensino médio completo', 'Experiência em vendas', 'Boa comunicação'],
                beneficios: ['Comissões atrativas', 'Vale transporte', 'Vale alimentação'],
                contato: '(11) 95432-1098',
                cidade: 'São Paulo - SP',
                urgente: false,
                destaque: false,
                publicadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
                status: 'ativo'
            },
            {
                id: 'vaga_003',
                empresa: 'Clínica Saúde Total',
                cargo: 'Enfermeiro(a)',
                area: 'saude',
                salario: 'R$ 3.800,00',
                descricao: 'Procuramos enfermeiro para atuar em clínica médica. COREN ativo obrigatório. Horário comercial, segunda a sexta.',
                requisitos: ['Formação em Enfermagem', 'COREN ativo', 'Experiência clínica'],
                beneficios: ['Plano de saúde', 'Vale refeição', 'Estacionamento'],
                contato: 'rh@saudetotal.com.br',
                cidade: 'São Paulo - SP',
                urgente: true,
                destaque: true,
                publicadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
                status: 'ativo'
            },
            {
                id: 'vaga_004',
                empresa: 'Escola Educar',
                cargo: 'Professor de Matemática',
                area: 'educacao',
                salario: 'A combinar',
                descricao: 'Vaga para professor de matemática do ensino médio. Experiência com jovens e adultos. Período matutino e vespertino.',
                requisitos: ['Licenciatura em Matemática', 'Experiência docente', 'Didática'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Férias escolares'],
                contato: '(11) 94321-5678',
                cidade: 'São Paulo - SP',
                urgente: false,
                destaque: false,
                publicadoEm: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dias atrás
                status: 'ativo'
            },
            {
                id: 'vaga_005',
                empresa: 'AdminPro Consultoria',
                cargo: 'Assistente Administrativo',
                area: 'administrativo',
                salario: 'R$ 2.800,00',
                descricao: 'Assistente administrativo para rotinas de escritório, controle de documentos e atendimento telefônico. Conhecimento em Excel é essencial.',
                requisitos: ['Ensino médio completo', 'Experiência administrativa', 'Excel intermediário'],
                beneficios: ['Vale transporte', 'Vale alimentação', 'Convênio médico'],
                contato: 'vagas@adminpro.com.br',
                cidade: 'São Paulo - SP',
                urgente: false,
                destaque: false,
                publicadoEm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
                status: 'ativo'
            },
            {
                id: 'vaga_006',
                empresa: 'ServiTech Manutenção',
                cargo: 'Técnico em Eletrônica',
                area: 'servicos',
                salario: 'R$ 3.200,00',
                descricao: 'Técnico para manutenção de equipamentos eletrônicos. Atendimento em campo e bancada. Experiência com soldagem e componentes eletrônicos.',
                requisitos: ['Curso técnico em Eletrônica', 'Experiência em manutenção', 'CNH categoria B'],
                beneficios: ['Vale combustível', 'Ferramentas fornecidas', 'Treinamentos'],
                contato: '(11) 97654-3210',
                cidade: 'São Paulo - SP',
                urgente: false,
                destaque: false,
                publicadoEm: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 dias atrás
                status: 'ativo'
            }
        ];
        
        // Salvar no localStorage
        localStorage.setItem('vagasData', JSON.stringify(this.vagas));
        localStorage.setItem('vagasLastUpdate', Date.now().toString());
        
        console.log('📋 Dados de exemplo das vagas carregados');
    }
    
    isDataStale() {
        const lastUpdate = localStorage.getItem('vagasLastUpdate');
        if (!lastUpdate) return true;
        
        const timeDiff = Date.now() - parseInt(lastUpdate);
        return timeDiff > (24 * 60 * 60 * 1000); // 24 horas
    }
    
    // === RENDERIZAÇÃO ===
    renderVagas() {
        const container = document.getElementById('vagasGrid');
        if (!container) return;
        
        const vagasFiltradas = this.filtrarVagasPorCategoria();
        const vagasParaMostrar = vagasFiltradas.slice(0, this.vagasCarregadas);
        
        if (vagasParaMostrar.length === 0) {
            container.innerHTML = this.getNoVagasHTML();
            return;
        }
        
        container.innerHTML = vagasParaMostrar.map(vaga => this.getVagaCardHTML(vaga)).join('');
        this.attachVagaEventListeners();
    }
    
    renderVagasDestaque() {
        const container = document.getElementById('vagasDestaque');
        if (!container) return;
        
        const vagasDestaque = this.vagas.filter(vaga => vaga.destaque && vaga.status === 'ativo');
        
        if (vagasDestaque.length === 0) {
            container.innerHTML = '<p style="color: rgba(255,255,255,0.8); text-align: center;">Nenhuma vaga em destaque no momento.</p>';
            return;
        }
        
        container.innerHTML = vagasDestaque.map(vaga => this.getVagaDestaqueHTML(vaga)).join('');
    }
    
    getVagaCardHTML(vaga) {
        const dataPublicacao = this.formatDate(vaga.publicadoEm);
        const salarioDisplay = vaga.salario || 'A combinar';
        const urgenteClass = vaga.urgente ? 'urgente' : '';
        const urgenteBadge = vaga.urgente ? '<div class="badge-urgente">URGENTE</div>' : '';
        
        return `
            <div class="vaga-card ${urgenteClass}" data-id="${vaga.id}" data-area="${vaga.area}">
                ${urgenteBadge}
                <div class="vaga-header">
                    <div class="vaga-area">
                        <i class="${this.getAreaIcon(vaga.area)}"></i>
                        ${this.getAreaName(vaga.area)}
                    </div>
                </div>
                
                <div class="vaga-content">
                    <div class="vaga-empresa">${vaga.empresa}</div>
                    <div class="vaga-cargo">${vaga.cargo}</div>
                    <div class="vaga-salario">${salarioDisplay}</div>
                    <div class="vaga-descricao">${this.truncateText(vaga.descricao, 120)}</div>
                </div>
                
                <div class="vaga-footer">
                    <div class="vaga-meta">
                        <div class="vaga-cidade">
                            <i class="fas fa-map-marker-alt"></i>
                            ${vaga.cidade}
                        </div>
                        <div class="vaga-data">
                            <i class="fas fa-calendar"></i>
                            ${dataPublicacao}
                        </div>
                    </div>
                    <button class="ver-detalhes-vaga-btn" onclick="vagasSystem.abrirModalVaga('${vaga.id}')">
                        <i class="fas fa-eye"></i>
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
    }
    
    getVagaDestaqueHTML(vaga) {
        return `
            <div class="vaga-destaque-card" data-id="${vaga.id}">
                <div class="destaque-badge">🔥 DESTAQUE</div>
                <h4>${vaga.cargo}</h4>
                <p class="empresa">${vaga.empresa}</p>
                <p class="salario">${vaga.salario || 'A combinar'}</p>
                <button onclick="vagasSystem.abrirModalVaga('${vaga.id}')" class="btn-ver-destaque">
                    Ver Vaga
                </button>
            </div>
        `;
    }
    
    getNoVagasHTML() {
        return `
            <div class="no-vagas">
                <div class="no-vagas-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h3>Nenhuma vaga encontrada</h3>
                <p>Não há vagas disponíveis para a categoria selecionada no momento.</p>
                <button onclick="filtrarVagas('todos')" class="btn-voltar-todas">
                    Ver Todas as Vagas
                </button>
            </div>
        `;
    }
    
    // === FILTROS ===
    filtrarVagasPorCategoria() {
        if (this.categoriaAtual === 'todos') {
            return this.vagas.filter(vaga => vaga.status === 'ativo');
        }
        
        return this.vagas.filter(vaga => 
            vaga.area === this.categoriaAtual && vaga.status === 'ativo'
        );
    }
    
    // === MODAL ===
    abrirModalVaga(vagaId) {
        const vaga = this.vagas.find(v => v.id === vagaId);
        if (!vaga) return;
        
        const modal = document.getElementById('vagaModal');
        const modalBody = modal.querySelector('.vaga-modal-body');
        
        modalBody.innerHTML = this.getModalVagaHTML(vaga);
        modal.style.display = 'block';
        
        // Adicionar ao histórico
        this.addToHistory('vaga_view', vaga.id);
    }
    
    getModalVagaHTML(vaga) {
        const dataPublicacao = this.formatDate(vaga.publicadoEm);
        const requisitos = vaga.requisitos ? vaga.requisitos.map(req => `<li>${req}</li>`).join('') : '<li>Não especificado</li>';
        const beneficios = vaga.beneficios ? vaga.beneficios.map(ben => `<li>${ben}</li>`).join('') : '<li>Não especificado</li>';
        
        return `
            <div class="modal-vaga-header">
                <div class="vaga-titulo">
                    <h2>${vaga.cargo}</h2>
                    <div class="vaga-empresa-modal">${vaga.empresa}</div>
                </div>
                ${vaga.urgente ? '<div class="badge-urgente-modal">URGENTE</div>' : ''}
            </div>
            
            <div class="modal-vaga-info">
                <div class="info-grid">
                    <div class="info-item">
                        <i class="fas fa-tag"></i>
                        <strong>Área:</strong> ${this.getAreaName(vaga.area)}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-dollar-sign"></i>
                        <strong>Salário:</strong> ${vaga.salario || 'A combinar'}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <strong>Local:</strong> ${vaga.cidade}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <strong>Publicado:</strong> ${dataPublicacao}
                    </div>
                </div>
            </div>
            
            <div class="modal-vaga-descricao">
                <h3>Descrição da Vaga</h3>
                <p>${vaga.descricao}</p>
            </div>
            
            <div class="modal-vaga-requisitos">
                <h3>Requisitos</h3>
                <ul>${requisitos}</ul>
            </div>
            
            <div class="modal-vaga-beneficios">
                <h3>Benefícios</h3>
                <ul>${beneficios}</ul>
            </div>
            
            <div class="modal-vaga-contato">
                <h3>Como se candidatar</h3>
                <div class="contato-info">
                    <p><strong>Entre em contato:</strong></p>
                    <p class="contato-dados">${vaga.contato}</p>
                    <p class="contato-instrucoes">
                        Mencione que viu a vaga na Rádio 4M Contabilidade
                    </p>
                </div>
            </div>
            
            <div class="modal-vaga-actions">
                <button class="btn-candidatar" onclick="vagasSystem.candidatarVaga('${vaga.id}')">
                    <i class="fas fa-paper-plane"></i>
                    Entrar em Contato
                </button>
                <button class="btn-compartilhar-vaga" onclick="vagasSystem.compartilharVaga('${vaga.id}')">
                    <i class="fas fa-share"></i>
                    Compartilhar
                </button>
            </div>
        `;
    }
    
    // === AÇÕES ===
    candidatarVaga(vagaId) {
        const vaga = this.vagas.find(v => v.id === vagaId);
        if (!vaga) return;
        
        // Detectar se é email ou telefone
        const isEmail = vaga.contato.includes('@');
        const isPhone = /\(\d{2}\)\s?\d{4,5}-?\d{4}/.test(vaga.contato);
        
        if (isEmail) {
            const subject = encodeURIComponent(`Interesse na vaga: ${vaga.cargo}`);
            const body = encodeURIComponent(`Olá, tenho interesse na vaga de ${vaga.cargo} anunciada na Rádio 4M Contabilidade.\n\nAguardo retorno.`);
            window.open(`mailto:${vaga.contato}?subject=${subject}&body=${body}`);
        } else if (isPhone) {
            const phoneNumber = vaga.contato.replace(/\D/g, '');
            const message = encodeURIComponent(`Olá! Tenho interesse na vaga de ${vaga.cargo} anunciada na Rádio 4M Contabilidade.`);
            window.open(`https://wa.me/55${phoneNumber}?text=${message}`);
        } else {
            // Copiar para área de transferência
            navigator.clipboard.writeText(vaga.contato).then(() => {
                this.showNotification('Contato copiado para área de transferência!', 'success');
            });
        }
        
        this.addToHistory('candidatura', vaga.id);
    }
    
    compartilharVaga(vagaId) {
        const vaga = this.vagas.find(v => v.id === vagaId);
        if (!vaga) return;
        
        const text = `🔥 Vaga: ${vaga.cargo}\n🏢 ${vaga.empresa}\n💰 ${vaga.salario || 'A combinar'}\n📍 ${vaga.cidade}\n\nVia Rádio 4M Contabilidade`;
        
        if (navigator.share) {
            navigator.share({
                title: `Vaga: ${vaga.cargo}`,
                text: text,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Vaga copiada para área de transferência!', 'success');
            });
        }
    }
    
    // === FORMULÁRIO ===
    setupFormValidation() {
        const form = document.querySelector('.vagas-form');
        if (!form) return;
        
        // Contador de caracteres
        const textarea = form.querySelector('#descricao-vaga');
        const counter = form.querySelector('.char-counter');
        
        if (textarea && counter) {
            textarea.addEventListener('input', () => {
                const count = textarea.value.length;
                counter.textContent = `${count}/500 caracteres`;
                
                if (count > 450) {
                    counter.style.color = '#ff4444';
                } else if (count > 400) {
                    counter.style.color = '#ff8800';
                } else {
                    counter.style.color = '#95a5a6';
                }
            });
        }
    }
    
    // === UTILITÁRIOS ===
    getAreaIcon(area) {
        const icons = {
            'vendas': 'fas fa-shopping-cart',
            'administrativo': 'fas fa-file-alt',
            'tecnologia': 'fas fa-laptop-code',
            'saude': 'fas fa-heartbeat',
            'educacao': 'fas fa-graduation-cap',
            'servicos': 'fas fa-tools'
        };
        return icons[area] || 'fas fa-briefcase';
    }
    
    getAreaName(area) {
        const names = {
            'vendas': 'Vendas',
            'administrativo': 'Administrativo',
            'tecnologia': 'Tecnologia',
            'saude': 'Saúde',
            'educacao': 'Educação',
            'servicos': 'Serviços'
        };
        return names[area] || 'Outros';
    }
    
    formatDate(date) {
        if (!date) return 'Data não informada';
        
        const d = new Date(date);
        const now = new Date();
        const diffTime = Math.abs(now - d);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hoje';
        if (diffDays === 1) return 'Ontem';
        if (diffDays < 7) return `${diffDays} dias atrás`;
        
        return d.toLocaleDateString('pt-BR');
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    // === ESTATÍSTICAS ===
    updateStats() {
        const totalVagas = this.vagas.filter(v => v.status === 'ativo').length;
        const empresas = [...new Set(this.vagas.map(v => v.empresa))].length;
        const preenchidas = Math.floor(totalVagas * 0.7); // Simular vagas preenchidas
        
        this.stats = { totalVagas, totalEmpresas: empresas, vagasPreenchidas: preenchidas };
        
        // Atualizar elementos da página
        this.updateStatsDisplay();
    }
    
    updateStatsDisplay() {
        const elements = {
            'totalVagas': this.stats.totalVagas,
            'totalEmpresas': this.stats.totalEmpresas,
            'vagasPreenchidas': this.stats.vagasPreenchidas
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                this.animateNumber(element, value);
            }
        });
    }
    
    animateNumber(element, targetValue) {
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    // === EVENTOS ===
    setupEventListeners() {
        // Fechar modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('vaga-modal') || e.target.classList.contains('vaga-modal-close')) {
                document.getElementById('vagaModal').style.display = 'none';
            }
        });
        
        // Escape para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('vagaModal').style.display = 'none';
            }
        });
    }
    
    attachVagaEventListeners() {
        // Event listeners específicos dos cards de vaga
        document.querySelectorAll('.vaga-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const vagaId = card.dataset.id;
                    this.abrirModalVaga(vagaId);
                }
            });
        });
    }
    
    // === SINCRONIZAÇÃO ===
    startPeriodicSync() {
        // Sincronizar a cada 10 minutos (reduzido para evitar sobrecarga)
        this.syncInterval = setInterval(() => {
            this.syncWithAdmin();
        }, 10 * 60 * 1000);
    }
    
    async syncWithAdmin() {
        try {
            // Verificar se há dados do admin
            const adminData = localStorage.getItem('adminVagasData');
            if (adminData) {
                const parsedData = JSON.parse(adminData);
                if (parsedData.lastUpdate > this.lastSync) {
                    this.vagas = parsedData.vagas || this.vagas;
                    this.lastSync = parsedData.lastUpdate;
                    this.updateStats();
                    this.renderVagas();
                    this.renderVagasDestaque();
                    console.log('🔄 Vagas sincronizadas com admin');
                }
            }
        } catch (error) {
            console.error('❌ Erro na sincronização:', error);
        }
    }
    
    // === UTILIDADES DE UI ===
    showLoading() {
        const container = document.getElementById('vagasGrid');
        if (container) {
            container.innerHTML = `
                <div class="loading-vagas">
                    <div class="loading-spinner"></div>
                    <p>Carregando vagas...</p>
                </div>
            `;
        }
    }
    
    showError(message) {
        const container = document.getElementById('vagasGrid');
        if (container) {
            container.innerHTML = `
                <div class="error-vagas">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn-retry">Tentar Novamente</button>
                </div>
            `;
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} show`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check' : 'fa-info'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    addToHistory(action, vagaId) {
        const history = JSON.parse(localStorage.getItem('vagasHistory') || '[]');
        history.push({
            action,
            vagaId,
            timestamp: Date.now()
        });
        
        // Manter apenas últimos 50 registros
        if (history.length > 50) {
            history.splice(0, history.length - 50);
        }
        
        localStorage.setItem('vagasHistory', JSON.stringify(history));
    }
}

// === FUNÇÕES GLOBAIS ===
function filtrarVagas(categoria) {
    if (!window.vagasSystem) return;
    
    // Atualizar botões ativos
    document.querySelectorAll('.vagas-filters .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-categoria="${categoria}"]`).classList.add('active');
    
    // Filtrar e renderizar
    window.vagasSystem.categoriaAtual = categoria;
    window.vagasSystem.vagasCarregadas = window.vagasSystem.totalVagasPorPagina; // Reset para primeira página
    window.vagasSystem.renderVagas();
    
    console.log(`🔍 Filtro aplicado: ${categoria}`);
}

function carregarMaisVagas() {
    if (!window.vagasSystem) return;
    
    window.vagasSystem.vagasCarregadas += window.vagasSystem.totalVagasPorPagina;
    window.vagasSystem.renderVagas();
    
    console.log(`📖 Carregadas mais vagas. Total: ${window.vagasSystem.vagasCarregadas}`);
}

function enviarVaga(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const novaVaga = {
        id: 'vaga_' + Date.now(),
        empresa: formData.get('empresa'),
        cargo: formData.get('cargo'),
        area: formData.get('area'),
        salario: formData.get('salario') || 'A combinar',
        descricao: formData.get('descricao'),
        contato: formData.get('contato'),
        cidade: formData.get('cidade'),
        urgente: formData.get('urgente') === 'on',
        destaque: false,
        publicadoEm: new Date(),
        status: 'pendente' // Aguardando aprovação do admin
    };
    
    // Enviar para aprovação do admin
    const pendingVagas = JSON.parse(localStorage.getItem('pendingVagas') || '[]');
    pendingVagas.push(novaVaga);
    localStorage.setItem('pendingVagas', JSON.stringify(pendingVagas));
    
    // Feedback para o usuário
    if (window.vagasSystem) {
        window.vagasSystem.showNotification('Vaga enviada para aprovação! Será publicada em breve.', 'success');
    }
    
    // Limpar formulário
    form.reset();
    
    console.log('📤 Nova vaga enviada para aprovação:', novaVaga);
}

function fecharModalVaga() {
    const modal = document.getElementById('vagaModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vagasGrid')) {
        window.vagasSystem = new VagasSystem();
    }
});

// Expor para uso global
window.VagasSystem = VagasSystem;

console.log('📋 Sistema de Vagas carregado e pronto para uso'); 