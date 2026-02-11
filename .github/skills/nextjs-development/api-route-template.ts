/**
 * Template: API Route Handler
 * Use este template para criar endpoints de API
 */
import { NextRequest, NextResponse } from 'next/server';

// Interface para o corpo da requisição
interface RequestBody {
  name: string;
  email: string;
}

// Interface para a resposta
interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}

// GET /api/route
export async function GET(request: NextRequest) {
  try {
    // Obter query params
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validação básica
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    // Lógica de negócio
    const data = await fetchData(id);

    return NextResponse.json({
      success: true,
      message: 'Dados recuperados com sucesso',
      data
    }, { status: 200 });

  } catch (error) {
    console.error('Erro no GET:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/route
export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body: RequestBody = await request.json();

    // Validação
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Lógica de negócio
    const result = await processData(body);

    return NextResponse.json({
      success: true,
      message: 'Dados processados com sucesso',
      data: result
    }, { status: 201 });

  } catch (error) {
    console.error('Erro no POST:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar dados' },
      { status: 500 }
    );
  }
}

// PUT /api/route
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Lógica de atualização
    const updated = await updateData(body);

    return NextResponse.json({
      success: true,
      message: 'Atualizado com sucesso',
      data: updated
    }, { status: 200 });

  } catch (error) {
    console.error('Erro no PUT:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao atualizar' },
      { status: 500 }
    );
  }
}

// DELETE /api/route
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID é obrigatório' },
        { status: 400 }
      );
    }

    await deleteData(id);

    return NextResponse.json({
      success: true,
      message: 'Deletado com sucesso'
    }, { status: 200 });

  } catch (error) {
    console.error('Erro no DELETE:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao deletar' },
      { status: 500 }
    );
  }
}

// Funções auxiliares (implementar conforme necessário)
async function fetchData(id: string) {
  // Implementar lógica de busca
  return {};
}

async function processData(data: RequestBody) {
  // Implementar lógica de processamento
  return {};
}

async function updateData(data: any) {
  // Implementar lógica de atualização
  return {};
}

async function deleteData(id: string) {
  // Implementar lógica de deleção
}
