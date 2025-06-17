document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMessage = document.getElementById('errorMessage');
        const registerLink = document.getElementById('registerLink');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;

            errorMessage.textContent = '';

            // Credenciais de teste
            if (email === 'alu@poli.br' && password === '123') {
                localStorage.setItem('userProfile', 'aluno');
                window.location.href = 'dashboard.html';
            } else if (email === 'ori@poli.br' && password === '123') {
                localStorage.setItem('userProfile', 'orientador');
                window.location.href = 'dashboard.html';
            } else if (email === 'coord@poli.br' && password === '123') {
                localStorage.setItem('userProfile', 'coordenador');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'E-mail ou senha incorretos. Por favor, tente novamente.';
            }
        });

        registerLink.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Funcionalidade de Cadastro: Em um sistema real, aqui você seria direcionado para um formulário de registro.');
        });

        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Funcionalidade de Recuperação de Senha: Em um sistema real, aqui você iniciaria o processo de recuperação de senha.');
        });
    }


    if (document.querySelector('.dashboard-container')) {
        const userProfile = localStorage.getItem('userProfile');
        const sidebarMenu = document.getElementById('sidebarMenu');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const dashboardContent = document.getElementById('dashboardContent');
        const logoutButton = document.getElementById('logoutButton');

        if (!userProfile) {
        
            window.location.href = 'index.html';
            return;
        }

        // Função para carregar conteúdo dinamicamente
        const loadContent = (contentHtml, title) => {
            dashboardContent.innerHTML = contentHtml;
            welcomeMessage.textContent = title;
            // Remove a classe 'active' de todos os links e adiciona ao clicado
            document.querySelectorAll('#sidebarMenu a').forEach(link => {
                link.classList.remove('active');
            });
            // Encontra o link 
            const activeLink = document.querySelector(`[data-content="${title}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        };


        // Conteúdos das seções para cada perfil
        const contents = {
            aluno: {
                menu: `
                    <li><a href="#" data-content="Meus TCCs" id="linkMeusTCCs">Meus TCCs</a></li>
                    <li><a href="#" data-content="Minhas Monitorias" id="linkMinhasMonitorias">Minhas Monitorias</a></li>
                    <li><a href="#" data-content="Meus Estágios" id="linkMeusEstagios">Meus Estágios</a></li>
                    <li><a href="#" data-content="Configurações" id="linkConfiguracoes">Configurações</a></li>
                `,
                defaultContent: `
                    <h3>Visão Geral do Aluno</h3>
                    <p>Aqui você pode gerenciar suas atividades de TCC, Monitoria e Estágio.</p>
                `,
                'Meus TCCs': `
                    <h3>Meus Trabalhos de Conclusão de Curso</h3>
                    <div class="content-section">
                        <h4>Submeter Proposta de TCC [UC008]</h4>
                        <form id="formSubmeterTCC">
                            <div class="form-group">
                                <label for="tccTitle">Título da Proposta:</label>
                                <input type="text" id="tccTitle" required>
                            </div>
                            <div class="form-group">
                                <label for="tccAbstract">Resumo:</label>
                                <textarea id="tccAbstract" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="tccAdvisor">Orientador:</label>
                                <select id="tccAdvisor" required>
                                    <option value="">Selecione um Orientador</option>
                                    <option value="Prof. João Silva">Prof. João Silva</option>
                                    <option value="Prof. Maria Souza">Prof. Maria Souza</option>
                                </select>
                            </div>
                            <div class="form-actions">
                                <button type="submit">Enviar Proposta</button>
                            </div>
                        </form>
                    </div>
                    <div class="content-section">
                        <h4>Minhas Propostas Submetidas</h4>
                        <table id="tccProposalsTable">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Orientador</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Análise de Dados com IA</td>
                                    <td>Prof. João Silva</td>
                                    <td data-status="Pendente">Pendente</td>
                                    <td><button class="view-proposal-btn" data-id="1">Visualizar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Minhas Monitorias': `
                    <h3>Minhas Monitorias</h3>
                    <div class="content-section">
                        <h4>Solicitar Monitoria [UC018]</h4>
                        <form id="formSolicitarMonitoria">
                            <div class="form-group">
                                <label for="monitoriaDiscipline">Disciplina:</label>
                                <select id="monitoriaDiscipline" required>
                                    <option value="">Selecione a Disciplina</option>
                                    <option value="Algoritmos e Estruturas de Dados">Algoritmos e Estruturas de Dados</option>
                                    <option value="Programação Web">Programação Web</option>
                                </select>
                            </div>
                            <div class="form-actions">
                                <button type="submit">Solicitar Monitoria</button>
                            </div>
                        </form>
                    </div>
                    <div class="content-section">
                        <h4>Minhas Solicitações de Monitoria</h4>
                        <table id="monitoriaRequestsTable">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Redes de Computadores</td>
                                    <td data-status="Em Avaliação">Em Avaliação</td>
                                    <td><button class="view-monitoria-btn" data-id="1">Visualizar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Meus Estágios': `
                    <h3>Meus Estágios</h3>
                    <div class="content-section">
                        <h4>Inscrição para Estágio [UC027]</h4>
                        <form id="formInscricaoEstagio">
                            <div class="form-group">
                                <label for="estagioCompany">Empresa:</label>
                                <input type="text" id="estagioCompany" required>
                            </div>
                            <div class="form-group">
                                <label for="estagioArea">Área do Estágio:</label>
                                <input type="text" id="estagioArea" required>
                            </div>
                            <div class="form-group">
                                <label for="estagioPeriod">Período (Ex: 01/01/2025 - 30/06/2025):</label>
                                <input type="text" id="estagioPeriod" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit">Inscrever-se para Estágio</button>
                            </div>
                        </form>
                    </div>
                    <div class="content-section">
                        <h4>Meus Estágios Atuais/Anteriores</h4>
                        <table id="estagioTable">
                            <thead>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Área</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tech Solutions Ltda.</td>
                                    <td>Desenvolvimento Web</td>
                                    <td data-status="Em Andamento">Em Andamento</td>
                                    <td><button class="view-estagio-btn" data-id="1">Visualizar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Configurações': `
                    <h3>Gerenciar Configurações de Conta [UC005]</h3>
                    <p>Aqui o aluno pode alterar suas informações de perfil.</p>
                    <form id="formConfiguracoesAluno">
                        <div class="form-group">
                            <label for="alunoNome">Nome Completo:</label>
                            <input type="text" id="alunoNome" value="Aluno de Teste" required>
                        </div>
                        <div class="form-group">
                            <label for="alunoEmail">E-mail:</label>
                            <input type="email" id="alunoEmail" value="alu@poli.br" required>
                        </div>
                        <div class="form-group">
                            <label for="alunoSenha">Nova Senha:</label>
                            <input type="password" id="alunoSenha">
                            <small>Deixe em branco para não alterar.</small>
                        </div>
                        <div class="form-actions">
                            <button type="submit">Salvar Configurações</button>
                        </div>
                    </form>
                `
            },
            orientador: {
                menu: `
                    <li><a href="#" data-content="TCCs para Avaliar" id="linkTCCsAvaliar">TCCs para Avaliar</a></li>
                    <li><a href="#" data-content="Gerenciar Monitorias" id="linkGerenciarMonitorias">Gerenciar Monitorias</a></li>
                    <li><a href="#" data-content="Avaliar Estágios" id="linkAvaliarEstagios">Avaliar Estágios</a></li>
                    <li><a href="#" data-content="Minhas Vagas" id="linkMinhasVagas">Minhas Vagas</a></li>
                    <li><a href="#" data-content="Configurações" id="linkConfiguracoes">Configurações</a></li>
                `,
                defaultContent: `
                    <h3>Visão Geral do Orientador</h3>
                    <p>Gerencie TCCs, monitorias e estágios sob sua responsabilidade.</p>
                `,
                'TCCs para Avaliar': `
                    <h3>Propostas de TCC Pendentes de Revisão [UC009]</h3>
                    <div class="content-section">
                        <h4>Propostas Recebidas</h4>
                        <table id="tccPropostasOrientadorTable">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Aluno</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sistema de Vendas Online</td>
                                    <td>João da Silva</td>
                                    <td data-status="Pendente de Revisão">Pendente de Revisão</td>
                                    <td><button class="review-tcc-proposal-btn" data-id="1">Revisar</button></td>
                                </tr>
                                <tr>
                                    <td>Blockchain para Segurança</td>
                                    <td>Maria Oliveira</td>
                                    <td data-status="Pendente de Revisão">Pendente de Revisão</td>
                                    <td><button class="review-tcc-proposal-btn" data-id="2">Revisar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Gerenciar Monitorias': `
                    <h3>Gerenciar Ofertas e Solicitações de Monitoria [UC020], [UC019]</h3>
                    <div class="content-section">
                        <h4>Cadastrar Nova Oferta de Monitoria</h4>
                        <form id="formCadastrarMonitoriaOferta">
                            <div class="form-group">
                                <label for="ofertaDisciplina">Disciplina:</label>
                                <input type="text" id="ofertaDisciplina" required>
                            </div>
                            <div class="form-group">
                                <label for="ofertaVagas">Número de Vagas:</label>
                                <input type="number" id="ofertaVagas" min="1" required>
                            </div>
                            <div class="form-group">
                                <label for="ofertaRequisitos">Requisitos (opcional):</label>
                                <textarea id="ofertaRequisitos"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit">Cadastrar Oferta</button>
                            </div>
                        </form>
                    </div>
                    <div class="content-section">
                        <h4>Solicitações de Monitoria Pendentes</h4>
                        <table id="monitoriaSolicitacoesOrientadorTable">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Aluno</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Programação Orientada a Objetos</td>
                                    <td>Pedro Aluno</td>
                                    <td data-status="Em Avaliação">Em Avaliação</td>
                                    <td><button class="approve-monitoria-btn" data-id="1">Aprovar/Rejeitar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Avaliar Estágios': `
                    <h3>Avaliação de Relatórios de Estágio [UC032], [UC034]</h3>
                    <div class="content-section">
                        <h4>Relatórios Pendentes de Avaliação</h4>
                        <table id="estagioRelatoriosOrientadorTable">
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Empresa</th>
                                    <th>Tipo de Relatório</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ana Paula</td>
                                    <td>Software Hub</td>
                                    <td>Parcial</td>
                                    <td data-status="Pendente">Pendente</td>
                                    <td><button class="evaluate-estagio-report-btn" data-id="1">Avaliar</button></td>
                                </tr>
                                <tr>
                                    <td>Carlos Eduardo</td>
                                    <td>Innovation Lab</td>
                                    <td>Final</td>
                                    <td data-status="Pendente">Pendente</td>
                                    <td><button class="evaluate-estagio-report-btn" data-id="2">Avaliar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Minhas Vagas': `
                    <h3>Minhas Vagas (Estágio/Monitoria) Publicadas [RF015]</h3>
                    <div class="content-section">
                        <h4>Vagas de Estágio Publicadas</h4>
                        <table id="vagasEstagioPublicadas">
                            <thead>
                                <tr>
                                    <th>Título da Vaga</th>
                                    <th>Empresa</th>
                                    <th>Status</th>
                                    <th>Candidatos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Desenvolvedor Backend Junior</td>
                                    <td>ABC Tech</td>
                                    <td data-status="Aberta">Aberta</td>
                                    <td><button class="view-candidates-btn" data-id="1">Ver 5 candidatos</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="content-section">
                        <h4>Ofertas de Monitoria Publicadas</h4>
                        <table id="ofertasMonitoriaPublicadas">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Vagas</th>
                                    <th>Status</th>
                                    <th>Inscritos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cálculo I</td>
                                    <td>2</td>
                                    <td data-status="Aberta">Aberta</td>
                                    <td><button class="view-applicants-btn" data-id="1">Ver 3 inscritos</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Configurações': `
                    <h3>Gerenciar Configurações de Conta [UC005]</h3>
                    <p>Aqui o Orientador pode alterar suas informações de perfil.</p>
                    <form id="formConfiguracoesOrientador">
                        <div class="form-group">
                            <label for="orientadorNome">Nome Completo:</label>
                            <input type="text" id="orientadorNome" value="Orientador Teste" required>
                        </div>
                        <div class="form-group">
                            <label for="orientadorEmail">E-mail:</label>
                            <input type="email" id="orientadorEmail" value="ori@poli.br" required>
                        </div>
                        <div class="form-group">
                            <label for="orientadorSenha">Nova Senha:</label>
                            <input type="password" id="orientadorSenha">
                            <small>Deixe em branco para não alterar.</small>
                        </div>
                        <div class="form-actions">
                            <button type="submit">Salvar Configurações</button>
                        </div>
                    </form>
                `
            },
            coordenador: {
                menu: `
                    <li><a href="#" data-content="Validar TCCs" id="linkValidarTCCs">Validar TCCs</a></li>
                    <li><a href="#" data-content="Validar Estágios" id="linkValidarEstagios">Validar Estágios</a></li>
                    <li><a href="#" data-content="Gerenciar Ciclos" id="linkGerenciarCiclos">Gerenciar Ciclos Acadêmicos</a></li>
                    <li><a href="#" data-content="Relatórios Gerais" id="linkRelatoriosGerais">Relatórios Gerais</a></li>
                    <li><a href="#" data-content="Configurações" id="linkConfiguracoes">Configurações</a></li>
                `,
                defaultContent: `
                    <h3>Visão Geral do Coordenador</h3>
                    <p>Acesse e gerencie aprovações e relatórios do sistema.</p>
                `,
                'Validar TCCs': `
                    <h3>Validação de Propostas de TCC [UC010]</h3>
                    <div class="content-section">
                        <h4>Propostas Aguardando Validação</h4>
                        <table id="tccValidacaoCoordenadorTable">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Aluno</th>
                                    <th>Orientador</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Criptografia Quântica</td>
                                    <td>Ana Beatriz</td>
                                    <td>Prof. Maria Souza</td>
                                    <td data-status="Aguardando Validação">Aguardando Validação</td>
                                    <td><button class="validate-tcc-proposal-btn" data-id="1">Validar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Validar Estágios': `
                    <h3>Validação de Termos de Compromisso de Estágio [UC030]</h3>
                    <div class="content-section">
                        <h4>Termos de Compromisso Pendentes</h4>
                        <table id="termosEstagioCoordenadorTable">
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Empresa</th>
                                    <th>Data de Submissão</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Fernando Costa</td>
                                    <td>Inova TI</td>
                                    <td>10/06/2025</td>
                                    <td data-status="Pendente de Validação">Pendente de Validação</td>
                                    <td><button class="validate-term-btn" data-id="1">Validar Termo</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
                'Gerenciar Ciclos': `
                    <h3>Gerenciar Ciclos Acadêmicos [RF009]</h3>
                    <p>Aqui o coordenador pode configurar prazos e etapas para TCC, Monitoria e Estágio.</p>
                    <div class="content-section">
                        <h4>Configuração de Prazos</h4>
                        <form id="formGerenciarCiclos">
                            <div class="form-group">
                                <label for="cicloTCC">Prazo Final Submissão TCC:</label>
                                <input type="date" id="cicloTCC" value="2025-12-15" required>
                            </div>
                            <div class="form-group">
                                <label for="cicloMonitoria">Período Inscrição Monitoria:</label>
                                <input type="text" id="cicloMonitoria" value="01/08/2025 - 30/08/2025" required>
                            </div>
                            <div class="form-group">
                                <label for="cicloEstagio">Período Avaliação Estágio:</label>
                                <input type="text" id="cicloEstagio" value="01/12/2025 - 31/12/2025" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit">Salvar Prazos</button>
                            </div>
                        </form>
                    </div>
                `,
                'Relatórios Gerais': `
                    <h3>Relatórios Gerenciais do Sistema [RF018], [UC025]</h3>
                    <p>Gere relatórios sobre TCCs, Monitorias e Estágios para análise.</p>
                    <div class="content-section">
                        <h4>Relatório de Status de TCCs</h4>
                        <p>Total de TCCs: 150 | Aprovados: 100 | Pendentes: 30 | Reprovados: 20</p>
                        <button>Gerar Relatório Detalhado de TCCs</button>
                    </div>
                    <div class="content-section">
                        <h4>Relatório de Atividades de Monitoria</h4>
                        <p>Monitores Ativos: 45 | Relatórios Submetidos Mês: 90</p>
                        <button>Gerar Relatório por Disciplina</button>
                        <button>Gerar Relatório por Monitor</button>
                    </div>
                    <div class="content-section">
                        <h4>Relatório de Estágios Concluídos</h4>
                        <p>Estágios Finalizados: 80 | Termos de Compromisso Validados: 75</p>
                        <button>Gerar Relatório de Estágios</button>
                    </div>
                `,
                'Configurações': `
                    <h3>Gerenciar Configurações de Conta [UC005]</h3>
                    <p>Aqui o Coordenador pode alterar suas informações de perfil e configurações gerais do sistema.</p>
                    <form id="formConfiguracoesCoordenador">
                        <div class="form-group">
                            <label for="coordenadorNome">Nome Completo:</label>
                            <input type="text" id="coordenadorNome" value="Coordenador Geral" required>
                        </div>
                        <div class="form-group">
                            <label for="coordenadorEmail">E-mail:</label>
                            <input type="email" id="coordenadorEmail" value="coord@poli.br" required>
                        </div>
                        <div class="form-group">
                            <label for="coordenadorSenha">Nova Senha:</label>
                            <input type="password" id="coordenadorSenha">
                            <small>Deixe em branco para não alterar.</small>
                        </div>
                        <div class="form-actions">
                            <button type="submit">Salvar Configurações</button>
                        </div>
                    </form>
                `
            }
        };

        // Renderiza o menu e conteúdo inicial de acordo com o perfil
        if (contents[userProfile]) {
            sidebarMenu.innerHTML = contents[userProfile].menu;
            loadContent(contents[userProfile].defaultContent, `Bem-vindo, ${userProfile.charAt(0).toUpperCase() + userProfile.slice(1)}!`);

            sidebarMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const contentKey = link.getAttribute('data-content');
                    if (contents[userProfile][contentKey]) {
                        loadContent(contents[userProfile][contentKey], contentKey);
                        
                    } else {
                        dashboardContent.innerHTML = `<p>Conteúdo para "${contentKey}" não disponível para o perfil ${userProfile}.</p>`;
                        welcomeMessage.textContent = contentKey;
                    }
                });
            });

            
            dashboardContent.addEventListener('submit', (event) => {
                event.preventDefault();

                if (event.target.id === 'formSubmeterTCC') {
                    const title = document.getElementById('tccTitle').value;
                    const abstract = document.getElementById('tccAbstract').value;
                    const advisor = document.getElementById('tccAdvisor').value;

                
                    if (!title || !abstract || !advisor) {
                        alert('Por favor, preencha todos os campos obrigatórios para a proposta de TCC.');
                        return;
                    }

                    // Simula o envio
                    const tableBody = document.querySelector('#tccProposalsTable tbody');
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${title}</td>
                        <td>${advisor}</td>
                        <td data-status="Pendente">Pendente</td>
                        <td><button class="view-proposal-btn">Visualizar</button></td>
                    `;
                    tableBody.appendChild(newRow);
                    alert(`Proposta de TCC "${title}" submetida com sucesso para o Orientador ${advisor}! [UC008]`);
                    event.target.reset(); 

                    newRow.querySelector('.view-proposal-btn').addEventListener('click', () => {
                        alert(`Visualizando detalhes da proposta: "${title}"`);
                    });

                } else if (event.target.id === 'formSolicitarMonitoria') {
                    const discipline = document.getElementById('monitoriaDiscipline').value;
                    if (!discipline) {
                        alert('Por favor, selecione uma disciplina para solicitar monitoria.');
                        return;
                    }
                    const tableBody = document.querySelector('#monitoriaRequestsTable tbody');
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${discipline}</td>
                        <td data-status="Em Avaliação">Em Avaliação</td>
                        <td><button class="view-monitoria-btn">Visualizar</button></td>
                    `;
                    tableBody.appendChild(newRow);
                    alert(`Solicitação de Monitoria para "${discipline}" enviada com sucesso! [UC018]`);
                    event.target.reset();

                } else if (event.target.id === 'formInscricaoEstagio') {
                    const company = document.getElementById('estagioCompany').value;
                    const area = document.getElementById('estagioArea').value;
                    const period = document.getElementById('estagioPeriod').value;
                    if (!company || !area || !period) {
                        alert('Por favor, preencha todos os campos para a inscrição de estágio.');
                        return;
                    }
                    const tableBody = document.querySelector('#estagioTable tbody');
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${company}</td>
                        <td>${area}</td>
                        <td data-status="Aguardando Aprovação">Aguardando Aprovação</td>
                        <td><button class="view-estagio-btn">Visualizar</button></td>
                    `;
                    tableBody.appendChild(newRow);
                    alert(`Inscrição para estágio na empresa "${company}" enviada com sucesso! [UC027]`);
                    event.target.reset();

                } else if (event.target.id === 'formCadastrarMonitoriaOferta') {
                    const disciplina = document.getElementById('ofertaDisciplina').value;
                    const vagas = document.getElementById('ofertaVagas').value;
                    if (!disciplina || !vagas) {
                        alert('Por favor, preencha a disciplina e o número de vagas.');
                        return;
                    }
                    // Simula a adição da oferta
                    const tableBody = document.querySelector('#ofertasMonitoriaPublicadas tbody'); 
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${disciplina}</td>
                        <td>${vagas}</td>
                        <td data-status="Aberta">Aberta</td>
                        <td><button class="view-applicants-btn">Ver 0 inscritos</button></td>
                    `;
                    if (tableBody) { 
                         tableBody.appendChild(newRow);
                    }
                    alert(`Oferta de Monitoria para "${disciplina}" cadastrada com sucesso! [UC020]`);
                    event.target.reset();

                } else if (event.target.id === 'formGerenciarCiclos') {
                    
                    alert('Prazos de ciclos acadêmicos salvos com sucesso! [RF009]');
                } else if (event.target.id === 'formConfiguracoesAluno' || event.target.id === 'formConfiguracoesOrientador' || event.target.id === 'formConfiguracoesCoordenador') {
                    alert('Configurações salvas com sucesso! [UC005]');
                }
            });


            
            dashboardContent.addEventListener('click', (event) => {
                if (event.target.classList.contains('review-tcc-proposal-btn')) {
                    const proposalId = event.target.dataset.id;
                    const proposalTitle = event.target.closest('tr').querySelector('td:first-child').textContent;
                    const currentStatusCell = event.target.closest('tr').querySelector('td[data-status]');

                    const feedback = prompt(`Revisar Proposta "${proposalTitle}". Digite seu feedback:`);
                    if (feedback !== null) { 
                        const action = confirm(`Aprovar a proposta "${proposalTitle}"? (Cancelar para Reprovar)`);
                        if (action) {
                            currentStatusCell.textContent = 'Aprovada';
                            currentStatusCell.style.color = 'green';
                            alert(`Proposta "${proposalTitle}" APROVADA! Feedback: "${feedback}" [UC009]`);
                        } else {
                            currentStatusCell.textContent = 'Reprovada (Ajustes Solicitados)';
                            currentStatusCell.style.color = 'orange';
                            alert(`Proposta "${proposalTitle}" REPROVADA. Feedback: "${feedback}" [UC009]`);
                        }
                    }
                } else if (event.target.classList.contains('approve-monitoria-btn')) {
                    const requestId = event.target.dataset.id;
                    const discipline = event.target.closest('tr').querySelector('td:first-child').textContent;
                    const currentStatusCell = event.target.closest('tr').querySelector('td[data-status]');

                    const action = confirm(`Aprovar a solicitação de monitoria para "${discipline}"? (Cancelar para Rejeitar)`);
                    if (action) {
                        currentStatusCell.textContent = 'Aprovada';
                        currentStatusCell.style.color = 'green';
                        alert(`Solicitação de monitoria para "${discipline}" APROVADA! [UC019]`);
                    } else {
                        currentStatusCell.textContent = 'Rejeitada';
                        currentStatusCell.style.color = 'red';
                        alert(`Solicitação de monitoria para "${discipline}" REJEITADA! [UC019]`);
                    }
                } else if (event.target.classList.contains('validate-tcc-proposal-btn')) {
                    const proposalId = event.target.dataset.id;
                    const proposalTitle = event.target.closest('tr').querySelector('td:first-child').textContent;
                    const currentStatusCell = event.target.closest('tr').querySelector('td[data-status]');

                    const action = confirm(`Validar a proposta de TCC "${proposalTitle}"? (Cancelar para Solicitar Ajustes)`);
                    if (action) {
                        currentStatusCell.textContent = 'Validada';
                        currentStatusCell.style.color = 'green';
                        alert(`Proposta "${proposalTitle}" VALIDADA pelo Coordenador! [UC010]`);
                    } else {
                        currentStatusCell.textContent = 'Ajustes Solicitados';
                        currentStatusCell.style.color = 'orange';
                        alert(`Coordenador solicitou ajustes para a proposta "${proposalTitle}"! [UC010]`);
                    }
                } else if (event.target.classList.contains('validate-term-btn')) {
                    const termId = event.target.dataset.id;
                    const alunoNome = event.target.closest('tr').querySelector('td:first-child').textContent;
                    const currentStatusCell = event.target.closest('tr').querySelector('td[data-status]');

                    const action = confirm(`Validar o Termo de Compromisso do aluno "${alunoNome}"? (Cancelar para Solicitar Correção)`);
                    if (action) {
                        currentStatusCell.textContent = 'Validado';
                        currentStatusCell.style.color = 'green';
                        alert(`Termo de Compromisso do aluno "${alunoNome}" VALIDADO! [UC030]`);
                    } else {
                        currentStatusCell.textContent = 'Correção Solicitada';
                        currentStatusCell.style.color = 'orange';
                        alert(`Coordenador solicitou correção do Termo de Compromisso do aluno "${alunoNome}"! [UC030]`);
                    }
                }
            });

        } else {
            welcomeMessage.textContent = 'Perfil não reconhecido.';
            dashboardContent.innerHTML = '<p>Ocorreu um erro. Por favor, faça login novamente.</p>';
            sidebarMenu.innerHTML = ''; 
        }

        
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('userProfile'); 
            alert('Você foi desconectado.');
            window.location.href = 'index.html'; 
        });
    }
});
