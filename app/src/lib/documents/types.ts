import type { Organization, Assessment } from '@prisma/client';

export interface TemplateData {
  org: Organization;
  assessment?: Assessment;
  date: string;
  version: string;
}

export type DocumentType =
  | 'policy'           // Infoturbepoliitika
  | 'risk'             // Riskihinnang
  | 'incident'         // Intsidentide käsitlemise plaan
  | 'continuity'       // Varundamine ja taastamine (PROFESSIONAL)
  | 'supply_chain'     // Tarnijate riskihaldus (PROFESSIONAL)
  | 'training';        // Koolituste plaan (PROFESSIONAL)

export interface DocumentTemplate {
  type: DocumentType;
  title: string;
  titleEn: string;
  icon: string;
  plan: 'starter' | 'professional';
  description: string;
  requiredFields: string[];
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    type: 'policy',
    title: 'Infoturbepoliitika',
    titleEn: 'Information Security Policy',
    icon: '📋',
    plan: 'starter',
    description: 'Organisatsiooni infoturbe põhimõtted, reeglid ja vastutused',
    requiredFields: ['name', 'ceoName', 'securityOfficerName'],
  },
  {
    type: 'risk',
    title: 'Riskihinnang',
    titleEn: 'Risk Assessment',
    icon: '⚠️',
    plan: 'starter',
    description: 'IT varade ja riskide tuvastamine, analüüs ja hindamine',
    requiredFields: ['name', 'sector', 'itSystems'],
  },
  {
    type: 'incident',
    title: 'Intsidentide käsitlemise plaan',
    titleEn: 'Incident Response Plan',
    icon: '🚨',
    plan: 'starter',
    description: 'Küberintsidentide avastamise, reageerimise ja taastamise protseduurid',
    requiredFields: ['name', 'securityOfficerName', 'securityOfficerEmail'],
  },
  {
    type: 'continuity',
    title: 'Varundamise ja taastamise plaan',
    titleEn: 'Business Continuity & Disaster Recovery Plan',
    icon: '💾',
    plan: 'professional',
    description: 'Äri järjepidevuse tagamine ja IT süsteemide taastamise protseduurid',
    requiredFields: ['name', 'itSystems'],
  },
  {
    type: 'supply_chain',
    title: 'Tarnijate riskihaldus',
    titleEn: 'Supply Chain Risk Management',
    icon: '🔗',
    plan: 'professional',
    description: 'IT tarnijate ja teenusepakkujate turvalisuse hindamine',
    requiredFields: ['name', 'sector'],
  },
  {
    type: 'training',
    title: 'Töötajate koolituse plaan',
    titleEn: 'Security Awareness Training Plan',
    icon: '👥',
    plan: 'professional',
    description: 'Infoturbe teadlikkuse tõstmise ja koolituste programm',
    requiredFields: ['name', 'employeeCount'],
  },
];
