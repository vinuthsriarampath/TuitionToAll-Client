export type CourseTreeNodeType =
  | 'batch'
  | 'batches-folder'
  | 'modules-folder'
  | 'chapters-folder'
  | 'module'
  | 'chapter'
  | 'load-more';

export interface CourseTreeNode {

  id: number;

  title: string;

  type: CourseTreeNodeType;

  level: number;

  expandable: boolean;

  loading: boolean;

  loaded: boolean;

  parentId?: number;

  children: CourseTreeNode[];

  page: number;

  hasMore: boolean;
}
