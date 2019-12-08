import MainControlComponent from './components/main/control.js';
import MainFilterComponent from './components/main/filter.js';
import BoardComponent from './components/board/board.js';
import BoardFilterComponent from './components/board/card/card-filter.js';
import BoardTaskComponent from './components/board/task.js';
import TaskCardEditComponent from './components/board/card/card-edit.js';
import TaskCardComponent from './components/board/card/card.js';
import MoreButtonComponent from './components/board/more-button.js';
import {tasks} from './mock/mock-task.js';
import {renderElement, RenderPosition} from './utils.js';

const RENDER_TASK_COUNT = 8;
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderElement(mainControl, new MainControlComponent().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainFilterComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderElement(main, boardComponent.getElement(), RenderPosition.BEFOREEND);

const board = main.querySelector(`.board`);

renderElement(board, new BoardFilterComponent().getElement(), RenderPosition.BEFOREEND);
renderElement(board, new BoardTaskComponent().getElement(), RenderPosition.BEFOREEND);

const moreButtonComponent = new MoreButtonComponent();
renderElement(board, moreButtonComponent.getElement(), RenderPosition.BEFOREEND);

const boardTasks = boardComponent.getElement().querySelector(`.board__tasks`);

let taskRenderCount = RENDER_TASK_COUNT;

const renderTask = (task) => {
  const taskCardComponent = new TaskCardComponent(task);
  const taskCardEditComponent = new TaskCardEditComponent(task);

  const editButton = taskCardComponent.getElement().querySelector(`.card__btn--edit`);
  const editForm = taskCardComponent.getElement().querySelector(`.card__form`);

  const onEditButtonClick = (evt) => {
    evt.preventDefault();
    boardTasks.replaceChild(taskCardEditComponent.getElement(), taskCardComponent.getElement());
  };

  const onEditFormClick = (evt) => {
    evt.preventDefault();
    boardTasks.replaceChild(taskCardEditComponent.getElement(), taskCardComponent.getElement());
  };

  editButton.addEventListener(`click`, onEditButtonClick);
  editForm.addEventListener(`submit`, onEditFormClick);

  renderElement(boardTasks, taskCardComponent.getElement(), RenderPosition.BEFOREEND);
};

tasks.slice(0, taskRenderCount).forEach((task) => renderTask(task));

const onMoreButtonClick = (evt) => {
  evt.preventDefault();
  const currentTaskRender = taskRenderCount;
  taskRenderCount += RENDER_TASK_COUNT;
  tasks.slice(currentTaskRender, taskRenderCount).forEach((task) => renderTask(task));

  if (tasks.length <= taskRenderCount) {
    moreButtonComponent.getElement().remove();
    moreButtonComponent.removeElement();
  }
};

moreButtonComponent.getElement().addEventListener(`click`, onMoreButtonClick);
