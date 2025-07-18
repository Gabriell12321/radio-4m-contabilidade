// Sistema de Administração - Rádio Alo Voce
// Base de dados simulada (localStorage)

class AdminSystem {
    constructor() {
        this.initializeData();
        this.loadPropagandas();
        this.loadNoticias();
        this.loadNotasFalecimento();
        this.updateStats();
    }

    // Inicializar dados padrão
    initializeData() {
        if (!localStorage.getItem('radioAloVoce_propagandas')) {
            const propagandasPadrao = [
                {
                    id: 1,
                    empresa: "Supermercado Central",
                    duracao: 30,
                    valor: 250.00,
                    status: "ativa",
                    dataInicio: "2024-01-15",
                    dataFim: "2024-02-15",
                    arquivo: "supermercado-central.mp3",
                    aprovado: true,
                    imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWRiOTU0Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiPlM8L3RleHQ+Cjwvc3ZnPg==",
                    descricao: "Mega promoção de fim de ano! Descontos de até 30% em todos os produtos. Venha conferir as melhores ofertas da cidade!",
                    telefone: "(11) 3456-7890",
                    website: "https://supermercadocentral.com.br"
                },
                {
                    id: 2,
                    empresa: "Auto Escola Direção",
                    duracao: 45,
                    valor: 350.00,
                    status: "ativa",
                    dataInicio: "2024-01-20",
                    dataFim: "2024-02-20",
                    arquivo: "auto-escola.mp3",
                    aprovado: true,
                    imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZWY0NDQ0Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiPkE8L3RleHQ+Cjwvc3ZnPg==",
                    descricao: "Sua CNH em 45 dias! Curso completo com aulas práticas flexíveis, simulador de direção e aprovação garantida.",
                    telefone: "(11) 2345-6789",
                    website: "https://autoescoladirecao.com.br"
                },
                {
                    id: 3,
                    empresa: "Farmácia Saúde Total",
                    duracao: 25,
                    valor: 200.00,
                    status: "ativa",
                    dataInicio: "2024-01-10",
                    dataFim: "2024-02-10",
                    arquivo: "farmacia-saude.mp3",
                    aprovado: true,
                    imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzc4NGY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiPkY8L3RleHQ+Cjwvc3ZnPg==",
                    descricao: "Medicamentos com os melhores preços! Entrega em domicílio e atendimento farmacêutico especializado 24 horas.",
                    telefone: "(11) 4567-8901",
                    website: "https://farmaciasaudetotal.com.br"
                }
            ];
            localStorage.setItem('radioAloVoce_propagandas', JSON.stringify(propagandasPadrao));
        }

        if (!localStorage.getItem('radioAloVoce_noticias')) {
            const noticiasPadrao = [
                {
                    id: 1,
                    titulo: "Nova loja de roupas inaugura no centro",
                    empresa: "Moda & Estilo",
                    conteudo: "A nova loja Moda & Estilo acaba de inaugurar no centro da cidade com promoções imperdíveis para toda a família.",
                    valor: 150.00,
                    status: "aprovada",
                    dataPublicacao: "2024-01-15T09:00",
                    dataCriacao: "2024-01-14T14:30"
                },
                {
                    id: 2,
                    titulo: "Promoção especial de fim de ano",
                    empresa: "Eletrodomésticos Silva",
                    conteudo: "Aproveite nossa mega promoção de fim de ano com descontos de até 50% em todos os eletrodomésticos.",
                    valor: 300.00,
                    status: "pendente",
                    dataPublicacao: "2024-01-20T15:00",
                    dataCriacao: "2024-01-19T10:15"
                }
            ];
            localStorage.setItem('radioAloVoce_noticias', JSON.stringify(noticiasPadrao));
        }

        // Inicializar notas de falecimento se não existirem
        if (!localStorage.getItem('radioAloVoce_notas_falecimento')) {
            const notasFalecimentoPadrao = [];
            localStorage.setItem('radioAloVoce_notas_falecimento', JSON.stringify(notasFalecimentoPadrao));
        }

        // Inicializar eventos se não existirem
        if (!localStorage.getItem('radioAloVoce_eventos')) {
            const eventosPadrao = [
                {
                    id: 1,
                    titulo: 'Show de Fim de Ano',
                    descricao: 'Grande show com os melhores artistas da região para comemorar o fim do ano',
                    data: '31/12/2024',
                    hora: '20:00',
                    local: 'Praça Central da Cidade',
                    categoria: 'Música',
                    preco: 'Entrada Gratuita',
                    organizador: 'Rádio Alo Voce',
                    telefone: '(11) 99999-9999',
                    email: 'eventos@radioalovoce.com.br',
                    status: 'ativo',
                    destaque: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 2,
                    titulo: 'Festival de Verão',
                    descricao: 'Três dias de música, diversão e entretenimento para toda a família',
                    data: '15/01/2025',
                    hora: '16:00',
                    local: 'Parque da Cidade',
                    categoria: 'Festival',
                    preco: 'A partir de R$ 25,00',
                    organizador: 'Prefeitura Municipal',
                    telefone: '(11) 3333-3333',
                    email: 'cultura@prefeitura.gov.br',
                    status: 'ativo',
                    destaque: false,
                    dataCriacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventosPadrao));
        }
    }

