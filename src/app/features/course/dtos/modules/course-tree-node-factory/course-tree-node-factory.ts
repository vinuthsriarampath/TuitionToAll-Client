import {CourseTreeNode, CourseTreeNodeType} from "../course-tree-node";

export class CourseTreeNodeFactory {
  static create(
    id: number,
    title: string,
    type: CourseTreeNodeType,
    level: number,
    expandable: boolean,
    parentId?: number,
    page?: number,
  ): CourseTreeNode {

    return {
      id,
      title,
      type,
      level,
      expandable,
      loading: false,
      loaded: false,
      parentId,
      children: [],
      page: page ?? 0,
      hasMore: false,
    };
  }

}
