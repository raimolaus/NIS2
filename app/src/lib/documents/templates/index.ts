import { generatePolicyTemplate } from './policy';
import { generateRiskTemplate } from './risk';
import { generateIncidentTemplate } from './incident';
import { generateContinuityTemplate } from './continuity';
import { generateSupplyChainTemplate } from './supply_chain';
import { generateTrainingTemplate } from './training';
import type { TemplateData, DocumentType } from '../types';

export function generateTemplate(type: DocumentType, data: TemplateData): string {
  switch (type) {
    case 'policy':
      return generatePolicyTemplate(data);
    case 'risk':
      return generateRiskTemplate(data);
    case 'incident':
      return generateIncidentTemplate(data);
    case 'continuity':
      return generateContinuityTemplate(data);
    case 'supply_chain':
      return generateSupplyChainTemplate(data);
    case 'training':
      return generateTrainingTemplate(data);
    default:
      throw new Error(`Unknown document type: ${type}`);
  }
}

export {
  generatePolicyTemplate,
  generateRiskTemplate,
  generateIncidentTemplate,
  generateContinuityTemplate,
  generateSupplyChainTemplate,
  generateTrainingTemplate
};