    // Carregar propagandas na tabela
    loadPropagandas() {
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const tbody = document.getElementById('propagandasList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        propagandas.forEach(propaganda => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${propaganda.empresa}</td>
                <td>${propaganda.duracao}s</td>
                <td>R$ ${propaganda.valor.toFixed(2)}</td>
                <td>
                    <span class="status-badge status-${propaganda.status === 'ativa' ? 'active' : propaganda.status}">
                        ${propaganda.status.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(propaganda.dataInicio).toLocaleDateString('pt-BR')}</td>
                <td>
                    <div class="action-buttons">
                    ${propaganda.status === 'pendente' ? `
                            <button class="action-btn" onclick="aprovarPropaganda(${propaganda.id})" title="Aprovar">
                                <i class="fas fa-check"></i>
                        </button>
                            <button class="action-btn" onclick="rejeitarPropaganda(${propaganda.id})" title="Rejeitar">
                                <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                        <button class="action-btn" onclick="editarPropaganda(${propaganda.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                    </button>
                        <button class="action-btn danger" onclick="deletarPropaganda(${propaganda.id})" title="Deletar">
                            <i class="fas fa-trash"></i>
                    </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Carregar notícias na tabela
    loadNoticias() {
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const tbody = document.getElementById('noticiasList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        noticias.forEach(noticia => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${noticia.titulo}</td>
                <td>${noticia.empresa}</td>
                <td>R$ ${noticia.valor.toFixed(2)}</td>
                <td>
                    <span class="status-badge status-${noticia.status === 'aprovada' ? 'approved' : noticia.status}">
                        ${noticia.status.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}</td>
                <td>
                    <div class="action-buttons">
                    ${noticia.status === 'pendente' ? `
                            <button class="action-btn" onclick="aprovarNoticia(${noticia.id})" title="Aprovar">
                                <i class="fas fa-check"></i>
                        </button>
                            <button class="action-btn" onclick="rejeitarNoticia(${noticia.id})" title="Rejeitar">
                                <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                        <button class="action-btn" onclick="editarNoticia(${noticia.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                    </button>
                        <button class="action-btn danger" onclick="deletarNoticia(${noticia.id})" title="Deletar">
                            <i class="fas fa-trash"></i>
                    </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Carregar notas de falecimento na tabela
    loadNotasFalecimento() {
        const notas = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
        const tbody = document.getElementById('notasFalecimentoList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        notas.forEach(nota => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${nota.nome || 'Não informado'}</td>
                <td>${nota.apelido || 'Não informado'}</td>
                <td>${nota.idade || 'N/A'}</td>
                <td>${nota.empresa || 'Não informado'}</td>
                <td>
                    <span class="status-badge status-${nota.status === 'ativa' ? 'active' : nota.status}">
                        ${nota.status.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(nota.dataCriacao).toLocaleDateString('pt-BR')}</td>
                <td>
                    <div class="action-buttons">
                    ${nota.status === 'pendente' ? `
                            <button class="action-btn" onclick="aprovarNotaFalecimento(${nota.id})" title="Aprovar">
                                <i class="fas fa-check"></i>
                        </button>
                            <button class="action-btn" onclick="rejeitarNotaFalecimento(${nota.id})" title="Rejeitar">
                                <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                        <button class="action-btn" onclick="editarNotaFalecimento(${nota.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                    </button>
                        <button class="action-btn danger" onclick="deletarNotaFalecimento(${nota.id})" title="Deletar">
                            <i class="fas fa-trash"></i>
                    </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Atualizar estatísticas do dashboard
    updateStats() {
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const notasFalecimento = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];

        // Contar propagandas ativas
        const propagandasAtivas = propagandas.filter(p => p.status === 'ativa').length;
        const totalPropagandas = document.getElementById('totalPropagandas');
        if (totalPropagandas) totalPropagandas.textContent = propagandasAtivas;

        // Contar notícias pendentes
        const noticiasPendentes = noticias.filter(n => n.status === 'pendente').length;
        const noticiasPendentesEl = document.getElementById('noticiasPendentes');
        if (noticiasPendentesEl) noticiasPendentesEl.textContent = noticiasPendentes;

        // Contar notas de falecimento ativas
        const notasFalecimentoAtivas = notasFalecimento.filter(n => n.status === 'ativa').length;
        const notasFalecimentoAtivasEl = document.getElementById('notasFalecimentoAtivas');
        if (notasFalecimentoAtivasEl) notasFalecimentoAtivasEl.textContent = notasFalecimentoAtivas;

        // Simular ouvintes online (número aleatório entre 200-400)
        const ouvintes = Math.floor(Math.random() * 200) + 200;
        const ouvintesOnline = document.getElementById('ouvintesOnline');
        if (ouvintesOnline) ouvintesOnline.textContent = ouvintes;

        // Calcular receita mensal baseada em dados reais
        const receitaPropagandas = propagandas.filter(p => p.status === 'ativa').reduce((total, p) => total + p.valor, 0);
        const receitaNoticias = noticias.filter(n => n.status === 'aprovada').reduce((total, n) => total + n.valor, 0);
        const receitaEventos = eventos.filter(e => e.status === 'ativo').reduce((total, e) => {
            const preco = e.preco.replace(/[^\d,]/g, '').replace(',', '.');
            return total + (parseFloat(preco) || 0);
        }, 0);
        const receitaVendas = vendas.filter(v => v.status === 'ativo').reduce((total, v) => {
            const preco = v.preco.replace(/[^\d,]/g, '').replace(',', '.');
            return total + (parseFloat(preco) || 0);
        }, 0);
        const receitaPromocoes = promocoes.filter(p => p.status === 'ativo').reduce((total, p) => {
            const desconto = p.desconto.replace(/[^\d,]/g, '').replace(',', '.');
            return total + (parseFloat(desconto) || 0);
        }, 0);

        const receitaTotal = receitaPropagandas + receitaNoticias + receitaEventos + receitaVendas + receitaPromocoes;
        const receitaMensalEl = document.getElementById('receitaMensal');
        if (receitaMensalEl) {
            receitaMensalEl.textContent = `R$ ${receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        // Calcular crescimento percentual (simulado baseado nos dados)
        const crescimentoPropagandas = propagandasAtivas > 0 ? Math.floor(Math.random() * 20) + 5 : 0;
        const crescimentoNoticias = noticiasPendentes > 0 ? Math.floor(Math.random() * 15) + 3 : 0;
        const crescimentoOuvintes = Math.floor(Math.random() * 30) + 10;
        const crescimentoReceita = receitaTotal > 0 ? Math.floor(Math.random() * 25) + 8 : 0;

        // Atualizar indicadores de crescimento
        const crescimentoPropagandasEl = document.getElementById('crescimentoPropagandas');
        if (crescimentoPropagandasEl) crescimentoPropagandasEl.textContent = `${crescimentoPropagandas}%`;

        const crescimentoNoticiasEl = document.getElementById('crescimentoNoticias');
        if (crescimentoNoticiasEl) crescimentoNoticiasEl.textContent = `${crescimentoNoticias}%`;

        const crescimentoOuvintesEl = document.getElementById('crescimentoOuvintes');
        if (crescimentoOuvintesEl) crescimentoOuvintesEl.textContent = `${crescimentoOuvintes}%`;

        const crescimentoReceitaEl = document.getElementById('crescimentoReceita');
        if (crescimentoReceitaEl) crescimentoReceitaEl.textContent = `${crescimentoReceita}%`;

        // Atualizar atividades recentes
        this.updateAtividadesRecentes();

        // Atualizar estatísticas das outras seções
        if (typeof this.updateEventosStats === 'function') {
            this.updateEventosStats();
        }
        if (typeof this.updateVendasStats === 'function') {
            this.updateVendasStats();
        }
        if (typeof this.updatePromocoesStats === 'function') {
            this.updatePromocoesStats();
        }
        if (typeof this.updateRecadosStats === 'function') {
            this.updateRecadosStats();
        }
        if (typeof this.updateVagasStats === 'function') {
            this.updateVagasStats();
        }
    }

    // Atualizar atividades recentes
    updateAtividadesRecentes() {
        const atividadesRecentes = document.getElementById('atividadesRecentes');
        if (!atividadesRecentes) return;

        const atividades = [];
        
        // Buscar atividades recentes de todas as seções
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];

        // Adicionar atividades de propagandas
        propagandas.forEach(p => {
            if (p.dataCriacao) {
                atividades.push({
                    acao: `Propaganda ${p.status === 'ativa' ? 'aprovada' : p.status === 'pendente' ? 'criada' : 'rejeitada'}`,
                    usuario: 'Admin',
                    data: this.calcularTempoRelativo(p.dataCriacao),
                    status: p.status === 'ativa' ? 'Sucesso' : p.status === 'pendente' ? 'Pendente' : 'Rejeitado',
                    timestamp: new Date(p.dataCriacao).getTime()
                });
            }
        });

        // Adicionar atividades de notícias
        noticias.forEach(n => {
            if (n.dataCriacao) {
                atividades.push({
                    acao: `Notícia ${n.status === 'aprovada' ? 'publicada' : n.status === 'pendente' ? 'criada' : 'rejeitada'}`,
                    usuario: 'Admin',
                    data: this.calcularTempoRelativo(n.dataCriacao),
                    status: n.status === 'aprovada' ? 'Sucesso' : n.status === 'pendente' ? 'Pendente' : 'Rejeitado',
                    timestamp: new Date(n.dataCriacao).getTime()
                });
            }
        });

        // Adicionar atividades de eventos
        eventos.forEach(e => {
            if (e.dataCriacao) {
                atividades.push({
                    acao: `Evento ${e.status === 'ativo' ? 'adicionado' : 'removido'}`,
                    usuario: 'Admin',
                    data: this.calcularTempoRelativo(e.dataCriacao),
                    status: e.status === 'ativo' ? 'Sucesso' : 'Inativo',
                    timestamp: new Date(e.dataCriacao).getTime()
                });
            }
        });

        // Ordenar por timestamp (mais recentes primeiro) e pegar as 5 mais recentes
        const atividadesOrdenadas = atividades
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5);

        // Atualizar tabela
        atividadesRecentes.innerHTML = '';
        atividadesOrdenadas.forEach(atividade => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${atividade.acao}</td>
                <td>${atividade.usuario}</td>
                <td>${atividade.data}</td>
                <td><span class="status-badge status-${atividade.status === 'Sucesso' ? 'approved' : atividade.status === 'Pendente' ? 'pending' : 'rejected'}">${atividade.status}</span></td>
            `;
            atividadesRecentes.appendChild(tr);
        });
    }

    // Calcular tempo relativo
    calcularTempoRelativo(dataString) {
        const agora = new Date();
        const data = new Date(dataString);
        const diffMs = agora - data;
        const diffMin = Math.floor(diffMs / (1000 * 60));
        const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMin < 1) return 'Agora mesmo';
        if (diffMin < 60) return `Há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
        if (diffHoras < 24) return `Há ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
        return `Há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
    }

    // Atualizar estatísticas de eventos
    updateEventosStats() {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        
        const eventosAtivos = eventos.filter(e => e.status === 'ativo').length;
        const eventosElement = document.getElementById('eventosAtivos');
        if (eventosElement) eventosElement.textContent = eventosAtivos;
        
        const eventosPendentes = eventos.filter(e => e.status === 'pendente').length;
        const eventosPendentesElement = document.getElementById('eventosPendentes');
        if (eventosPendentesElement) eventosPendentesElement.textContent = eventosPendentes;
    }

    // Atualizar estatísticas de vendas
    updateVendasStats() {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        
        const vendasAtivas = vendas.filter(v => v.status === 'ativo').length;
        const vendasBadge = document.getElementById('vendasBadge');
        if (vendasBadge) vendasBadge.textContent = vendasAtivas;
    }

    // Atualizar estatísticas de promoções
    updatePromocoesStats() {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        
        const promocoesAtivas = promocoes.filter(p => p.status === 'ativo').length;
        const promocoesBadge = document.getElementById('promocoesBadge');
        if (promocoesBadge) promocoesBadge.textContent = promocoesAtivas;
    }

    // Atualizar estatísticas de recados
    updateRecadosStats() {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        
        const recadosAtivos = recados.filter(r => r.status === 'ativo').length;
        const recadosBadge = document.getElementById('recadosBadge');
        if (recadosBadge) recadosBadge.textContent = recadosAtivos;
    }

    // Atualizar estatísticas de vagas
    updateVagasStats() {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];
        
        const vagasAtivas = vagas.filter(v => v.status === 'ativo').length;
        const vagasBadge = document.getElementById('vagasBadge');
        if (vagasBadge) vagasBadge.textContent = vagasAtivas;
    }

    // Forçar atualização completa do dashboard
    forceUpdateDashboard() {
        console.log('🔄 Forçando atualização do dashboard...');
        this.updateStats();
        this.loadPropagandas();
        this.loadNoticias();
        this.loadNotasFalecimento();
        
        // Atualizar outras seções se existirem
        if (typeof eventosAdmin !== 'undefined' && eventosAdmin) {
            eventosAdmin.loadEventos();
        }
        if (typeof vendasAdmin !== 'undefined' && vendasAdmin) {
            vendasAdmin.loadVendas();
        }
        if (typeof promocoesAdmin !== 'undefined' && promocoesAdmin) {
            promocoesAdmin.loadPromocoes();
        }
        if (typeof recadosAdmin !== 'undefined' && recadosAdmin) {
            recadosAdmin.loadRecados();
        }
        if (typeof vagasAdmin !== 'undefined' && vagasAdmin) {
            vagasAdmin.loadVagas();
        }
        
        console.log('✅ Dashboard atualizado com sucesso!');
    }

    // Adicionar nova propaganda
    addPropaganda(dadosPropaganda) {
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const novoId = Math.max(...propagandas.map(p => p.id), 0) + 1;
        
        const novaPropaganda = {
            id: novoId,
            ...dadosPropaganda,
            status: 'pendente',
            aprovado: false,
            dataCriacao: new Date().toISOString()
        };

        propagandas.push(novaPropaganda);
        localStorage.setItem('radioAloVoce_propagandas', JSON.stringify(propagandas));
        
        this.loadPropagandas();
        this.updateStats();
        
        alert('Propaganda adicionada com sucesso!');
    }

    // Adicionar nova notícia
    addNoticia(dadosNoticia) {
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const novoId = Math.max(...noticias.map(n => n.id), 0) + 1;
        
        const novaNoticia = {
            id: novoId,
            ...dadosNoticia,
            status: 'pendente',
            dataCriacao: new Date().toISOString()
        };

        noticias.push(novaNoticia);
        localStorage.setItem('radioAloVoce_noticias', JSON.stringify(noticias));
        
        this.loadNoticias();
        this.updateStats();
        
        alert('Notícia adicionada com sucesso!');
    }

    // Adicionar nova nota de falecimento
    addNotaFalecimento(dadosNota) {
        const notas = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
        const novoId = Math.max(...notas.map(n => n.id), 0) + 1;
        
        const novaNota = {
            id: novoId,
            ...dadosNota,
            status: 'pendente',
            dataCriacao: new Date().toISOString()
        };

        notas.push(novaNota);
        localStorage.setItem('radioAloVoce_notas_falecimento', JSON.stringify(notas));
        
        this.loadNotasFalecimento();
        this.updateStats();
        
        alert('Nota de falecimento adicionada com sucesso!');
    }

    // Aprovar propaganda
    aprovarPropaganda(id) {
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const propaganda = propagandas.find(p => p.id === id);
        
        if (propaganda) {
            propaganda.status = 'ativa';
            propaganda.aprovado = true;
            propaganda.dataAprovacao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_propagandas', JSON.stringify(propagandas));
            this.loadPropagandas();
            this.updateStats();
            
            return true;
        }
        return false;
    }

    // Rejeitar propaganda
    rejeitarPropaganda(id) {
        const propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
        const propaganda = propagandas.find(p => p.id === id);
        
        if (propaganda) {
            propaganda.status = 'rejeitada';
            propaganda.aprovado = false;
            propaganda.dataRejeicao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_propagandas', JSON.stringify(propagandas));
            this.loadPropagandas();
            this.updateStats();
            
            alert('Propaganda rejeitada.');
        }
    }

    // Aprovar notícia
    aprovarNoticia(id) {
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const noticia = noticias.find(n => n.id === id);
        
        if (noticia) {
            noticia.status = 'aprovada';
            noticia.dataAprovacao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_noticias', JSON.stringify(noticias));
            this.loadNoticias();
            this.updateStats();
            
            alert('Notícia aprovada com sucesso!');
        }
    }

    // Rejeitar notícia
    rejeitarNoticia(id) {
        const noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
        const noticia = noticias.find(n => n.id === id);
        
        if (noticia) {
            noticia.status = 'rejeitada';
            noticia.dataRejeicao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_noticias', JSON.stringify(noticias));
            this.loadNoticias();
            this.updateStats();
            
            alert('Notícia rejeitada.');
        }
    }

    // Deletar propaganda
    deletarPropaganda(id) {
        if (confirm('Tem certeza que deseja deletar esta propaganda?')) {
            let propagandas = JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]');
            propagandas = propagandas.filter(p => p.id !== id);
            
            localStorage.setItem('radioAloVoce_propagandas', JSON.stringify(propagandas));
            this.loadPropagandas();
            this.updateStats();
            
            alert('Propaganda deletada com sucesso!');
        }
    }

    // Deletar notícia
    deletarNoticia(id) {
        if (confirm('Tem certeza que deseja deletar esta notícia?')) {
            let noticias = JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]');
            noticias = noticias.filter(n => n.id !== id);
            
            localStorage.setItem('radioAloVoce_noticias', JSON.stringify(noticias));
            this.loadNoticias();
            this.updateStats();
            
            alert('Notícia deletada com sucesso!');
        }
    }

    // Aprovar nota de falecimento
    aprovarNotaFalecimento(id) {
        const notas = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
        const nota = notas.find(n => n.id === id);
        
        if (nota) {
            nota.status = 'ativa';
            nota.dataAprovacao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_notas_falecimento', JSON.stringify(notas));
            this.loadNotasFalecimento();
            this.updateStats();
            
            alert('Nota de falecimento aprovada com sucesso!');
        }
    }

    // Rejeitar nota de falecimento
    rejeitarNotaFalecimento(id) {
        const notas = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
        const nota = notas.find(n => n.id === id);
        
        if (nota) {
            nota.status = 'rejeitada';
            nota.dataRejeicao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_notas_falecimento', JSON.stringify(notas));
            this.loadNotasFalecimento();
            this.updateStats();
            
            alert('Nota de falecimento rejeitada.');
        }
    }

    // Deletar nota de falecimento
    deletarNotaFalecimento(id) {
        if (confirm('Tem certeza que deseja deletar esta nota de falecimento?')) {
            let notas = JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]');
            notas = notas.filter(n => n.id !== id);
            
            localStorage.setItem('radioAloVoce_notas_falecimento', JSON.stringify(notas));
            this.loadNotasFalecimento();
            this.updateStats();
            
            alert('Nota de falecimento deletada com sucesso!');
        }
    }
}

// Instância global do sistema
let adminSystem;

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    adminSystem = new AdminSystem();
    
    // Configurar formulários
    setupForms();
    
    // Atualizar estatísticas a cada 30 segundos para dashboard mais responsivo
    let statsInterval = setInterval(() => {
        if (adminSystem) {
            adminSystem.updateStats();
        }
    }, 30000);

    // Atualização em tempo real quando dados são modificados
    window.addEventListener('storage', (e) => {
        if (e.key && e.key.includes('radioAloVoce_') || e.key.includes('adminVagasData')) {
            if (adminSystem) {
                adminSystem.updateStats();
            }
        }
    });

    // Atualização quando a página ganha foco
    window.addEventListener('focus', () => {
        if (adminSystem) {
            adminSystem.updateStats();
        }
    });
});

// Configurar formulários
function setupForms() {
    // Formulário de propaganda
    const propagandaForm = document.getElementById('propagandaForm');
    if (propagandaForm) {
        propagandaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(propagandaForm);
            const imagemFile = formData.get('imagem');
            
            // Processar imagem se fornecida
            if (imagemFile && imagemFile.name) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const dadosPropaganda = {
                        empresa: formData.get('empresa'),
                        duracao: parseInt(formData.get('duracao')),
                        valor: parseFloat(formData.get('valor')),
                        dataInicio: formData.get('dataInicio'),
                        dataFim: formData.get('dataFim'),
                        arquivo: formData.get('arquivo').name || 'arquivo-propaganda.mp3',
                        imagem: e.target.result,
                        descricao: formData.get('descricao'),
                        telefone: formData.get('telefone'),
                        website: formData.get('website')
                    };
                    
                    adminSystem.addPropaganda(dadosPropaganda);
                    propagandaForm.reset();
                    closeModal('propagandaModal');
                };
                reader.readAsDataURL(imagemFile);
            } else {
            const dadosPropaganda = {
                empresa: formData.get('empresa'),
                duracao: parseInt(formData.get('duracao')),
                valor: parseFloat(formData.get('valor')),
                dataInicio: formData.get('dataInicio'),
                dataFim: formData.get('dataFim'),
                    arquivo: formData.get('arquivo').name || 'arquivo-propaganda.mp3',
                    imagem: null,
                    descricao: formData.get('descricao'),
                    telefone: formData.get('telefone'),
                    website: formData.get('website')
            };
            
            adminSystem.addPropaganda(dadosPropaganda);
            propagandaForm.reset();
            closeModal('propagandaModal');
            }
        });
    }

    // Formulário de notícia
    const noticiaForm = document.getElementById('noticiaForm');
    if (noticiaForm) {
        noticiaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(noticiaForm);
            const dadosNoticia = {
                titulo: formData.get('titulo'),
                empresa: formData.get('empresa'),
                conteudo: formData.get('conteudo'),
                valor: parseFloat(formData.get('valor')),
                dataPublicacao: formData.get('dataPublicacao')
            };
            
            adminSystem.addNoticia(dadosNoticia);
            noticiaForm.reset();
            closeModal('noticiaModal');
        });
    }

    // Formulário de nota de falecimento
    const notaFalecimentoForm = document.getElementById('notaFalecimentoForm');
    if (notaFalecimentoForm) {
        notaFalecimentoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(notaFalecimentoForm);
            const dadosNota = {
                empresa: formData.get('empresa'),
                nome: formData.get('nome'),
                apelido: formData.get('apelido'),
                idade: formData.get('idade') ? parseInt(formData.get('idade')) : null,
                velorio: formData.get('velorio'),
                sepultamento: formData.get('sepultamento'),
                dataSepultamento: formData.get('dataSepultamento'),
                horarioSepultamento: formData.get('horarioSepultamento')
            };
            
            adminSystem.addNotaFalecimento(dadosNota);
            notaFalecimentoForm.reset();
            closeModal('notaFalecimentoModal');
        });
    }
}

