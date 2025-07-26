import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule, Edit, Trash, UserPlus, Plus, ChevronLeft, ChevronRight, ListTodo } from 'lucide-angular';

const lucideIcons = {
  Edit,
  Trash,
  UserPlus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ListTodo
};

const LucideIconsModule = LucideAngularModule.pick(lucideIcons);

@NgModule({
  imports: [
    CommonModule,
    LucideAngularModule.pick(lucideIcons)
  ],
  exports: [
    CommonModule,
    LucideAngularModule
  ]
})
export class SharedModule { }