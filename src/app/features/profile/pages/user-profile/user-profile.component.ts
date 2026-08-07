import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarComponent} from '@shared/components/navbar/navbar.component';
import {User} from '../../dtos/response/user';
import {UserService} from '../../services/user/user.service';
import {LucideAngularModule} from 'lucide-angular';
import {environment} from '@env/environment.development';
import {ProfileCoverComponent} from '@features/profile/components/profile-cover/profile-cover.component';
import {ProfileIntroComponent} from '@features/profile/components/profile-intro/profile-intro.component';
import {ProfileTabsComponent} from '@features/profile/components/profile-tabs/profile-tabs.component';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    LucideAngularModule,
    CardShellComponent,
    ProfileCoverComponent,
    ProfileIntroComponent,
    ProfileTabsComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  protected loading: boolean = false;
  protected isSameUser: boolean = false;
  protected currentUser!: User;
  protected profileUser!:User;

  private readonly userService: UserService = inject(UserService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router:Router = inject(Router);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const userSlug = params.get('userSlug') ?? '';
      this.loadUserData(userSlug);
    });

    this.userService.currentUser$.subscribe(user => {
      if(user) this.currentUser = structuredClone(user);
    })
  }

  private loadUserData(userSlug: string) {
    this.triggerLoading();
    this.userService.findUserByUserSlug(userSlug).subscribe({
      next: (res) => {
        const user: User = res.data!;

        this.profileUser = structuredClone(user);
        this.isSameUser = this.currentUser.userSlug === user.userSlug;
        this.triggerLoading();
      },
      error: () =>{
        void this.router.navigate(['app']);
      }
    });
  }

  protected updateProfileDetails = (res: any) => {
    this.profileUser = structuredClone(res);
    if(this.isSameUser) this.userService.setCurrentUser(this.profileUser);
  }

  private triggerLoading() {
    this.loading = !this.loading;
  }
  protected readonly environment = environment;
}