// Funções de navegação
function showPage(pageId) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar página selecionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Atualizar navegação ativa
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    event.target.classList.add('active');
}

// Funções de modal
function addPropaganda() {
    document.getElementById('propagandaModal').style.display = 'block';
}

function addNoticia() {
    document.getElementById('noticiaModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Funções de ação delegadas para o escopo global
function aprovarPropaganda(id) {
    adminSystem.aprovarPropaganda(id);
}

function rejeitarPropaganda(id) {
    adminSystem.rejeitarPropaganda(id);
}

function editarPropaganda(id) {
    alert('Função de edição em desenvolvimento.');
}

function deletarPropaganda(id) {
    adminSystem.deletarPropaganda(id);
}

function aprovarNoticia(id) {
    adminSystem.aprovarNoticia(id);
}

function rejeitarNoticia(id) {
    adminSystem.rejeitarNoticia(id);
}

function editarNoticia(id) {
    alert('Função de edição em desenvolvimento.');
}

function deletarNoticia(id) {
    adminSystem.deletarNoticia(id);
}

// Funções de notas de falecimento
function addNotaFalecimento() {
    document.getElementById('notaFalecimentoModal').style.display = 'block';
}

function aprovarNotaFalecimento(id) {
    adminSystem.aprovarNotaFalecimento(id);
}

function rejeitarNotaFalecimento(id) {
    adminSystem.rejeitarNotaFalecimento(id);
}

function editarNotaFalecimento(id) {
    alert('Função de edição em desenvolvimento.');
}

function deletarNotaFalecimento(id) {
    adminSystem.deletarNotaFalecimento(id);
}

// Função global para forçar atualização do dashboard
function forceUpdateDashboard() {
    if (adminSystem) {
        adminSystem.forceUpdateDashboard();
    }
}

// Expor função globalmente
window.forceUpdateDashboard = forceUpdateDashboard;

// Função de busca na tabela
function searchTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                found = true;
                break;
            }
        }
        
        row.style.display = found ? '' : 'none';
    }
}

// Função de logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.location.href = 'login.html';
    }
}

// Função para simular dados em tempo real
function simulateRealTimeData() {
    // Simular mudanças nos ouvintes
    const ouvintes = Math.floor(Math.random() * 200) + 200;
    const ouvintesElement = document.getElementById('ouvintesOnline');
    if (ouvintesElement) {
        ouvintesElement.textContent = ouvintes;
    }
    
    // Simular atualizações no status das propagandas
    const statusElements = document.querySelectorAll('.status-badge');
    statusElements.forEach(element => {
        if (Math.random() < 0.1) { // 10% chance de piscar
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 200);
        }
    });
}

// Executar simulação a cada 30 segundos (reduzido para evitar sobrecarga)
let simulationInterval = setInterval(simulateRealTimeData, 30000);

// ===== SISTEMA DE EVENTOS =====

// Classe para gerenciar eventos
class EventosAdmin {
    constructor() {
        this.initializeEventosData();
        this.loadEventos();
        this.updateEventosStats();
    }

    // Inicializar dados de eventos
    initializeEventosData() {
        if (!localStorage.getItem('radioAloVoce_eventos')) {
            const eventosPadrao = [
                {
                    id: 1,
                    titulo: 'Show de Fim de Ano',
                    descricao: 'Grande show com os melhores artistas da região para comemorar o fim do ano',
                    data: '31/12/2024',
                    hora: '20:00',
                    local: 'Praça Central da Cidade',
                    categoria: 'Música',
                    preco: 'Entrada Gratuita',
                    organizador: 'Rádio Alo Voce',
                    telefone: '(11) 99999-9999',
                    email: 'eventos@radioalovoce.com.br',
                    status: 'ativo',
                    destaque: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 2,
                    titulo: 'Festival de Verão',
                    descricao: 'Três dias de música, diversão e entretenimento para toda a família',
                    data: '15/01/2025',
                    hora: '16:00',
                    local: 'Parque da Cidade',
                    categoria: 'Festival',
                    preco: 'A partir de R$ 25,00',
                    organizador: 'Prefeitura Municipal',
                    telefone: '(11) 3333-3333',
                    email: 'cultura@prefeitura.gov.br',
                    status: 'ativo',
                    destaque: false,
                    dataCriacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventosPadrao));
        }
    }

    // Carregar eventos na tabela
    loadEventos() {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const tbody = document.getElementById('eventosList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        eventos.forEach(evento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${evento.titulo}</strong>
                    ${evento.destaque ? '<br><span class="status-badge status-warning"><i class="fas fa-star"></i> DESTAQUE</span>' : ''}
                </td>
                <td>${evento.data}</td>
                <td>${evento.local}</td>
                <td>
                    <span class="status-badge status-info">
                        ${evento.categoria}
                    </span>
                </td>
                <td>
                    <button class="action-btn ${evento.destaque ? 'active' : ''}" 
                            onclick="toggleDestaque(${evento.id})" 
                            title="${evento.destaque ? 'Remover destaque' : 'Destacar'}">
                        <i class="fas fa-star"></i>
                    </button>
                </td>
                <td>
                    <div class="action-buttons">
                    ${evento.status === 'pendente' ? `
                            <button class="action-btn" onclick="aprovarEvento(${evento.id})" title="Aprovar">
                            <i class="fas fa-check"></i>
                        </button>
                            <button class="action-btn" onclick="rejeitarEvento(${evento.id})" title="Rejeitar">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    ${evento.status === 'ativo' ? `
                            <button class="action-btn ${evento.destaque ? 'active' : ''}" onclick="toggleDestaque(${evento.id})" title="${evento.destaque ? 'Remover Destaque' : 'Destacar'}">
                            <i class="fas fa-star"></i>
                        </button>
                    ` : ''}
                        <button class="action-btn" onclick="editarEvento(${evento.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn danger" onclick="deletarEvento(${evento.id})" title="Deletar">
                        <i class="fas fa-trash"></i>
                    </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Adicionar novo evento
    addEvento(dadosEvento) {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const novoId = Math.max(...eventos.map(e => e.id), 0) + 1;
        
        const novoEvento = {
            id: novoId,
            ...dadosEvento,
            status: 'ativo', // Eventos são aprovados automaticamente por padrão
            destaque: false,
            dataCriacao: new Date().toISOString()
        };

        eventos.push(novoEvento);
        localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventos));
        
        this.loadEventos();
        this.updateEventosStats();
        this.sincronizarComSite();
        
        this.showNotification(`Evento "${novoEvento.titulo}" adicionado e sincronizado com sucesso!`, 'success');
    }

    // Aprovar evento
    aprovarEvento(id) {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const evento = eventos.find(e => e.id === id);
        
        if (evento) {
            evento.status = 'ativo';
            evento.dataAprovacao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventos));
            this.loadEventos();
            this.updateEventosStats();
            this.sincronizarComSite();
            
            this.showNotification(`Evento "${evento.titulo}" aprovado e sincronizado com sucesso!`, 'success');
        }
    }

    // Rejeitar evento
    rejeitarEvento(id) {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const evento = eventos.find(e => e.id === id);
        
        if (evento) {
            evento.status = 'rejeitado';
            evento.dataRejeicao = new Date().toISOString();
            
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventos));
            this.loadEventos();
            this.updateEventosStats();
            
            alert('Evento rejeitado.');
        }
    }

    // Deletar evento
    deletarEvento(id) {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const evento = eventos.find(e => e.id === id);
        
        if (confirm(`Tem certeza que deseja deletar o evento "${evento ? evento.titulo : 'este evento'}"?`)) {
            let eventosFiltered = eventos.filter(e => e.id !== id);
            
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventosFiltered));
            this.loadEventos();
            this.updateEventosStats();
            this.sincronizarComSite();
            
            this.showNotification(`Evento "${evento ? evento.titulo : 'evento'}" deletado e removido do site!`, 'success');
        }
    }

    // Alternar destaque do evento
    toggleDestaque(id) {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const evento = eventos.find(e => e.id === id);
        
        if (evento) {
            evento.destaque = !evento.destaque;
            
            localStorage.setItem('radioAloVoce_eventos', JSON.stringify(eventos));
            this.loadEventos();
            this.sincronizarComSite();
            
            alert(`Evento ${evento.destaque ? 'destacado' : 'não destacado'} com sucesso!`);
        }
    }

    // Atualizar estatísticas de eventos
    updateEventosStats() {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        
        const eventosAtivos = eventos.filter(e => e.status === 'ativo').length;
        const eventosElement = document.getElementById('eventosAtivos');
        if (eventosElement) eventosElement.textContent = eventosAtivos;
        
        const eventosPendentes = eventos.filter(e => e.status === 'pendente').length;
        const eventosPendentesElement = document.getElementById('eventosPendentes');
        if (eventosPendentesElement) eventosPendentesElement.textContent = eventosPendentes;
    }

    // Sincronizar eventos com o site
    sincronizarComSite() {
        const eventos = JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]');
        const eventosAtivos = eventos.filter(e => e.status === 'ativo');
        
        // Atualizar eventos no localStorage que o site lê
        localStorage.setItem('eventos', JSON.stringify(eventosAtivos));
        
        // Disparar evento personalizado para notificar o rádio
        this.notificarSincronizacao();
        
        console.log('✅ Eventos sincronizados com o site:', eventosAtivos.length);
    }

    // Notificar sincronização para o rádio
    notificarSincronizacao() {
        // Criar timestamp único para forçar detecção de mudança
        const timestamp = Date.now();
        localStorage.setItem('eventos_sync_timestamp', timestamp.toString());
        
        // Disparar evento storage personalizado
        if (window.dispatchEvent) {
            const syncEvent = new CustomEvent('eventosSincronizados', {
                detail: {
                    timestamp: timestamp,
                    total: JSON.parse(localStorage.getItem('eventos') || '[]').length
                }
            });
            window.dispatchEvent(syncEvent);
        }
        
        console.log('📡 Notificação de sincronização enviada');
    }

    // Forçar sincronização manual
    forceSyncronizacao() {
        this.sincronizarComSite();
        this.showNotification('Eventos sincronizados com sucesso!', 'success');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Adicionar estilos se não existirem
        this.addNotificationStyles();
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Adicionar estilos de notificação
    addNotificationStyles() {
        if (document.getElementById('admin-notification-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'admin-notification-styles';
        style.textContent = `
            .admin-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-card);
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                border: 1px solid var(--border);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10000;
                min-width: 300px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease-out;
            }
            
            .admin-notification.success {
                border-left: 4px solid #28a745;
                background: rgba(40, 167, 69, 0.1);
            }
            
            .admin-notification.info {
                border-left: 4px solid #17a2b8;
                background: rgba(23, 162, 184, 0.1);
            }
            
            .admin-notification button {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                margin-left: auto;
                font-size: 1.2rem;
                padding: 0;
                width: 20px;
                height: 20px;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Instância global do sistema de eventos
let eventosAdmin;

// Adicionar eventos ao sistema principal
if (typeof AdminSystem !== 'undefined') {
    AdminSystem.prototype.loadEventos = function() {
        if (eventosAdmin) {
            eventosAdmin.loadEventos();
        }
    };

    AdminSystem.prototype.updateEventosStats = function() {
        if (eventosAdmin) {
            eventosAdmin.updateEventosStats();
        }
    };
}

// Funções globais para eventos
function addEvento() {
    document.getElementById('eventoModal').style.display = 'block';
}

function aprovarEvento(id) {
    if (eventosAdmin) {
        eventosAdmin.aprovarEvento(id);
    }
}

function rejeitarEvento(id) {
    if (eventosAdmin) {
        eventosAdmin.rejeitarEvento(id);
    }
}

function editarEvento(id) {
    console.log('Editando evento:', id);
    // TODO: Implementar modal de edição
    alert('Funcionalidade de edição em desenvolvimento');
}

function deletarEvento(id) {
    if (eventosAdmin) {
        eventosAdmin.deletarEvento(id);
    }
}

function toggleDestaque(id) {
    if (eventosAdmin) {
        eventosAdmin.toggleDestaque(id);
    }
}

// Sincronizar eventos manualmente
function sincronizarEventos() {
    if (eventosAdmin) {
        eventosAdmin.forceSyncronizacao();
    }
}

// Inicializar sistema de eventos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('eventosList')) {
        eventosAdmin = new EventosAdmin();
        console.log('🚀 Sistema de Eventos Admin inicializado!');
    }
});

