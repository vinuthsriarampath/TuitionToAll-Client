import {LucideIconData} from 'lucide-angular';

export interface SidebarMenuItem{
  title:string;
  icon:LucideIconData;
  route?:string;
  spacing?:boolean;
  subMenu?:boolean;
  subMenuItems?:SidebarMenuItem[];
}
