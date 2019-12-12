import BoardTaskComponent from './../components/board/task.js';
import MoreButtonComponent from './../components/board/more-button.js';
import BoardFilterComponent from './../components/board/card/card-filter.js';
import TaskCardEditComponent from './../components/board/card/card-edit.js';
import TaskCardComponent from './../components/board/card/card.js';
import NoCardComponent from './../components/board/card/no-card.js';
import {render, remove, replace, RenderPosition} from './../utils/render.js';

const RENDER_TASK_COUNT = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToTaskEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceTaskEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      replaceTaskEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEditButtonClick = (evt) => {
    evt.preventDefault();
    replaceTaskToTaskEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceTaskEditToTask();
  };

  const taskComponent = new TaskCardComponent(task);
  taskComponent.setEditButtonClickHandler(onEditButtonClick);

  const taskEditComponent = new TaskCardEditComponent(task);
  taskEditComponent.setSubmitHandler(onEditFormSubmit);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noCardComponent = new NoCardComponent();
    this._boardFilterComponent = new BoardFilterComponent();
    this._boardTaskComponent = new BoardTaskComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this.__noCardComponent, RenderPosition.BEFOREEND);
    }

    render(container, this._boardFilterComponent, RenderPosition.BEFOREEND);
    render(container, this._boardTaskComponent, RenderPosition.BEFOREEND);

    let taskRenderCount = RENDER_TASK_COUNT;
    tasks.slice(0, taskRenderCount).forEach((task) => renderTask(this._boardTaskComponent.getElement(), task));

    const onMoreButtonClick = (evt) => {
      evt.preventDefault();
      const currentTaskRender = taskRenderCount;
      taskRenderCount += RENDER_TASK_COUNT;
      tasks.slice(currentTaskRender, taskRenderCount).forEach((task) => renderTask(this._boardTaskComponent.getElement(), task));

      if (tasks.length <= taskRenderCount) {
        remove(this._moreButtonComponent);
      }
    };

    this._moreButtonComponent.setClickHandler(onMoreButtonClick);

    render(container, this._moreButtonComponent, RenderPosition.BEFOREEND);
  }
}
