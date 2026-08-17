import {Component, input} from '@angular/core';
import {InstituteJobsComponent} from "@features/profile/pages/institute-jobs/institute-jobs.component";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {UserCoursesComponent} from "@features/course/components/user-courses/user-courses.component";
import {UserPostsComponent} from "@features/posts/components/user-posts/user-posts.component";
import {User} from '@features/user/dtos/responses/user';
import {UserHelper} from '@shared/utils/helpers/user-helper';

@Component({
  selector: 'app-profile-tabs',
    imports: [
        InstituteJobsComponent,
        MatTab,
        MatTabContent,
        MatTabGroup,
        UserCoursesComponent,
        UserPostsComponent
    ],
  templateUrl: './profile-tabs.component.html',
  styleUrl: './profile-tabs.component.css'
})
export class ProfileTabsComponent {
  profileUser= input.required<User>();
  currentUser = input.required<User>();
  isSameUser = input.required<boolean>();
  protected readonly UserHelper = UserHelper;
}
