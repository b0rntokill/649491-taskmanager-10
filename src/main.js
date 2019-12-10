import MainControlComponent from './components/main/control.js';
import MainFilterComponent from './components/main/filter.js';
import BoardComponent from './components/board/board.js';
import BoardFilterComponent from './components/board/card/card-filter.js';
import BoardTaskComponent from './components/board/task.js';
import TaskCardEditComponent from './components/board/card/card-edit.js';
import TaskCardComponent from './components/board/card/card.js';
import NoCardComponent from './components/board/card/no-card.js';
import MoreButtonComponent from './components/board/more-button.js';
import {tasks} from './mock/mock-task.js';
import {renderElement, RenderPosition} from './utils.js';

const RENDER_TASK_COUNT = 8;
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const renderTask = (taskListelement, task) => {
  const taskComponent = new TaskCardComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  const replaceTaskToTaskEdit = () => {
    taskListelement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskEditComponent = new TaskCardEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  const replaceTaskEditToTask = () => {
    taskListelement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
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

  editButton.addEventListener(`click`, onEditButtonClick);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  renderElement(taskListelement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

renderElement(mainControl, new MainControlComponent().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainFilterComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderElement(main, boardComponent.getElement(), RenderPosition.BEFOREEND);

const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  renderElement(boardComponent.getElement(), new NoCardComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(boardComponent.getElement(), new BoardFilterComponent().getElement(), RenderPosition.BEFOREEND);
  renderElement(boardComponent.getElement(), new BoardTaskComponent().getElement(), RenderPosition.BEFOREEND);

  const moreButtonComponent = new MoreButtonComponent();
  renderElement(boardComponent.getElement(), moreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const boardTasks = boardComponent.getElement().querySelector(`.board__tasks`);

  let taskRenderCount = RENDER_TASK_COUNT;

  tasks.slice(0, taskRenderCount).forEach((task) => renderTask(boardTasks, task));

  const onMoreButtonClick = (evt) => {
    evt.preventDefault();
    const currentTaskRender = taskRenderCount;
    taskRenderCount += RENDER_TASK_COUNT;
    tasks.slice(currentTaskRender, taskRenderCount).forEach((task) => renderTask(boardTasks, task));

    if (tasks.length <= taskRenderCount) {
      moreButtonComponent.getElement().remove();
      moreButtonComponent.removeElement();
    }
  };

  moreButtonComponent.getElement().addEventListener(`click`, onMoreButtonClick);
}
