/**
 * Make.com API Client
 * Cliente TypeScript para integração com Make.com API
 */

interface MakeConfig {
  apiKey: string;
  teamId: string;
  region?: 'eu1' | 'us1' | 'us2'; // Regiões Make.com
}

interface ScenarioData {
  [key: string]: any;
}

interface MakeResponse {
  success: boolean;
  executionId?: string;
  error?: string;
}

export class MakeClient {
  private baseUrl: string;
  private apiKey: string;
  private teamId: string;

  constructor(config: MakeConfig) {
    const region = config.region || 'eu1';
    this.baseUrl = `https://${region}.make.com/api/v2`;
    this.apiKey = config.apiKey;
    this.teamId = config.teamId;
  }

  /**
   * Disparar um cenário específico do Make
   */
  async triggerScenario(
    scenarioId: string,
    data: ScenarioData
  ): Promise<MakeResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/scenarios/${scenarioId}/run`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Make API error: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        executionId: result.executionId,
      };
    } catch (error) {
      console.error('Erro ao disparar cenário Make:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  /**
   * Enviar dados via webhook
   */
  async sendWebhook(
    webhookUrl: string,
    data: ScenarioData
  ): Promise<MakeResponse> {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  /**
   * Listar todos os cenários da organização
   */
  async listScenarios(): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/organizations/${this.teamId}/scenarios`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Token ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Make API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao listar cenários:', error);
      return [];
    }
  }

  /**
   * Obter status de uma execução
   */
  async getExecutionStatus(executionId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/executions/${executionId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Token ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Make API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao obter status de execução:', error);
      return null;
    }
  }
}

// Exemplo de uso:
/*
import { MakeClient } from './make-client';

const makeClient = new MakeClient({
  apiKey: process.env.MAKE_API_KEY!,
  teamId: process.env.MAKE_TEAM_ID!,
  region: 'eu1'
});

// Disparar cenário
await makeClient.triggerScenario('scenario-id', {
  event: 'build',
  status: 'success'
});

// Enviar webhook
await makeClient.sendWebhook('https://hook.make.com/xxx', {
  message: 'Hello from VS Code'
});
*/
