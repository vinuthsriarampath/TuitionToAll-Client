import {Component, inject, OnInit} from '@angular/core';
import {CourseTreeService} from '@features/course/services/course-tree/course-tree.service';
import {ActivatedRoute} from '@angular/router';
import {CourseTreeNode} from '@features/course/dtos/modules/course-tree-node';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {MatIconButton} from '@angular/material/button';
import {ChevronDown, ChevronRight, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-course-tree',
  imports: [
    MatTree,
    MatTreeNode,
    MatIconButton,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    LucideAngularModule
  ],
  templateUrl: './course-tree.component.html',
  styleUrl: './course-tree.component.css'
})
export class CourseTreeComponent implements OnInit{

  private readonly treeService = inject(CourseTreeService);
  private readonly route = inject(ActivatedRoute);

  protected nodes: CourseTreeNode[] = [];

  childrenAccessor = (node: CourseTreeNode) => node.children ?? [];

  ngOnInit(): void {
    this.treeService.tree$.subscribe(nodes => {
        this.nodes = [...nodes];
        console.log(this.nodes);
    });
  }

  hasChild = (_: number, node: CourseTreeNode): boolean => {
    return node.expandable;
  };

  onNodeToggle(node: CourseTreeNode): void {

    if(node.type === 'batches-folder' && !node.loaded ){
      this.treeService.loadBatches(node, Number.parseInt(this.route.snapshot.params['courseId']));
    }

    if (node.type === 'batch' && !node.loaded) {
      this.treeService.loadModulesForBatch(node);
    }

    if (node.type === 'module' && !node.loaded) {
      this.treeService.loadChaptersForModule(node);
    }

  }

  onLoadMore(parentBatchId?: number): void {
    if (!parentBatchId) return;

    // Find parent batch in tree and load next page
    const root = this.nodes[0];
    const batchNode = root?.children?.find(b => b.id === parentBatchId);

    if (batchNode) {
      this.treeService.loadNextModulePage(batchNode);
    }
  }

  protected readonly ChevronDown = ChevronDown;
  protected readonly ChevronRight = ChevronRight;
}
