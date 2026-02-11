# Instruções de Instalação

## Passo 1: Execute o script de criação de diretórios

1. Clique duas vezes no arquivo `create-dirs.bat` na raiz do projeto
2. Isso criará os diretórios necessários:
   - `app\components\`
   - `app\signin\`
   - `app\signup\`

## Passo 2: Mova os arquivos temporários para os locais corretos

Depois de executar o script, mova os arquivos:

1. **Navbar.tsx.temp** → mova para `app\components\Navbar.tsx`
2. **signin-page.tsx.temp** → mova para `app\signin\page.tsx`
3. **signup-page.tsx.temp** → mova para `app\signup\page.tsx`

## Passo 3: Execute o servidor de desenvolvimento

```bash
npm run dev
```

## Rotas Disponíveis

- `/` - Landing page principal
- `/signin` - Página de login
- `/signup` - Página de cadastro

## Estrutura Final

```
app/
├── components/
│   └── Navbar.tsx          ✅ Barra de navegação
├── signin/
│   └── page.tsx            ✅ Página de login
├── signup/
│   └── page.tsx            ✅ Página de cadastro
├── layout.tsx              ✅ Atualizado com Bootstrap
└── page.tsx                ✅ Atualizado com Navbar
```

## Recursos Implementados

### Navbar (Barra de Navegação)
- ✅ Responsiva com menu hamburger
- ✅ Links para Recursos, Preços, Sobre, Contato
- ✅ Botões de "Entrar" e "Começar Grátis"
- ✅ Fixada no topo da página

### Página de Sign In (/signin)
- ✅ Formulário de login com email e senha
- ✅ Opções de login social (Google, LinkedIn, GitHub)
- ✅ "Lembrar de mim" e "Esqueceu a senha?"
- ✅ Design split com branding à esquerda
- ✅ Totalmente responsiva

### Página de Sign Up (/signup)
- ✅ Formulário completo de cadastro
- ✅ Validação de senha e confirmação
- ✅ Opções de cadastro social
- ✅ Lista de benefícios no lado esquerdo
- ✅ Checkbox de termos e condições
- ✅ Design profissional e moderno

## Próximos Passos

Após a instalação, você pode:
1. Personalizar as cores no `globals.css`
2. Adicionar lógica de autenticação real
3. Integrar com backend/API
4. Adicionar validação de formulários
5. Implementar funcionalidade de "Esqueceu a senha"
