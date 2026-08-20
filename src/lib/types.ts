export type NodeStatus = 'mastered' | 'learning' | 'deficit' | 'locked';

export interface MicroQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  indicatesDeficitIn?: string; // Concept ID where the misconception stems from
}

export interface MicroQuiz {
  id: string;
  question: string;
  latex?: string;
  options: MicroQuizOption[];
  bloomLevel: 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating';
}

export interface ConceptNode {
  id: string;
  label: string;
  category: string;
  description: string;
  difficulty: number; // 1 to 5
  bloomLevel: string;
  prerequisites: string[]; // List of concept IDs that are direct prerequisites
  masteryScore: number; // 0.0 to 1.0 (P(L_t))
  status: NodeStatus;
  x: number;
  y: number;
  syllabusReference: string;
  summaryNote: string;
  quiz?: MicroQuiz;
}

export interface PrerequisiteEdge {
  id: string;
  source: string; // Prerequisite concept ID
  target: string; // Target concept ID
  relationType: 'requires' | 'extends' | 'applies';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  faculty: string;
  university: string;
  description: string;
  nodes: ConceptNode[];
  edges: PrerequisiteEdge[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  conceptId?: string;
  isSocraticQuestion?: boolean;
  suggestedResponses?: string[];
  activeConceptFocus?: string;
  masteryDelta?: number;
}

export interface AtRiskStudent {
  id: string;
  name: string;
  nim: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskScore: number; // 0-100%
  topBottleneck: string;
  lastActive: string;
  recommendedIntervention: string;
}

export interface ClassAnalytics {
  courseId: string;
  totalStudents: number;
  classAverageMastery: number; // 0-100%
  bottleneckConcepts: {
    conceptId: string;
    conceptLabel: string;
    failureRate: number; // percentage
    impactedStudents: number;
  }[];
  atRiskStudents: AtRiskStudent[];
}
