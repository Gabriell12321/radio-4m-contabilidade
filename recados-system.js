// 💌 SISTEMA DE RECADOS - RÁDIO ALO VOCE
// =====================================

// Dados dos recados (simulação de banco de dados)
let recadosData = [
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
    },
    {
        id: 3,
        remetente: 'Ana Costa',
        destinatario: 'Família Costa',
        tipo: 'saudade',
        mensagem: 'Mando um beijo carinhoso para toda família que está longe. Saudades de vocês!',
        telefone: '(11) 97766-5544',
        cidade: 'Osasco',
        lerNoAr: true,
        dataEnvio: '2024-01-13',
        horaEnvio: '16:20',
        status: 'ativo',
        lidoNoAr: false,
        dataLeitura: null,
        horaLeitura: null,
        prioridade: 'media',
        destaque: false,
        categoria: 'saudade',
        visualizacoes: 67,
        likes: 8
    },
    {
        id: 4,
        remetente: 'Roberto Lima',
        destinatario: 'Esposa Márcia',
        tipo: 'dedicatoria',
        mensagem: 'Dedico a música "Evidências" para minha esposa Márcia. 25 anos de casados e te amo cada dia mais!',
        telefone: '(11) 96655-4433',
        cidade: 'Barueri',
        lerNoAr: true,
        dataEnvio: '2024-01-12',
        horaEnvio: '19:45',
        status: 'ativo',
        lidoNoAr: true,
        dataLeitura: '2024-01-12',
        horaLeitura: '20:15',
        prioridade: 'alta',
        destaque: true,
        categoria: 'dedicatoria',
        visualizacoes: 234,
        likes: 45
    },
    {
        id: 5,
        remetente: 'Fernanda Oliveira',
        destinatario: 'Comunidade',
        tipo: 'aviso',
        mensagem: 'Aviso importante: Hoje às 18h teremos missa na Igreja São João. Todos estão convidados!',
        telefone: '(11) 95544-3322',
        cidade: 'Carapicuíba',
        lerNoAr: true,
        dataEnvio: '2024-01-11',
        horaEnvio: '08:30',
        status: 'ativo',
        lidoNoAr: true,
        dataLeitura: '2024-01-11',
        horaLeitura: '09:00',
        prioridade: 'alta',
        destaque: false,
        categoria: 'aviso',
        visualizacoes: 178,
        likes: 32
    },
    {
        id: 6,
        remetente: 'Paulo Mendes',
        destinatario: 'Amigos do futebol',
        tipo: 'outros',
        mensagem: 'Pessoal do futebol de domingo: jogo cancelado por causa da chuva. Reagendamos para próximo domingo!',
        telefone: '(11) 94433-2211',
        cidade: 'Jandira',
        lerNoAr: false,
        dataEnvio: '2024-01-10',
        horaEnvio: '12:00',
        status: 'ativo',
        lidoNoAr: false,
        dataLeitura: null,
        horaLeitura: null,
        prioridade: 'baixa',
        destaque: false,
        categoria: 'outros',
        visualizacoes: 45,
        likes: 5
    }
];

// Configurações do sistema
const configRecados = {
    recadosPorPagina: 6,
    paginaAtual: 1,
    filtroAtivo: 'todos',
    autoSync: true,
    syncInterval: 5 * 60 * 1000, // 5 minutos
    maxCaracteres: 280,
    categoriasDisponiveis: ['agradecimento', 'aniversario', 'aviso', 'saudade', 'dedicatoria', 'outros']
};

// Classe principal do sistema de recados
class RecadosSystem {
    constructor() {
        this.recados = recadosData;
        this.filtroAtivo = 'todos';
        this.syncInterval = null;
        this.init();
    }

    init() {
        this.renderizarRecados();
        this.atualizarEstatisticas();
        this.renderizarRecadosDestaque();
        this.configurarContadorCaracteres();
        this.iniciarSincronizacao();
        
        console.log('💌 Sistema de Recados inicializado com sucesso!');
    }

