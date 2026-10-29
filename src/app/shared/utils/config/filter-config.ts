export type FilterFieldType = 'text' | 'select' | 'date' | 'number' | 'checkbox';

export interface FilterFieldConfig {
  key: string;                          // Matches the DTO property (e.g., 'status', 'courseId')
  label: string;                        // UI Label
  type: FilterFieldType;                // 'text', 'select', 'date', etc.
  placeholder?: string;
  options?: { label: string; value: any }[]; // For select or multi-select dropdowns
  colSpan?: string;                     // Tailwind grid column span classes (e.g., 'lg:col-span-2')
}
