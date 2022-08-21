import { Component, OnInit } from '@angular/core';
import { Task } from 'app/interfaces/Task';
import { TaskService } from 'app/services/task.service';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
	tasks: Task[] = [];

	constructor(private TaskService: TaskService) {}

	ngOnInit(): void {
		this.TaskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
	}

	deleteTask(task: Task) {
		this.TaskService.deleteTask(task).subscribe(
			() => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
		);
	}
	//Implement PUT
	toggleReminder(task: Task) {
		task.reminder = !task.reminder;
		this.TaskService.updateTaskReminder(task).subscribe();
	}
}
