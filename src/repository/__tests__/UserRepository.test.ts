/**
 * User Repository Tests
 * Testes unitários para operações CRUD do UserRepository
 * 
 * @module repository/__tests__/UserRepository.test
 * @created 2026-02-11
 */

import 'reflect-metadata'; // Necessário para TSyringe
import { container } from 'tsyringe';
import { UserRepository } from '../UserRepository';
import { CreateUserDto, UpdateUserDto } from '../../models/User';

describe('UserRepository - CRUD Operations', () => {
  let repository: UserRepository;

  beforeEach(() => {
    // Limpar container e criar nova instância para cada teste
    container.clearInstances();
    repository = container.resolve(UserRepository);
  });

  afterEach(async () => {
    // Limpar dados após cada teste
    await repository.clearAll();
  });

  describe('CREATE - Criar Usuário', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      // Arrange
      const userData: CreateUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
      };

      // Act
      const user = await repository.create(userData);

      // Assert
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.isActive).toBe(true); // Default
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('deve criar usuário com isActive = false quando especificado', async () => {
      // Arrange
      const userData: CreateUserDto = {
        name: 'Maria Santos',
        email: 'maria@example.com',
        isActive: false,
      };

      // Act
      const user = await repository.create(userData);

      // Assert
      expect(user.isActive).toBe(false);
    });

    it('deve gerar IDs únicos para usuários diferentes', async () => {
      // Arrange
      const user1Data: CreateUserDto = {
        name: 'User 1',
        email: 'user1@example.com',
      };
      const user2Data: CreateUserDto = {
        name: 'User 2',
        email: 'user2@example.com',
      };

      // Act
      const user1 = await repository.create(user1Data);
      const user2 = await repository.create(user2Data);

      // Assert
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('READ - Buscar Usuários', () => {
    it('deve buscar usuário por ID', async () => {
      // Arrange
      const userData: CreateUserDto = {
        name: 'Carlos Souza',
        email: 'carlos@example.com',
      };
      const created = await repository.create(userData);

      // Act
      const found = await repository.findById(created.id);

      // Assert
      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe(userData.name);
      expect(found?.email).toBe(userData.email);
    });

    it('deve retornar null quando usuário não existe', async () => {
      // Act
      const found = await repository.findById('id-inexistente');

      // Assert
      expect(found).toBeNull();
    });

    it('deve listar todos os usuários', async () => {
      // Arrange
      await repository.create({
        name: 'User 1',
        email: 'user1@example.com',
      });
      await repository.create({
        name: 'User 2',
        email: 'user2@example.com',
      });
      await repository.create({
        name: 'User 3',
        email: 'user3@example.com',
      });

      // Act
      const users = await repository.findAll();

      // Assert
      expect(users).toHaveLength(3);
    });

    it('deve filtrar usuários por nome', async () => {
      // Arrange
      await repository.create({
        name: 'João Silva',
        email: 'joao@example.com',
      });
      await repository.create({
        name: 'Maria Silva',
        email: 'maria@example.com',
      });
      await repository.create({
        name: 'Pedro Santos',
        email: 'pedro@example.com',
      });

      // Act
      const users = await repository.findAll({ name: 'Silva' });

      // Assert
      expect(users).toHaveLength(2);
      expect(users.every(u => u.name.includes('Silva'))).toBe(true);
    });

    it('deve filtrar usuários por email', async () => {
      // Arrange
      await repository.create({
        name: 'User 1',
        email: 'user1@gmail.com',
      });
      await repository.create({
        name: 'User 2',
        email: 'user2@outlook.com',
      });
      await repository.create({
        name: 'User 3',
        email: 'user3@gmail.com',
      });

      // Act
      const users = await repository.findAll({ email: 'gmail' });

      // Assert
      expect(users).toHaveLength(2);
      expect(users.every(u => u.email.includes('gmail'))).toBe(true);
    });

    it('deve filtrar usuários por status ativo', async () => {
      // Arrange
      await repository.create({
        name: 'Active User',
        email: 'active@example.com',
        isActive: true,
      });
      await repository.create({
        name: 'Inactive User',
        email: 'inactive@example.com',
        isActive: false,
      });

      // Act
      const activeUsers = await repository.findAll({ isActive: true });
      const inactiveUsers = await repository.findAll({ isActive: false });

      // Assert
      expect(activeUsers).toHaveLength(1);
      expect(inactiveUsers).toHaveLength(1);
      expect(activeUsers[0].name).toBe('Active User');
      expect(inactiveUsers[0].name).toBe('Inactive User');
    });

    it('deve aplicar múltiplos filtros simultaneamente', async () => {
      // Arrange
      await repository.create({
        name: 'João Silva',
        email: 'joao@gmail.com',
        isActive: true,
      });
      await repository.create({
        name: 'João Santos',
        email: 'joao@outlook.com',
        isActive: false,
      });
      await repository.create({
        name: 'Maria Silva',
        email: 'maria@gmail.com',
        isActive: true,
      });

      // Act
      const users = await repository.findAll({
        name: 'Silva',
        email: 'gmail',
        isActive: true,
      });

      // Assert
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe('João Silva');
    });
  });

  describe('UPDATE - Atualizar Usuário', () => {
    it('deve atualizar nome do usuário', async () => {
      // Arrange
      const created = await repository.create({
        name: 'Nome Antigo',
        email: 'email@example.com',
      });

      const updateData: UpdateUserDto = {
        name: 'Nome Novo',
      };

      // Act
      const updated = await repository.update(created.id, updateData);

      // Assert
      expect(updated.name).toBe('Nome Novo');
      expect(updated.email).toBe(created.email); // Não mudou
      expect(updated.updatedAt.getTime()).toBeGreaterThan(
        created.updatedAt.getTime()
      );
    });

    it('deve atualizar email do usuário', async () => {
      // Arrange
      const created = await repository.create({
        name: 'João Silva',
        email: 'email-antigo@example.com',
      });

      // Act
      const updated = await repository.update(created.id, {
        email: 'email-novo@example.com',
      });

      // Assert
      expect(updated.email).toBe('email-novo@example.com');
      expect(updated.name).toBe(created.name); // Não mudou
    });

    it('deve atualizar status isActive do usuário', async () => {
      // Arrange
      const created = await repository.create({
        name: 'João Silva',
        email: 'joao@example.com',
        isActive: true,
      });

      // Act
      const updated = await repository.update(created.id, {
        isActive: false,
      });

      // Assert
      expect(updated.isActive).toBe(false);
    });

    it('deve atualizar múltiplos campos simultaneamente', async () => {
      // Arrange
      const created = await repository.create({
        name: 'Nome Antigo',
        email: 'email-antigo@example.com',
        isActive: true,
      });

      // Act
      const updated = await repository.update(created.id, {
        name: 'Nome Novo',
        email: 'email-novo@example.com',
        isActive: false,
      });

      // Assert
      expect(updated.name).toBe('Nome Novo');
      expect(updated.email).toBe('email-novo@example.com');
      expect(updated.isActive).toBe(false);
    });

    it('deve lançar erro ao tentar atualizar usuário inexistente', async () => {
      // Act & Assert
      await expect(
        repository.update('id-inexistente', { name: 'Novo Nome' })
      ).rejects.toThrow('não encontrado');
    });
  });

  describe('DELETE - Remover Usuário', () => {
    it('deve remover usuário existente', async () => {
      // Arrange
      const created = await repository.create({
        name: 'João Silva',
        email: 'joao@example.com',
      });

      // Act
      await repository.delete(created.id);

      // Assert
      const found = await repository.findById(created.id);
      expect(found).toBeNull();
    });

    it('deve lançar erro ao tentar remover usuário inexistente', async () => {
      // Act & Assert
      await expect(
        repository.delete('id-inexistente')
      ).rejects.toThrow('não encontrado');
    });

    it('deve remover apenas o usuário especificado', async () => {
      // Arrange
      const user1 = await repository.create({
        name: 'User 1',
        email: 'user1@example.com',
      });
      const user2 = await repository.create({
        name: 'User 2',
        email: 'user2@example.com',
      });

      // Act
      await repository.delete(user1.id);

      // Assert
      const found1 = await repository.findById(user1.id);
      const found2 = await repository.findById(user2.id);
      expect(found1).toBeNull();
      expect(found2).toBeDefined();
    });
  });

  describe('Dependency Injection - TSyringe', () => {
    it('deve criar instâncias diferentes quando solicitado', () => {
      // Act
      const instance1 = container.resolve(UserRepository);
      const instance2 = container.resolve(UserRepository);

      // Assert
      // TSyringe cria instâncias transient por padrão
      expect(instance1).not.toBe(instance2);
    });

    it('deve permitir registro como singleton', async () => {
      // Arrange
      container.registerSingleton(UserRepository);

      // Act
      const instance1 = container.resolve(UserRepository);
      const instance2 = container.resolve(UserRepository);

      await instance1.create({
        name: 'Test User',
        email: 'test@example.com',
      });

      const usersFromInstance2 = await instance2.findAll();

      // Assert
      expect(instance1).toBe(instance2); // Mesma instância
      expect(usersFromInstance2).toHaveLength(1); // Compartilha estado
    });
  });
});