// Configurar formulário de eventos
document.addEventListener('DOMContentLoaded', () => {
    const eventoForm = document.getElementById('eventoForm');
    if (eventoForm) {
        eventoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(eventoForm);
            const dadosEvento = {
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao'),
                data: formData.get('data'),
                hora: formData.get('hora'),
                local: formData.get('local'),
                categoria: formData.get('categoria'),
                preco: formData.get('preco') || 'Consultar',
                organizador: formData.get('organizador') || 'Não informado',
                telefone: formData.get('telefone') || '',
                email: formData.get('email') || ''
            };
            
            if (eventosAdmin) {
                eventosAdmin.addEvento(dadosEvento);
            }
            
            eventoForm.reset();
            closeModal('eventoModal');
        });
    }
});

// Atualizar sistema principal para incluir eventos no dashboard
document.addEventListener('DOMContentLoaded', () => {
    const originalUpdateStats = AdminSystem.prototype.updateStats;
    AdminSystem.prototype.updateStats = function() {
        // Chamar função original
        originalUpdateStats.call(this);
        
        // Atualizar estatísticas de eventos
        if (eventosAdmin) {
            eventosAdmin.updateEventosStats();
        }
    };
});

// Executar sincronização automaticamente a cada 10 minutos (reduzido para evitar sobrecarga)
let eventosSyncInterval = setInterval(() => {
    if (eventosAdmin) {
        eventosAdmin.sincronizarComSite();
    }
}, 600000);

// ===== SISTEMA DE VENDAS =====

// Classe para gerenciar vendas
class VendasAdmin {
    constructor() {
        this.initializeVendasData();
        this.loadVendas();
        this.updateVendasStats();
    }

    // Inicializar dados de vendas
    initializeVendasData() {
        if (!localStorage.getItem('radioAloVoce_vendas')) {
            const vendasPadrao = [
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
                    status: 'ativo',
                    destaque: true,
                    dataCriacao: new Date().toISOString()
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
                    status: 'ativo',
                    destaque: false,
                    dataCriacao: new Date().toISOString()
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
                    status: 'ativo',
                    destaque: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 4,
                    titulo: 'Serviços de Jardinagem',
                    categoria: 'servicos',
                    descricao: 'Corte de grama, poda de árvores, plantio, manutenção de jardins.',
                    preco: 'A partir de R$ 50,00',
                    condicao: 'novo',
                    vendedor: 'Pedro Jardins',
                    telefone: '(11) 96666-4444',
                    email: 'pedro@jardins.com',
                    status: 'ativo',
                    destaque: false,
                    dataCriacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('radioAloVoce_vendas', JSON.stringify(vendasPadrao));
        }
    }

    // Carregar vendas na tabela
    loadVendas() {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const tbody = document.getElementById('vendasList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        vendas.forEach(venda => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${venda.titulo}</strong>
                    <br><small style="color: var(--text-secondary);">${venda.descricao.substring(0, 50)}...</small>
                    ${venda.destaque ? '<br><span class="status-badge status-warning"><i class="fas fa-star"></i> DESTAQUE</span>' : ''}
                </td>
                <td>
                    <span class="status-badge status-info">
                        ${this.getCategoriaLabel(venda.categoria)}
                    </span>
                </td>
                <td>
                    <strong style="color: var(--success);">${venda.preco}</strong>
                    <br><small style="color: var(--text-secondary);">${venda.condicao}</small>
                </td>
                <td>
                    <strong>${venda.vendedor}</strong>
                    <br><small style="color: var(--text-secondary);">${venda.telefone}</small>
                </td>
                <td>
                    <span class="status-badge ${this.getStatusClass(venda.status)}">
                        ${this.getStatusLabel(venda.status)}
                    </span>
                </td>
                <td>
                    <button class="action-btn ${venda.destaque ? 'active' : ''}" 
                            onclick="toggleDestaqueVenda(${venda.id})" 
                            title="${venda.destaque ? 'Remover destaque' : 'Destacar'}">
                        <i class="fas fa-star"></i>
                    </button>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="editarVenda(${venda.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="toggleStatusVenda(${venda.id})" title="Mudar Status">
                            <i class="fas fa-toggle-on"></i>
                        </button>
                        <button class="action-btn danger" onclick="deletarVenda(${venda.id})" title="Deletar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
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

    // Obter classe CSS do status
    getStatusClass(status) {
        const classes = {
            ativo: 'status-approved',
            inativo: 'status-pending',
            vendido: 'status-completed'
        };
        return classes[status] || 'status-pending';
    }

    // Obter label do status
    getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            inativo: 'Inativo',
            vendido: 'Vendido'
        };
        return labels[status] || 'Inativo';
    }

    // Adicionar nova venda
    addVenda(dadosVenda) {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const novoId = Math.max(...vendas.map(v => v.id), 0) + 1;
        
        const novaVenda = {
            id: novoId,
            ...dadosVenda,
            dataCriacao: new Date().toISOString()
        };

        vendas.push(novaVenda);
        localStorage.setItem('radioAloVoce_vendas', JSON.stringify(vendas));
        
        this.loadVendas();
        this.updateVendasStats();
        this.sincronizarComSite();
        
        this.showNotification(`Produto "${novaVenda.titulo}" adicionado e sincronizado com sucesso!`, 'success');
    }

    // Deletar venda
    deletarVenda(id) {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const venda = vendas.find(v => v.id === id);
        
        if (confirm(`Tem certeza que deseja deletar o produto "${venda ? venda.titulo : 'este produto'}"?`)) {
            let vendasFiltered = vendas.filter(v => v.id !== id);
            
            localStorage.setItem('radioAloVoce_vendas', JSON.stringify(vendasFiltered));
            this.loadVendas();
            this.updateVendasStats();
            this.sincronizarComSite();
            
            this.showNotification(`Produto "${venda ? venda.titulo : 'produto'}" deletado e removido do site!`, 'success');
        }
    }

    // Alternar destaque da venda
    toggleDestaqueVenda(id) {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const venda = vendas.find(v => v.id === id);
        
        if (venda) {
            venda.destaque = !venda.destaque;
            
            localStorage.setItem('radioAloVoce_vendas', JSON.stringify(vendas));
            this.loadVendas();
            this.sincronizarComSite();
            
            this.showNotification(`Produto ${venda.destaque ? 'destacado' : 'removido do destaque'} com sucesso!`, 'success');
        }
    }

    // Alternar status da venda
    toggleStatusVenda(id) {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const venda = vendas.find(v => v.id === id);
        
        if (venda) {
            const statusOptions = ['ativo', 'inativo', 'vendido'];
            const currentIndex = statusOptions.indexOf(venda.status);
            const nextIndex = (currentIndex + 1) % statusOptions.length;
            venda.status = statusOptions[nextIndex];
            
            localStorage.setItem('radioAloVoce_vendas', JSON.stringify(vendas));
            this.loadVendas();
            this.updateVendasStats();
            this.sincronizarComSite();
            
            this.showNotification(`Status do produto alterado para "${this.getStatusLabel(venda.status)}"!`, 'success');
        }
    }

    // Atualizar estatísticas de vendas
    updateVendasStats() {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        
        const vendasAtivas = vendas.filter(v => v.status === 'ativo').length;
        const vendasBadge = document.getElementById('vendasBadge');
        if (vendasBadge) vendasBadge.textContent = vendasAtivas;
    }

    // Sincronizar vendas com o site
    sincronizarComSite() {
        const vendas = JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]');
        const vendasAtivas = vendas.filter(v => v.status === 'ativo');
        
        // Atualizar vendas no localStorage que o site lê
        localStorage.setItem('admin_vendas', JSON.stringify(vendasAtivas));
        
        // Disparar evento personalizado para notificar o rádio
        this.notificarSincronizacao();
        
        console.log('✅ Vendas sincronizadas com o site:', vendasAtivas.length);
    }

    // Notificar sincronização para o rádio
    notificarSincronizacao() {
        // Criar timestamp único para forçar detecção de mudança
        const timestamp = Date.now();
        localStorage.setItem('vendas_sync_timestamp', timestamp.toString());
        
        // Disparar evento storage personalizado
        if (window.dispatchEvent) {
            const syncEvent = new CustomEvent('vendasSincronizadas', {
                detail: {
                    timestamp: timestamp,
                    total: JSON.parse(localStorage.getItem('admin_vendas') || '[]').length
                }
            });
            window.dispatchEvent(syncEvent);
        }
        
        console.log('📡 Notificação de sincronização de vendas enviada');
    }

    // Forçar sincronização manual
    forceSyncronizacao() {
        this.sincronizarComSite();
        this.showNotification('Vendas sincronizadas com sucesso!', 'success');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Instância global do sistema de vendas
let vendasAdmin;

// Funções globais para vendas
function addVenda() {
    document.getElementById('vendaModal').style.display = 'block';
}

function editarVenda(id) {
    console.log('Editando venda:', id);
    // TODO: Implementar modal de edição
    alert('Funcionalidade de edição em desenvolvimento');
}

function deletarVenda(id) {
    if (vendasAdmin) {
        vendasAdmin.deletarVenda(id);
    }
}

function toggleDestaqueVenda(id) {
    if (vendasAdmin) {
        vendasAdmin.toggleDestaqueVenda(id);
    }
}

function toggleStatusVenda(id) {
    if (vendasAdmin) {
        vendasAdmin.toggleStatusVenda(id);
    }
}

// Sincronizar vendas manualmente
function sincronizarVendas() {
    if (vendasAdmin) {
        vendasAdmin.forceSyncronizacao();
    }
}

// Inicializar sistema de vendas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vendasList')) {
        vendasAdmin = new VendasAdmin();
        console.log('🛒 Sistema de Vendas Admin inicializado!');
    }
});

// Configurar formulário de vendas
document.addEventListener('DOMContentLoaded', () => {
    const vendaForm = document.getElementById('vendaForm');
    if (vendaForm) {
        vendaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(vendaForm);
            const dadosVenda = {
                titulo: formData.get('titulo'),
                categoria: formData.get('categoria'),
                descricao: formData.get('descricao'),
                preco: formData.get('preco') || 'A combinar',
                condicao: formData.get('condicao'),
                vendedor: formData.get('vendedor'),
                telefone: formData.get('telefone'),
                email: formData.get('email') || '',
                status: formData.get('status') || 'ativo',
                destaque: formData.get('destaque') === 'on'
            };
            
            if (vendasAdmin) {
                vendasAdmin.addVenda(dadosVenda);
            }
            
            vendaForm.reset();
            closeModal('vendaModal');
        });
    }
});

// Executar sincronização de vendas automaticamente a cada 10 minutos (reduzido para evitar sobrecarga)
let vendasSyncInterval = setInterval(() => {
    if (vendasAdmin) {
        vendasAdmin.sincronizarComSite();
    }
}, 600000);

// ===== SISTEMA DE PROMOÇÕES =====

// Classe para gerenciar promoções
class PromocoesAdmin {
    constructor() {
        this.initializePromocoesData();
        this.loadPromocoes();
        this.updatePromocoesStats();
    }