    renderizarRecados() {
        const grid = document.getElementById('recadosGrid');
        const loading = document.querySelector('.loading-recados');
        
        if (!grid) return;

        // Remover loading
        if (loading) {
            loading.remove();
        }

        // Filtrar recados
        const recadosFiltrados = this.filtrarRecados(this.recados, this.filtroAtivo);
        
        // Paginar recados
        const inicio = (configRecados.paginaAtual - 1) * configRecados.recadosPorPagina;
        const fim = inicio + configRecados.recadosPorPagina;
        const recadosPaginados = recadosFiltrados.slice(inicio, fim);

        if (recadosPaginados.length === 0) {
            grid.innerHTML = `
                <div class="no-recados">
                    <div class="no-recados-icon">
                        <i class="fas fa-envelope-open"></i>
                    </div>
                    <h3>Nenhum recado encontrado</h3>
                    <p>Seja o primeiro a enviar um recado para nossa comunidade!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = recadosPaginados.map(recado => this.criarCardRecado(recado)).join('');
    }

    criarCardRecado(recado) {
        const iconeCategoria = this.obterIconeCategoria(recado.categoria);
        const dataFormatada = this.formatarData(recado.dataEnvio);
        const horaFormatada = this.formatarHora(recado.horaEnvio);
        
        const statusLeitura = recado.lidoNoAr ? 
            `<span class="status-lido"><i class="fas fa-microphone"></i> Lido no ar</span>` :
            `<span class="status-pendente"><i class="fas fa-clock"></i> Aguardando</span>`;

        const badgeDestaque = recado.destaque ? 
            `<div class="badge-destaque">⭐ Destaque</div>` : '';

        return `
            <div class="recado-card ${recado.destaque ? 'destaque' : ''}" data-categoria="${recado.categoria}">
                ${badgeDestaque}
                <div class="recado-header">
                    <div class="recado-categoria">
                        <i class="${iconeCategoria}"></i>
                        <span>${this.obterNomeCategoria(recado.categoria)}</span>
                    </div>
                    ${statusLeitura}
                </div>
                
                <div class="recado-content">
                    <div class="recado-remetente">
                        <strong>De:</strong> ${recado.remetente}
                        ${recado.cidade ? `<span class="cidade">(${recado.cidade})</span>` : ''}
                    </div>
                    
                    <div class="recado-destinatario">
                        <strong>Para:</strong> ${recado.destinatario}
                    </div>
                    
                    <div class="recado-mensagem">
                        <p>${this.truncarTexto(recado.mensagem, 120)}</p>
                    </div>
                </div>
                
                <div class="recado-footer">
                    <div class="recado-meta">
                        <span class="recado-data">
                            <i class="fas fa-calendar"></i>
                            ${dataFormatada} às ${horaFormatada}
                        </span>
                        <span class="recado-stats">
                            <i class="fas fa-eye"></i> ${recado.visualizacoes}
                            <i class="fas fa-heart"></i> ${recado.likes}
                        </span>
                    </div>
                    
                    <button class="ver-detalhes-btn" onclick="abrirModalRecado(${recado.id})">
                        <i class="fas fa-expand-alt"></i>
                        Ver Completo
                    </button>
                </div>
            </div>
        `;
    }

    filtrarRecados(recados, categoria) {
        if (categoria === 'todos') {
            return recados.filter(recado => recado.status === 'ativo');
        }
        return recados.filter(recado => recado.categoria === categoria && recado.status === 'ativo');
    }

    atualizarEstatisticas() {
        const recadosAtivos = this.recados.filter(r => r.status === 'ativo');
        const recadosLidos = this.recados.filter(r => r.lidoNoAr);
        const ouvintesUnicos = new Set(this.recados.map(r => r.remetente)).size;

        // Atualizar contadores
        this.atualizarContador('totalRecados', recadosAtivos.length);
        this.atualizarContador('ouvintesRecados', ouvintesUnicos);
        this.atualizarContador('recadosLidos', recadosLidos.length);
    }

    renderizarRecadosDestaque() {
        const container = document.getElementById('recadosDestaque');
        if (!container) return;

        const recadosLidos = this.recados
            .filter(r => r.lidoNoAr)
            .sort((a, b) => new Date(b.dataLeitura + ' ' + b.horaLeitura) - new Date(a.dataLeitura + ' ' + a.horaLeitura))
            .slice(0, 3);

        if (recadosLidos.length === 0) {
            container.innerHTML = '<p>Nenhum recado foi lido ainda.</p>';
            return;
        }

        container.innerHTML = recadosLidos.map(recado => `
            <div class="destaque-item">
                <div class="destaque-header">
                    <div class="destaque-icon">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div class="destaque-info">
                        <h4>Lido em ${this.formatarData(recado.dataLeitura)} às ${this.formatarHora(recado.horaLeitura)}</h4>
                        <p><strong>De:</strong> ${recado.remetente} <strong>Para:</strong> ${recado.destinatario}</p>
                    </div>
                </div>
                <div class="destaque-mensagem">
                    <p>"${this.truncarTexto(recado.mensagem, 100)}"</p>
                </div>
            </div>
        `).join('');
    }

    configurarContadorCaracteres() {
        const textarea = document.getElementById('mensagem-recado');
        const counter = document.querySelector('.char-counter');
        
        if (textarea && counter) {
            textarea.addEventListener('input', () => {
                const count = textarea.value.length;
                counter.textContent = `${count}/${configRecados.maxCaracteres} caracteres`;
                
                if (count > configRecados.maxCaracteres) {
                    counter.style.color = '#e74c3c';
                } else if (count > configRecados.maxCaracteres * 0.8) {
                    counter.style.color = '#f39c12';
                } else {
                    counter.style.color = '#95a5a6';
                }
            });
        }
    }

    iniciarSincronizacao() {
        if (configRecados.autoSync) {
            this.syncInterval = setInterval(() => {
                this.sincronizarComAdmin();
            }, 600000); // 10 minutos (reduzido para evitar sobrecarga)
        }

        // Detectar mudanças no localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'recados-admin-sync') {
                this.sincronizarComAdmin();
            }
        });
    }

    sincronizarComAdmin() {
        try {
            const dadosAdmin = localStorage.getItem('recados-admin-data');
            if (dadosAdmin) {
                const recadosAdmin = JSON.parse(dadosAdmin);
                this.recados = recadosAdmin;
                this.renderizarRecados();
                this.atualizarEstatisticas();
                this.renderizarRecadosDestaque();
                console.log('🔄 Recados sincronizados com admin');
            }
        } catch (error) {
            console.error('Erro na sincronização:', error);
        }
    }

    obterIconeCategoria(categoria) {
        const icones = {
            'agradecimento': 'fas fa-heart',
            'aniversario': 'fas fa-birthday-cake',
            'aviso': 'fas fa-bullhorn',
            'saudade': 'fas fa-dove',
            'dedicatoria': 'fas fa-music',
            'outros': 'fas fa-comment-dots'
        };
        return icones[categoria] || 'fas fa-envelope';
    }

    obterNomeCategoria(categoria) {
        const nomes = {
            'agradecimento': 'Agradecimento',
            'aniversario': 'Aniversário',
            'aviso': 'Aviso',
            'saudade': 'Saudades',
            'dedicatoria': 'Dedicatória',
            'outros': 'Outros'
        };
        return nomes[categoria] || 'Recado';
    }

    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    formatarHora(hora) {
        return hora;
    }

    truncarTexto(texto, limite) {
        if (texto.length <= limite) return texto;
        return texto.substring(0, limite) + '...';
    }

    atualizarContador(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    adicionarRecado(recado) {
        const novoRecado = {
            id: Date.now(),
            ...recado,
            dataEnvio: new Date().toISOString().split('T')[0],
            horaEnvio: new Date().toTimeString().split(' ')[0].substring(0, 5),
            status: 'ativo',
            lidoNoAr: false,
            visualizacoes: 0,
            likes: 0,
            prioridade: 'media',
            destaque: false
        };

        this.recados.unshift(novoRecado);
        this.renderizarRecados();
        this.atualizarEstatisticas();
        
        // Salvar no localStorage para sincronização
        localStorage.setItem('recados-data', JSON.stringify(this.recados));
        localStorage.setItem('recados-sync-timestamp', Date.now().toString());
        
        return novoRecado;
    }
}

// Instanciar sistema
let sistemaRecados;

// Funções globais
function filtrarRecados(categoria) {
    if (!sistemaRecados) return;
    
    // Atualizar filtro ativo
    sistemaRecados.filtroAtivo = categoria;
    configRecados.paginaAtual = 1;
    
    // Atualizar botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-categoria="${categoria}"]`).classList.add('active');
    
    // Renderizar recados filtrados
    sistemaRecados.renderizarRecados();
}

function carregarMaisRecados() {
    configRecados.paginaAtual++;
    sistemaRecados.renderizarRecados();
}

function enviarRecado(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const recado = {
        remetente: formData.get('remetente'),
        destinatario: formData.get('destinatario') || 'Todos os ouvintes',
        tipo: formData.get('tipo'),
        mensagem: formData.get('mensagem'),
        telefone: formData.get('telefone'),
        cidade: formData.get('cidade'),
        lerNoAr: formData.get('lerNoAr') === 'on',
        categoria: formData.get('tipo')
    };

    if (sistemaRecados.adicionarRecado(recado)) {
        // Limpar formulário
        event.target.reset();
        
        // Feedback visual
        mostrarNotificacao('Recado enviado com sucesso! Em breve será analisado para leitura no ar.', 'success');
        
        // Scroll para o topo dos recados
        document.getElementById('recados').scrollIntoView({ behavior: 'smooth' });
    }
}

function abrirModalRecado(id) {
    const recado = sistemaRecados.recados.find(r => r.id === id);
    if (!recado) return;

    const modal = document.getElementById('recadoModal');
    const modalBody = document.querySelector('.recado-modal-body');
    
    const iconeCategoria = sistemaRecados.obterIconeCategoria(recado.categoria);
    const dataFormatada = sistemaRecados.formatarData(recado.dataEnvio);
    const horaFormatada = sistemaRecados.formatarHora(recado.horaEnvio);
    
    modalBody.innerHTML = `
        <div class="modal-recado-header">
            <div class="modal-categoria">
                <i class="${iconeCategoria}"></i>
                <span>${sistemaRecados.obterNomeCategoria(recado.categoria)}</span>
            </div>
            ${recado.destaque ? '<div class="modal-destaque">⭐ Destaque</div>' : ''}
        </div>
        
        <div class="modal-recado-content">
            <div class="modal-remetente">
                <h3>De: ${recado.remetente}</h3>
                ${recado.cidade ? `<p class="modal-cidade">📍 ${recado.cidade}</p>` : ''}
                ${recado.telefone ? `<p class="modal-telefone">📞 ${recado.telefone}</p>` : ''}
            </div>
            
            <div class="modal-destinatario">
                <h4>Para: ${recado.destinatario}</h4>
            </div>
            
            <div class="modal-mensagem">
                <div class="mensagem-completa">
                    <i class="fas fa-quote-left"></i>
                    <p>${recado.mensagem}</p>
                    <i class="fas fa-quote-right"></i>
                </div>
            </div>
        </div>
        
        <div class="modal-recado-footer">
            <div class="modal-meta">
                <span><i class="fas fa-calendar"></i> ${dataFormatada} às ${horaFormatada}</span>
                <span><i class="fas fa-eye"></i> ${recado.visualizacoes} visualizações</span>
                <span><i class="fas fa-heart"></i> ${recado.likes} curtidas</span>
            </div>
            
            <div class="modal-status">
                ${recado.lidoNoAr ? 
                    `<span class="status-lido-modal">
                        <i class="fas fa-microphone"></i> 
                        Lido no ar em ${sistemaRecados.formatarData(recado.dataLeitura)} às ${sistemaRecados.formatarHora(recado.horaLeitura)}
                    </span>` :
                    `<span class="status-pendente-modal">
                        <i class="fas fa-clock"></i> 
                        Aguardando para ser lido no ar
                    </span>`
                }
            </div>
            
            <div class="modal-actions">
                <button class="btn-curtir" onclick="curtirRecado(${recado.id})">
                    <i class="fas fa-heart"></i> Curtir
                </button>
                <button class="btn-compartilhar" onclick="compartilharRecado(${recado.id})">
                    <i class="fas fa-share"></i> Compartilhar
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Incrementar visualizações
    recado.visualizacoes++;
    sistemaRecados.renderizarRecados();
}

function fecharModalRecado() {
    const modal = document.getElementById('recadoModal');
    modal.style.display = 'none';
}

function curtirRecado(id) {
    const recado = sistemaRecados.recados.find(r => r.id === id);
    if (recado) {
        recado.likes++;
        sistemaRecados.renderizarRecados();
        abrirModalRecado(id); // Atualizar modal
        mostrarNotificacao('Recado curtido! ❤️', 'success');
    }
}

function compartilharRecado(id) {
    const recado = sistemaRecados.recados.find(r => r.id === id);
    if (recado) {
        const texto = `Recado na Rádio Alo Voce:\n\nDe: ${recado.remetente}\nPara: ${recado.destinatario}\n\n"${recado.mensagem}"\n\nOuça em: www.radioalovoce.com.br`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Recado - Rádio Alo Voce',
                text: texto
            });
        } else {
            navigator.clipboard.writeText(texto);
            mostrarNotificacao('Recado copiado para área de transferência!', 'success');
        }
    }
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check' : 'info'}-circle"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    sistemaRecados = new RecadosSystem();
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    const modal = document.getElementById('recadoModal');
    if (event.target === modal) {
        fecharModalRecado();
    }
}); 