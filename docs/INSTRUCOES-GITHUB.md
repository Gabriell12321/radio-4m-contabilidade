# 📋 Instruções para Subir o Projeto no GitHub

## 🔧 Passo 1: Instalar o Git

### Opção A: Download Manual
1. Acesse: https://git-scm.com/download/win
2. Baixe o instalador para Windows
3. Execute o instalador e siga as instruções
4. Reinicie o terminal após a instalação

### Opção B: Usando Chocolatey (se tiver instalado)
```powershell
choco install git
```

### Opção C: Usando Winget
```powershell
winget install --id Git.Git -e --source winget
```

## 🚀 Passo 2: Configurar o Git

Após instalar o Git, execute estes comandos no terminal:

```bash
# Configurar seu nome de usuário
git config --global user.name "Seu Nome"

# Configurar seu email
git config --global user.email "seu.email@exemplo.com"

# Verificar se está funcionando
git --version
```

## 📁 Passo 3: Inicializar o Repositório

No diretório do projeto, execute:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeira versão do sistema de rádio"

# Verificar status
git status
```

## 🌐 Passo 4: Criar Repositório no GitHub

1. Acesse: https://github.com
2. Faça login na sua conta
3. Clique em "New repository" (botão verde)
4. Configure o repositório:
   - **Repository name**: `radio-4m-contabilidade`
   - **Description**: `Sistema de rádio web completo com painel administrativo`
   - **Visibility**: Public ou Private (sua escolha)
   - **NÃO** marque "Add a README file" (já temos um)
   - **NÃO** marque "Add .gitignore" (já temos um)
5. Clique em "Create repository"

## 🔗 Passo 5: Conectar ao GitHub

Após criar o repositório, execute:

```bash
# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu nome de usuário)
git remote add origin https://github.com/SEU_USUARIO/radio-4m-contabilidade.git

# Enviar o código para o GitHub
git branch -M main
git push -u origin main
```

## 📝 Passo 6: Verificar

1. Acesse seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados
3. Confirme que o README.md está sendo exibido corretamente

## 🔄 Comandos Úteis para o Futuro

```bash
# Ver status das mudanças
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para o GitHub
git push

# Baixar mudanças do GitHub
git pull
```

## 🆘 Solução de Problemas

### Git não encontrado
- Reinicie o terminal após instalar o Git
- Verifique se o Git foi adicionado ao PATH do sistema

### Erro de autenticação
- Use GitHub CLI: `gh auth login`
- Ou configure SSH keys
- Ou use token de acesso pessoal

### Arquivos não aparecem
- Verifique se foram adicionados: `git add .`
- Verifique se foram commitados: `git log`

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o Git está instalado: `git --version`
2. Verifique a configuração: `git config --list`
3. Consulte a documentação oficial do Git
4. Verifique os logs de erro no terminal

---

**🎵 Seu projeto de rádio estará disponível no GitHub! 🎵** 