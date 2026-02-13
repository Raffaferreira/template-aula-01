/**
 * Company Repository
 * Camada de acesso a dados para entidade Company (Empresa)
 * Implementa padrão Repository com Dependency Injection (TSyringe)
 * 
 * @module repository/CompanyRepository
 * @created 2026-02-13
 */

import { injectable } from 'tsyringe';
import { 
  Company, 
  CreateCompanyDto, 
  UpdateCompanyDto, 
  CompanyFilters,
  CompanyModel 
} from '../models/Company';

/**
 * Interface do contrato do Repository
 * Facilita testes e mocks
 */
export interface ICompanyRepository {
  create(data: CreateCompanyDto): Promise<Company>;
  findById(id: string): Promise<Company | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  findAll(filters?: CompanyFilters): Promise<Company[]>;
  findByNameOrCnpj(search: string): Promise<Company[]>;
  update(id: string, data: UpdateCompanyDto): Promise<Company>;
  delete(id: string): Promise<void>;
}

/**
 * Implementação do Repository com TSyringe
 * 
 * NOTA: Esta implementação usa armazenamento em memória para demonstração.
 * Em produção, substituir por chamadas ao Supabase:
 * 
 * @example
 * // Com Supabase
 * constructor(@inject(SupabaseClient) private supabase: SupabaseClient) {}
 */
@injectable()
export class CompanyRepository implements ICompanyRepository {
  // Armazenamento em memória para demonstração
  private companies: Map<string, Company> = new Map();
  private currentId = 1;

  constructor() {
    console.log('🏗️ [CompanyRepository] Instância criada com Dependency Injection');
  }

