import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon?: 'edit' | 'trash' | 'plus' | 'user-plus' | 'chevron-left' | 'chevron-right' | 'list-todo';
  @Input() color: 'gray' | 'red' | 'green' = 'gray';
  @Input() extraClasses: string = '';
  @Input() disabled = false;

  @Output() action = new EventEmitter<void>();

  get buttonClass(): string {
    const base = 'w-full text-white p-3 rounded flex gap-2 items-center transition-colors duration-200 select-none';

    if (this.disabled) {
      return `${base} bg-gray-400 cursor-not-allowed ${this.extraClasses}`;
    }

    const colorMap: Record<string, string> = {
      gray: 'bg-gray-500 hover:bg-gray-600 cursor-pointer',
      red: 'bg-red-600 hover:bg-red-700 cursor-pointer',
      green: 'bg-green-600 hover:bg-green-700 cursor-pointer',
    };

    return `${base} ${colorMap[this.color]} ${this.extraClasses}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.action.emit();
    }
  }
}
