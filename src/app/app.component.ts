import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Task Manager';
  newTask: string = '';
  tasks: { text: string; completed: boolean }[] = [];
  isDropdownOpen = false;

  addTask(): void {
    const trimmed = this.newTask.trim();
    if (!trimmed) {
      alert('Please enter a task');
      return;
    }
    this.tasks.push({ text: trimmed, completed: false });
    this.newTask = '';
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleComplete(task: { text: string; completed: boolean }): void {
    task.completed = !task.completed;
  }
}
