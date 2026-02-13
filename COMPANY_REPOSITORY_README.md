# CompanyRepository - Repository Pattern Implementation

## 📋 Visão Geral

Implementação completa do **Repository Pattern** para gerenciamento de empresas (companies), seguindo os padrões do projeto com TypeScript e Dependency Injection (TSyringe).

## 🏗️ Arquitetura

### Camadas Implementadas

```
┌─────────────────────────────────────┐
│     Model (Company.ts)              │  ← Definições de tipos e transformação
├─────────────────────────────────────┤
│  Repository (CompanyRepository.ts)  │  ← Acesso a dados e lógica de persistência
└─────────────────────────────────────┘
```

## 📦 Arquivos Criados

### 1. **Model** - `src/models/Company.ts`

Define as interfaces TypeScript e classe de transformação de dados:

- `Company` - Interface principal da entidade
- `CreateCompanyDto` - Dados para criação (sem id e timestamps)
- `UpdateCompanyDto` - Dados para atualização (campos opcionais)
- `CompanyFilters` - Filtros de busca
- `CompanyModel` - Classe para transformação de dados (app ↔ database)

**Campos da Entidade:**
```typescript
{
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### 2. **Repository** - `src/repository/CompanyRepository.ts`

Implementa a interface de acesso a dados com os métodos:

| Método | Descrição |
|--------|-----------|
| `create(data)` | Cria nova empresa |
| `findById(id)` | Busca empresa por ID |
| `findByCnpj(cnpj)` | Busca empresa por CNPJ (com ou sem formatação) |
| `findAll(filters?)` | Lista todas com filtros opcionais |
| `findByNameOrCnpj(search)` | Busca por nome ou CNPJ parcial |
| `update(id, data)` | Atualiza empresa existente |
| `delete(id)` | Remove empresa |
| `clearAll()` | Limpa todos os dados (apenas para testes) |

### 3. **Tests** - `src/repository/__tests__/CompanyRepository.test.ts`

Suite completa de testes unitários com Jest:

- ✅ 18 casos de teste
- ✅ Cobertura de todos os métodos
- ✅ Testes de sucesso e erro
- ✅ Validação de filtros

## 🚀 Como Usar

### Configuração Inicial (Dependency Injection)

```typescript
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CompanyRepository } from './repository/CompanyRepository';

// Registrar no container
container.register('CompanyRepository', {
  useClass: CompanyRepository
});

// Resolver instância
const repository = container.resolve(CompanyRepository);
```

### Exemplos de Uso

#### 1. Criar Nova Empresa

```typescript
import { CreateCompanyDto } from './models/Company';

const novaEmpresa: CreateCompanyDto = {
  name: 'Tech Solutions LTDA',
  cnpj: '12.345.678/0001-90',
  email: 'contato@techsolutions.com',
  phone: '(11) 98765-4321',
  address: 'Av. Paulista, 1000',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100'
};

const empresa = await repository.create(novaEmpresa);
console.log('Empresa criada com ID:', empresa.id);
```

#### 2. Buscar por ID

```typescript
const empresa = await repository.findById('1');

if (empresa) {
  console.log('Empresa encontrada:', empresa.name);
} else {
  console.log('Empresa não encontrada');
}
```

#### 3. Buscar por CNPJ

```typescript
// Com formatação
const empresa1 = await repository.findByCnpj('12.345.678/0001-90');

// Sem formatação
const empresa2 = await repository.findByCnpj('12345678000190');

// Ambos retornam a mesma empresa!
```

#### 4. Listar com Filtros

```typescript
import { CompanyFilters } from './models/Company';

// Todas as empresas
const todas = await repository.findAll();

// Filtrar por estado
const empresasSP = await repository.findAll({ state: 'SP' });

// Filtrar por status ativo
const ativas = await repository.findAll({ isActive: true });

// Filtrar por cidade e status
const filtroComplexo: CompanyFilters = {
  city: 'São Paulo',
  isActive: true
};
const resultado = await repository.findAll(filtroComplexo);
```

#### 5. Buscar por Nome ou CNPJ (Busca Parcial)

```typescript
// Buscar por parte do nome
const empresasTech = await repository.findByNameOrCnpj('Tech');

// Buscar por parte do CNPJ
const empresasCnpj = await repository.findByNameOrCnpj('12345678');

// Retorna todas as empresas que correspondem ao critério
```

#### 6. Atualizar Empresa

```typescript
import { UpdateCompanyDto } from './models/Company';

const atualizacao: UpdateCompanyDto = {
  name: 'Tech Solutions LTDA - Nova Razão Social',
  email: 'novoemail@techsolutions.com'
};

const empresaAtualizada = await repository.update('1', atualizacao);
console.log('Empresa atualizada:', empresaAtualizada);
```

#### 7. Deletar Empresa

```typescript
await repository.delete('1');
console.log('Empresa removida com sucesso');