    // Inicializar dados de promoções
    initializePromocoesData() {
        if (!localStorage.getItem('radioAloVoce_promocoes')) {
            const promocoesPadrao = [
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
                    descricao: 'Promoção especial para novos clientes: corte feminino + escova por apenas R$ 25,00.',
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
                    descricao: 'Consultas médicas com desconto especial para todas as especialidades.',
                    desconto: '50%',
                    validade: '2025-01-15',
                    telefone: '(11) 97777-3333',
                    endereco: 'Rua da Saúde, 789',
                    website: 'https://clinicasaopaulo.com.br',
                    status: 'ativo',
                    destaque: true,
                    dataCriacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('radioAloVoce_promocoes', JSON.stringify(promocoesPadrao));
        }
    }

    // Carregar promoções na tabela
    loadPromocoes() {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const tbody = document.getElementById('promocoesList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        promocoes.forEach(promocao => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${promocao.titulo}</strong>
                    <br><small style="color: var(--text-secondary);">${promocao.descricao.substring(0, 50)}...</small>
                    ${promocao.destaque ? '<br><span class="status-badge status-warning"><i class="fas fa-star"></i> DESTAQUE</span>' : ''}
                </td>
                <td>
                    <strong>${promocao.empresa}</strong>
                    <br><small style="color: var(--text-secondary);">${promocao.telefone}</small>
                </td>
                <td>
                    <span class="status-badge status-info">
                        ${this.getCategoriaLabel(promocao.categoria)}
                    </span>
                </td>
                <td>
                    <strong style="color: var(--warning);">${promocao.desconto}</strong>
                </td>
                <td>
                    <span style="color: var(--text-secondary);">${new Date(promocao.validade).toLocaleDateString()}</span>
                    <br><small style="color: ${this.getValidadeColor(promocao.validade)};">${this.getValidadeStatus(promocao.validade)}</small>
                </td>
                <td>
                    <span class="status-badge ${this.getStatusClass(promocao.status)}">
                        ${this.getStatusLabel(promocao.status)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="editarPromocao(${promocao.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn ${promocao.destaque ? 'active' : ''}" onclick="toggleDestaquePromocao(${promocao.id})" title="${promocao.destaque ? 'Remover destaque' : 'Destacar'}">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="action-btn" onclick="toggleStatusPromocao(${promocao.id})" title="Mudar Status">
                            <i class="fas fa-toggle-on"></i>
                        </button>
                        <button class="action-btn danger" onclick="deletarPromocao(${promocao.id})" title="Deletar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
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

    // Obter classe CSS do status
    getStatusClass(status) {
        const classes = {
            ativo: 'status-approved',
            inativo: 'status-pending',
            expirado: 'status-rejected'
        };
        return classes[status] || 'status-pending';
    }

    // Obter label do status
    getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            inativo: 'Inativo',
            expirado: 'Expirado'
        };
        return labels[status] || 'Inativo';
    }

    // Obter cor da validade
    getValidadeColor(validade) {
        const hoje = new Date();
        const dataValidade = new Date(validade);
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        
        if (diasRestantes < 0) return 'var(--danger)';
        if (diasRestantes <= 3) return 'var(--warning)';
        return 'var(--success)';
    }

    // Obter status da validade
    getValidadeStatus(validade) {
        const hoje = new Date();
        const dataValidade = new Date(validade);
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        
        if (diasRestantes < 0) return 'Expirada';
        if (diasRestantes === 0) return 'Expira hoje';
        if (diasRestantes === 1) return 'Expira amanhã';
        if (diasRestantes <= 7) return `${diasRestantes} dias restantes`;
        return 'Válida';
    }

    // Adicionar nova promoção
    addPromocao(dadosPromocao) {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const novoId = Math.max(...promocoes.map(p => p.id), 0) + 1;
        
        const novaPromocao = {
            id: novoId,
            ...dadosPromocao,
            dataCriacao: new Date().toISOString()
        };

        promocoes.push(novaPromocao);
        localStorage.setItem('radioAloVoce_promocoes', JSON.stringify(promocoes));
        
        this.loadPromocoes();
        this.updatePromocoesStats();
        this.sincronizarComSite();
        
        this.showNotification(`Promoção "${novaPromocao.titulo}" adicionada e sincronizada com sucesso!`, 'success');
    }

    // Deletar promoção
    deletarPromocao(id) {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const promocao = promocoes.find(p => p.id === id);
        
        if (confirm(`Tem certeza que deseja deletar a promoção "${promocao ? promocao.titulo : 'esta promoção'}"?`)) {
            let promocoesFiltered = promocoes.filter(p => p.id !== id);
            
            localStorage.setItem('radioAloVoce_promocoes', JSON.stringify(promocoesFiltered));
            this.loadPromocoes();
            this.updatePromocoesStats();
            this.sincronizarComSite();
            
            this.showNotification(`Promoção "${promocao ? promocao.titulo : 'promoção'}" deletada e removida do site!`, 'success');
        }
    }

    // Alternar destaque da promoção
    toggleDestaquePromocao(id) {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const promocao = promocoes.find(p => p.id === id);
        
        if (promocao) {
            promocao.destaque = !promocao.destaque;
            
            localStorage.setItem('radioAloVoce_promocoes', JSON.stringify(promocoes));
            this.loadPromocoes();
            this.sincronizarComSite();
            
            this.showNotification(`Promoção ${promocao.destaque ? 'destacada' : 'removida do destaque'} com sucesso!`, 'success');
        }
    }

    // Alternar status da promoção
    toggleStatusPromocao(id) {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const promocao = promocoes.find(p => p.id === id);
        
        if (promocao) {
            const statusOptions = ['ativo', 'inativo', 'expirado'];
            const currentIndex = statusOptions.indexOf(promocao.status);
            const nextIndex = (currentIndex + 1) % statusOptions.length;
            promocao.status = statusOptions[nextIndex];
            
            localStorage.setItem('radioAloVoce_promocoes', JSON.stringify(promocoes));
            this.loadPromocoes();
            this.updatePromocoesStats();
            this.sincronizarComSite();
            
            this.showNotification(`Status da promoção alterado para "${this.getStatusLabel(promocao.status)}"!`, 'success');
        }
    }

    // Atualizar estatísticas de promoções
    updatePromocoesStats() {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        
        const promocoesAtivas = promocoes.filter(p => p.status === 'ativo').length;
        const promocoesBadge = document.getElementById('promocoesBadge');
        if (promocoesBadge) promocoesBadge.textContent = promocoesAtivas;
    }

    // Sincronizar promoções com o site
    sincronizarComSite() {
        const promocoes = JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]');
        const promocoesAtivas = promocoes.filter(p => p.status === 'ativo');
        
        // Atualizar promoções no localStorage que o site lê
        localStorage.setItem('admin_promocoes', JSON.stringify(promocoesAtivas));
        
        // Disparar evento personalizado para notificar o rádio
        this.notificarSincronizacao();
        
        console.log('✅ Promoções sincronizadas com o site:', promocoesAtivas.length);
    }

    // Notificar sincronização para o rádio
    notificarSincronizacao() {
        // Criar timestamp único para forçar detecção de mudança
        const timestamp = Date.now();
        localStorage.setItem('promocoes_sync_timestamp', timestamp.toString());
        
        // Disparar evento storage personalizado
        if (window.dispatchEvent) {
            const syncEvent = new CustomEvent('promocoesSincronizadas', {
                detail: {
                    timestamp: timestamp,
                    total: JSON.parse(localStorage.getItem('admin_promocoes') || '[]').length
                }
            });
            window.dispatchEvent(syncEvent);
        }
        
        console.log('📡 Notificação de sincronização de promoções enviada');
    }

    // Forçar sincronização manual
    forceSyncronizacao() {
        this.sincronizarComSite();
        this.showNotification('Promoções sincronizadas com sucesso!', 'success');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Instância global do sistema de promoções
let promocoesAdmin;

// Funções globais para promoções
function addPromocao() {
    document.getElementById('promocaoModal').style.display = 'block';
}

function editarPromocao(id) {
    console.log('Editando promoção:', id);
    // TODO: Implementar modal de edição
    alert('Funcionalidade de edição em desenvolvimento');
}

function deletarPromocao(id) {
    if (promocoesAdmin) {
        promocoesAdmin.deletarPromocao(id);
    }
}

function toggleDestaquePromocao(id) {
    if (promocoesAdmin) {
        promocoesAdmin.toggleDestaquePromocao(id);
    }
}

function toggleStatusPromocao(id) {
    if (promocoesAdmin) {
        promocoesAdmin.toggleStatusPromocao(id);
    }
}

// Sincronizar promoções manualmente
function sincronizarPromocoes() {
    if (promocoesAdmin) {
        promocoesAdmin.forceSyncronizacao();
    }
}

// Inicializar sistema de promoções quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('promocoesList')) {
        promocoesAdmin = new PromocoesAdmin();
        console.log('🎯 Sistema de Promoções Admin inicializado!');
    }
});

// Configurar formulário de promoções
document.addEventListener('DOMContentLoaded', () => {
    const promocaoForm = document.getElementById('promocaoForm');
    if (promocaoForm) {
        promocaoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(promocaoForm);
            const dadosPromocao = {
                titulo: formData.get('titulo'),
                categoria: formData.get('categoria'),
                empresa: formData.get('empresa'),
                descricao: formData.get('descricao'),
                desconto: formData.get('desconto') || 'Oferta especial',
                validade: formData.get('validade'),
                telefone: formData.get('telefone'),
                endereco: formData.get('endereco') || 'Não informado',
                website: formData.get('website') || '',
                status: formData.get('status') || 'ativo',
                destaque: formData.get('destaque') === 'on'
            };
            
            if (promocoesAdmin) {
                promocoesAdmin.addPromocao(dadosPromocao);
            }
            
            promocaoForm.reset();
            closeModal('promocaoModal');
        });
    }
});

// Executar sincronização de promoções automaticamente a cada 10 minutos (reduzido para evitar sobrecarga)
let promocoesSyncInterval = setInterval(() => {
    if (promocoesAdmin) {
        promocoesAdmin.sincronizarComSite();
    }
}, 600000); 

// ===== SISTEMA DE RECADOS =====

// Classe para gerenciar recados
class RecadosAdmin {
    constructor() {
        this.initializeRecadosData();
        this.loadRecados();
        this.updateRecadosStats();
    }

    // Inicializar dados de recados
    initializeRecadosData() {
        if (!localStorage.getItem('radioAloVoce_recados')) {
            const recadosPadrao = [
                {
                    id: 1,
                    remetente: 'Maria Silva',
                    destinatario: 'João Silva',
                    tipo: 'aniversario',
                    mensagem: 'Parabéns pelos seus 30 anos! Que Deus te abençoe sempre. Te amo muito!',
                    telefone: '(11) 98765-4321',
                    cidade: 'São Paulo',
                    lerNoAr: true,
                    dataEnvio: '2024-01-15',
                    horaEnvio: '14:30',
                    status: 'ativo',
                    lidoNoAr: true,
                    dataLeitura: '2024-01-15',
                    horaLeitura: '16:45',
                    prioridade: 'alta',
                    destaque: true,
                    categoria: 'aniversario',
                    visualizacoes: 145,
                    likes: 23
                },
                {
                    id: 2,
                    remetente: 'Carlos Santos',
                    destinatario: 'Todos os ouvintes',
                    tipo: 'agradecimento',
                    mensagem: 'Quero agradecer à Rádio Alo Voce por sempre tocar as melhores músicas. Vocês alegram meu dia!',
                    telefone: '(11) 99888-7777',
                    cidade: 'Guarulhos',
                    lerNoAr: true,
                    dataEnvio: '2024-01-14',
                    horaEnvio: '10:15',
                    status: 'ativo',
                    lidoNoAr: true,
                    dataLeitura: '2024-01-14',
                    horaLeitura: '11:30',
                    prioridade: 'media',
                    destaque: false,
                    categoria: 'agradecimento',
                    visualizacoes: 89,
                    likes: 15
                }
            ];
            localStorage.setItem('radioAloVoce_recados', JSON.stringify(recadosPadrao));
        }
    }

    // Carregar recados na tabela
    loadRecados() {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const tbody = document.getElementById('recadosList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        recados.forEach(recado => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${recado.remetente}</strong>
                    ${recado.destaque ? '<br><span class="status-badge status-warning"><i class="fas fa-star"></i> DESTAQUE</span>' : ''}
                    ${recado.cidade ? `<br><small style="color: var(--text-secondary);">${recado.cidade}</small>` : ''}
                </td>
                <td>${recado.destinatario}</td>
                <td>
                    <span class="status-badge status-info">
                        ${this.getTipoLabel(recado.tipo)}
                    </span>
                </td>
                <td>
                    <div class="message-preview" title="${recado.mensagem}">
                        ${this.truncarTexto(recado.mensagem, 50)}
                    </div>
                </td>
                <td>
                    <span style="color: var(--text-secondary);">${this.formatarData(recado.dataEnvio)} ${recado.horaEnvio}</span>
                </td>
                <td>
                    <span class="status-badge ${this.getStatusClass(recado.status)}">
                        ${this.getStatusLabel(recado.status)}
                    </span>
                </td>
                <td>
                    ${recado.lidoNoAr ? 
                        `<span class="status-badge status-approved">✓ Lido</span>` : 
                        `<span class="status-badge status-pending">Pendente</span>`
                    }
                </td>
                <td>
                    <div class="action-buttons">
                        ${!recado.lidoNoAr ? `
                            <button class="action-btn approve" onclick="marcarRecadoComoLido(${recado.id})" title="Marcar como lido">
                                <i class="fas fa-microphone"></i>
                            </button>
                        ` : ''}
                        <button class="action-btn" onclick="editarRecadoAdmin(${recado.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn ${recado.destaque ? 'active' : ''}" onclick="toggleRecadoDestaque(${recado.id})" title="${recado.destaque ? 'Remover destaque' : 'Destacar'}">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="action-btn danger" onclick="excluirRecadoAdmin(${recado.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Obter label do tipo
    getTipoLabel(tipo) {
        const labels = {
            agradecimento: 'Agradecimento',
            aniversario: 'Aniversário',
            aviso: 'Aviso',
            saudade: 'Saudades',
            dedicatoria: 'Dedicatória',
            outros: 'Outros'
        };
        return labels[tipo] || 'Outros';
    }

    // Obter classe CSS do status
    getStatusClass(status) {
        const classes = {
            ativo: 'status-approved',
            pendente: 'status-pending',
            rejeitado: 'status-rejected'
        };
        return classes[status] || 'status-pending';
    }

    // Obter label do status
    getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            pendente: 'Pendente',
            rejeitado: 'Rejeitado'
        };
        return labels[status] || 'Pendente';
    }

    // Truncar texto
    truncarTexto(texto, limite) {
        if (texto.length <= limite) return texto;
        return texto.substring(0, limite) + '...';
    }

    // Formatar data
    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    // Adicionar novo recado
    addRecado(dadosRecado) {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const novoId = Math.max(...recados.map(r => r.id), 0) + 1;
        
        const novoRecado = {
            id: novoId,
            ...dadosRecado,
            dataEnvio: new Date().toISOString().split('T')[0],
            horaEnvio: new Date().toTimeString().split(' ')[0].substring(0, 5),
            visualizacoes: 0,
            likes: 0,
            dataCriacao: new Date().toISOString()
        };

        recados.push(novoRecado);
        localStorage.setItem('radioAloVoce_recados', JSON.stringify(recados));
        
        this.loadRecados();
        this.updateRecadosStats();
        this.sincronizarComSite();
        
        this.showNotification(`Recado de "${novoRecado.remetente}" adicionado e sincronizado com sucesso!`, 'success');
    }

    // Marcar como lido no ar
    marcarComoLido(id) {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const recado = recados.find(r => r.id === id);
        
        if (recado && !recado.lidoNoAr) {
            recado.lidoNoAr = true;
            recado.dataLeitura = new Date().toISOString().split('T')[0];
            recado.horaLeitura = new Date().toTimeString().split(' ')[0].substring(0, 5);
            
            localStorage.setItem('radioAloVoce_recados', JSON.stringify(recados));
            this.loadRecados();
            this.updateRecadosStats();
            this.sincronizarComSite();
            
            this.showNotification(`Recado de "${recado.remetente}" marcado como lido no ar!`, 'success');
        }
    }

