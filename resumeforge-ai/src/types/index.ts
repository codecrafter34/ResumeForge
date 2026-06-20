export type ModuleType = 
  | "bullet"
  | "keyword"
  | "summary"
  | "enhancer"
  | "actionVerb"
  | "atsScore"
  | "templates";

export interface HistoryItem {
  id: string;
  module: ModuleType;
  input: any;
  output: any;
  timestamp: number;
}