// Verificar exclusão
const verificar = await repository.findById('1');
console.log(verificar); // null
```

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar apenas testes do CompanyRepository
npm test CompanyRepository.test.ts

# Executar com cobertura
npm test -- --coverage
```

## 🔄 Migração para Supabase

Atualmente, a implementação usa **armazenamento em memória** para demonstração. Para produção, substitua pelos métodos do Supabase.

### Exemplo de Conversão (create)

**Atual (em memória):**
```typescript
async create(data: CreateCompanyDto): Promise<Company> {
  const id = String(this.currentId++);
  const now = new Date();
  
  const company: Company = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  this.companies.set(id, company);
  return company;
}
```

**Com Supabase:**
```typescript
import { supabase } from '../config/supabase';

async create(data: CreateCompanyDto): Promise<Company> {
  const dbData = CompanyModel.toDatabase(data);
  
  const { data: created, error } = await supabase
    .from('companies')
    .insert(dbData)
    .select()
    .single();
  
  if (error) throw error;
  
  return CompanyModel.fromDatabase(created);
}
```

### Schema SQL para Supabase

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state CHAR(2),
  zip_code VARCHAR(10),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para otimização
CREATE INDEX idx_companies_cnpj ON companies(cnpj);
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_state ON companies(state);
CREATE INDEX idx_companies_is_active ON companies(is_active);
```

## 📚 Padrões Seguidos

### TypeScript Best Practices
- ✅ Interfaces explícitas para todos os tipos
- ✅ Return types em todos os métodos
- ✅ Uso de `async/await` para operações assíncronas
- ✅ Documentação JSDoc completa

### Repository Pattern
- ✅ Interface `ICompanyRepository` para contrato
- ✅ Implementação concreta `CompanyRepository`
- ✅ Separação de responsabilidades (Repository ≠ Model)
- ✅ Métodos de busca específicos e genéricos

### Dependency Injection (TSyringe)
- ✅ Decorator `@injectable()` na classe
- ✅ Registro no container: `container.register()`
- ✅ Resolução via: `container.resolve()`

### Logging Convention
- ✅ Emojis para identificação visual
- 📝 = Create
- 🔍 = Read/Find
- ✏️ = Update
- 🗑️ = Delete
- ✅ = Success
- ⚠️ = Warning
- ❌ = Error

## 🎯 Próximos Passos

### 1. Service Layer
Criar `CompanyService.ts` para orquestrar lógica de negócio:

```typescript
@injectable()
export class CompanyService {
  constructor(
    @inject(CompanyValidator) private validator: CompanyValidator,
    @inject(CompanyRepository) private repository: CompanyRepository
  ) {}
  
  async createCompany(data: CreateCompanyDto) {
    // 1. Validar dados
    const validation = await this.validator.validateCreate(data);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    
    // 2. Verificar CNPJ duplicado
    const exists = await this.repository.findByCnpj(data.cnpj);
    if (exists) {
      return { success: false, error: 'CNPJ já cadastrado' };
    }
    
    // 3. Criar empresa
    const company = await this.repository.create(data);
    return { success: true, data: company };
  }
}
```

### 2. Validator Layer
Criar `CompanyValidator.ts` para validação de regras de negócio:

```typescript
@injectable()
export class CompanyValidator {
  validateCreate(data: CreateCompanyDto): ValidationResult {
    const errors: ValidationError[] = [];
    
    // Validar CNPJ
    if (!this.isValidCnpj(data.cnpj)) {
      errors.push({ field: 'cnpj', message: 'CNPJ inválido' });
    }
    
    // Validar email
    if (!this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
```

### 3. React Components
Criar componentes para UI de gerenciamento:

- `CompanyList.tsx` - Listar empresas com filtros
- `CompanyForm.tsx` - Formulário de criação/edição
- `CompanyDetails.tsx` - Detalhes da empresa

## 📝 Notas Importantes

1. **CNPJ Handling**: O repository aceita CNPJ com ou sem formatação
2. **State Field**: Armazena apenas 2 caracteres (ex: SP, RJ)
3. **Timestamps**: Gerenciados automaticamente pelo repository
4. **Soft Delete**: Usar campo `isActive` em vez de deletar fisicamente
5. **Testes**: Sempre executar `clearAll()` no `afterEach` dos testes

## 🤝 Contribuindo

Ao adicionar novos métodos:

1. ✅ Adicionar à interface `ICompanyRepository`
2. ✅ Implementar no `CompanyRepository`
3. ✅ Criar testes unitários
4. ✅ Documentar com JSDoc
5. ✅ Adicionar exemplo de uso

## 📄 Licença

Este código segue os padrões do projeto e está disponível para uso interno.

---

**Última Atualização**: 2026-02-13  
**Versão**: 1.0.0  
**Autor**: ACAMINYOU 2025
