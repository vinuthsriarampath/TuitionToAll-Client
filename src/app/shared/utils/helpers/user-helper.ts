import {RoleDetails} from '@features/role/dtos/RoleDetails';
import {Institute} from '@features/institute/dtos/response/institute';
import {Teacher} from '@features/teacher/dtos/responses/teacher';
import {Student} from '@features/student/dtos/responses/student';
import {User} from '@features/profile/dtos/response/user';
import {environment} from '@env/environment.development';

export class UserHelper {
  static isStudent(role: string | undefined, details: RoleDetails | undefined): details is Student {
    return role === 'student';
  }

  static isTeacher(role: string | undefined, details: RoleDetails | undefined): details is Teacher {
    return role === 'teacher';
  }

  static isInstitute(role: string | undefined, details: RoleDetails | undefined): details is Institute {
    return role === 'institute';
  }

  static getDisplayName(user: User): string {
    const role = user.role?.role;
    const details = user.details;

    if (this.isStudent(role, details) || this.isTeacher(role, details)) {
      return `${details.firstName ?? ''} ${details.lastName ?? ''}`.trim();
    }

    if (this.isInstitute(role, details)) {
      return details.instituteName ?? '';
    }

    return 'User';
  }

  static getProfileId(user: User): number {
    return user.details?.id ?? -1;
  }

  static getProfileImageUrl(user: User): string {
    return user.dp ? `${environment.USER_PROFILE_API}${user.dp}` : 'profile_logo.png';
  }

  static getProfileBannerUrl(user: User): string {
    return user.banner ? `${environment.USER_PROFILE_API}${user.banner}` : 'beach.jpg';
  }

  static hasProfilePicture(user: User): boolean {
    return !!user.dp;
  }

  static hasProfileBanner(user: User): boolean {
    return !!user.banner;
  }

  static getUserDob(user: User): string | Date {
    if (this.isStudent(user.role?.role, user.details) || this.isTeacher(user.role?.role, user.details)) {
      return user.details?.dob ?? "N/A";
    }
    return "N/A";
  }
}
