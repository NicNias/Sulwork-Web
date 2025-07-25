import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule, Edit, Trash, UserPlus, Plus, ChevronLeft, ChevronRight, ListTodo } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    LucideAngularModule.pick({
      Edit,
      Trash,
      UserPlus,
      Plus,
      ChevronLeft,
      ChevronRight,
      ListTodo
    })
  ],
  exports: [
    CommonModule,
    LucideAngularModule
  ]
})
export class SharedModule { }