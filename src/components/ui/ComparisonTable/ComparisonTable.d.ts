import type { ComparisonCriterionItem } from '../../../data/taller1.data.d';

export interface ComparisonTableProps {
  criteria: ComparisonCriterionItem[];
  columnAHeader?: string;
  columnBHeader?: string;
  firstColumnHeader?: string;
}
