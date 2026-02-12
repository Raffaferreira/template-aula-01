/**
 * User Model
 * Define tipos e interfaces para entidade User
 * 
 * @module models/User
 * @created 2026-02-11
 */

/**
 * Interface principal do usuário
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

/**
 * Dados para criação de novo usuário (sem id, timestamps)
 */
export interface CreateUserDto {
  name: string;
  email: string;
  isActive?: boolean;
}

/**
 * Dados para atualização de usuário (campos opcionais)
 */
export interface UpdateUserDto {
  name?: string;
  email?: string;
  isActive?: boolean;
}

/**
 * Filtros para busca de usuários
 */
export interface UserFilters {
  name?: string;
  email?: string;
  isActive?: boolean;
}

/**
 * Classe Model para transformação de dados
 */
export class UserModel {
  /**
   * Transforma dados do banco para o formato da aplicação
   */
  static fromDatabase(data: any): User {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      isActive: data.is_active ?? true,
    };
  }

  /**
   * Transforma dados da aplicação para formato do banco
   */
  static toDatabase(data: CreateUserDto | UpdateUserDto): any {
    const dbData: any = {};
    
    if ('name' in data && data.name !== undefined) {
      dbData.name = data.name;
    }
    
    if ('email' in data && data.email !== undefined) {
      dbData.email = data.email;
    }
    
    if ('isActive' in data && data.isActive !== undefined) {
      dbData.is_active = data.isActive;
    }
    
    return dbData;
  }
}
