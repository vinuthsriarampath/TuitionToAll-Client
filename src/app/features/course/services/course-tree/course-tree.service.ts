import {inject, Injectable} from '@angular/core';
import {CourseTreeNodeFactory} from '@features/course/dtos/modules/course-tree-node-factory/course-tree-node-factory';
import {CourseTreeNode} from '@features/course/dtos/modules/course-tree-node';
import {BehaviorSubject} from 'rxjs';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {ModuleService} from '@features/module/services/module/module.service';

@Injectable({
  providedIn: 'root'
})
export class CourseTreeService{
  private readonly batchService = inject(BatchService);
  private readonly moduleService = inject(ModuleService);

  private readonly treeSubject = new BehaviorSubject<CourseTreeNode[]>([]);

  private batchesLoaded = false;

  readonly tree$ = this.treeSubject.asObservable();

  constructor(){

    const parentBatchesNode: CourseTreeNode = CourseTreeNodeFactory.create(-1, 'Batches', 'batches-folder', 0, true);

    this.treeSubject.next([parentBatchesNode]);
  }

  loadBatches(batchFolder: CourseTreeNode,courseId: number): void {
    if (this.batchesLoaded) return;

    batchFolder.loading = true;

    this.batchService.getAllBatchesByCourseId(courseId).subscribe({
      next: (response) => {
        const batches = response.data ?? [];

        batchFolder.children = batches.map(batch => (
          CourseTreeNodeFactory.create(batch.id, batch.name, 'batch', 1, true)
        ));

        batchFolder.page = 0;
        batchFolder.hasMore = false;
        batchFolder.loaded = true;
        batchFolder.loading = false;

        this.refreshTree();
        this.batchesLoaded = true;
      },
      error: (err) => console.error('Failed to load batches', err)
    });
  }

  // Called when expanding a Batch node for the first time
  loadModulesForBatch(batchNode: CourseTreeNode): void {
    if (batchNode.loaded || batchNode.loading) return;

    batchNode.loading = true;
    this.fetchModules(batchNode, 0);
  }

  // Called when clicking "Load More" under a batch
  loadNextModulePage(batchNode: CourseTreeNode): void {
    if (batchNode.loading || !batchNode.hasMore) return;

    batchNode.loading = true;
    this.fetchModules(batchNode, batchNode.page + 1);
  }

  private fetchModules(batchNode: CourseTreeNode, page: number): void {
    this.batchService.getAllModulesByBatch(batchNode.id, page).subscribe({
      next: (res) => {
        const modules = res.data ?? [];
        const isLastPage = res.last ?? true;

        // Convert ModuleResponse array into tree nodes
        const moduleNodes: CourseTreeNode[] = modules.map(m => (
          CourseTreeNodeFactory.create(m.id,m.name,'module',batchNode.level+2,true,batchNode.id)
        ));

        // Remove previous "load-more" node if appending new pages
        let currentChildren = this.filterLoadMoreNode(batchNode);
        currentChildren = [...currentChildren, ...moduleNodes];

        batchNode.page = page;
        batchNode.hasMore = !isLastPage;
        batchNode.loaded = true;
        batchNode.loading = false;

        // Append 'load-more' node if more pages exist
        if (batchNode.hasMore) {
          currentChildren.push(
            CourseTreeNodeFactory.create(-batchNode.id,'Load More Modules...','load-more',batchNode.level+2,false,batchNode.id,page+1)
          );
        }

        const parentModuleNode: CourseTreeNode = CourseTreeNodeFactory.create(-2,'Modules','modules-folder',batchNode.level+1,true);
        parentModuleNode.children = currentChildren;

        batchNode.children = [parentModuleNode];

        this.refreshTree();
      },
      error: (err) => {
        console.error('Failed to load modules', err);
        batchNode.loading = false;
      }
    });
  }

  loadChaptersForModule(moduleNode: CourseTreeNode): void {
    if (moduleNode.loaded || moduleNode.loading) return;
    moduleNode.loading = true;
    this.fetchChapters(moduleNode,0);
  }

  fetchChapters(moduleNode:CourseTreeNode, page:number):void {
    this.moduleService.getChaptersByModuleId(moduleNode.id).subscribe({
      next: (res) => {
        const chapter = res.data ?? [];

        const chapterNodes:CourseTreeNode[] = chapter.map(c =>(
          CourseTreeNodeFactory.create(c.id,c.title,'chapter',moduleNode.level+2,false, moduleNode.id)
        ));


        let currentChildren = this.filterLoadMoreNode(moduleNode);
        currentChildren = [...currentChildren, ...chapterNodes];

        moduleNode.page = 0;
        moduleNode.hasMore = false;
        moduleNode.loaded = true;
        moduleNode.loading = false;

        if(moduleNode.hasMore){
          currentChildren.push(
            CourseTreeNodeFactory.create(-moduleNode.id,'Load More Chapters...','load-more',moduleNode.level+2,false, moduleNode.id,page+1)
          );
        }

        const parentChapterNode: CourseTreeNode = CourseTreeNodeFactory.create(-3,'Chapters','chapters-folder',moduleNode.level+1,currentChildren.length > 0);
        parentChapterNode.loaded = true;
        parentChapterNode.children = currentChildren;

        moduleNode.children = [parentChapterNode];

        this.refreshTree();
      },
      error: (err) => {
        console.error('Failed to load chapters', err);
        moduleNode.loading = true;
      }
    });
  }

  filterLoadMoreNode(node:CourseTreeNode): CourseTreeNode[] {
    return node.children.filter(c => c.type !== 'load-more');
  }

  refreshTree():void{
    this.treeSubject.next([...this.treeSubject.value]);
  }
}