    // Deletar recado
    deletarRecado(id) {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const recado = recados.find(r => r.id === id);
        
        if (confirm(`Tem certeza que deseja deletar o recado de "${recado ? recado.remetente : 'este remetente'}"?`)) {
            let recadosFiltered = recados.filter(r => r.id !== id);
            
            localStorage.setItem('radioAloVoce_recados', JSON.stringify(recadosFiltered));
            this.loadRecados();
            this.updateRecadosStats();
            this.sincronizarComSite();
            
            this.showNotification(`Recado de "${recado ? recado.remetente : 'remetente'}" deletado e removido do site!`, 'success');
        }
    }

    // Alternar destaque do recado
    toggleDestaqueRecado(id) {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const recado = recados.find(r => r.id === id);
        
        if (recado) {
            recado.destaque = !recado.destaque;
            
            localStorage.setItem('radioAloVoce_recados', JSON.stringify(recados));
            this.loadRecados();
            this.sincronizarComSite();
            
            this.showNotification(`Recado ${recado.destaque ? 'destacado' : 'removido do destaque'} com sucesso!`, 'success');
        }
    }

    // Atualizar estatísticas de recados
    updateRecadosStats() {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        
        const recadosAtivos = recados.filter(r => r.status === 'ativo').length;
        const recadosBadge = document.getElementById('recadosBadge');
        if (recadosBadge) recadosBadge.textContent = recadosAtivos;
    }

    // Sincronizar recados com o site
    sincronizarComSite() {
        const recados = JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]');
        const recadosAtivos = recados.filter(r => r.status === 'ativo');
        
        // Atualizar recados no localStorage que o site lê
        localStorage.setItem('admin_recados', JSON.stringify(recadosAtivos));
        
        // Disparar evento personalizado para notificar o rádio
        this.notificarSincronizacao();
        
        console.log('✅ Recados sincronizados com o site:', recadosAtivos.length);
    }

    // Notificar sincronização para o rádio
    notificarSincronizacao() {
        // Criar timestamp único para forçar detecção de mudança
        const timestamp = Date.now();
        localStorage.setItem('recados_sync_timestamp', timestamp.toString());
        
        // Disparar evento storage personalizado
        if (window.dispatchEvent) {
            const syncEvent = new CustomEvent('recadosSincronizados', {
                detail: {
                    timestamp: timestamp,
                    total: JSON.parse(localStorage.getItem('admin_recados') || '[]').length
                }
            });
            window.dispatchEvent(syncEvent);
        }
        
        console.log('📡 Notificação de sincronização de recados enviada');
    }

    // Forçar sincronização manual
    forceSyncronizacao() {
        this.sincronizarComSite();
        this.showNotification('Recados sincronizados com sucesso!', 'success');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Instância global do sistema de recados
let recadosAdmin;

// Funções globais para recados
function addRecado() {
    document.getElementById('recadoModal').style.display = 'block';
}

function marcarRecadoComoLido(id) {
    if (recadosAdmin) {
        recadosAdmin.marcarComoLido(id);
    }
}

function editarRecadoAdmin(id) {
    console.log('Editando recado:', id);
    // TODO: Implementar modal de edição
    alert('Funcionalidade de edição em desenvolvimento');
}

function excluirRecadoAdmin(id) {
    if (recadosAdmin) {
        recadosAdmin.deletarRecado(id);
    }
}

function toggleRecadoDestaque(id) {
    if (recadosAdmin) {
        recadosAdmin.toggleDestaqueRecado(id);
    }
}

// Sincronizar recados manualmente
function sincronizarRecados() {
    if (recadosAdmin) {
        recadosAdmin.forceSyncronizacao();
    }
}

// Inicializar sistema de recados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('recadosList')) {
        recadosAdmin = new RecadosAdmin();
        console.log('💌 Sistema de Recados Admin inicializado!');
    }
});

// Configurar formulário de recados
document.addEventListener('DOMContentLoaded', () => {
    const recadoForm = document.getElementById('recadoForm');
    if (recadoForm) {
        recadoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(recadoForm);
            const dadosRecado = {
                remetente: formData.get('remetente'),
                destinatario: formData.get('destinatario') || 'Todos os ouvintes',
                tipo: formData.get('tipo'),
                mensagem: formData.get('mensagem'),
                telefone: formData.get('telefone') || '',
                cidade: formData.get('cidade') || '',
                status: formData.get('status') || 'ativo',
                prioridade: formData.get('prioridade') || 'media',
                lerNoAr: formData.get('lerNoAr') === 'on',
                destaque: formData.get('destaque') === 'on',
                lidoNoAr: false,
                categoria: formData.get('tipo')
            };
            
            if (recadosAdmin) {
                recadosAdmin.addRecado(dadosRecado);
            }
            
            recadoForm.reset();
            closeModal('recadoModal');
        });
    }
});

// Executar sincronização de recados automaticamente a cada 10 minutos (reduzido para evitar sobrecarga)
let recadosSyncInterval = setInterval(() => {
    if (recadosAdmin) {
        recadosAdmin.sincronizarComSite();
    }
}, 600000);

// ===== SISTEMA DE VAGAS DE EMPREGO =====

// Classe para gerenciar vagas de emprego
class VagasAdmin {
    constructor() {
        this.initializeVagasData();
        this.loadVagas();
        this.updateVagasStats();
    }

    // Inicializar dados de vagas
    initializeVagasData() {
        if (!localStorage.getItem('adminVagasData')) {
            const vagasPadrao = {
                vagas: [
                    {
                        id: 'vaga_admin_001',
                        empresa: 'TechSolutions Ltda',
                        cargo: 'Desenvolvedor Front-end',
                        area: 'tecnologia',
                        salario: 'R$ 4.500,00 - R$ 6.000,00',
                        descricao: 'Buscamos desenvolvedor front-end com experiência em React, JavaScript e CSS. Conhecimento em TypeScript será um diferencial. Trabalho remoto flexível.',
                        contato: '(11) 98765-4321',
                        cidade: 'São Paulo - SP',
                        urgente: true,
                        destaque: true,
                        publicadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                        status: 'ativo',
                        categoria: 'tecnologia',
                        visualizacoes: 145,
                        candidaturas: 23
                    },
                    {
                        id: 'vaga_admin_002',
                        empresa: 'Comércio Central',
                        cargo: 'Vendedor(a)',
                        area: 'vendas',
                        salario: 'R$ 2.200,00 + comissões',
                        descricao: 'Vaga para vendedor com experiência em atendimento ao cliente. Oferecemos excelente ambiente de trabalho e oportunidade de crescimento.',
                        contato: '(11) 95432-1098',
                        cidade: 'São Paulo - SP',
                        urgente: false,
                        destaque: false,
                        publicadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                        status: 'ativo',
                        categoria: 'vendas',
                        visualizacoes: 89,
                        candidaturas: 15
                    },
                    {
                        id: 'vaga_admin_003',
                        empresa: 'Clínica Saúde Total',
                        cargo: 'Enfermeiro(a)',
                        area: 'saude',
                        salario: 'R$ 3.800,00',
                        descricao: 'Procuramos enfermeiro para atuar em clínica médica. COREN ativo obrigatório. Horário comercial, segunda a sexta.',
                        contato: 'rh@saudetotal.com.br',
                        cidade: 'São Paulo - SP',
                        urgente: true,
                        destaque: true,
                        publicadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                        status: 'ativo',
                        categoria: 'saude',
                        visualizacoes: 234,
                        candidaturas: 45
                    }
                ],
                lastUpdate: Date.now()
            };
            localStorage.setItem('adminVagasData', JSON.stringify(vagasPadrao));
        }
    }

    // Carregar vagas na tabela
    loadVagas() {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];
        const tbody = document.getElementById('vagasList');
        
        if (!tbody) return;

        tbody.innerHTML = '';

        vagas.forEach(vaga => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${vaga.cargo}</strong>
                    <br><small style="color: var(--text-secondary);">${this.truncarTexto(vaga.descricao, 50)}</small>
                    ${vaga.destaque ? '<br><span class="status-badge status-warning"><i class="fas fa-star"></i> DESTAQUE</span>' : ''}
                    ${vaga.urgente ? '<br><span class="status-badge status-danger"><i class="fas fa-exclamation"></i> URGENTE</span>' : ''}
                </td>
                <td>
                    <strong>${vaga.empresa}</strong>
                    <br><small style="color: var(--text-secondary);">${vaga.contato}</small>
                </td>
                <td>
                    <span class="status-badge status-info">
                        ${this.getAreaLabel(vaga.area)}
                    </span>
                </td>
                <td>
                    <strong style="color: var(--success);">${vaga.salario || 'A combinar'}</strong>
                </td>
                <td>
                    <span style="color: var(--text-secondary);">${vaga.cidade}</span>
                </td>
                <td>
                    <span class="status-badge ${this.getStatusClass(vaga.status)}">
                        ${this.getStatusLabel(vaga.status)}
                    </span>
                </td>
                <td>
                    <button class="action-btn ${vaga.urgente ? 'danger active' : ''}" 
                            onclick="marcarVagaUrgente('${vaga.id}')" 
                            title="${vaga.urgente ? 'Remover urgência' : 'Marcar como urgente'}">
                        <i class="fas fa-exclamation"></i>
                    </button>
                </td>
                <td>
                    <button class="action-btn ${vaga.destaque ? 'active' : ''}" 
                            onclick="toggleVagaDestaque('${vaga.id}')" 
                            title="${vaga.destaque ? 'Remover destaque' : 'Destacar'}">
                        <i class="fas fa-star"></i>
                    </button>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="editarVaga('${vaga.id}')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="aprovarVaga('${vaga.id}')" title="Aprovar">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn warning" onclick="rejeitarVaga('${vaga.id}')" title="Rejeitar">
                            <i class="fas fa-times"></i>
                        </button>
                        <button class="action-btn danger" onclick="deletarVaga('${vaga.id}')" title="Deletar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Obter label da área
    getAreaLabel(area) {
        const labels = {
            'vendas': 'Vendas',
            'administrativo': 'Administrativo',
            'tecnologia': 'Tecnologia',
            'saude': 'Saúde',
            'educacao': 'Educação',
            'servicos': 'Serviços'
        };
        return labels[area] || 'Outros';
    }

    // Obter classe CSS do status
    getStatusClass(status) {
        const classes = {
            ativo: 'status-approved',
            pendente: 'status-pending',
            preenchido: 'status-completed',
            expirado: 'status-rejected'
        };
        return classes[status] || 'status-pending';
    }

    // Obter label do status
    getStatusLabel(status) {
        const labels = {
            ativo: 'Ativo',
            pendente: 'Pendente',
            preenchido: 'Preenchido',
            expirado: 'Expirado'
        };
        return labels[status] || 'Pendente';
    }

    // Truncar texto
    truncarTexto(texto, limite) {
        if (texto.length <= limite) return texto;
        return texto.substring(0, limite) + '...';
    }

    // Adicionar nova vaga
    addVaga(dadosVaga) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];
        const novoId = 'vaga_admin_' + Date.now();
        
        const novaVaga = {
            id: novoId,
            ...dadosVaga,
            publicadoEm: new Date(),
            visualizacoes: 0,
            candidaturas: 0,
            categoria: dadosVaga.area
        };

        vagas.push(novaVaga);
        vagasData.vagas = vagas;
        vagasData.lastUpdate = Date.now();
        
        localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
        
        this.loadVagas();
        this.updateVagasStats();
        this.sincronizarComSite();
        
