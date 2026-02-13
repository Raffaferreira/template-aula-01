/**
 * Company Model
 * Define tipos e interfaces para entidade Company (Empresa)
 * 
 * @module models/Company
 * @created 2026-02-13
 */

/**
 * Interface principal da empresa
 */
export interface Company {
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

/**
 * Dados para criação de nova empresa (sem id, timestamps)
 */
export interface CreateCompanyDto {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isActive?: boolean;
}

/**
 * Dados para atualização de empresa (campos opcionais)
 */
export interface UpdateCompanyDto {
  name?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isActive?: boolean;
}

/**
 * Filtros para busca de empresas
 */
export interface CompanyFilters {
  name?: string;
  cnpj?: string;
  email?: string;
  city?: string;
  state?: string;
  isActive?: boolean;
}

/**
 * Classe Model para transformação de dados
 * Converte entre formato da aplicação (camelCase) e banco de dados (snake_case)
 */
export class CompanyModel {
  /**
   * Transforma dados do banco para o formato da aplicação
   * 
   * @param data - Dados retornados do banco de dados
   * @returns Company no formato da aplicação
   */
  static fromDatabase(data: any): Company {
    return {
      id: data.id,
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zip_code,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      isActive: data.is_active ?? true,
    };
  }

  /**
   * Transforma dados da aplicação para formato do banco
   * 
   * @param data - CreateCompanyDto ou UpdateCompanyDto
   * @returns Objeto no formato do banco de dados
   */
  static toDatabase(data: CreateCompanyDto | UpdateCompanyDto): any {
    const dbData: any = {};
    
    if ('name' in data && data.name !== undefined) {
      dbData.name = data.name;
    }
    
    if ('cnpj' in data && data.cnpj !== undefined) {
      dbData.cnpj = data.cnpj;
    }
    
    if ('email' in data && data.email !== undefined) {
      dbData.email = data.email;
    }
    
    if ('phone' in data && data.phone !== undefined) {
      dbData.phone = data.phone;
    }
    
    if ('address' in data && data.address !== undefined) {
      dbData.address = data.address;
    }
    
    if ('city' in data && data.city !== undefined) {
      dbData.city = data.city;
    }
    
    if ('state' in data && data.state !== undefined) {
      dbData.state = data.state;
    }
    
    if ('zipCode' in data && data.zipCode !== undefined) {
      dbData.zip_code = data.zipCode;
    }
    
    if ('isActive' in data && data.isActive !== undefined) {
      dbData.is_active = data.isActive;
    }
    
    return dbData;
  }
}
