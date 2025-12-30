
export interface ReasoningStep {
  index: number;
  content: string;
}

export interface TransmutationResult {
  steps: ReasoningStep[];
  finalConclusion: string;
  identityReflection: string;
}
