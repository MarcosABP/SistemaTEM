// script.js (Atualizado com Avaliação de Relatórios de Estágio - Orientador)

document.addEventListener('DOMContentLoaded', function() {

    // --- Variáveis de Estado Global Simuladas (para o protótipo) ---
    let tccStatus = localStorage.getItem('tccStatus') || 'sem_tcc';
    let propostasTCCOrientador = JSON.parse(localStorage.getItem('propostasTCCOrientador')) || [
        {
            id: 'prop001', aluno: 'Aluno(a) Exemplo', titulo: 'Análise de Desempenho de Redes 5G',
            resumo: 'Este trabalho investiga o desempenho de redes 5G em diferentes cenários urbanos...',
            objetivos: 'Avaliar latência, throughput e consumo de energia...',
            metodologia: 'Simulações em ns-3 e testes de campo em ambiente controlado...',
            palavrasChave: '5G, Redes, Desempenho, ns-3', orientadorSugerido: 'Dr. João Silva',
            dataSubmissao: '2025-07-01', status: 'pendente_avaliacao_orientador',
            feedbackOrientador: '', decisaoOrientador: '', feedbackCoordenador: '',
            decisaoCoordenador: '', dataAprovacaoProposta: '', historico: []
        },
        {
            id: 'prop002', aluno: 'Aluno(a) Teste', titulo: 'Desenvolvimento de Aplicação Web para Gestão Acadêmica',
            resumo: 'Proposta de criação de um sistema web para auxiliar na gestão de processos acadêmicos...',
            objetivos: 'Desenvolver módulos de TCC, monitoria e estágio...',
            metodologia: 'Uso de tecnologias web modernas (React, Node.js) e banco de dados relacional...',
            palavrasChave: 'Web, Gestão, Acadêmica, React', orientadorSugerido: 'Dra. Maria Oliveira',
            dataSubmissao: '2025-06-28', status: 'aprovada_coordenador',
            feedbackOrientador: 'Ótima proposta, muito relevante e bem estruturada.', decisaoOrientador: 'aprovada',
            feedbackCoordenador: 'Concordo com o orientador. Proposta sólida.', decisaoCoordenador: 'aprovada_coordenador',
            dataAprovacaoProposta: '2025-07-05',
            historico: [
                { data: '2025-07-10', tipo: 'Upload', descricao: 'Primeiro rascunho da Introdução', documento: 'introducao_v1.pdf' },
                { data: '2025-07-15', tipo: 'Feedback', descricao: 'Feedback sobre a Introdução.', feedback: 'Revise a contextualização inicial.' },
                { data: '2025-08-01', tipo: 'Status', descricao: 'Status alterado para Em Andamento (Orientador).', status: 'em_andamento' }
            ]
        },
        {
            id: 'prop003', aluno: 'Aluno(a) Dummy', titulo: 'Estudo de Viabilidade de Energia Solar para Residências',
            resumo: 'Análise econômica e ambiental da implementação de painéis solares...',
            objetivos: 'Quantificar economia, analisar impacto ambiental...',
            metodologia: 'Pesquisa bibliográfica e estudo de caso...',
            palavrasChave: 'Solar, Energia, Sustentabilidade', orientadorSugerido: 'Dr. João Silva',
            dataSubmissao: '2025-06-20', status: 'aprovada_coordenador',
            feedbackOrientador: 'Bom tema, relevante para o contexto atual.', decisaoOrientador: 'aprovada',
            feedbackCoordenador: 'Validado. Bom potencial.', decisaoCoordenador: 'aprovada_coordenador',
            dataAprovacaoProposta: '2025-07-03', historico: []
        }
    ];

    let vagasMonitoria = JSON.parse(localStorage.getItem('vagasMonitoria')) || [
        {
            id: 'vaga001', disciplina: 'Cálculo I', orientador: 'Dr. João Silva',
            vagasOferecidas: 2, horarios: 'Segunda 14h-16h, Quarta 10h-12h',
            requisitos: 'Ter sido aprovado em Cálculo I com nota >= 7.0',
            periodoInscricaoInicio: '2025-08-01', periodoInscricaoFim: '2025-08-15',
            status: 'ativa'
        },
        {
            id: 'vaga002', disciplina: 'Algoritmos e Estruturas de Dados', orientador: 'Dra. Maria Oliveira',
            vagasOferecidas: 1, horarios: 'Terça 09h-11h',
            requisitos: 'Conhecimento avançado em Python e estrutura de dados.',
            periodoInscricaoInicio: '2025-08-05', periodoInscricaoFim: '2025-08-20',
            status: 'ativa'
        },
        {
            id: 'vaga003', disciplina: 'Física Experimental', orientador: 'Prof. Pedro Souza',
            vagasOferecidas: 1, horarios: 'Sexta 14h-17h',
            requisitos: 'Experiência em laboratório de física, nota >= 8.0 em Física I e II.',
            periodoInscricaoInicio: '2025-07-01', periodoInscricaoFim: '2025-07-20',
            status: 'ativa'
        }
    ];

    let candidaturasMonitoria = JSON.parse(localStorage.getItem('candidaturasMonitoria')) || [];
    if (!candidaturasMonitoria.some(c => c.aluno === 'Aluno(a) Exemplo' && c.vagaId === 'vaga003')) {
         candidaturasMonitoria.push({
            id: 'cand001', aluno: 'Aluno(a) Exemplo', vagaId: 'vaga003',
            disciplina: 'Física Experimental', orientador: 'Prof. Pedro Souza',
            dataCandidatura: '2025-07-05', historicoEscolar: 'historico_aluno_exemplo.pdf',
            cartaIntencoes: 'carta_intencoes_aluno_exemplo.pdf',
            disponibilidadeHorarios: 'Disponibilidade total nas sextas-feiras.',
            observacoesAdicionais: 'Gosto muito de física!',
            status: 'pendente_avaliacao', feedback: '',
            notaDesempenho: null, comentariosDesempenho: '', recomendacaoFutura: null
        });
    }
    if (!candidaturasMonitoria.some(c => c.aluno === 'Aluno(a) Teste' && c.vagaId === 'vaga001')) {
        candidaturasMonitoria.push({
            id: 'cand002', aluno: 'Aluno(a) Teste', vagaId: 'vaga001',
            disciplina: 'Cálculo I', orientador: 'Dr. João Silva',
            dataCandidatura: '2025-08-08', historicoEscolar: 'historico_aluno_teste.pdf',
            cartaIntencoes: 'carta_intencoes_aluno_teste.pdf',
            disponibilidadeHorarios: 'Disponibilidade de acordo com os horários da monitoria.',
            observacoesAdicionais: 'Muito interesse na disciplina.',
            status: 'pendente_avaliacao', feedback: '',
            notaDesempenho: null, comentariosDesempenho: '', recomendacaoFutura: null
        });
    }
    if (!candidaturasMonitoria.some(c => c.aluno === 'Aluno(a) Aprovado' && c.vagaId === 'vaga001')) {
        candidaturasMonitoria.push({
            id: 'cand003', aluno: 'Aluno(a) Aprovado', vagaId: 'vaga001',
            disciplina: 'Cálculo I', orientador: 'Dr. João Silva',
            dataCandidatura: '2025-07-25', historicoEscolar: 'historico_aprovado.pdf',
            cartaIntencoes: '',
            disponibilidadeHorarios: 'Conforme oferta.',
            observacoesAdicionais: '',
            status: 'aprovado',
            feedback: 'Candidatura excelente.',
            notaDesempenho: null, comentariosDesempenho: '', recomendacaoFutura: null,
            periodoMonitoriaInicio: '2025-08-16', periodoMonitoriaFim: '2025-12-15'
        });
    }
    saveCandidaturasMonitoria();

    // Novo array para estágios
    let estagios = JSON.parse(localStorage.getItem('estagios')) || [
        {
            id: 'estg001', aluno: 'Aluno(a) Exemplo', tipo: 'obrigatorio',
            nomeEmpresa: 'Tech Solutions Ltda.', cnpjEmpresa: '12.345.678/0001-90',
            supervisorEmpresa: 'Gerente de Inovação', emailSupervisor: 'gerente@techsolutions.com',
            telefoneSupervisor: '(11) 98765-4321', setorDepartamento: 'Pesquisa e Desenvolvimento',
            areaAtuacao: 'Desenvolvimento de Software', cargaHorariaSemanal: 30,
            periodoInicioEstagio: '2025-09-01', periodoFimEstagio: '2026-02-28', // Data futura para não pedir relatório agora
            descricaoAtividades: 'Desenvolvimento e manutenção de sistemas web e mobile.',
            status: 'formulario_preenchido', // 'formulario_preenchido', 'termo_pendente_validacao', 'ativo', 'relatorio_pendente_avaliacao', 'concluido', 'reprovado'
            termoCompromisso: null,
            dataEnvioTermo: null,
            feedbackCoordenadorTermo: null,
            decisaoCoordenadorTermo: null,
            relatorioFinal: null,
            dataEnvioRelatorio: null,
            notaFinalOrientador: null,
            feedbackOrientadorRelatorio: null,
            historico: []
        },
        {
            id: 'estg002', aluno: 'Aluno(a) Teste', tipo: 'nao_obrigatorio',
            nomeEmpresa: 'Inova Consultoria S.A.', cnpjEmpresa: '98.765.432/0001-11',
            supervisorEmpresa: 'Diretor de Projetos', emailSupervisor: 'diretor@inovaconsultoria.com',
            telefoneSupervisor: '(21) 91234-5678', setorDepartamento: 'Consultoria Estratégica',
            areaAtuacao: 'Análise de Negócios', cargaHorariaSemanal: 20,
            periodoInicioEstagio: '2025-07-15', periodoFimEstagio: '2025-10-15',
            descricaoAtividades: 'Auxílio na análise de mercado e elaboração de relatórios.',
            status: 'ativo', // Já ativo, termo validado
            termoCompromisso: 'termo_estagio_aluno_teste.pdf',
            dataEnvioTermo: '2025-07-01',
            feedbackCoordenadorTermo: 'Aprovado sem ressalvas.',
            decisaoCoordenadorTermo: 'aprovado',
            relatorioFinal: null, // Relatório ainda não enviado
            dataEnvioRelatorio: null,
            notaFinalOrientador: null,
            feedbackOrientadorRelatorio: null,
            historico: [
                { data: '2025-07-01', tipo: 'Envio', descricao: 'Termo de Compromisso enviado.', documento: 'termo_estagio_aluno_teste.pdf' },
                { data: '2025-07-10', tipo: 'Status', descricao: 'Termo de Compromisso aprovado pelo Coordenador.', status: 'ativo' }
            ]
        },
        {
            id: 'estg003', aluno: 'Aluno(a) Dummy', tipo: 'obrigatorio',
            nomeEmpresa: 'ConstruTech Engenharia', cnpjEmpresa: '11.222.333/0001-44',
            supervisorEmpresa: 'Eng. Civil Maria', emailSupervisor: 'maria@construtech.com',
            telefoneSupervisor: '(81) 99887-7665', setorDepartamento: 'Projetos Estruturais',
            areaAtuacao: 'Engenharia Civil', cargaHorariaSemanal: 40,
            periodoInicioEstagio: '2025-03-01', periodoFimEstagio: '2025-06-30', // Período já finalizado
            descricaoAtividades: 'Cálculo e dimensionamento de estruturas.',
            status: 'relatorio_pendente_avaliacao', // Relatório enviado, pendente de avaliação
            termoCompromisso: 'termo_estagio_aluno_dummy.pdf',
            dataEnvioTermo: '2025-02-20',
            feedbackCoordenadorTermo: 'Aprovado.',
            decisaoCoordenadorTermo: 'aprovado',
            relatorioFinal: 'relatorio_estagio_aluno_dummy.pdf',
            dataEnvioRelatorio: '2025-07-05',
            notaFinalOrientador: null,
            feedbackOrientadorRelatorio: null,
            historico: [
                { data: '2025-02-20', tipo: 'Envio', descricao: 'Termo de Compromisso enviado.', documento: 'termo_estagio_aluno_dummy.pdf' },
                { data: '2025-02-25', tipo: 'Status', descricao: 'Termo de Compromisso aprovado pelo Coordenador.', status: 'ativo' },
                { data: '2025-07-05', tipo: 'Envio', descricao: 'Relatório Final de Estágio enviado.', documento: 'relatorio_estagio_aluno_dummy.pdf' }
            ]
        }
    ];
    saveEstagios();


    // Simula carga horária do aluno (para RN017)
    const cargaHorariaConcluidaAlunoExemplo = 1900;
    const cargaHorariaTotalCurso = 3000;
    const percentualConcluidoAlunoExemplo = (cargaHorariaConcluidaAlunoExemplo / cargaHorariaTotalCurso) * 100;


    function savePropostasTCCOrientador() { localStorage.setItem('propostasTCCOrientador', JSON.stringify(propostasTCCOrientador)); }
    function saveVagasMonitoria() { localStorage.setItem('vagasMonitoria', JSON.stringify(vagasMonitoria)); }
    function saveCandidaturasMonitoria() { localStorage.setItem('candidaturasMonitoria', JSON.stringify(candidaturasMonitoria)); }
    function saveEstagios() { localStorage.setItem('estagios', JSON.stringify(estagios)); }

    // --- Funções Auxiliares ---
    function navigateTo(url) { window.location.href = url; }
    function showMessage(elementId, message, type = 'success') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.className = (type === 'success' ? 'mensagem-sucesso' : 'mensagem-erro');
            element.style.display = 'block';
        }
    }
    function hideMessage(elementId) {
        const element = document.getElementById(elementId);
        if (element) { element.style.display = 'none'; }
    }
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
    function isPeriodoInscricaoAberto(inicio, fim) {
        const hoje = new Date();
        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);
        return hoje >= dataInicio && hoje <= dataFim;
    }


    // --- Lógica para Login (index.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            hideMessage('mensagemErro');

            let redirectUrl = '';
            if (email === 'aluno@poli.upe.br' && senha === '123') { redirectUrl = 'dashboard_aluno.html'; }
            else if (email === 'orientador@poli.upe.br' && senha === '123') { redirectUrl = 'dashboard_orientador.html'; }
            else if (email === 'coordenador@poli.upe.br' && senha === '123') { redirectUrl = 'dashboard_coordenador.html'; }
            else { showMessage('mensagemErro', 'E-mail ou senha inválidos.', 'error'); return; }
            navigateTo(redirectUrl);
        });
    }

    // --- Lógica para Cadastro de Aluno (cadastro_aluno.html) ---
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('emailCadastro').value;
            const senha = document.getElementById('senhaCadastro').value;
            const confirmarSenha = document.getElementById('confirmarSenhaCadastro').value;

            hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

            if (!email.endsWith('@poli.upe.br')) { showMessage('mensagemErro', 'Por favor, utilize um e-mail institucional da POLI UPE.', 'error'); return; }
            if (senha !== confirmarSenha) { showMessage('mensagemErro', 'As senhas não coincidem.', 'error'); return; }

            showMessage('mensagemSucesso', 'Cadastro realizado com sucesso! Redirecionando para o login...');
            setTimeout(() => { navigateTo('index.html'); }, 2000);
        });
    }

    // --- Lógica para Recuperação de Senha (recuperar_senha.html) ---
    const recuperarSenhaForm = document.getElementById('recuperacaoSenhaForm');
    if (recuperarSenhaForm) {
        recuperarSenhaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('emailRecuperacao').value;

            hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

            if (!email.endsWith('@poli.upe.br')) { showMessage('mensagemErro', 'E-mail inválido. Utilize um e-mail institucional POLI UPE.', 'error'); return; }

            showMessage('mensagemSucesso', 'Instruções de recuperação enviadas para seu e-mail.');
            setTimeout(() => { navigateTo('index.html'); }, 3000);
        });
    }

    // --- Lógica para Submeter Proposta de TCC (tcc_submeter_proposta_aluno.html) ---
    const propostaTCCForm = document.getElementById('propostaTCCForm');
    if (propostaTCCForm) {
        propostaTCCForm.addEventListener('submit', function(event) {
            event.preventDefault();
            hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

            const titulo = document.getElementById('titulo').value;
            const resumo = document.getElementById('resumo').value;
            const objetivos = document.getElementById('objetivos').value;
            const metodologia = document.getElementById('metodologia').value;
            const palavrasChave = document.getElementById('palavrasChave').value;
            const orientadorSugeridoSelect = document.getElementById('orientadorSugerido');
            const orientadorSugeridoNome = orientadorSugeridoSelect.options[orientadorSugeridoSelect.selectedIndex].text;

            if (!titulo || !resumo || !objetivos || !metodologia || !palavrasChave || !orientadorSugeridoSelect.value) {
                showMessage('mensagemErro', 'Por favor, preencha todos os campos obrigatórios.', 'error'); return;
            }

            localStorage.setItem('tccStatus', 'proposta_pendente');

            const newProposal = {
                id: 'prop' + Date.now(), aluno: 'Aluno(a) Exemplo', titulo: titulo,
                resumo: resumo, objetivos: objetivos, metodologia: metodologia,
                palavrasChave: palavrasChave, orientadorSugerido: orientadorSugeridoNome,
                dataSubmissao: new Date().toISOString().split('T')[0], status: 'pendente_avaliacao_orientador',
                feedbackOrientador: '', decisaoOrientador: '', feedbackCoordenador: '',
                decisaoCoordenador: '', dataAprovacaoProposta: '', historico: []
            };
            propostasTCCOrientador.push(newProposal); savePropostasTCCOrientador();

            showMessage('mensagemSucesso', 'Proposta submetida com sucesso! Redirecionando...');
            setTimeout(() => { navigateTo('tcc_minhas_propostas_aluno.html'); }, 2000);
        });
    }

    // --- Lógica para Gerenciar TCC (tcc_minhas_propostas_aluno.html) ---
    const statusTCCDisplay = document.getElementById('statusTCCDisplay');
    const actionAreaTCC = document.getElementById('actionAreaTCC');

    if (statusTCCDisplay && actionAreaTCC) {
        if (tccStatus === 'sem_tcc') {
            statusTCCDisplay.innerHTML = `<p>Status: <strong>Sem TCC Iniciado</strong></p><p class="mensagem-info">Você ainda não iniciou o processo de TCC.</p><p class="mensagem-info">Para iniciar, você precisa estar matriculado na disciplina de TCC no Sig@.</p>`;
            actionAreaTCC.innerHTML = `<button id="btnIniciarTCC" class="btn-primario">Iniciar Processo de TCC</button>`;
            document.getElementById('btnIniciarTCC').addEventListener('click', function() { navigateTo('tcc_submeter_proposta_aluno.html'); });
        } else if (tccStatus === 'proposta_pendente') {
            statusTCCDisplay.innerHTML = `<p>Status: <strong style="color: orange;">Proposta Pendente de Avaliação</strong></p><p class="mensagem-info">Sua proposta de TCC está aguardando revisão do Orientador.</p><div style="border: 1px dashed #ccc; padding: 15px; margin-top: 20px; text-align: left;"><h3>Sua Proposta</h3><p>Título: <strong>${propostasTCCOrientador.find(p => p.aluno === 'Aluno(a) Exemplo').titulo || 'N/A'}</strong></p><p>Orientador Proposto: ${propostasTCCOrientador.find(p => p.aluno === 'Aluno(a) Exemplo').orientadorSugerido || 'N/A'}</p><p>Status: <strong style="color: orange;">Pendente</strong></p><p>Feedback do Orientador: <em style="color: #666;">Aguardando feedback.</em></p><button id="btnVerEditarProposta" class="btn-secundario">Ver Proposta</button></div>`;
            actionAreaTCC.innerHTML = '';
            document.getElementById('btnVerEditarProposta').addEventListener('click', function() { alert('Aqui você veria os detalhes da sua proposta, mas não pode editar ainda.'); });
        } else if (tccStatus === 'ajustes_solicitados') {
            const propostaAluno = propostasTCCOrientador.find(p => p.aluno === 'Aluno(a) Exemplo');
            statusTCCDisplay.innerHTML = `<p>Status: <strong style="color: red;">Ajustes Solicitados</strong></p><p class="mensagem-info">Sua proposta de TCC precisa de ajustes. Verifique o feedback abaixo.</p><div style="border: 1px dashed #ccc; padding: 15px; margin-top: 20px; text-align: left;"><h3>Sua Proposta</h3><p>Título: <strong>${propostaAluno.titulo || 'N/A'}</strong></p><p>Orientador Proposto: ${propostaAluno.orientadorSugerido || 'N/A'}</p><p>Feedback do Orientador: <em style="color: #666;">"${propostaAluno.feedbackOrientador || 'N/A'}"</em></p><p>Feedback do Coordenador: <em style="color: #666;">"${propostaAluno.feedbackCoordenador || 'N/A'}"</em></p><button id="btnVerEditarProposta" class="btn-secundario">Ver/Editar Proposta</button></div>`;
            actionAreaTCC.innerHTML = '';
            document.getElementById('btnVerEditarProposta').addEventListener('click', function() { navigateTo('tcc_submeter_proposta_aluno.html'); });
        } else if (tccStatus === 'reprovada') {
            const propostaAluno = propostasTCCOrientador.find(p => p.aluno === 'Aluno(a) Exemplo');
            statusTCCDisplay.innerHTML = `<p>Status: <strong style="color: #dc3545;">Proposta Reprovada</strong></p><p class="mensagem-info">Sua proposta de TCC foi reprovada. Por favor, entre em contato com a coordenação.</p><div style="border: 1px dashed #ccc; padding: 15px; margin-top: 20px; text-align: left;"><h3>Detalhes</h3><p>Título: <strong>${propostaAluno.titulo || 'N/A'}</strong></p><p>Feedback do Orientador: <em style="color: #666;">"${propostaAluno.feedbackOrientador || 'N/A'}"</em></p><p>Feedback do Coordenador: <em style="color: #666;">"${propostaAluno.feedbackCoordenador || 'N/A'}"</em></p></div>`;
            actionAreaTCC.innerHTML = '';
        } else if (tccStatus === 'proposta_aprovada') {
            const propostaAluno = propostasTCCOrientador.find(p => p.aluno === 'Aluno(a) Exemplo');
            statusTCCDisplay.innerHTML = `<p>Status: <strong style="color: green;">Proposta Aprovada!</strong></p><p class="mensagem-info">Seu TCC pode prosseguir.</p><div style="border: 1px dashed #ccc; padding: 15px; margin-top: 20px; text-align: left;"><h3>Seu TCC</h3><p>Título: <strong>${propostaAluno.titulo || 'N/A'}</strong></p><p>Orientador: ${propostaAluno.orientadorSugerido || 'N/A'}</p><p>Status: <strong style="color: green;">Em Andamento</strong></p><button id="btnUploadDocumento" class="btn-secundario">Fazer Upload de Documento</button><button id="btnAgendarDefesa" class="btn-secundario" style="background-color: #007bff;">Agendar Defesa</button></div>`;
            actionAreaTCC.innerHTML = '';
            document.getElementById('btnUploadDocumento').addEventListener('click', function() { alert('Funcionalidade de upload de documentos seria implementada aqui.'); });
            document.getElementById('btnAgendarDefesa').addEventListener('click', function() { navigateTo('tcc_agendar_defesa_aluno.html'); });
        }
    }


    // --- Lógica de Navegação para Botões/Links Genéricos ---
    const btnSair = document.querySelector('.btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function() {
            localStorage.clear();
            navigateTo('index.html');
        });
    }

    const btnVoltar = document.querySelectorAll('.btn-voltar');
    btnVoltar.forEach(button => {
        button.addEventListener('click', function() { if (!button.getAttribute('onclick')) { window.history.back(); } });
    });

    // Navegação do Dashboard do Aluno
    const btnGerenciarTCCAluno = document.getElementById('dashboard-aluno-tcc-link');
    if (btnGerenciarTCCAluno && window.location.pathname.includes('dashboard_aluno.html')) {
        btnGerenciarTCCAluno.addEventListener('click', function(event) { event.preventDefault(); navigateTo('tcc_minhas_propostas_aluno.html'); });
    }
    const btnBuscarVagasMonitoria = document.getElementById('dashboard-aluno-monitoria-vagas-link');
    if (btnBuscarVagasMonitoria && window.location.pathname.includes('dashboard_aluno.html')) {
        btnBuscarVagasMonitoria.addEventListener('click', function(event) { event.preventDefault(); navigateTo('monitoria_vagas_disponiveis_aluno.html'); });
    }
    const btnMinhasCandidaturasMonitoria = document.getElementById('dashboard-aluno-monitoria-candidaturas-link');
    if (btnMinhasCandidaturasMonitoria && window.location.pathname.includes('dashboard_aluno.html')) {
        btnMinhasCandidaturasMonitoria.addEventListener('click', function(event) { event.preventDefault(); navigateTo('monitoria_minhas_candidaturas_aluno.html'); });
    }
    const btnInscreverEstagio = document.getElementById('dashboard-aluno-estagio-inscrever-link');
    if (btnInscreverEstagio && window.location.pathname.includes('dashboard_aluno.html')) {
        btnInscreverEstagio.addEventListener('click', function(event) { event.preventDefault(); navigateTo('estagio_inscricao_aluno.html'); });
    }
    const btnMeusEstagios = document.getElementById('dashboard-aluno-estagio-meus-link');
    if (btnMeusEstagios && window.location.pathname.includes('dashboard_aluno.html')) {
        btnMeusEstagios.addEventListener('click', function(event) { event.preventDefault(); navigateTo('estagio_meus_estagios_aluno.html'); });
    }


    // Navegação do Dashboard do Orientador
    const btnAvaliarPropostasOrientador = document.getElementById('dashboard-orientador-tcc-propostas-link');
    if (btnAvaliarPropostasOrientador && window.location.pathname.includes('dashboard_orientador.html')) {
        btnAvaliarPropostasOrientador.addEventListener('click', function(event) { event.preventDefault(); navigateTo('tcc_avaliar_propostas_orientador.html'); });
    }
    const btnMeusTCCsOrientados = document.getElementById('dashboard-orientador-tcc-orientados-link');
    if (btnMeusTCCsOrientados && window.location.pathname.includes('dashboard_orientador.html')) {
        btnMeusTCCsOrientados.addEventListener('click', function(event) { event.preventDefault(); navigateTo('tcc_meus_tccs_orientados_orientador.html'); });
    }
    const btnCadastrarOfertaMonitoria = document.getElementById('dashboard-orientador-monitoria-cadastrar-link');
    if (btnCadastrarOfertaMonitoria && window.location.pathname.includes('dashboard_orientador.html')) {
        btnCadastrarOfertaMonitoria.addEventListener('click', function(event) { event.preventDefault(); navigateTo('monitoria_cadastrar_oferta_orientador.html'); });
    }
    const btnGerenciarMinhasOfertas = document.getElementById('dashboard-orientador-monitoria-gerenciar-link');
    if (btnGerenciarMinhasOfertas && window.location.pathname.includes('dashboard_orientador.html')) {
        btnGerenciarMinhasOfertas.addEventListener('click', function(event) { event.preventDefault(); navigateTo('monitoria_gerenciar_minhas_ofertas_orientador.html'); });
    }
    const btnGerenciarMonitores = document.getElementById('dashboard-orientador-monitores-link');
    if (btnGerenciarMonitores && window.location.pathname.includes('dashboard_orientador.html')) {
        btnGerenciarMonitores.addEventListener('click', function(event) { event.preventDefault(); navigateTo('monitoria_gerenciar_monitores_orientador.html'); });
    }
    const btnAvaliarRelatoriosEstagio = document.getElementById('dashboard-orientador-estagio-relatorios-link'); // NOVO ID
    if (btnAvaliarRelatoriosEstagio && window.location.pathname.includes('dashboard_orientador.html')) {
        btnAvaliarRelatoriosEstagio.addEventListener('click', function(event) { event.preventDefault(); navigateTo('estagio_avaliar_relatorios_orientador.html'); });
    }


    // Navegação do Dashboard do Coordenador
    const btnValidarPropostasCoordenador = document.getElementById('dashboard-coordenador-tcc-validar-link');
    if (btnValidarPropostasCoordenador && window.location.pathname.includes('dashboard_coordenador.html')) {
        btnValidarPropostasCoordenador.addEventListener('click', function(event) { event.preventDefault(); navigateTo('tcc_validar_propostas_coordenador.html'); });
    }
    const btnValidarTermosEstagio = document.getElementById('dashboard-coordenador-estagio-validar-link');
    if (btnValidarTermosEstagio && window.location.pathname.includes('dashboard_coordenador.html')) {
        btnValidarTermosEstagio.addEventListener('click', function(event) { event.preventDefault(); navigateTo('estagio_validar_termos_coordenador.html'); });
    }


    // --- Lógica para TCC - Avaliar Propostas (Orientador) ---
    const listaPropostasTCC = document.getElementById('listaPropostasTCC');
    if (listaPropostasTCC) {
        listaPropostasTCC.innerHTML = '';
        const propostasPendentesOrientador = propostasTCCOrientador.filter(p => p.status === 'pendente_avaliacao_orientador' && p.orientadorSugerido === 'Dr. João Silva');
        if (propostasPendentesOrientador.length === 0) { listaPropostasTCC.innerHTML = '<tr><td colspan="5">Nenhuma proposta de TCC pendente de avaliação.</td></tr>'; }
        else {
            propostasPendentesOrientador.forEach(proposta => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${proposta.aluno}</td><td>${proposta.titulo}</td><td>${formatDate(proposta.dataSubmissao)}</td><td><span style="color: orange;">Pendente</span></td><td><a href="#" class="btn-table-action" data-proposta-id="${proposta.id}">Avaliar</a></td>`;
                listaPropostasTCC.appendChild(row);
            });
            listaPropostasTCC.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); const propostaId = this.dataset.propostaId;
                    localStorage.setItem('currentPropostaId', propostaId); navigateTo('tcc_detalhes_avaliacao_proposta_orientador.html');
                });
            });
        }
    }

    // --- Lógica para TCC - Detalhes/Avaliação da Proposta (Orientador) ---
    const propostaDetalhesDiv = document.getElementById('propostaDetalhes');
    const avaliacaoPropostaForm = document.getElementById('avaliacaoPropostaForm');
    if (propostaDetalhesDiv && avaliacaoPropostaForm) {
        const currentPropostaId = localStorage.getItem('currentPropostaId');
        const proposta = propostasTCCOrientador.find(p => p.id === currentPropostaId);
        if (proposta) {
            document.getElementById('propostaAluno').textContent = proposta.aluno;
            document.getElementById('propostaTitulo').textContent = proposta.titulo;
            document.getElementById('propostaResumo').textContent = proposta.resumo;
            document.getElementById('propostaObjetivos').textContent = proposta.objetivos;
            document.getElementById('propostaMetodologia').textContent = proposta.metodologia;
            document.getElementById('propostaPalavrasChave').textContent = proposta.palavrasChave;
            document.getElementById('propostaOrientadorSugerido').textContent = proposta.orientadorSugerido;
            document.getElementById('feedbackOrientador').value = proposta.feedbackOrientador;
            if (proposta.decisaoOrientador) { const radio = document.querySelector(`input[name="decisao"][value="${proposta.decisaoOrientador}"]`); if (radio) radio.checked = true; }

            avaliacaoPropostaForm.addEventListener('submit', function(event) {
                event.preventDefault(); hideMessage('mensagemSucesso'); hideMessage('mensagemErro');
                const feedback = document.getElementById('feedbackOrientador').value;
                const decisao = document.querySelector('input[name="decisao"]:checked');
                if (!decisao) { showMessage('mensagemErro', 'Por favor, selecione uma decisão para a proposta.', 'error'); return; }

                proposta.feedbackOrientador = feedback; proposta.decisaoOrientador = decisao.value;
                if (decisao.value === 'aprovada') { proposta.status = 'aprovada_orientador'; }
                else if (decisao.value === 'ajustes_solicitados') { proposta.status = 'ajustes_solicitados_orientador'; }
                else { proposta.status = 'reprovada_orientador'; }
                savePropostasTCCOrientador(); showMessage('mensagemSucesso', 'Avaliação registrada com sucesso! Redirecionando...');
                setTimeout(() => { navigateTo('tcc_avaliar_propostas_orientador.html'); }, 2000);
            });
        } else { propostaDetalhesDiv.innerHTML = '<p class="mensagem-erro">Proposta não encontrada.</p>'; avaliacaoPropostaForm.style.display = 'none'; }
    }

    // --- Lógica para TCC - Validar Propostas (Coordenador) ---
    const listaPropostasTCCCoordenador = document.getElementById('listaPropostasTCCCoordenador');
    if (listaPropostasTCCCoordenador) {
        listaPropostasTCCCoordenador.innerHTML = '';
        const propostasPendentesCoordenador = propostasTCCOrientador.filter(p => p.status === 'aprovada_orientador' || p.status === 'ajustes_solicitados_orientador' || p.status === 'reprovada_orientador');
        if (propostasPendentesCoordenador.length === 0) { listaPropostasTCCCoordenador.innerHTML = '<tr><td colspan="5">Nenhuma proposta de TCC pendente de validação.</td></tr>'; }
        else {
            propostasPendentesCoordenador.forEach(proposta => {
                const row = document.createElement('tr'); let statusCor = ''; let statusTexto = '';
                switch (proposta.decisaoOrientador) {
                    case 'aprovada': statusCor = 'green'; statusTexto = 'Aprovada'; break;
                    case 'reprovada': statusCor = 'red'; statusTexto = 'Reprovada'; break;
                    case 'ajustes_solicitados': statusCor = 'orange'; statusTexto = 'Ajustes Solicitados'; break;
                    default: statusCor = 'gray'; statusTexto = 'N/A';
                }
                row.innerHTML = `<td>${proposta.aluno}</td><td>${proposta.titulo}</td><td>${proposta.orientadorSugerido}</td><td><span style="color: ${statusCor};">${statusTexto}</span></td><td><a href="#" class="btn-table-action" data-proposta-id="${proposta.id}">Validar/Ver Detalhes</a></td>`;
                listaPropostasTCCCoordenador.appendChild(row);
            });
            listaPropostasTCCCoordenador.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); const propostaId = this.dataset.propostaId;
                    localStorage.setItem('currentPropostaIdCoordenador', propostaId); navigateTo('tcc_detalhes_validacao_proposta_coordenador.html');
                });
            });
        }
    }

    // --- Lógica para TCC - Detalhes/Validação da Proposta (Coordenador) ---
    const propostaDetalhesCoordenadorDiv = document.getElementById('propostaDetalhesCoordenador');
    const validacaoCoordenadorForm = document.getElementById('validacaoCoordenadorForm');
    if (propostaDetalhesCoordenadorDiv && validacaoCoordenadorForm) {
        const currentPropostaId = localStorage.getItem('currentPropostaIdCoordenador');
        const proposta = propostasTCCOrientador.find(p => p.id === currentPropostaId);
        if (proposta) {
            document.getElementById('coordPropostaAluno').textContent = proposta.aluno;
            document.getElementById('coordPropostaTitulo').textContent = proposta.titulo;
            document.getElementById('coordPropostaResumo').textContent = proposta.resumo;
            document.getElementById('coordPropostaOrientador').textContent = proposta.orientadorSugerido;
            document.getElementById('coordFeedbackOrientador').textContent = proposta.feedbackOrientador || 'Nenhum feedback.';
            document.getElementById('coordDecisaoOrientador').textContent = proposta.decisaoOrientador ? capitalizeFirstLetter(proposta.decisaoOrientador.replace(/_/g, ' ')) : 'N/A';
            document.getElementById('feedbackCoordenador').value = proposta.feedbackCoordenador;
            if (proposta.decisaoCoordenador) { const radio = document.querySelector(`input[name="decisaoFinal"][value="${proposta.decisaoCoordenador}"]`); if (radio) radio.checked = true; }

            validacaoCoordenadorForm.addEventListener('submit', function(event) {
                event.preventDefault(); hideMessage('mensagemSucesso'); hideMessage('mensagemErro');
                const feedback = document.getElementById('feedbackCoordenador').value;
                const decisao = document.querySelector('input[name="decisaoFinal"]:checked');
                if (!decisao) { showMessage('mensagemErro', 'Por favor, selecione uma decisão final para a proposta.', 'error'); return; }

                proposta.feedbackCoordenador = feedback; proposta.decisaoCoordenador = decisao.value;
                proposta.status = decisao.value;
                if (decisao.value === 'aprovada_coordenador' && !proposta.dataAprovacaoProposta) {
                    proposta.dataAprovacaoProposta = new Date().toISOString().split('T')[0];
                    proposta.historico.push({ data: new Date().toISOString().split('T')[0], tipo: 'Status', descricao: 'Proposta aprovada pelo Coordenador.', status: 'proposta_aprovada' });
                }
                savePropostasTCCOrientador();

                if (proposta.aluno === 'Aluno(a) Exemplo') {
                    if (decisao.value === 'aprovada_coordenador') { localStorage.setItem('tccStatus', 'proposta_aprovada'); }
                    else if (decisao.value === 'ajustes_coordenador') { localStorage.setItem('tccStatus', 'ajustes_solicitados'); }
                    else if (decisao.value === 'reprovada_coordenador') { localStorage.setItem('tccStatus', 'reprovada'); }
                }
                showMessage('mensagemSucesso', 'Validação registrada com sucesso! Redirecionando...');
                setTimeout(() => { navigateTo('tcc_validar_propostas_coordenador.html'); }, 2000);
            });
        } else { propostaDetalhesCoordenadorDiv.innerHTML = '<p class="mensagem-erro">Proposta não encontrada para validação.</p>'; validacaoCoordenadorForm.style.display = 'none'; }
    }

    // --- Lógica para TCC - Meus TCCs Orientados (Orientador) ---
    const listaTCCsOrientados = document.getElementById('listaTCCsOrientados');
    if (listaTCCsOrientados) {
        listaTCCsOrientados.innerHTML = '';
        const tccsOrientados = propostasTCCOrientador.filter(p =>
            p.orientadorSugerido === 'Dr. João Silva' &&
            (p.status === 'aprovada_coordenador' || p.status === 'em_andamento' || p.status === 'revisao_final' || p.status === 'apto_defesa' || p.status.startsWith('finalizado'))
        );
        if (tccsOrientados.length === 0) { listaTCCsOrientados.innerHTML = '<tr><td colspan="5">Nenhum TCC orientado para acompanhar.</td></tr>'; }
        else {
            tccsOrientados.forEach(tcc => {
                const row = document.createElement('tr'); let statusCor = ''; let statusTexto = '';
                switch (tcc.status) {
                    case 'aprovada_coordenador': case 'em_andamento': statusCor = 'green'; statusTexto = 'Em Andamento'; break;
                    case 'revisao_final': statusCor = 'blue'; statusTexto = 'Revisão Final'; break;
                    case 'apto_defesa': statusCor = 'purple'; statusTexto = 'Apto para Defesa'; break;
                    case 'finalizado_aprovado': statusCor = 'darkgreen'; statusTexto = 'Finalizado (Aprovado)'; break;
                    case 'finalizado_reprovado': statusCor = 'darkred'; statusTexto = 'Finalizado (Reprovado)'; break;
                    default: statusCor = 'gray'; statusTexto = capitalizeFirstLetter(tcc.status.replace(/_/g, ' '));
                }
                row.innerHTML = `<td>${tcc.aluno}</td><td>${tcc.titulo}</td><td><span style="color: ${statusCor};">${statusTexto}</span></td><td>${tcc.historico.length > 0 ? formatDate(tcc.historico[tcc.historico.length - 1].data) : 'N/A'}</td><td><a href="#" class="btn-table-action" data-tcc-id="${tcc.id}">Acompanhar</a></td>`;
                listaTCCsOrientados.appendChild(row);
            });
            listaTCCsOrientados.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); const tccId = this.dataset.tccId;
                    localStorage.setItem('currentTccOrientadoId', tccId); navigateTo('tcc_acompanhamento_tcc_orientador.html');
                });
            });
        }
    }

    // --- Lógica para TCC - Acompanhamento do TCC (Orientador) ---
    const tccAcompanhamentoDetalhes = document.getElementById('tccAcompanhamentoDetalhes');
    const historicoInteracoes = document.getElementById('historicoInteracoes');
    const acompanhamentoForm = document.getElementById('acompanhamentoForm');
    const btnEnviarFeedback = document.getElementById('btnEnviarFeedback');
    const btnMudarStatusTCC = document.getElementById('btnMudarStatusTCC');

    if (tccAcompanhamentoDetalhes && historicoInteracoes) {
        const currentTccId = localStorage.getItem('currentTccOrientadoId');
        const tcc = propostasTCCOrientador.find(p => p.id === currentTccId);

        if (tcc) {
            document.getElementById('acompanhamentoAluno').textContent = tcc.aluno;
            document.getElementById('acompanhamentoTitulo').textContent = tcc.titulo;
            document.getElementById('acompanhamentoStatus').textContent = capitalizeFirstLetter(tcc.status.replace(/_/g, ' '));
            document.getElementById('acompanhamentoDataAprovacao').textContent = tcc.dataAprovacaoProposta || 'N/A';

            historicoInteracoes.innerHTML = '';
            if (tcc.historico && tcc.historico.length > 0) {
                tcc.historico.sort((a, b) => new Date(a.data) - new Date(b.data));
                tcc.historico.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${formatDate(item.data)}</td><td>${item.tipo}</td><td>${item.descricao}</td><td>${item.documento ? `<a href="#" onclick="alert('Download do documento: ${item.documento}')">${item.documento}</a>` : 'N/A'}</td>`;
                    historicoInteracoes.appendChild(row);
                });
            } else { historicoInteracoes.innerHTML = '<tr><td colspan="4">Nenhum registro de interação ainda.</td></tr>'; }

            btnEnviarFeedback.addEventListener('click', function() {
                const feedbackText = document.getElementById('feedbackAluno').value;
                if (feedbackText.trim() === '') { showMessage('mensagemFeedbackErro', 'O feedback não pode estar vazio.', 'error'); return; }
                tcc.historico.push({ data: new Date().toISOString().split('T')[0], tipo: 'Feedback', descricao: 'Feedback do Orientador.', feedback: feedbackText });
                savePropostasTCCOrientador(); document.getElementById('feedbackAluno').value = '';
                showMessage('mensagemFeedbackSucesso', 'Feedback enviado e registrado!');
                navigateTo('tcc_acompanhamento_tcc_orientador.html');
            });

            btnMudarStatusTCC.addEventListener('click', function() {
                const novoStatus = document.getElementById('novoStatusTCC').value;
                if (novoStatus === '') { showMessage('mensagemStatusErro', 'Por favor, selecione um novo status.', 'error'); return; }

                tcc.status = novoStatus;
                tcc.historico.push({ data: new Date().toISOString().split('T')[0], tipo: 'Status', descricao: `Status alterado para ${capitalizeFirstLetter(novoStatus.replace(/_/g, ' '))}.`, status: novoStatus });
                savePropostasTCCOrientador(); showMessage('mensagemStatusSucesso', 'Status atualizado com sucesso!');
                if (tcc.aluno === 'Aluno(a) Exemplo' && (novoStatus === 'finalizado_aprovado' || novoStatus === 'finalizado_reprovado')) {
                     localStorage.setItem('tccStatus', novoStatus === 'finalizado_aprovado' ? 'finalizado_aprovado' : 'reprovada');
                } else if (tcc.aluno === 'Aluno(a) Exemplo' && novoStatus === 'apto_defesa') {
                    localStorage.setItem('tccStatus', 'proposta_aprovada');
                }
                navigateTo('tcc_acompanhamento_tcc_orientador.html');
            });

        } else { tccAcompanhamentoDetalhes.innerHTML = '<p class="mensagem-erro">TCC não encontrado para acompanhamento.</p>'; historicoInteracoes.innerHTML = ''; acompanhamentoForm.style.display = 'none'; }
    }


    // --- Lógica para Monitoria - Vagas Disponíveis (Aluno) ---
    const listaVagasMonitoria = document.getElementById('listaVagasMonitoria');
    if (listaVagasMonitoria) {
        listaVagasMonitoria.innerHTML = '';
        const vagasAtivas = vagasMonitoria.filter(vaga => vaga.status === 'ativa');
        if (vagasAtivas.length === 0) { listaVagasMonitoria.innerHTML = '<tr><td colspan="6">Nenhuma vaga de monitoria disponível no momento.</td></tr>'; }
        else {
            vagasAtivas.forEach(vaga => {
                const row = document.createElement('tr');
                const periodoTexto = `${formatDate(vaga.periodoInscricaoInicio)} - ${formatDate(vaga.periodoInscricaoFim)}`;
                const statusInscricao = isPeriodoInscricaoAberto(vaga.periodoInscricaoInicio, vaga.periodoInscricaoFim) ? '<span style="color: green;">Inscrições Abertas</span>' : '<span style="color: red;">Inscrições Encerradas</span>';
                const podeCandidatar = isPeriodoInscricaoAberto(vaga.periodoInscricaoInicio, vaga.periodoInscricaoFim) ?
                                      `<a href="#" class="btn-table-action" data-vaga-id="${vaga.id}" data-action="candidatar">Candidatar-se</a>` : 'N/A';
                
                row.innerHTML = `
                    <td>${vaga.disciplina}</td>
                    <td>${vaga.orientador}</td>
                    <td>${vaga.vagasOferecidas}</td>
                    <td>${periodoTexto}</td>
                    <td>${statusInscricao}</td>
                    <td>
                        <a href="#" class="btn-table-action" data-vaga-id="${vaga.id}" data-action="ver_detalhes" style="margin-right: 5px;">Ver Detalhes</a>
                        ${podeCandidatar}
                    </td>
                `;
                listaVagasMonitoria.appendChild(row);
            });

            listaVagasMonitoria.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const vagaId = this.dataset.vagaId;
                    const action = this.dataset.action;
                    localStorage.setItem('currentMonitoriaVagaId', vagaId);
                    if (action === 'ver_detalhes') {
                        navigateTo('monitoria_detalhes_vaga_candidatura_aluno.html');
                    } else if (action === 'candidatar') {
                        const alunoCandidatou = candidaturasMonitoria.some(c => c.aluno === 'Aluno(a) Exemplo' && c.vagaId === vagaId);
                        if (alunoCandidatou) {
                            alert('Você já se candidatou a esta vaga.');
                            navigateTo('monitoria_minhas_candidaturas_aluno.html');
                        } else {
                             navigateTo('monitoria_formulario_candidatura_aluno.html');
                        }
                    }
                });
            });
        }
    }

    // --- Lógica para Monitoria - Detalhes da Vaga e Candidatura (Aluno) ---
    const detalhesVagaMonitoria = document.getElementById('detalhesVagaMonitoria');
    const areaCandidatura = document.getElementById('areaCandidatura');
    const mensagemCandidaturaInfo = document.getElementById('mensagemCandidaturaInfo');

    if (detalhesVagaMonitoria && areaCandidatura) {
        const currentVagaId = localStorage.getItem('currentMonitoriaVagaId');
        const vaga = vagasMonitoria.find(v => v.id === currentVagaId);

        if (vaga) {
            document.getElementById('vagaDisciplina').textContent = vaga.disciplina;
            document.getElementById('vagaOrientador').textContent = vaga.orientador;
            document.getElementById('vagaVagasOferecidas').textContent = vaga.vagasOferecidas;
            document.getElementById('vagaHorarios').textContent = vaga.horarios;
            document.getElementById('vagaRequisitos').textContent = vaga.requisitos;
            document.getElementById('vagaPeriodoInscricao').textContent = `${formatDate(vaga.periodoInscricaoInicio)} - ${formatDate(vaga.periodoInscricaoFim)}`;

            const alunoCandidatou = candidaturasMonitoria.some(c => c.aluno === 'Aluno(a) Exemplo' && c.vagaId === vaga.id);
            const periodoAberto = isPeriodoInscricaoAberto(vaga.periodoInscricaoInicio, vaga.periodoInscricaoFim);

            if (alunoCandidatou) {
                mensagemCandidaturaInfo.textContent = 'Você já se candidatou a esta vaga.';
                mensagemCandidaturaInfo.style.display = 'block';
                areaCandidatura.innerHTML = '';
            } else if (!periodoAberto) {
                mensagemCandidaturaInfo.textContent = 'O período de inscrição para esta vaga está encerrado.';
                mensagemCandidaturaInfo.style.display = 'block';
                areaCandidatura.innerHTML = '';
            } else {
                areaCandidatura.innerHTML = `<button id="btnCandidatarVaga" class="btn-primario">Candidatar-se a esta Vaga</button>`;
                document.getElementById('btnCandidatarVaga').addEventListener('click', function() {
                    navigateTo('monitoria_formulario_candidatura_aluno.html');
                });
            }

        } else {
            detalhesVagaMonitoria.innerHTML = '<p class="mensagem-erro">Vaga de monitoria não encontrada.</p>';
            areaCandidatura.style.display = 'none';
        }
    }

    // --- Lógica para Monitoria - Formulário de Candidatura (Aluno) ---
    const formCandidaturaMonitoria = document.getElementById('formCandidaturaMonitoria');
    if (formCandidaturaMonitoria) {
        const currentVagaId = localStorage.getItem('currentMonitoriaVagaId');
        const vaga = vagasMonitoria.find(v => v.id === currentVagaId);

        if (vaga) {
            document.getElementById('formCandidaturaDisciplina').textContent = vaga.disciplina;
            document.getElementById('formCandidaturaOrientador').textContent = vaga.orientador;
        } else {
            document.getElementById('infoVagaCandidatura').innerHTML = '<p class="mensagem-erro">Vaga não encontrada para candidatura.</p>';
            formCandidaturaMonitoria.style.display = 'none';
        }

        formCandidaturaMonitoria.addEventListener('submit', function(event) {
            event.preventDefault();
            hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

            const historicoEscolar = document.getElementById('historicoEscolar');
            const cartaIntencoes = document.getElementById('cartaIntencoes');
            const disponibilidadeHorarios = document.getElementById('disponibilidadeHorarios').value;
            const observacoesAdicionais = document.getElementById('observacoesAdicionais').value;

            if (!historicoEscolar.files.length) { showMessage('mensagemErro', 'Por favor, anexe seu Histórico Escolar.', 'error'); return; }
            if (disponibilidadeHorarios.trim() === '') { showMessage('mensagemErro', 'Por favor, informe sua disponibilidade de horários.', 'error'); return; }

            const newCandidatura = {
                id: 'cand' + Date.now(), aluno: 'Aluno(a) Exemplo', vagaId: vaga.id,
                disciplina: vaga.disciplina, orientador: vaga.orientador,
                dataCandidatura: new Date().toISOString().split('T')[0],
                historicoEscolar: historicoEscolar.files[0] ? historicoEscolar.files[0].name : 'N/A',
                cartaIntencoes: cartaIntencoes.files[0] ? cartaIntencoes.files[0].name : 'N/A',
                disponibilidadeHorarios: disponibilidadeHorarios,
                observacoesAdicionais: observacoesAdicionais,
                status: 'pendente_avaliacao', feedback: '',
                notaDesempenho: null, comentariosDesempenho: '', recomendacaoFutura: null
            };
            candidaturasMonitoria.push(newCandidatura);
            saveCandidaturasMonitoria();

            showMessage('mensagemSucesso', 'Candidatura enviada com sucesso! Redirecionando...');
            setTimeout(() => { navigateTo('monitoria_minhas_candidaturas_aluno.html'); }, 2000);
        });
    }

    // --- Lógica para Monitoria - Minhas Candidaturas (Aluno) ---
    const listaMinhasCandidaturas = document.getElementById('listaMinhasCandidaturas');
    if (listaMinhasCandidaturas) {
        listaMinhasCandidaturas.innerHTML = '';
        const minhasCandidaturas = candidaturasMonitoria.filter(c => c.aluno === 'Aluno(a) Exemplo');

        if (minhasCandidaturas.length === 0) { listaMinhasCandidaturas.innerHTML = '<tr><td colspan="6">Você ainda não possui candidaturas de monitoria.</td></tr>'; }
        else {
            minhasCandidaturas.forEach(candidatura => {
                const row = document.createElement('tr');
                let statusCor = ''; let statusTexto = '';
                switch (candidatura.status) {
                    case 'pendente_avaliacao': statusCor = 'orange'; statusTexto = 'Pendente de Avaliação'; break;
                    case 'aprovado': statusCor = 'green'; statusTexto = 'Aprovado (Monitor)'; break;
                    case 'reprovado': statusCor = 'red'; statusTexto = 'Reprovado'; break;
                    case 'finalizado_avaliado': statusCor = 'blue'; statusTexto = 'Finalizado e Avaliado'; break;
                    default: statusCor = 'gray'; statusTexto = capitalizeFirstLetter(candidatura.status.replace(/_/g, ' '));
                }

                row.innerHTML = `
                    <td>${candidatura.disciplina}</td>
                    <td>${candidatura.orientador}</td>
                    <td>${formatDate(candidatura.dataCandidatura)}</td>
                    <td><span style="color: ${statusCor};">${statusTexto}</span></td>
                    <td><em style="color: #666;">${candidatura.feedback || 'N/A'}</em></td>
                    <td>
                        <a href="#" class="btn-table-action" data-candidatura-id="${candidatura.id}" data-action="ver_detalhes_candidatura">Ver Detalhes</a>
                    </td>
                `;
                listaMinhasCandidaturas.appendChild(row);
            });
            listaMinhasCandidaturas.querySelectorAll('.btn-table-action[data-action="ver_detalhes_candidatura"]').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const candidaturaId = this.dataset.candidaturaId;
                    alert('Funcionalidade de ver detalhes da candidatura seria implementada aqui para o Aluno.');
                });
            });
        }
    }


    // --- Lógica para Monitoria - Gerenciar Monitores (Orientador) ---
    const listaMeusMonitores = document.getElementById('listaMeusMonitores');
    if (listaMeusMonitores) {
        listaMeusMonitores.innerHTML = '';
        const meusMonitores = candidaturasMonitoria.filter(c => 
            c.orientador === 'Dr. João Silva' &&
            c.status === 'aprovado'
        );

        if (meusMonitores.length === 0) { listaMeusMonitores.innerHTML = '<tr><td colspan="5">Você ainda não tem monitores ativos.</td></tr>'; }
        else {
            meusMonitores.forEach(monitor => {
                const row = document.createElement('tr');
                const periodoMonitoria = monitor.periodoMonitoriaInicio && monitor.periodoMonitoriaFim ? 
                                         `${formatDate(monitor.periodoMonitoriaInicio)} - ${formatDate(monitor.periodoMonitoriaFim)}` : 'N/A';
                const statusMonitoria = monitor.notaDesempenho !== null ? 'Avaliado' : 'Ativo';
                const statusMonitoriaCor = monitor.notaDesempenho !== null ? 'blue' : 'green';

                row.innerHTML = `
                    <td>${monitor.aluno}</td>
                    <td>${monitor.disciplina}</td>
                    <td>${periodoMonitoria}</td>
                    <td><span style="color: ${statusMonitoriaCor};">${statusMonitoria}</span></td>
                    <td>
                        <a href="#" class="btn-table-action" data-monitor-id="${monitor.id}" data-action="avaliar_desempenho">Avaliar Desempenho</a>
                        <a href="#" class="btn-table-action" data-monitor-id="${monitor.id}" data-action="ver_detalhes_monitor" style="margin-left: 5px; background-color: #6c757d;">Ver Detalhes</a>
                    </td>
                `;
                listaMeusMonitores.appendChild(row);
            });

            listaMeusMonitores.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const monitorId = this.dataset.monitorId;
                    const action = this.dataset.action;
                    localStorage.setItem('currentMonitorId', monitorId);

                    if (action === 'avaliar_desempenho') {
                        navigateTo('monitoria_avaliacao_desempenho_orientador.html');
                    } else if (action === 'ver_detalhes_monitor') {
                        alert('Funcionalidade de ver detalhes e acompanhar atividades do monitor seria implementada aqui.');
                    }
                });
            });
        }
    }

    // --- Lógica para Monitoria - Avaliação de Desempenho (Orientador) ---
    const infoMonitorAvaliacao = document.getElementById('infoMonitorAvaliacao');
    const formAvaliacaoDesempenho = document.getElementById('formAvaliacaoDesempenho');

    if (infoMonitorAvaliacao && formAvaliacaoDesempenho) {
        const currentMonitorId = localStorage.getItem('currentMonitorId');
        const monitor = candidaturasMonitoria.find(c => c.id === currentMonitorId);

        if (monitor) {
            document.getElementById('monitorNome').textContent = monitor.aluno;
            document.getElementById('monitorDisciplina').textContent = monitor.disciplina;
            document.getElementById('monitorPeriodo').textContent = monitor.periodoMonitoriaInicio && monitor.periodoMonitoriaFim ? 
                                                                    `${formatDate(monitor.periodoMonitoriaInicio)} - ${formatDate(monitor.periodoMonitoriaFim)}` : 'N/A';

            document.getElementById('notaDesempenho').value = monitor.notaDesempenho !== null ? monitor.notaDesempenho : '';
            document.getElementById('comentariosFinais').value = monitor.comentariosDesempenho;
            if (monitor.recomendacaoFutura !== null) {
                const radio = document.querySelector(`input[name="recomendacao"][value="${monitor.recomendacaoFutura}"]`);
                if (radio) radio.checked = true;
            }

            formAvaliacaoDesempenho.addEventListener('submit', function(event) {
                event.preventDefault();
                hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

                const nota = parseFloat(document.getElementById('notaDesempenho').value);
                const comentarios = document.getElementById('comentariosFinais').value;
                const recomendacao = document.querySelector('input[name="recomendacao"]:checked');

                if (isNaN(nota) || nota < 0 || nota > 10) { showMessage('mensagemErro', 'Por favor, insira uma nota válida (0-10).', 'error'); return; }
                if (comentarios.trim() === '') { showMessage('mensagemErro', 'Por favor, adicione comentários sobre o desempenho.', 'error'); return; }
                if (!recomendacao) { showMessage('mensagemErro', 'Por favor, selecione se recomenda para futuras monitorias.', 'error'); return; }

                monitor.notaDesempenho = nota;
                monitor.comentariosDesempenho = comentarios;
                monitor.recomendacaoFutura = recomendacao.value;
                monitor.status = 'finalizado_avaliado';
                saveCandidaturasMonitoria();

                showMessage('mensagemSucesso', 'Avaliação registrada com sucesso! Redirecionando...');
                setTimeout(() => { navigateTo('monitoria_gerenciar_monitores_orientador.html'); }, 2000);
            });

        } else {
            infoMonitorAvaliacao.innerHTML = '<p class="mensagem-erro">Monitor não encontrado para avaliação.</p>';
            formAvaliacaoDesempenho.style.display = 'none';
        }
    }

    // --- Lógica para Estágio - Validação de Termos (Coordenador) ---
    const listaTermosEstagioCoordenador = document.getElementById('listaTermosEstagioCoordenador');
    if (listaTermosEstagioCoordenador) {
        listaTermosEstagioCoordenador.innerHTML = '';

        const termosPendentes = estagios.filter(e => e.status === 'termo_pendente_validacao');

        if (termosPendentes.length === 0) {
            listaTermosEstagioCoordenador.innerHTML = '<tr><td colspan="5">Nenhum Termo de Estágio pendente de validação.</td></tr>';
        } else {
            termosPendentes.forEach(estagio => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${estagio.aluno}</td>
                    <td>${estagio.nomeEmpresa}</td>
                    <td>${formatDate(estagio.periodoInicioEstagio)} - ${formatDate(estagio.periodoFimEstagio)}</td>
                    <td>${estagio.dataEnvioTermo ? formatDate(estagio.dataEnvioTermo) : 'N/A'}</td>
                    <td><a href="#" class="btn-table-action" data-estagio-id="${estagio.id}">Validar/Ver Detalhes</a></td>
                `;
                listaTermosEstagioCoordenador.appendChild(row);
            });

            listaTermosEstagioCoordenador.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const estagioId = this.dataset.estagioId;
                    localStorage.setItem('currentEstagioValidacaoId', estagioId);
                    navigateTo('estagio_detalhes_validacao_termo_coordenador.html');
                });
            });
        }
    }

    // --- Lógica para Estágio - Detalhes/Validação do Termo (Coordenador) ---
    const termoEstagioDetalhes = document.getElementById('termoEstagioDetalhes');
    const formValidacaoTermo = document.getElementById('formValidacaoTermo');

    if (termoEstagioDetalhes && formValidacaoTermo) {
        const currentEstagioId = localStorage.getItem('currentEstagioValidacaoId');
        const estagio = estagios.find(e => e.id === currentEstagioId);

        if (estagio) {
            document.getElementById('termoAluno').textContent = estagio.aluno;
            document.getElementById('termoEmpresa').textContent = estagio.nomeEmpresa;
            document.getElementById('termoSupervisor').textContent = estagio.supervisorEmpresa;
            document.getElementById('termoPeriodo').textContent = `${formatDate(estagio.periodoInicioEstagio)} - ${formatDate(estagio.periodoFimEstagio)}`;
            document.getElementById('termoCargaHoraria').textContent = estagio.cargaHorariaSemanal;
            document.getElementById('termoDescricaoAtividades').textContent = estagio.descricaoAtividades;
            
            const linkTermo = document.getElementById('linkTermoCompromisso');
            linkTermo.textContent = estagio.termoCompromisso || 'N/A';
            linkTermo.href = '#';
            if (!estagio.termoCompromisso) linkTermo.style.display = 'none';

            document.getElementById('feedbackCoordenadorTermo').value = estagio.feedbackCoordenadorTermo || '';
            if (estagio.decisaoCoordenadorTermo) {
                const radio = document.querySelector(`input[name="decisaoTermo"][value="${estagio.decisaoCoordenadorTermo}"]`);
                if (radio) radio.checked = true;
            }

            formValidacaoTermo.addEventListener('submit', function(event) {
                event.preventDefault();
                hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

                const feedback = document.getElementById('feedbackCoordenadorTermo').value;
                const decisao = document.querySelector('input[name="decisaoTermo"]:checked');

                if (!decisao) {
                    showMessage('mensagemErro', 'Por favor, selecione uma decisão para o Termo.', 'error');
                    return;
                }

                estagio.feedbackCoordenadorTermo = feedback;
                estagio.decisaoCoordenadorTermo = decisao.value;

                let newStatus = estagio.status;
                let historicoDescricao = '';
                let historicoStatus = '';

                if (decisao.value === 'aprovado') {
                    newStatus = 'ativo';
                    historicoDescricao = 'Termo de Compromisso aprovado pelo Coordenador.';
                    historicoStatus = 'ativo';
                } else if (decisao.value === 'solicitar_correcoes') {
                    newStatus = 'formulario_preenchido';
                    historicoDescricao = 'Termo de Compromisso: Correções solicitadas pelo Coordenador.';
                    historicoStatus = 'solicitar_correcoes_termo';
                } else if (decisao.value === 'reprovado') {
                    newStatus = 'reprovado';
                    historicoDescricao = 'Termo de Compromisso reprovado pelo Coordenador. Estágio cancelado.';
                    historicoStatus = 'reprovado_termo';
                }
                estagio.status = newStatus;
                estagio.historico.push({ data: new Date().toISOString().split('T')[0], tipo: 'Validação', descricao: historicoDescricao, feedback: feedback, status: historicoStatus });
                
                saveEstagios();

                showMessage('mensagemSucesso', 'Validação do Termo registrada com sucesso! Redirecionando...', 'success');
                setTimeout(() => { navigateTo('estagio_validar_termos_coordenador.html'); }, 2000);
            });

        } else {
            termoEstagioDetalhes.innerHTML = '<p class="mensagem-erro">Estágio não encontrado para validação do termo.</p>';
            formValidacaoTermo.style.display = 'none';
        }
    }

    // --- Lógica para Estágio - Avaliar Relatórios (Orientador) ---
    const listaRelatoriosEstagioOrientador = document.getElementById('listaRelatoriosEstagioOrientador');
    if (listaRelatoriosEstagioOrientador) {
        listaRelatoriosEstagioOrientador.innerHTML = '';

        // Filtra estágios com relatório pendente de avaliação
        // Para este protótipo, o Orientador avalia qualquer estágio. Em um sistema real, seria filtrado por orientador associado.
        const relatoriosPendentes = estagios.filter(e => e.status === 'relatorio_pendente_avaliacao');

        if (relatoriosPendentes.length === 0) {
            listaRelatoriosEstagioOrientador.innerHTML = '<tr><td colspan="5">Nenhum Relatório de Estágio pendente de avaliação.</td></tr>';
        } else {
            relatoriosPendentes.forEach(estagio => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${estagio.aluno}</td>
                    <td>${estagio.nomeEmpresa}</td>
                    <td>${formatDate(estagio.periodoInicioEstagio)} - ${formatDate(estagio.periodoFimEstagio)}</td>
                    <td>${estagio.dataEnvioRelatorio ? formatDate(estagio.dataEnvioRelatorio) : 'N/A'}</td>
                    <td><a href="#" class="btn-table-action" data-estagio-id="${estagio.id}">Avaliar</a></td>
                `;
                listaRelatoriosEstagioOrientador.appendChild(row);
            });

            listaRelatoriosEstagioOrientador.querySelectorAll('.btn-table-action').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const estagioId = this.dataset.estagioId;
                    localStorage.setItem('currentEstagioRelatorioId', estagioId); // ID para a avaliação do relatório
                    navigateTo('estagio_detalhes_avaliacao_relatorio_orientador.html');
                });
            });
        }
    }

    // --- Lógica para Estágio - Detalhes/Avaliação do Relatório (Orientador) ---
    const relatorioEstagioDetalhes = document.getElementById('relatorioEstagioDetalhes');
    const formAvaliacaoRelatorio = document.getElementById('formAvaliacaoRelatorio');

    if (relatorioEstagioDetalhes && formAvaliacaoRelatorio) {
        const currentEstagioId = localStorage.getItem('currentEstagioRelatorioId');
        const estagio = estagios.find(e => e.id === currentEstagioId);

        if (estagio) {
            document.getElementById('relatorioAluno').textContent = estagio.aluno;
            document.getElementById('relatorioEmpresa').textContent = estagio.nomeEmpresa;
            document.getElementById('relatorioPeriodo').textContent = `${formatDate(estagio.periodoInicioEstagio)} - ${formatDate(estagio.periodoFimEstagio)}`;
            
            const linkRelatorio = document.getElementById('linkRelatorioFinal');
            linkRelatorio.textContent = estagio.relatorioFinal || 'N/A';
            linkRelatorio.href = '#'; // Link dummy
            if (!estagio.relatorioFinal) linkRelatorio.style.display = 'none';

            document.getElementById('notaFinal').value = estagio.notaFinalOrientador !== null ? estagio.notaFinalOrientador : '';
            document.getElementById('feedbackOrientadorRelatorio').value = estagio.feedbackOrientadorRelatorio || '';
            if (estagio.status === 'concluido' || estagio.status === 'reprovado') { // Se já avaliado
                const radio = document.querySelector(`input[name="decisaoRelatorio"][value="${estagio.status === 'concluido' ? 'aprovado' : 'reprovado'}"]`);
                if (radio) radio.checked = true;
            }

            formAvaliacaoRelatorio.addEventListener('submit', function(event) {
                event.preventDefault();
                hideMessage('mensagemSucesso'); hideMessage('mensagemErro');

                const nota = parseFloat(document.getElementById('notaFinal').value);
                const feedback = document.getElementById('feedbackOrientadorRelatorio').value;
                const decisao = document.querySelector('input[name="decisaoRelatorio"]:checked');

                if (isNaN(nota) || nota < 0 || nota > 10) { showMessage('mensagemErro', 'Por favor, insira uma nota válida (0-10).', 'error'); return; }
                if (feedback.trim() === '') { showMessage('mensagemErro', 'Por favor, adicione comentários/parecer final.', 'error'); return; }
                if (!decisao) { showMessage('mensagemErro', 'Por favor, selecione uma decisão para o estágio.', 'error'); return; }

                estagio.notaFinalOrientador = nota;
                estagio.feedbackOrientadorRelatorio = feedback;
                
                let newStatus = estagio.status;
                let historicoDescricao = '';
                let historicoStatus = '';

                if (decisao.value === 'aprovado') {
                    newStatus = 'concluido';
                    historicoDescricao = 'Estágio APROVADO após avaliação do Relatório Final.';
                    historicoStatus = 'concluido';
                } else if (decisao.value === 'reprovado') {
                    newStatus = 'reprovado';
                    historicoDescricao = 'Estágio REPROVADO após avaliação do Relatório Final.';
                    historicoStatus = 'reprovado';
                }
                estagio.status = newStatus;
                estagio.historico.push({ data: new Date().toISOString().split('T')[0], tipo: 'Avaliação', descricao: historicoDescricao, feedback: `Nota: ${nota}, Feedback: ${feedback}`, status: historicoStatus });

                saveEstagios();

                showMessage('mensagemSucesso', 'Avaliação do Relatório Final registrada com sucesso! Redirecionando...', 'success');
                setTimeout(() => { navigateTo('estagio_avaliar_relatorios_orientador.html'); }, 2000);
            });

        } else {
            relatorioEstagioDetalhes.innerHTML = '<p class="mensagem-erro">Relatório de estágio não encontrado.</p>';
            formAvaliacaoRelatorio.style.display = 'none';
        }
    }
});