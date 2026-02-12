/**
 * User Repository
 * Camada de acesso a dados para entidade User
 * Implementa padrão Repository com Dependency Injection (TSyringe)
 * 
 * @module repository/UserRepository
 * @created 2026-02-11
 */

import { injectable } from 'tsyringe';
import { 
  User, 
  CreateUserDto, 
  UpdateUserDto, 
  UserFilters,
  UserModel 
} from '../models/User';

/**
 * Interface do contrato do Repository
 * Facilita testes e mocks
 */
export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(filters?: UserFilters): Promise<User[]>;
  findByNameOrId(search: string): Promise<User[]>;
  update(id: string, data: UpdateUserDto): Promise<User>;
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
export class UserRepository implements IUserRepository {
  // Armazenamento em memória para demonstração
  private users: Map<string, User> = new Map();
  private currentId = 1;

  constructor() {
    console.log('🏗️ [UserRepository] Instância criada com Dependency Injection');
  }

  /**
   * Cria um novo usuário
   * 
   * @param data - Dados do usuário a criar
   * @returns Usuário criado com id e timestamps
   * 
   * @example
   * const user = await repository.create({
   *   name: 'João Silva',
   *   email: 'joao@example.com'
   * });
   */
  async create(data: CreateUserDto): Promise<User> {
    console.log('📝 [UserRepository] Criando usuário:', data);

    const id = String(this.currentId++);
    const now = new Date();

    const user: User = {
      id,
      name: data.name,
      email: data.email,
      isActive: data.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(id, user);

    console.log('✅ [UserRepository] Usuário criado:', user.id);
    return user;

    /* 
     * Implementação com Supabase:
     * 
     * const dbData = UserModel.toDatabase(data);
     * const { data: created, error } = await this.supabase
     *   .from('users')
     *   .insert(dbData)
     *   .select()
     *   .single();
     * 
     * if (error) throw error;
     * return UserModel.fromDatabase(created);
     */
  }

  /**
   * Busca usuário por ID
   * 
   * @param id - ID do usuário
   * @returns Usuário encontrado ou null
   */
  async findById(id: string): Promise<User | null> {
    console.log('🔍 [UserRepository] Buscando usuário:', id);

    const user = this.users.get(id) || null;

    if (user) {
      console.log('✅ [UserRepository] Usuário encontrado:', id);
    } else {
      console.log('⚠️ [UserRepository] Usuário não encontrado:', id);
    }

    return user;

    /*
     * Implementação com Supabase:
     * 
     * const { data, error } = await this.supabase
     *   .from('users')
     *   .select('*')
     *   .eq('id', id)
     *   .single();
     * 
     * if (error) {
     *   if (error.code === 'PGRST116') return null; // Not found
     *   throw error;
     * }
     * 
     * return UserModel.fromDatabase(data);
     */
  }

  /**
   * Lista todos os usuários com filtros opcionais
   * 
   * @param filters - Filtros de busca
   * @returns Array de usuários
   */
  async findAll(filters?: UserFilters): Promise<User[]> {
    console.log('📋 [UserRepository] Listando usuários. Filtros:', filters);

    let users = Array.from(this.users.values());

    // Aplicar filtros
    if (filters) {
      if (filters.name) {
        users = users.filter(u => 
          u.name.toLowerCase().includes(filters.name!.toLowerCase())
        );
      }

      if (filters.email) {
        users = users.filter(u => 
          u.email.toLowerCase().includes(filters.email!.toLowerCase())
        );
      }

      if (filters.isActive !== undefined) {
        users = users.filter(u => u.isActive === filters.isActive);
      }
    }

    console.log(`✅ [UserRepository] ${users.length} usuários encontrados`);
    return users;

    /*
     * Implementação com Supabase:
     * 
     * let query = this.supabase.from('users').select('*');
     * 
     * if (filters?.name) {
     *   query = query.ilike('name', `%${filters.name}%`);
     * }
     * if (filters?.email) {
     *   query = query.ilike('email', `%${filters.email}%`);
     * }
     * if (filters?.isActive !== undefined) {
     *   query = query.eq('is_active', filters.isActive);
     * }
     * 
     * const { data, error } = await query;
     * if (error) throw error;
     * 
     * return data.map(UserModel.fromDatabase);
     */
  }

  /**
   * Filtra usuários por nome ou ID
   * Busca parcial em ambos os campos
   * 
   * @param search - Termo de busca (nome ou ID)
   * @returns Array de usuários que correspondem ao critério
   * 
   * @example
   * // Buscar por nome
   * const users = await repository.findByNameOrId('João');
   * 
   * // Buscar por ID
   * const users = await repository.findByNameOrId('123');
   */
  async findByNameOrId(search: string): Promise<User[]> {
    console.log('🔎 [UserRepository] Filtrando por nome ou ID:', search);

    const searchLower = search.toLowerCase().trim();
    const users = Array.from(this.users.values()).filter(user => 
      user.id.toLowerCase().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower)
    );

    console.log(`✅ [UserRepository] ${users.length} usuários encontrados com filtro: "${search}"`);
    return users;

    /*
     * Implementação com Supabase:
     * 
     * const { data, error } = await this.supabase
     *   .from('users')
     *   .select('*')
     *   .or(`id.ilike.%${search}%,name.ilike.%${search}%`);
     * 
     * if (error) throw error;
     * return data.map(UserModel.fromDatabase);
     */
  }

  /**
   * Atualiza usuário existente
   * 
   * @param id - ID do usuário
   * @param data - Dados a atualizar
   * @returns Usuário atualizado
   * @throws Error se usuário não encontrado
   */
  async update(id: string, data: UpdateUserDto): Promise<User> {
    console.log('✏️ [UserRepository] Atualizando usuário:', id, data);

    const user = this.users.get(id);
    if (!user) {
      throw new Error(`Usuário com id ${id} não encontrado`);
    }

    const updated: User = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };

    this.users.set(id, updated);

    console.log('✅ [UserRepository] Usuário atualizado:', id);
    return updated;

    /*
     * Implementação com Supabase:
     * 
     * const dbData = UserModel.toDatabase(data);
     * const { data: updated, error } = await this.supabase
     *   .from('users')
     *   .update(dbData)
     *   .eq('id', id)
     *   .select()
     *   .single();
     * 
     * if (error) throw error;
     * if (!updated) throw new Error(`Usuário ${id} não encontrado`);
     * 
     * return UserModel.fromDatabase(updated);
     */
  }

  /**
   * Remove usuário
   * 
   * @param id - ID do usuário
   * @throws Error se usuário não encontrado
   */
  async delete(id: string): Promise<void> {
    console.log('🗑️ [UserRepository] Removendo usuário:', id);

    const exists = this.users.has(id);
    if (!exists) {
      throw new Error(`Usuário com id ${id} não encontrado`);
    }

    this.users.delete(id);

    console.log('✅ [UserRepository] Usuário removido:', id);

    /*
     * Implementação com Supabase:
     * 
     * const { error } = await this.supabase
     *   .from('users')
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
    this.users.clear();
    this.currentId = 1;
    console.log('🧹 [UserRepository] Todos os dados removidos');
  }
}