        this.showNotification(`Vaga "${novaVaga.cargo}" adicionada e sincronizada com sucesso!`, 'success');
    }

    // Aprovar vaga
    aprovarVaga(id) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vaga = vagasData.vagas.find(v => v.id === id);
        
        if (vaga) {
            vaga.status = 'ativo';
            vagasData.lastUpdate = Date.now();
            
            localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
            this.loadVagas();
            this.updateVagasStats();
            this.sincronizarComSite();
            
            this.showNotification(`Vaga "${vaga.cargo}" aprovada e ativa no site!`, 'success');
        }
    }

    // Rejeitar vaga
    rejeitarVaga(id) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vaga = vagasData.vagas.find(v => v.id === id);
        
        if (vaga) {
            vaga.status = 'expirado';
            vagasData.lastUpdate = Date.now();
            
            localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
            this.loadVagas();
            this.updateVagasStats();
            this.sincronizarComSite();
            
            this.showNotification(`Vaga "${vaga.cargo}" rejeitada!`, 'warning');
        }
    }

    // Deletar vaga
    deletarVaga(id) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vaga = vagasData.vagas.find(v => v.id === id);
        
        if (confirm(`Tem certeza que deseja deletar a vaga "${vaga ? vaga.cargo : 'esta vaga'}"?`)) {
            vagasData.vagas = vagasData.vagas.filter(v => v.id !== id);
            vagasData.lastUpdate = Date.now();
            
            localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
            this.loadVagas();
            this.updateVagasStats();
            this.sincronizarComSite();
            
            this.showNotification(`Vaga "${vaga ? vaga.cargo : 'vaga'}" deletada e removida do site!`, 'success');
        }
    }

    // Alternar destaque da vaga
    toggleDestaque(id) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vaga = vagasData.vagas.find(v => v.id === id);
        
        if (vaga) {
            vaga.destaque = !vaga.destaque;
            vagasData.lastUpdate = Date.now();
            
            localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
            this.loadVagas();
            this.sincronizarComSite();
            
            this.showNotification(`Vaga ${vaga.destaque ? 'destacada' : 'removida do destaque'} com sucesso!`, 'success');
        }
    }

    // Alternar urgência da vaga
    toggleUrgente(id) {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vaga = vagasData.vagas.find(v => v.id === id);
        
        if (vaga) {
            vaga.urgente = !vaga.urgente;
            vagasData.lastUpdate = Date.now();
            
            localStorage.setItem('adminVagasData', JSON.stringify(vagasData));
            this.loadVagas();
            this.sincronizarComSite();
            
            this.showNotification(`Vaga ${vaga.urgente ? 'marcada como urgente' : 'removida da urgência'}!`, 'info');
        }
    }

    // Atualizar estatísticas de vagas
    updateVagasStats() {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagas = vagasData.vagas || [];
        
        const vagasAtivas = vagas.filter(v => v.status === 'ativo').length;
        const vagasBadge = document.getElementById('vagasBadge');
        if (vagasBadge) vagasBadge.textContent = vagasAtivas;
    }

    // Sincronizar vagas com o site
    sincronizarComSite() {
        const vagasData = JSON.parse(localStorage.getItem('adminVagasData') || '{"vagas": []}');
        const vagasAtivas = vagasData.vagas.filter(v => v.status === 'ativo');
        
        // Atualizar vagas no formato que o site espera
        localStorage.setItem('vagasData', JSON.stringify(vagasAtivas));
        localStorage.setItem('vagasLastUpdate', Date.now().toString());
        
        // Disparar evento personalizado para notificar o rádio
        this.notificarSincronizacao();
        
        console.log('✅ Vagas sincronizadas com o site:', vagasAtivas.length);
    }

    // Notificar sincronização para o rádio
    notificarSincronizacao() {
        // Criar timestamp único para forçar detecção de mudança
        const timestamp = Date.now();
        localStorage.setItem('vagas_sync_timestamp', timestamp.toString());
        
        // Disparar evento storage personalizado
        if (window.dispatchEvent) {
            const syncEvent = new CustomEvent('vagasSincronizadas', {
                detail: {
                    timestamp: timestamp,
                    total: JSON.parse(localStorage.getItem('vagasData') || '[]').length
                }
            });
            window.dispatchEvent(syncEvent);
        }
        
        console.log('📡 Notificação de sincronização de vagas enviada');
    }

    // Forçar sincronização manual
    forceSyncronizacao() {
        this.sincronizarComSite();
        this.showNotification('Vagas sincronizadas com sucesso!', 'success');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Instância global do sistema de vagas
let vagasAdmin;

// Funções globais para vagas
function addVaga() {
    document.getElementById('vagaModal').style.display = 'block';
}

function aprovarVaga(id) {
    if (vagasAdmin) {
        vagasAdmin.aprovarVaga(id);
    }
}

function rejeitarVaga(id) {
    if (vagasAdmin) {
        vagasAdmin.rejeitarVaga(id);
    }
}

function editarVaga(id) {
    console.log('Editando vaga:', id);
    // TODO: Implementar modal de edição
    alert('Funcionalidade de edição em desenvolvimento');
}

function deletarVaga(id) {
    if (vagasAdmin) {
        vagasAdmin.deletarVaga(id);
    }
}

function toggleVagaDestaque(id) {
    if (vagasAdmin) {
        vagasAdmin.toggleDestaque(id);
    }
}

function marcarVagaUrgente(id) {
    if (vagasAdmin) {
        vagasAdmin.toggleUrgente(id);
    }
}

// Sincronizar vagas manualmente
function sincronizarVagas() {
    if (vagasAdmin) {
        vagasAdmin.forceSyncronizacao();
    }
}

// Inicializar sistema de vagas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vagasList')) {
        vagasAdmin = new VagasAdmin();
        window.vagasAdmin = vagasAdmin; // Expor globalmente
        console.log('💼 Sistema de Vagas Admin inicializado!');
    }
});

// Configurar formulário de vagas
document.addEventListener('DOMContentLoaded', () => {
    const vagaForm = document.getElementById('vagaForm');
    if (vagaForm) {
        vagaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(vagaForm);
            const dadosVaga = {
                cargo: formData.get('cargo'),
                empresa: formData.get('empresa'),
                area: formData.get('area'),
                salario: formData.get('salario') || 'A combinar',
                descricao: formData.get('descricao'),
                contato: formData.get('contato'),
                cidade: formData.get('cidade'),
                status: 'ativo',
                urgente: formData.get('urgente') === 'on',
                destaque: formData.get('destaque') === 'on'
            };
            
            if (vagasAdmin) {
                vagasAdmin.addVaga(dadosVaga);
            }
            
            vagaForm.reset();
            closeModal('vagaModal');
        });
    }
});

// Executar sincronização de vagas automaticamente a cada 10 minutos (reduzido para evitar sobrecarga)
let vagasSyncInterval = setInterval(() => {
    if (vagasAdmin) {
        vagasAdmin.sincronizarComSite();
    }
}, 600000);

// ===== CORREÇÕES PARA FUNCIONAMENTO DOS BOTÕES =====

// Expor todas as funções necessárias no escopo global
window.showPage = function(pageId) {
    console.log('🎯 showPage chamada com:', pageId);
    
    // Esconder todas as páginas
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página selecionada
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        console.log('✅ Página ativada:', pageId);
    } else {
        console.error('❌ Página não encontrada:', pageId);
    }
    
    // Atualizar menu ativo
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        // Verificar se o item corresponde à página
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(pageId)) {
            item.classList.add('active');
            console.log('✅ Menu ativo atualizado para:', pageId);
        }
    });
    
    // Fechar sidebar em mobile
    if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        if (sidebar && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
            if (mainContent) mainContent.classList.add('expanded');
        }
    }
};

// Função de logout corrigida
window.logout = function() {
    console.log('🚪 Logout solicitado');
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    }
};

// Função para toggle do sidebar
window.toggleSidebar = function() {
    console.log('📱 Toggle sidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        console.log('✅ Sidebar toggleado');
    }
    
    if (mainContent) {
        mainContent.classList.toggle('expanded');
    }
};

// Função para toggle do tema
window.toggleTheme = function(theme = null) {
    console.log('🌙 Toggle tema');
    let newTheme;
    
    if (theme) {
        newTheme = theme;
    } else {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        newTheme = currentTheme === 'light' ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualizar ícone do tema
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    console.log('✅ Tema alterado para:', newTheme);
    window.showToast(`Tema alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}!`, 'success');
};

// Função para toggle do menu do usuário
window.toggleUserMenu = function(event) {
    console.log('👤 Toggle menu do usuário');
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        const isOpen = dropdown.classList.contains('show');
        
        // Fechar todos os dropdowns abertos
        document.querySelectorAll('.user-dropdown.show').forEach(d => {
            d.classList.remove('show');
        });
        
        // Toggle do dropdown atual
        if (!isOpen) {
            dropdown.classList.add('show');
            console.log('✅ Menu do usuário aberto');
        } else {
            dropdown.classList.remove('show');
            console.log('❌ Menu do usuário fechado');
        }
    } else {
        console.error('❌ Dropdown do usuário não encontrado');
    }
};

// Função para busca na tabela
window.searchTable = function(tableId, searchTerm) {
    console.log('🔍 Buscando na tabela:', tableId, 'termo:', searchTerm);
    const table = document.getElementById(tableId);
    if (!table) {
        console.error('❌ Tabela não encontrada:', tableId);
        return;
    }
    
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                found = true;
                break;
            }
        }
        
        row.style.display = found ? '' : 'none';
    }
    
    console.log('✅ Busca concluída');
};

// Função para mostrar toast/notificação
window.showToast = function(message, type = 'info') {
    console.log('🍞 Toast:', message, type);
    
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Adicionar estilos se não existirem
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            }
            .toast-success { border-left: 4px solid #10b981; }
            .toast-error { border-left: 4px solid #ef4444; }
            .toast-warning { border-left: 4px solid #f59e0b; }
            .toast-info { border-left: 4px solid #3b82f6; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Adicionar ao DOM
    document.body.appendChild(toast);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
};

// Função para mostrar modal (versão simplificada)
window.showModal = function(title, content) {
    console.log('🎭 showModal chamada com título:', title);
    
    try {
        // Remover modais existentes primeiro
        const existingModals = document.querySelectorAll('.modal');
        existingModals.forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(0, 0, 0, 0.5)';
        modal.style.zIndex = '1000';
        
        modal.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 20px; padding: 2rem; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0;">${title}</h2>
                    <button onclick="this.closest('.modal').remove()" style="background: none; border: none; color: #64748b; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; border-radius: 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="line-height: 1.6;">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        console.log('✅ Modal criado e adicionado ao DOM');
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                console.log('🔄 Modal fechado ao clicar fora');
            }
        });
        
        // Fechar modal com ESC
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
                console.log('🔄 Modal fechado com ESC');
            }
        };
        document.addEventListener('keydown', escHandler);
        
        console.log('🎉 Modal exibido com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao criar modal:', error);
        alert('Erro ao exibir modal: ' + error.message);
        return false;
    }
};

// Função para carregar dados do perfil
window.loadProfileData = function() {
    const sessionData = JSON.parse(localStorage.getItem('adminSession') || '{}');
    return {
        nome: sessionData.username || 'Administrador',
        email: sessionData.email || 'admin@radioalovoce.com.br',
        cargo: 'Administrador do Sistema',
        dataCriacao: sessionData.loginTime || new Date().toISOString(),
        ultimaAtualizacao: new Date().toISOString()
    };
};

// Função para mostrar perfil do usuário
window.showUserProfile = function() {
    console.log('🎯 Função showUserProfile() chamada!');
    
    try {
        console.log('📋 Carregando dados do perfil...');
        const profileData = window.loadProfileData();
        console.log('✅ Dados do perfil carregados:', profileData);
        
        const sessionData = JSON.parse(localStorage.getItem('adminSession') || '{}');
        const lastLogin = sessionData.loginTime ? new Date(sessionData.loginTime).toLocaleString('pt-BR') : 'N/A';
        const memberSince = profileData.dataCriacao ? new Date(profileData.dataCriacao).toLocaleDateString('pt-BR') : 'Janeiro 2024';
        const lastUpdate = profileData.ultimaAtualizacao ? new Date(profileData.ultimaAtualizacao).toLocaleString('pt-BR') : 'N/A';
        
        console.log('📊 Dados de sessão processados');
        
        const profileInfo = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #10b981; margin-bottom: 1rem;">👤 Perfil do Administrador</h3>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                    <h4>${profileData.nome}</h4>
                    <p style="color: #64748b;">${profileData.email}</p>
                    <p style="color: #64748b;">${profileData.cargo}</p>
                </div>
                <div style="text-align: left;">
                    <p><strong>Último Login:</strong> ${lastLogin}</p>
                    <p><strong>Membro Desde:</strong> ${memberSince}</p>
                    <p><strong>Última Atualização:</strong> ${lastUpdate}</p>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="test-button" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
        
        console.log('📋 Conteúdo do perfil gerado, chamando showModal...');
        
        // Mostrar o perfil completo
        const result = window.showModal('Meu Perfil', profileInfo);
        
        if (result) {
            console.log('✅ Modal do perfil exibido com sucesso!');
            window.showToast('Perfil carregado com sucesso!', 'success');
        } else {
            console.error('❌ Falha ao exibir modal do perfil');
            window.showToast('Erro ao carregar perfil', 'error');
        }
        
        // Fechar dropdown do usuário
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
    } catch (error) {
        console.error('❌ Erro ao mostrar perfil:', error);
        window.showToast('Erro ao carregar perfil: ' + error.message, 'error');
    }
};

// Função de teste para o perfil
window.testShowUserProfile = function() {
    console.log('🧪 Teste: Função testShowUserProfile() chamada!');
    alert('🧪 Função testShowUserProfile() foi chamada com sucesso!');
    window.showUserProfile();
};

// Inicialização final quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema admin...');
    
    // Garantir que todas as instâncias sejam criadas
    if (!window.adminSystem) {
        window.adminSystem = new AdminSystem();
        console.log('✅ AdminSystem inicializado');
    }
    
    if (!window.eventosAdmin && document.getElementById('eventosList')) {
        window.eventosAdmin = new EventosAdmin();
        console.log('✅ EventosAdmin inicializado');
    }
    
    if (!window.vendasAdmin && document.getElementById('vendasList')) {
        window.vendasAdmin = new VendasAdmin();
        console.log('✅ VendasAdmin inicializado');
    }
    
    if (!window.promocoesAdmin && document.getElementById('promocoesList')) {
        window.promocoesAdmin = new PromocoesAdmin();
        console.log('✅ PromocoesAdmin inicializado');
    }
    
    if (!window.recadosAdmin && document.getElementById('recadosList')) {
        window.recadosAdmin = new RecadosAdmin();
        console.log('✅ RecadosAdmin inicializado');
    }
    
    if (!window.vagasAdmin && document.getElementById('vagasList')) {
        window.vagasAdmin = new VagasAdmin();
        console.log('✅ VagasAdmin inicializado');
    }
    
    // Configurar event listeners para elementos que podem não existir ainda
    setTimeout(() => {
        // Configurar menu do usuário
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.onclick = function(e) { 
                window.toggleUserMenu(e); 
            };
            console.log('✅ Menu do usuário configurado');
        }
        
        // Configurar fechamento de dropdown ao clicar fora
        document.addEventListener('click', function(event) {
            const userMenu = document.querySelector('.user-menu');
            const dropdown = document.getElementById('userDropdown');
            if (dropdown && userMenu && !userMenu.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Configurar tecla ESC para fechar modais
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                    }
                });
                
                const dropdowns = document.querySelectorAll('.user-dropdown.show');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });
        
        console.log('✅ Event listeners configurados');
    }, 100);
    
    console.log('🎉 Sistema admin inicializado com sucesso!');
});

