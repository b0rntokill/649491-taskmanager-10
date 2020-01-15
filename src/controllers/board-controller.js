import BoardTaskComponent from '../components/board/task.js';
import MoreButtonComponent from '../components/board/more-button.js';
import CardFilterComponent, {SortType} from '../components/board/card/card-filter.js';
import NoCardComponent from '../components/board/card/no-card.js';
import {render, remove, RenderPosition} from '../utils/render.js';

import TaskController from '../controllers/task-controller.js';

const RENDER_TASK_COUNT = 8;
// Ошибка же была в том, что я не возвращал самого таскКонтроллера, только результат выполнения его рендера, так?
// const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
//   return tasks.forEach((task) => {
//     return new TaskController(taskListElement, onDataChange, onViewChange).render(task);
//   });
// };

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._renderTasksCount = RENDER_TASK_COUNT;

    this._noCardComponent = new NoCardComponent();
    this._boardFilterComponent = new CardFilterComponent();
    this._boardTaskComponent = new BoardTaskComponent();
    this._moreButtonComponent = new MoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._boardFilterComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noCardComponent, RenderPosition.BEFOREEND);
    }
    render(this._container.getElement(), this._boardFilterComponent, RenderPosition.BEFOREEND);
    render(this._container.getElement(), this._boardTaskComponent, RenderPosition.BEFOREEND);

    this._renderTasksList(this._tasks);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks;
        break;
    }

    this._boardTaskComponent.getElement().innerHTML = ``;

    this._renderTasksCount = RENDER_TASK_COUNT;
    this._showedTaskControllers = [];
    remove(this._moreButtonComponent);

    this._renderTasksList(sortedTasks);
  }

  _renderTasksList(tasks) {
    const newTasks = renderTasks(this._boardTaskComponent, tasks.slice(0, this._renderTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton(tasks);
  }

  _renderLoadMoreButton(tasks) {
    if (this._renderTasksCount >= tasks.length) {
      return;
    }

    const onMoreButtonClick = (evt) => {
      evt.preventDefault();
      const currentTaskRender = this._renderTasksCount;
      this._renderTasksCount += RENDER_TASK_COUNT;
      const newTasks = renderTasks(this._boardTaskComponent, tasks.slice(currentTaskRender, this._renderTasksCount), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (tasks.length <= this._renderTasksCount) {
        remove(this._moreButtonComponent);
      }
    };

    this._moreButtonComponent.setClickHandler(onMoreButtonClick);
    render(this._container.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}
