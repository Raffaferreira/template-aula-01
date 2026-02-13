/**
 * CompanyRepository Tests
 * Testes unitários para o repositório de empresas
 * 
 * @module repository/__tests__/CompanyRepository.test
 * @created 2026-02-13
 */

import 'reflect-metadata';
import { CompanyRepository } from '../CompanyRepository';
import { CreateCompanyDto, UpdateCompanyDto } from '../../models/Company';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;

  beforeEach(() => {
    repository = new CompanyRepository();
  });

  afterEach(async () => {
    await repository.clearAll();
  });

  describe('create', () => {
    it('deve criar uma nova empresa com sucesso', async () => {
      const data: CreateCompanyDto = {
        name: 'Empresa Teste LTDA',
        cnpj: '12.345.678/0001-90',
        email: 'contato@empresateste.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      };

      const company = await repository.create(data);

      expect(company).toBeDefined();
      expect(company.id).toBeDefined();
      expect(company.name).toBe(data.name);
      expect(company.cnpj).toBe(data.cnpj);
      expect(company.email).toBe(data.email);
      expect(company.isActive).toBe(true);
      expect(company.createdAt).toBeInstanceOf(Date);
      expect(company.updatedAt).toBeInstanceOf(Date);
    });

    it('deve criar empresa com isActive = false quando especificado', async () => {
      const data: CreateCompanyDto = {
        name: 'Empresa Inativa LTDA',
        cnpj: '98.765.432/0001-10',
        email: 'inativa@empresateste.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        isActive: false,
      };

      const company = await repository.create(data);

      expect(company.isActive).toBe(false);
    });
  });

  describe('findById', () => {
    it('deve encontrar empresa por ID', async () => {
      const created = await repository.create({
        name: 'Empresa Teste',
        cnpj: '12.345.678/0001-90',
        email: 'teste@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      const found = await repository.findById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe(created.name);
    });

    it('deve retornar null quando empresa não existe', async () => {
      const found = await repository.findById('999');

      expect(found).toBeNull();
    });
  });

  describe('findByCnpj', () => {
    it('deve encontrar empresa por CNPJ', async () => {
      const created = await repository.create({
        name: 'Empresa Teste',
        cnpj: '12.345.678/0001-90',
        email: 'teste@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      const found = await repository.findByCnpj('12.345.678/0001-90');

      expect(found).toBeDefined();
      expect(found?.cnpj).toBe(created.cnpj);
    });

    it('deve encontrar empresa por CNPJ sem formatação', async () => {
      await repository.create({
        name: 'Empresa Teste',
        cnpj: '12.345.678/0001-90',
        email: 'teste@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      const found = await repository.findByCnpj('12345678000190');

      expect(found).toBeDefined();
      expect(found?.cnpj).toBe('12.345.678/0001-90');
    });

    it('deve retornar null quando CNPJ não existe', async () => {
      const found = await repository.findByCnpj('99.999.999/0001-99');

      expect(found).toBeNull();
    });
  });

  describe('findAll', () => {
    beforeEach(async () => {
      await repository.create({
        name: 'Empresa A',
        cnpj: '11.111.111/0001-11',
        email: 'a@empresa.com',
        phone: '(11) 11111-1111',
        address: 'Rua A, 1',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01111-111',
      });

      await repository.create({
        name: 'Empresa B',
        cnpj: '22.222.222/0001-22',
        email: 'b@empresa.com',
        phone: '(21) 22222-2222',
        address: 'Rua B, 2',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '02222-222',
        isActive: false,
      });

      await repository.create({
        name: 'Empresa C',
        cnpj: '33.333.333/0001-33',
        email: 'c@empresa.com',
        phone: '(31) 33333-3333',
        address: 'Rua C, 3',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '03333-333',
      });
    });

    it('deve listar todas as empresas', async () => {
      const companies = await repository.findAll();

      expect(companies).toHaveLength(3);
    });

    it('deve filtrar por nome', async () => {
      const companies = await repository.findAll({ name: 'Empresa A' });

      expect(companies).toHaveLength(1);
      expect(companies[0].name).toBe('Empresa A');
    });

    it('deve filtrar por estado', async () => {
      const companies = await repository.findAll({ state: 'SP' });

      expect(companies).toHaveLength(1);
      expect(companies[0].state).toBe('SP');
    });

    it('deve filtrar por status ativo', async () => {
      const companies = await repository.findAll({ isActive: true });

      expect(companies).toHaveLength(2);
    });

    it('deve filtrar por status inativo', async () => {
      const companies = await repository.findAll({ isActive: false });

      expect(companies).toHaveLength(1);
      expect(companies[0].name).toBe('Empresa B');
    });

    it('deve filtrar por cidade', async () => {
      const companies = await repository.findAll({ city: 'Rio de Janeiro' });

      expect(companies).toHaveLength(1);
      expect(companies[0].city).toBe('Rio de Janeiro');
    });
  });

  describe('findByNameOrCnpj', () => {
    beforeEach(async () => {
      await repository.create({
        name: 'Empresa Tech LTDA',
        cnpj: '12.345.678/0001-90',
        email: 'tech@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua Tech, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      await repository.create({
        name: 'Consultoria XYZ',
        cnpj: '98.765.432/0001-10',
        email: 'xyz@consultoria.com',
        phone: '(21) 98765-4321',
        address: 'Rua XYZ, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '02345-678',
      });
    });

    it('deve buscar por nome parcial', async () => {
      const companies = await repository.findByNameOrCnpj('Tech');

      expect(companies).toHaveLength(1);
      expect(companies[0].name).toContain('Tech');
    });

    it('deve buscar por CNPJ parcial', async () => {
      const companies = await repository.findByNameOrCnpj('12345678');

      expect(companies).toHaveLength(1);
      expect(companies[0].cnpj).toContain('12.345.678');
    });

    it('deve retornar array vazio quando não encontrar', async () => {
      const companies = await repository.findByNameOrCnpj('Inexistente');

      expect(companies).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve atualizar empresa existente', async () => {
      const created = await repository.create({
        name: 'Empresa Original',
        cnpj: '12.345.678/0001-90',
        email: 'original@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua Original, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      const updateData: UpdateCompanyDto = {
        name: 'Empresa Atualizada',
        email: 'atualizada@empresa.com',
      };

      const updated = await repository.update(created.id, updateData);

      expect(updated.name).toBe('Empresa Atualizada');
      expect(updated.email).toBe('atualizada@empresa.com');
      expect(updated.cnpj).toBe(created.cnpj); // Não alterado
      expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime());
    });

    it('deve lançar erro ao atualizar empresa inexistente', async () => {
      const updateData: UpdateCompanyDto = {
        name: 'Empresa Atualizada',
      };

      await expect(
        repository.update('999', updateData)
      ).rejects.toThrow('Empresa com id 999 não encontrada');
    });
  });

  describe('delete', () => {
    it('deve remover empresa existente', async () => {
      const created = await repository.create({
        name: 'Empresa Temporária',
        cnpj: '12.345.678/0001-90',
        email: 'temp@empresa.com',
        phone: '(11) 98765-4321',
        address: 'Rua Temp, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      });

      await repository.delete(created.id);

      const found = await repository.findById(created.id);
      expect(found).toBeNull();
    });

    it('deve lançar erro ao remover empresa inexistente', async () => {
      await expect(
        repository.delete('999')
      ).rejects.toThrow('Empresa com id 999 não encontrada');
    });
  });

  describe('clearAll', () => {
    it('deve limpar todos os dados', async () => {
      await repository.create({
        name: 'Empresa 1',
        cnpj: '11.111.111/0001-11',
        email: 'empresa1@test.com',
        phone: '(11) 11111-1111',
        address: 'Rua 1, 1',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01111-111',
      });

      await repository.create({
        name: 'Empresa 2',
        cnpj: '22.222.222/0001-22',
        email: 'empresa2@test.com',
        phone: '(22) 22222-2222',
        address: 'Rua 2, 2',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '02222-222',
      });

      await repository.clearAll();

      const companies = await repository.findAll();
      expect(companies).toHaveLength(0);
    });
  });
});
