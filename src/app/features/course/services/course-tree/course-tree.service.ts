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

  public loadBatches(batchFolder: CourseTreeNode,courseId: number): void {
    if (this.batchesLoaded) return;

    batchFolder.loading = true;

    this.batchService.getAllBatchesByCourseId(courseId).subscribe({
      next: (response) => {
        const batches = response.data ?? [];

        batchFolder.children = batches.map(batch => {
          const batchNode: CourseTreeNode = CourseTreeNodeFactory.create(batch.id, batch.name, 'batch', 1, true, batchFolder.id);
          const parentModuleNode: CourseTreeNode = CourseTreeNodeFactory.create(-2, 'Modules', 'modules-folder', batchNode.level + 1, true,batch.id);
          batchNode.children = [parentModuleNode];
          return batchNode;
        });

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
  public loadModulesForBatch(moduleFolder: CourseTreeNode): void {
    if (moduleFolder.loaded || moduleFolder.loading) return;

    moduleFolder.loading = true;
    this.fetchModules(moduleFolder, 0);
  }

  // Called when clicking "Load More" under a batch
  public loadNextModulePage(moduleFolder: CourseTreeNode): void {
    if (moduleFolder.loading || !moduleFolder.hasMore) return;

    moduleFolder.loading = true;
    this.fetchModules(moduleFolder, moduleFolder.page + 1);
  }

  private fetchModules(moduleFolder: CourseTreeNode, page: number): void {
    if (moduleFolder.parentId != null) {
      this.batchService.getAllModulesByBatch(moduleFolder.parentId, page).subscribe({
        next: (res) => {
          const modules = res.data ?? [];
          const isLastPage = res.last ?? true;

          // Convert ModuleResponse array into tree nodes along with its default folders
          const moduleNodes: CourseTreeNode[] = modules.map(module => {
            const moduleNode:CourseTreeNode = CourseTreeNodeFactory.create(module.id, module.name, 'module', moduleFolder.level + 2, true, moduleFolder.id);
            const parentChapterNode: CourseTreeNode = CourseTreeNodeFactory.create(-3,'Chapters','chapters-folder',moduleNode.level+1,true,module.id);
            moduleNode.children = [parentChapterNode];
            return moduleNode;
          });

          // Remove previous "load-more" node if appending new pages
          let currentChildren = this.filterLoadMoreNode(moduleFolder);
          currentChildren = [...currentChildren, ...moduleNodes];

          moduleFolder.page = page;
          moduleFolder.hasMore = !isLastPage;
          moduleFolder.loaded = true;
          moduleFolder.loading = false;

          // Append 'load-more' node if more pages exist
          if (moduleFolder.hasMore) {
            currentChildren.push(
              CourseTreeNodeFactory.create(-moduleFolder.id, 'Load More Modules...', 'load-more', moduleFolder.level + 2, false, moduleFolder.id, page + 1)
            );
          }

          moduleFolder.children = currentChildren;

          this.refreshTree();
        },
        error: (err) => {
          console.error('Failed to load modules', err);
          moduleFolder.loading = false;
        }
      });
    }
  }

  public loadChaptersForModule(chapterFolder: CourseTreeNode): void {
    if (chapterFolder.loaded || chapterFolder.loading) return;
    chapterFolder.loading = true;
    this.fetchChapters(chapterFolder,0);
  }

  private fetchChapters(chapterFolder:CourseTreeNode, page:number):void {
    if(chapterFolder.parentId){
      this.moduleService.getChaptersByModuleId(chapterFolder.parentId).subscribe({
        next: (res) => {
          const chapter = res.data ?? [];

          const chapterNodes:CourseTreeNode[] = chapter.map(c =>(
            CourseTreeNodeFactory.create(c.id,c.title,'chapter',chapterFolder.level+2,false, chapterFolder.id)
          ));


          let currentChildren = this.filterLoadMoreNode(chapterFolder);
          currentChildren = [...currentChildren, ...chapterNodes];

          chapterFolder.page = 0;
          chapterFolder.hasMore = false;
          chapterFolder.loaded = true;
          chapterFolder.loading = false;

          if(chapterFolder.hasMore){
            currentChildren.push(
              CourseTreeNodeFactory.create(-chapterFolder.id,'Load More Chapters...','load-more',chapterFolder.level+2,false, chapterFolder.id,page+1)
            );
          }

          chapterFolder.children = currentChildren;

          this.refreshTree();
        },
        error: (err) => {
          console.error('Failed to load chapters', err);
          chapterFolder.loading = false;
        }
      });
    }
  }

  filterLoadMoreNode(node:CourseTreeNode): CourseTreeNode[] {
    return node.children.filter(c => c.type !== 'load-more');
  }

  refreshTree():void{
    this.treeSubject.next([...this.treeSubject.value]);
  }
}
