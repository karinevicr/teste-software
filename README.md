# Testes Unitários - Controller e Repository

Este projeto consiste na implementação de testes unitários para um `Controller` e um `Repository` que está sendo ultilizando no repositorio do projeto do grupo, os testes estão utilizando Jest, uma ferramenta para auxiliar na automação dos testes. Abaixo estão os detalhes dos testes e resultados.

## Casos de Teste

### 1. Teste do Repository (`DeficienciaRepository`)

#### Objetivo
Verificar o comportamento das operações CRUD (Create, Read, Delete) no repositório de deficiências.

#### Pré-condição
- O banco de dados deve estar configurado e acessível.
- O módulo `pool` do banco de dados deve ser mockado para simular as operações.

#### Procedimento de Teste
1. **Teste `getAll`**:
   - Simular a execução de uma query SQL para retornar todas as deficiências.
   - Verificar se o método retorna a lista esperada.

2. **Teste `getByName`**:
   - Simular a execução de uma query SQL para buscar uma deficiência pelo nome.
   - Verificar se o método retorna a deficiência correta ou `null` caso não encontre.

3. **Teste `create`**:
   - Simular a inserção de uma nova deficiência no banco de dados.
   - Verificar se o método retorna a deficiência criada com o ID gerado.

4. **Teste `delete`**:
   - Simular a exclusão de uma deficiência pelo nome.
   - Verificar se o método retorna `true` quando a exclusão é bem-sucedida e `false` caso contrário.

#### Resultado Esperado
- Todos os métodos devem se comportar conforme o esperado, retornando os valores corretos e interagindo adequadamente com o banco de dados mockado.

#### Resultado Obtido
- Todos os testes passaram com sucesso, validando o comportamento do repositório e indicando que tudo está funcionando.

#### Pós-condição
- Os mocks do banco de dados são limpos após cada teste.

### 2. Teste do Controller (`DeficienciaController`)

#### Objetivo
Validar o comportamento do controller ao lidar com requisições relacionadas a deficiências.

#### Pré-condição
- O serviço `DeficienciaServices` deve ser mockado para simular as operações.
- Os objetos `Request` e `Response` do Express devem ser simulados.

#### Procedimento de Teste
1. **Teste `listar`**:
   - Simular a listagem de todas as deficiências.
   - Verificar se o método retorna a lista com status 200.

2. **Teste `buscar`**:
   - Simular a busca de uma deficiência pelo nome.
   - Verificar se o método retorna a deficiência correta com status 200 ou status 404 caso não encontre.

3. **Teste `criar`**:
   - Simular a criação de uma nova deficiência.
   - Verificar se o método retorna a deficiência criada com status 201.

4. **Teste `deletar`**:
   - Simular a exclusão de uma deficiência pelo nome.
   - Verificar se o método retorna status 200 em caso de sucesso ou status 404 caso a deficiência não seja encontrada.

#### Resultado Esperado
- O controller deve retornar os status HTTP corretos e os dados esperados em cada cenário.

#### Resultado Obtido
- Todos os testes passaram com sucesso, validando o comportamento do controller.

#### Pós-condição
- Os mocks do serviço são limpos após cada teste.

## Automatização dos Testes

Os testes foram automatizados utilizando a ferramenta **Jest**. O código dos testes está organizado em dois arquivos:

- `TestDeficienciaRepository.ts`
- `TestDeficienciaController.ts`

Todos os testes estão funcionais e cobrem os cenários descritos nos casos de teste.

Para mostrar o funcionamento dos teste foi criado um video demonstando e testando eles no repositorio do grupo que pode ser encontrado aqui: https://youtu.be/T_5s8r_eDx4

## Registro dos Resultados

Os resultados dos testes foram registrados neste arquivo `README.md`, organizados de forma clara e detalhada. Cada caso de teste foi documentado com:

- Objetivo
- Pré-condição
- Procedimento de teste
- Resultado esperado
- Resultado obtido
- Pós-condição


