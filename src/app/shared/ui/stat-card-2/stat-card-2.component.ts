import {Component, input} from '@angular/core';
import {CardShellComponent} from "@shared/ui";
import {LucideAngularModule, LucideIconData} from 'lucide-angular';
import {NgClass} from '@angular/common';

type IconColourType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'indigo';

@Component({
  selector: 'app-stat-card-2',
  imports: [
    CardShellComponent,
    LucideAngularModule,
    NgClass,
  ],
  templateUrl: './stat-card-2.component.html',
  styleUrl: './stat-card-2.component.css'
})
export class StatCard2Component {
  title = input.required<string>();
  description = input<string>();
  value = input.required<string | number>();
  icon = input<LucideIconData>();
  iconColour = input<IconColourType>('primary');

  loading = input<boolean>(false);

  get getIconColour() {
    switch (this.iconColour()){
      case 'primary': return 'text-sky-400';
      case 'secondary': return 'text-slate-400';
      case 'success': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'danger': return 'text-rose-400';
      case 'info': return 'text-cyan-400';
      case 'violet': return 'text-violet-400';
      case "indigo": return 'text-indigo-400';
      default: return 'text-sky-400'
    }

  }
}