  /**
   * Cria uma nova empresa
   * 
   * @param data - Dados da empresa a criar
   * @returns Empresa criada com id e timestamps
   * 
   * @example
   * const company = await repository.create({
   *   name: 'Empresa Exemplo LTDA',
   *   cnpj: '12.345.678/0001-90',
   *   email: 'contato@empresa.com',
   *   phone: '(11) 98765-4321',
   *   address: 'Rua das Flores, 123',
   *   city: 'São Paulo',
   *   state: 'SP',
   *   zipCode: '01234-567'
   * });
   */
  async create(data: CreateCompanyDto): Promise<Company> {
    console.log('📝 [CompanyRepository] Criando empresa:', data);

    const id = String(this.currentId++);
    const now = new Date();

    const company: Company = {
      id,
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      isActive: data.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.companies.set(id, company);

    console.log('✅ [CompanyRepository] Empresa criada:', company.id);
    return company;

    /* 
     * Implementação com Supabase:
     * 
     * const dbData = CompanyModel.toDatabase(data);
     * const { data: created, error } = await this.supabase
     *   .from('companies')
     *   .insert(dbData)
     *   .select()
     *   .single();
     * 
     * if (error) throw error;
     * return CompanyModel.fromDatabase(created);
     */
  }

  /**
   * Busca empresa por ID
   * 
   * @param id - ID da empresa
   * @returns Empresa encontrada ou null
   */
  async findById(id: string): Promise<Company | null> {
    console.log('🔍 [CompanyRepository] Buscando empresa por ID:', id);

    const company = this.companies.get(id) || null;

    if (company) {
      console.log('✅ [CompanyRepository] Empresa encontrada:', id);
    } else {
      console.log('⚠️ [CompanyRepository] Empresa não encontrada:', id);
    }

    return company;

    /*
     * Implementação com Supabase:
     * 
     * const { data, error } = await this.supabase
     *   .from('companies')
     *   .select('*')
     *   .eq('id', id)
     *   .single();
     * 
     * if (error) {
     *   if (error.code === 'PGRST116') return null; // Not found
     *   throw error;
     * }
     * 
     * return CompanyModel.fromDatabase(data);
     */
  }

  /**
   * Busca empresa por CNPJ
   * 
   * @param cnpj - CNPJ da empresa (com ou sem formatação)
   * @returns Empresa encontrada ou null
   */
  async findByCnpj(cnpj: string): Promise<Company | null> {
    console.log('🔍 [CompanyRepository] Buscando empresa por CNPJ:', cnpj);

    // Remove formatação do CNPJ para comparação
    const cleanCnpj = cnpj.replace(/\D/g, '');

    const company = Array.from(this.companies.values()).find(c => 
      c.cnpj.replace(/\D/g, '') === cleanCnpj
    ) || null;

    if (company) {
      console.log('✅ [CompanyRepository] Empresa encontrada com CNPJ:', cnpj);
    } else {
      console.log('⚠️ [CompanyRepository] Empresa não encontrada com CNPJ:', cnpj);
    }

    return company;

    /*
     * Implementação com Supabase:
     * 
     * const { data, error } = await this.supabase
     *   .from('companies')
     *   .select('*')
     *   .eq('cnpj', cnpj)
     *   .single();
     * 
     * if (error) {
     *   if (error.code === 'PGRST116') return null; // Not found
     *   throw error;
     * }
     * 
     * return CompanyModel.fromDatabase(data);
     */
  }

  /**
   * Lista todas as empresas com filtros opcionais
   * 
   * @param filters - Filtros de busca
   * @returns Array de empresas
   */
  async findAll(filters?: CompanyFilters): Promise<Company[]> {
    console.log('📋 [CompanyRepository] Listando empresas. Filtros:', filters);

    let companies = Array.from(this.companies.values());

    // Aplicar filtros
    if (filters) {
      if (filters.name) {
        companies = companies.filter(c => 
          c.name.toLowerCase().includes(filters.name!.toLowerCase())
        );
      }

      if (filters.cnpj) {
        const cleanFilterCnpj = filters.cnpj.replace(/\D/g, '');
        companies = companies.filter(c => 
          c.cnpj.replace(/\D/g, '').includes(cleanFilterCnpj)
        );
      }

      if (filters.email) {
        companies = companies.filter(c => 
          c.email.toLowerCase().includes(filters.email!.toLowerCase())
        );
      }

      if (filters.city) {
        companies = companies.filter(c => 
          c.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }

      if (filters.state) {
        companies = companies.filter(c => 
          c.state.toLowerCase() === filters.state!.toLowerCase()
        );
      }

      if (filters.isActive !== undefined) {
        companies = companies.filter(c => c.isActive === filters.isActive);
      }
    }

    console.log(`✅ [CompanyRepository] ${companies.length} empresas encontradas`);
    return companies;

    /*
     * Implementação com Supabase:
     * 
     * let query = this.supabase.from('companies').select('*');
     * 
     * if (filters?.name) {
     *   query = query.ilike('name', `%${filters.name}%`);
     * }
     * if (filters?.cnpj) {
     *   query = query.ilike('cnpj', `%${filters.cnpj}%`);
     * }
     * if (filters?.email) {
     *   query = query.ilike('email', `%${filters.email}%`);
     * }
     * if (filters?.city) {
     *   query = query.ilike('city', `%${filters.city}%`);
     * }
     * if (filters?.state) {
     *   query = query.eq('state', filters.state);
     * }
     * if (filters?.isActive !== undefined) {
     *   query = query.eq('is_active', filters.isActive);
     * }
     * 
     * const { data, error } = await query;
     * if (error) throw error;
     * 
     * return data.map(CompanyModel.fromDatabase);
     */
  }

  /**
   * Filtra empresas por nome ou CNPJ
   * Busca parcial em ambos os campos
   * 
   * @param search - Termo de busca (nome ou CNPJ)
   * @returns Array de empresas que correspondem ao critério
   * 
   * @example
   * // Buscar por nome
   * const companies = await repository.findByNameOrCnpj('Empresa');
   * 
   * // Buscar por CNPJ
   * const companies = await repository.findByNameOrCnpj('12345678');
   */
  async findByNameOrCnpj(search: string): Promise<Company[]> {
    console.log('🔎 [CompanyRepository] Filtrando por nome ou CNPJ:', search);

    const searchLower = search.toLowerCase().trim();
    const cleanSearch = search.replace(/\D/g, '');

    const companies = Array.from(this.companies.values()).filter(company => 
      company.name.toLowerCase().includes(searchLower) ||
      company.cnpj.replace(/\D/g, '').includes(cleanSearch)
    );

    console.log(`✅ [CompanyRepository] ${companies.length} empresas encontradas com filtro: "${search}"`);
    return companies;

    /*
     * Implementação com Supabase:
     * 
     * const { data, error } = await this.supabase
     *   .from('companies')
     *   .select('*')
     *   .or(`name.ilike.%${search}%,cnpj.ilike.%${search}%`);
     * 
     * if (error) throw error;
     * return data.map(CompanyModel.fromDatabase);
     */
  }

  /**
   * Atualiza empresa existente
   * 
   * @param id - ID da empresa
   * @param data - Dados a atualizar
   * @returns Empresa atualizada
   * @throws Error se empresa não encontrada
   */
  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    console.log('✏️ [CompanyRepository] Atualizando empresa:', id, data);

    const company = this.companies.get(id);
    if (!company) {
      throw new Error(`Empresa com id ${id} não encontrada`);
    }

    const updated: Company = {
      ...company,
      ...data,
      updatedAt: new Date(),
    };

    this.companies.set(id, updated);

    console.log('✅ [CompanyRepository] Empresa atualizada:', id);
    return updated;

    /*
     * Implementação com Supabase:
     * 
     * const dbData = CompanyModel.toDatabase(data);
     * const { data: updated, error } = await this.supabase
     *   .from('companies')
     *   .update(dbData)
     *   .eq('id', id)
     *   .select()
     *   .single();
     * 
     * if (error) throw error;
     * if (!updated) throw new Error(`Empresa ${id} não encontrada`);
     * 
     * return CompanyModel.fromDatabase(updated);
     */
  }

  /**
   * Remove empresa
   * 
   * @param id - ID da empresa
   * @throws Error se empresa não encontrada
   */
  async delete(id: string): Promise<void> {
    console.log('🗑️ [CompanyRepository] Removendo empresa:', id);

    const exists = this.companies.has(id);
    if (!exists) {
      throw new Error(`Empresa com id ${id} não encontrada`);
    }

    this.companies.delete(id);

    console.log('✅ [CompanyRepository] Empresa removida:', id);

    /*
     * Implementação com Supabase:
     * 
     * const { error } = await this.supabase
     *   .from('companies')
     *   .delete()
     *   .eq('id', id);
     * 
     * if (error) throw error;
     */
  }

  /**
   * Método auxiliar para testes: limpar dados
   * Remover em produção
   */
  async clearAll(): Promise<void> {
    this.companies.clear();
    this.currentId = 1;
    console.log('🧹 [CompanyRepository] Todos os dados removidos');
  }
}