// Garantir que as funções estejam disponíveis mesmo antes do DOMContentLoaded
console.log('🔧 Funções globais expostas:', {
    showPage: typeof window.showPage,
    logout: typeof window.logout,
    toggleSidebar: typeof window.toggleSidebar,
    toggleTheme: typeof window.toggleTheme,
    toggleUserMenu: typeof window.toggleUserMenu,
    searchTable: typeof window.searchTable,
    showToast: typeof window.showToast
});

// Função para mostrar configurações do usuário
window.showUserSettings = function() {
    console.log('⚙️ Função showUserSettings() chamada!');
    
    try {
        const settingsContent = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #10b981; margin-bottom: 1rem;">⚙️ Configurações do Sistema</h3>
                <div style="text-align: left; max-width: 500px; margin: 0 auto;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🎨 Tema</h4>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                            <button class="test-button" onclick="toggleTheme('light')" style="flex: 1;">
                                <i class="fas fa-sun"></i> Claro
                            </button>
                            <button class="test-button" onclick="toggleTheme('dark')" style="flex: 1;">
                                <i class="fas fa-moon"></i> Escuro
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🔔 Notificações</h4>
                        <div style="margin-top: 0.5rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" checked> Notificações de novas propagandas
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                <input type="checkbox" checked> Notificações de notícias pendentes
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                <input type="checkbox"> Notificações de eventos
                            </label>
                        </div>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🔄 Atualizações Automáticas</h4>
                        <div style="margin-top: 0.5rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" checked> Atualizar dashboard automaticamente
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                <input type="checkbox"> Sincronização automática com site
                            </label>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="test-button" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
        
        const result = window.showModal('Configurações', settingsContent);
        
        if (result) {
            console.log('✅ Modal de configurações exibido com sucesso!');
            window.showToast('Configurações carregadas!', 'success');
        }
        
        // Fechar dropdown do usuário
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
    } catch (error) {
        console.error('❌ Erro ao mostrar configurações:', error);
        window.showToast('Erro ao carregar configurações: ' + error.message, 'error');
    }
};

// Função para mostrar informações do sistema
window.showSystemInfo = function() {
    console.log('📊 Função showSystemInfo() chamada!');
    
    try {
        const systemInfo = {
            versao: '1.0.0',
            navegador: navigator.userAgent,
            plataforma: navigator.platform,
            idioma: navigator.language,
            cookies: navigator.cookieEnabled ? 'Habilitados' : 'Desabilitados',
            javascript: 'Habilitado',
            localStorage: typeof(Storage) !== "undefined" ? 'Disponível' : 'Não disponível',
            sessionStorage: typeof(Storage) !== "undefined" ? 'Disponível' : 'Não disponível'
        };
        
        const infoContent = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #10b981; margin-bottom: 1rem;">📊 Informações do Sistema</h3>
                <div style="text-align: left; max-width: 600px; margin: 0 auto;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🖥️ Sistema</h4>
                        <p><strong>Versão:</strong> ${systemInfo.versao}</p>
                        <p><strong>Plataforma:</strong> ${systemInfo.plataforma}</p>
                        <p><strong>Idioma:</strong> ${systemInfo.idioma}</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🌐 Navegador</h4>
                        <p><strong>User Agent:</strong> ${systemInfo.navegador}</p>
                        <p><strong>Cookies:</strong> ${systemInfo.cookies}</p>
                        <p><strong>JavaScript:</strong> ${systemInfo.javascript}</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>💾 Armazenamento</h4>
                        <p><strong>LocalStorage:</strong> ${systemInfo.localStorage}</p>
                        <p><strong>SessionStorage:</strong> ${systemInfo.sessionStorage}</p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>📈 Estatísticas do Sistema</h4>
                        <p><strong>Propagandas:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]').length}</p>
                        <p><strong>Notícias:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]').length}</p>
                        <p><strong>Eventos:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]').length}</p>
                        <p><strong>Vendas:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]').length}</p>
                        <p><strong>Promoções:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]').length}</p>
                        <p><strong>Recados:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]').length}</p>
                        <p><strong>Vagas:</strong> ${JSON.parse(localStorage.getItem('radioAloVoce_vagas') || '[]').length}</p>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="test-button" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
        
        const result = window.showModal('Informações do Sistema', infoContent);
        
        if (result) {
            console.log('✅ Modal de informações do sistema exibido com sucesso!');
            window.showToast('Informações carregadas!', 'success');
        }
        
        // Fechar dropdown do usuário
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
    } catch (error) {
        console.error('❌ Erro ao mostrar informações do sistema:', error);
        window.showToast('Erro ao carregar informações: ' + error.message, 'error');
    }
};

// Função para mostrar opções de backup
window.showBackupOptions = function() {
    console.log('💾 Função showBackupOptions() chamada!');
    
    try {
        const backupContent = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #10b981; margin-bottom: 1rem;">💾 Backup de Dados</h3>
                <div style="text-align: left; max-width: 500px; margin: 0 auto;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>📥 Exportar Dados</h4>
                        <p>Faça backup de todos os dados do sistema:</p>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                            <button class="test-button" onclick="exportAllData()" style="flex: 1;">
                                <i class="fas fa-download"></i> Backup Completo
                            </button>
                            <button class="test-button" onclick="exportSelectedData()" style="flex: 1;">
                                <i class="fas fa-filter"></i> Backup Seletivo
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>📤 Importar Dados</h4>
                        <p>Restaurar dados de um backup anterior:</p>
                        <div style="margin-top: 0.5rem;">
                            <input type="file" id="backupFile" accept=".json" style="width: 100%; margin-bottom: 0.5rem;">
                            <button class="test-button" onclick="importBackupData()" style="width: 100%;">
                                <i class="fas fa-upload"></i> Importar Backup
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🗑️ Limpar Dados</h4>
                        <p>⚠️ Cuidado: Esta ação não pode ser desfeita!</p>
                        <div style="margin-top: 0.5rem;">
                            <button class="test-button" onclick="clearAllData()" style="background: #ef4444; color: white;">
                                <i class="fas fa-trash"></i> Limpar Todos os Dados
                            </button>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="test-button" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
        
        const result = window.showModal('Backup de Dados', backupContent);
        
        if (result) {
            console.log('✅ Modal de backup exibido com sucesso!');
            window.showToast('Opções de backup carregadas!', 'success');
        }
        
        // Fechar dropdown do usuário
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
    } catch (error) {
        console.error('❌ Erro ao mostrar opções de backup:', error);
        window.showToast('Erro ao carregar opções de backup: ' + error.message, 'error');
    }
};

// Função para mostrar status de sincronização
window.showSyncStatus = function() {
    console.log('🔄 Função showSyncStatus() chamada!');
    
    try {
        const syncStatus = {
            propagandas: Math.random() > 0.5 ? 'Sincronizado' : 'Pendente',
            noticias: Math.random() > 0.3 ? 'Sincronizado' : 'Pendente',
            eventos: Math.random() > 0.7 ? 'Sincronizado' : 'Pendente',
            vendas: Math.random() > 0.4 ? 'Sincronizado' : 'Pendente',
            promocoes: Math.random() > 0.6 ? 'Sincronizado' : 'Pendente',
            recados: Math.random() > 0.8 ? 'Sincronizado' : 'Pendente',
            vagas: Math.random() > 0.2 ? 'Sincronizado' : 'Pendente'
        };
        
        const getStatusColor = (status) => status === 'Sincronizado' ? '#10b981' : '#f59e0b';
        const getStatusIcon = (status) => status === 'Sincronizado' ? 'fas fa-check-circle' : 'fas fa-clock';
        
        const syncContent = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #10b981; margin-bottom: 1rem;">🔄 Status de Sincronização</h3>
                <div style="text-align: left; max-width: 500px; margin: 0 auto;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>📊 Status por Módulo</h4>
                        <div style="margin-top: 0.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>📢 Propagandas</span>
                                <span style="color: ${getStatusColor(syncStatus.propagandas)};">
                                    <i class="${getStatusIcon(syncStatus.propagandas)}"></i> ${syncStatus.propagandas}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>📰 Notícias</span>
                                <span style="color: ${getStatusColor(syncStatus.noticias)};">
                                    <i class="${getStatusIcon(syncStatus.noticias)}"></i> ${syncStatus.noticias}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>📅 Eventos</span>
                                <span style="color: ${getStatusColor(syncStatus.eventos)};">
                                    <i class="${getStatusIcon(syncStatus.eventos)}"></i> ${syncStatus.eventos}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>🛒 Vendas</span>
                                <span style="color: ${getStatusColor(syncStatus.vendas)};">
                                    <i class="${getStatusIcon(syncStatus.vendas)}"></i> ${syncStatus.vendas}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>🏷️ Promoções</span>
                                <span style="color: ${getStatusColor(syncStatus.promocoes)};">
                                    <i class="${getStatusIcon(syncStatus.promocoes)}"></i> ${syncStatus.promocoes}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>💬 Recados</span>
                                <span style="color: ${getStatusColor(syncStatus.recados)};">
                                    <i class="${getStatusIcon(syncStatus.recados)}"></i> ${syncStatus.recados}
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0;">
                                <span>💼 Vagas</span>
                                <span style="color: ${getStatusColor(syncStatus.vagas)};">
                                    <i class="${getStatusIcon(syncStatus.vagas)}"></i> ${syncStatus.vagas}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                        <h4>🔄 Ações</h4>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                            <button class="test-button" onclick="forceSyncAll()" style="flex: 1;">
                                <i class="fas fa-sync"></i> Sincronizar Tudo
                            </button>
                            <button class="test-button" onclick="checkSyncStatus()" style="flex: 1;">
                                <i class="fas fa-refresh"></i> Verificar Status
                            </button>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="test-button" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
        
        const result = window.showModal('Status de Sincronização', syncContent);
        
        if (result) {
            console.log('✅ Modal de status de sincronização exibido com sucesso!');
            window.showToast('Status de sincronização carregado!', 'success');
        }
        
        // Fechar dropdown do usuário
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
    } catch (error) {
        console.error('❌ Erro ao mostrar status de sincronização:', error);
        window.showToast('Erro ao carregar status: ' + error.message, 'error');
    }
};

// Funções auxiliares para backup e sincronização
window.exportAllData = function() {
    try {
        const allData = {
            propagandas: JSON.parse(localStorage.getItem('radioAloVoce_propagandas') || '[]'),
            noticias: JSON.parse(localStorage.getItem('radioAloVoce_noticias') || '[]'),
            eventos: JSON.parse(localStorage.getItem('radioAloVoce_eventos') || '[]'),
            vendas: JSON.parse(localStorage.getItem('radioAloVoce_vendas') || '[]'),
            promocoes: JSON.parse(localStorage.getItem('radioAloVoce_promocoes') || '[]'),
            recados: JSON.parse(localStorage.getItem('radioAloVoce_recados') || '[]'),
            vagas: JSON.parse(localStorage.getItem('radioAloVoce_vagas') || '[]'),
            notasFalecimento: JSON.parse(localStorage.getItem('radioAloVoce_notas_falecimento') || '[]'),
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `radio-alo-voce-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        window.showToast('Backup exportado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
        window.showToast('Erro ao exportar backup: ' + error.message, 'error');
    }
};

window.exportSelectedData = function() {
    window.showToast('Funcionalidade de backup seletivo em desenvolvimento!', 'info');
};

window.importBackupData = function() {
    const fileInput = document.getElementById('backupFile');
    if (!fileInput || !fileInput.files[0]) {
        window.showToast('Selecione um arquivo de backup!', 'warning');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validar estrutura do backup
            if (!data.exportDate) {
                throw new Error('Arquivo de backup inválido');
            }
            
            // Restaurar dados
            Object.keys(data).forEach(key => {
                if (key !== 'exportDate' && Array.isArray(data[key])) {
                    localStorage.setItem(`radioAloVoce_${key}`, JSON.stringify(data[key]));
                }
            });
            
            window.showToast('Backup importado com sucesso!', 'success');
            
            // Recarregar dados na interface
            if (window.adminSystem) {
                window.adminSystem.loadPropagandas();
                window.adminSystem.loadNoticias();
                window.adminSystem.updateStats();
            }
            
        } catch (error) {
            console.error('Erro ao importar backup:', error);
            window.showToast('Erro ao importar backup: ' + error.message, 'error');
        }
    };
    
    reader.readAsText(file);
};

window.clearAllData = function() {
    if (confirm('⚠️ ATENÇÃO: Esta ação irá apagar TODOS os dados do sistema!\n\nEsta ação não pode ser desfeita. Tem certeza?')) {
        try {
            const keys = [
                'radioAloVoce_propagandas',
                'radioAloVoce_noticias',
                'radioAloVoce_eventos',
                'radioAloVoce_vendas',
                'radioAloVoce_promocoes',
                'radioAloVoce_recados',
                'radioAloVoce_vagas',
                'radioAloVoce_notas_falecimento'
            ];
            
            keys.forEach(key => localStorage.removeItem(key));
            
            window.showToast('Todos os dados foram apagados!', 'success');
            
            // Recarregar interface
            if (window.adminSystem) {
                window.adminSystem.initializeData();
                window.adminSystem.loadPropagandas();
                window.adminSystem.loadNoticias();
                window.adminSystem.updateStats();
            }
            
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            window.showToast('Erro ao limpar dados: ' + error.message, 'error');
        }
    }
};

window.forceSyncAll = function() {
    window.showToast('Sincronizando todos os dados...', 'info');
    
    // Simular sincronização
    setTimeout(() => {
        window.showToast('Sincronização concluída!', 'success');
    }, 2000);
};

window.checkSyncStatus = function() {
    window.showToast('Verificando status de sincronização...', 'info');
    
    // Simular verificação
    setTimeout(() => {
        window.showToast('Status atualizado!', 'success');
    }, 1500);
};