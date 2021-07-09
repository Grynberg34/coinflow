Trabalho realizado na Disciplina de Projeto Integrado de Aplicações da Pós-Graduação em Desenvolvimento Web Full Stack (PUC MINAS - 2020/2021), sob a coordenação do professor Renato Martins.

A aplicação está sendo desenvolvida em Node.js com uso de database MYSQL e extensão de linguagem SASS para CSS 3.0.

---- CONFIGURAÇÕES DA DATABASE ----

DB_HOST=coinflow.mysql.uhserver.com
DB_USER=adminf3
DB_PASS=meritmoney3@
DB_NAME=coinflow

---- CONTA PARA TESTE DE INTERFACE DE ADMINISTRADOR DE EMPRESA ----

email: franciscogrynberg34@gmail.com
senha: 12345678

código da empresa para cadastro de funcionários (presente na rota de listagem de funcionários do menu de admin):

6f7e5a9d-503b-4291-a7aa-2aa64c5d4460

---- CONTA PARA TESTE DE INTERFACE DE FUNCIONÁRIO DE EMPRESA----

email: franciscogb_34@yahoo.com.br
senha: 12345678

---- TESTES UNITÁRIOS -----

Para a realização de testes unitários, basta inserir a configuração da database própria para testes no arquivo .env. Essa database têm a mesma estrutura de dados da database oficial da aplicação. 

DB_HOST=coinflow-testes.mysql.uhserver.com
DB_USER=adminf6
DB_PASS=meritmoney6@
DB_NAME=coinflow_testes

Comando para testes: npm test

TESTES INCLUÍDOS

- Testes de cadastro de empresa
- Testes de cadastro de funcionário
- Testes de login de empresa
- Testes de login de funcionário

TESTES PLANEJADOS

- Testes de redefinição de senha para admin de empresa
- Testes de redefinição de senha para funcionário de empresa
- Testes de envio de saldo mensal para funcionários de empresa (conta admin de empresa)
- Testes de envio de saldo individual para funcionário (conta admin de empresa)
- Testes de edição de valor mensal para funcionários (conta admin de empresa)
- Testes de exclusão de funcionários cadastrados (conta admin de empresa)
- Testes de cadastro de recompensas (conta admin de empresa)
- Testes de edição de estoque de recompensas (conta admin de empresa)
- Testes de exclusão de recompensas cadastradas (conta admin de empresa)
- Testes de envio de saldo para outro funcionário (conta funcionário)
- Testes de resgate de recompensa (conta funcionário)


---- PROPOSTA -----

A proposta da aplicação é fornecer para empresas e seus funcionários uma ferramenta de merit money (moeda de mérito digital), de maneira que o bom trabalho de cada funcionário possa ser recompensado pelos seus próprios colegas. A cada mês é adicionado um saldo de saída (outflow) na moeda digital f$ para cada funcionário, de maneira que ele possa transferir valores em f$ para outros funcionários. Ao acumular saldo de entrada (flowin) em f$ o funcionário pode trocar valores acumulados de flowin por recompensas.

Existem dois tipos de usuários na aplicação, o administrador de conta de uma empresa e o funcionário da empresa.

O administrador tem acesso ao código único da empresa, utilizado para autorizar o cadastro de uma conta de funcionário vinculada àquela empresa, libera o saldo mensal para cada funcionário, pode cadastrar e editar recompensas a serem disponibilizadas e tem acesso a todas as transferências e resgates de recompensas realizadas por funcionários cadastrados.

O funcionário tem acesso ao seu saldo disponível de entrada (flowin) e saída (outflow), tem acesso às transferências realizadas entre funcionários de sua empresa, pode visualizar as recompensas disponíveis e realizar o resgate de uma recompensa caso tenha saldo suficiente para isso. 


---- SPRINTS -----

SPRINT 1 - JANEIRO DE 2021:

1. Implementação da estrutura da aplicação em Node.js e da database MYSQL.
2. Criação de tabelas de usuários na database (tabelas para contas de empresas e contas de funcionários).
3. Criação de rotas index, login, cadastro, recuperação de senha, sobre, contato e tela (provisória) com acesso autenticado de administrador de conta da empresa e funcionário.
4. Aplicação da identidade visual com logotipo, fonte, paleta de cores e animações CSS com uso da extensão SASS.

SPRINT 2 - FEVEREIRO DE 2021:

1. Implementação de interface do menu inicial de admin de empresa
2. Implementação de funcionalidade de listagem de funcionários cadastrados de uma empresa (admin de empresa)
3. Implementação de funcionalidade de deletar funcionários cadastrados (admin de empresa)
4. Implementação de funcionalidade de liberação de saldo mensal para funcionários (editar valores, envio mensal, envio individual e histórico de envios)

SPRINT 3 - MARÇO DE 2021

1. Implementação de interface do menu de recompensas para admin de empresa
2. Implementação de funcionalidade de adicionar recompensas (com nome, preço, imagem, estoque)
3. Implementação de funcionalidade de remoção de recompensas cadastradas
4. Implementação de funcionalidade de controle e edição de estoque de recompensas cadastradas

SPRINT 4 - ABRIL DE 2021

1. Implementação de interface do menu para funcionários de empresa com exibição de saldo (outflow e flowin)
2. Implementação de funcionalidade de enviar saldo (outflow) para outros usuários

SPRINT 5 - MAIO DE 2021

1. Implementação de interface de menu de recompensas para funcionários de empresa
2. Implementação de funcionalidade de listagem e filtragem de recompensas disponíveis para funcionários
3. Implementação de funcionalidade de resgate de recompensas com flowin para funcionários
4. Implementação de interface com histórico de resgates para o funcionário logado
5. Implementação de interface com histórico de todos os resgates realizados por funcionários para admins de contas de empresa
6. Impementação de funcionalidade de confirmação de entrega de recompensa a funcionário para admins de contas de empresa

SPRINT 6 - JUNHO DE 2021

1. Implementação de menu de transferências para funcionários de empresa
2. Implementação de interface de transferências enviadas e recebidas pelo funcionário
3. Implementação de interface para funcionários de empresa com todas as transferências realizadas por funcionários de uma empresa
4. Implementação de interface para admins de empresa com todas as transferências realizadas por funcionários de uma empresa