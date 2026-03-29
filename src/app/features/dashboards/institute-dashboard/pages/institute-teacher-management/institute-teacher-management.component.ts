import {Component, inject, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PageTitleComponent} from '../../../../../shared/components/page-title/page-title.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {CreateVacancyDialogComponent} from './models/create-vacancy-dialog/create-vacancy-dialog.component';

@Component({
  selector: 'app-institute-teacher-management',
  imports: [
    NgClass,
    FormsModule,
    PageTitleComponent,
    NgForOf,
    NgIf,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer
  ],
  templateUrl: './institute-teacher-management.component.html',
  styleUrl: './institute-teacher-management.component.css'
})
export class InstituteTeacherManagementComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  private readonly dialog = inject(MatDialog);

  selectedTeacher: any = null;

  stats = {
    total: 3,
    active: 2,
    inactive: 1
  };

  teachers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      dp: 'https://i.pravatar.cc/40?img=1',
      status: 'ACTIVE',
      joinedDate: '2026-01-10'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      dp: 'https://i.pravatar.cc/40?img=2',
      status: 'ACTIVE',
      joinedDate: '2026-02-15'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    },
    {
      id: 3,
      name: 'Alex Brown',
      email: 'alex@example.com',
      dp: 'https://i.pravatar.cc/40?img=3',
      status: 'INACTIVE',
      joinedDate: '2025-12-01'
    }
  ];

  openProfileDrawer(teacher: any) {
    this.selectedTeacher = teacher;
    this.drawer.open();
  }

  deactivateTeacher(teacher: any) {
    teacher.status = 'INACTIVE';
  }

  activateTeacher(teacher: any) {
    teacher.status = 'ACTIVE';
  }

  openCreateVacancy() {
    const dialogRef = this.dialog.open(CreateVacancyDialogComponent,{
      maxWidth: '100vh',
      width: '500%',
      panelClass: 'create-vacancy-dialog',
    })

    dialogRef.afterOpened().subscribe(() => {
      document.querySelector('input')?.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selectedTeacher = result;
    });
  }
  navigateToVacancies() {}

}
