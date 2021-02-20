Trabalho realizado na Disciplina de Projeto Integrado de Aplicações da Pós-Graduação em Desenvolvimento Web Full Stack (PUC MINAS - 2020/2021), sob a coordenação do professor Renato Martins.

A aplicação está sendo desenvolvida em Node.js com uso de database MYSQL e extensão de linguagem SASS para CSS 3.0.


---- CONTA PARA TESTE DE INTERFACE DE ADMINISTRADOR DE EMPRESA ----

email: franciscogrynberg34@gmail.com
senha: 12345678

código da empresa para cadastro de funcionários (presente na rota de listagem de funcionários do menu de admin):

6f7e5a9d-503b-4291-a7aa-2aa64c5d4460

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