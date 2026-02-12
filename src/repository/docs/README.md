# Exemplo de Uso - UserRepository

Este documento demonstra como usar o `UserRepository` com Dependency Injection (TSyringe).

## 📦 Instalação de Dependências

Primeiro, instale as dependências necessárias:

```bash
npm install tsyringe reflect-metadata
npm install -D jest ts-jest @types/jest
```

## 🔧 Configuração Inicial

### 1. Importar reflect-metadata no ponto de entrada

Em `app/layout.tsx` ou arquivo principal:

```typescript
import 'reflect-metadata'; // PRIMEIRA LINHA
import { setupDependencyInjection } from '@/config/di-container';

// Configurar DI
setupDependencyInjection();

export default function RootLayout({ children }) {
  // ...
}
```

## 📝 Exemplos de Uso

### Criar Usuário

```typescript
import { container } from 'tsyringe';
import { UserRepository } from '@/repository/UserRepository';

// Resolver a instância do repository
const userRepository = container.resolve(UserRepository);

// Criar novo usuário
const newUser = await userRepository.create({
  name: 'João Silva',
  email: 'joao@example.com',
  isActive: true,
});

console.log('Usuário criado:', newUser.id);
```

### Buscar Usuário por ID

```typescript
const userId = '123';
const user = await userRepository.findById(userId);

if (user) {
  console.log('Usuário encontrado:', user.name);
} else {
  console.log('Usuário não encontrado');
}
```

### Listar Todos os Usuários

```typescript
// Sem filtros
const allUsers = await userRepository.findAll();
console.log(`Total de usuários: ${allUsers.length}`);

// Com filtros
const activeUsers = await userRepository.findAll({
  isActive: true,
  name: 'Silva',
});
console.log('Usuários ativos com "Silva" no nome:', activeUsers);
```

### Atualizar Usuário

```typescript
const userId = '123';

const updated = await userRepository.update(userId, {
  name: 'João Silva Santos',
  email: 'joao.santos@example.com',
});

console.log('Usuário atualizado:', updated);
```

### Deletar Usuário

```typescript
const userId = '123';

try {
  await userRepository.delete(userId);
  console.log('Usuário removido com sucesso');
} catch (error) {
  console.error('Erro ao remover usuário:', error);
}
```

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm test -- --coverage

# Executar testes em watch mode
npm test -- --watch

# Executar apenas testes do UserRepository
npm test UserRepository
```

## 🔄 Integração em Componentes React

### Exemplo em um Componente

```typescript
'use client';

import { useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { UserRepository } from '@/repository/UserRepository';
import { User } from '@/models/User';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const repository = container.resolve(UserRepository);
        const data = await repository.findAll();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🗄️ Migração para Supabase (Produção)

Quando configurar o Supabase, substitua a implementação in-memory:

### 1. Instalar Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Criar Cliente Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 3. Injetar no UserRepository

```typescript
import { injectable, inject } from 'tsyringe';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('SupabaseClient') private supabase: SupabaseClient
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const dbData = UserModel.toDatabase(data);
    const { data: created, error } = await this.supabase
      .from('users')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    return UserModel.fromDatabase(created);
  }

  // ... demais métodos
}
```

### 4. Registrar no Container

```typescript
// src/config/di-container.ts
import { supabase } from '@/lib/supabase';

export function setupDependencyInjection(): void {
  // Registrar Supabase Client
  container.register('SupabaseClient', {
    useValue: supabase,
  });

  // Registrar UserRepository
  container.register(UserRepository, { useClass: UserRepository });
}
```

## 📚 Referências

- [TSyringe GitHub](https://github.com/microsoft/tsyringe)
- [Jest Documentation](https://jestjs.io/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
