import {createMainConrolTemplate} from './components/main/control.js';
import {createMainFilterTemplate} from './components/main/filter.js';
import {createBoardTemplate} from './components/board/board.js';
import {createBoardFilterTemplate} from './components/board/card/card-filter.js';
import {createBoardTaskTemplate} from './components/board/task.js';
import {createTaskCardEditTemplate} from './components/board/card/card-edit.js';
import {createTaskCardTemplate} from './components/board/card/card.js';
import {createBoardMoreButtonTemplate} from './components/board/more-button.js';
import {tasks} from './mock/mock-task.js';

const RENDER_TASK_COUNT = 8;
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const renderTemplate = (container, template, where = `beforeend`) => {
  container.insertAdjacentHTML(where, template);
};

renderTemplate(mainControl, createMainConrolTemplate());
renderTemplate(main, createMainFilterTemplate());
renderTemplate(main, createBoardTemplate());

const board = main.querySelector(`.board`);

renderTemplate(board, createBoardFilterTemplate());
renderTemplate(board, createBoardTaskTemplate());
renderTemplate(board, createBoardMoreButtonTemplate());

const boardTasks = main.querySelector(`.board__tasks`);

let taskRenderCount = RENDER_TASK_COUNT;

renderTemplate(boardTasks, createTaskCardEditTemplate(tasks[0]), `afterbegin`);
tasks.slice(1, taskRenderCount).forEach((task) => renderTemplate(boardTasks, createTaskCardTemplate(task), `beforeend`));

const moreButton = main.querySelector(`.load-more`);

const onMoreButtonClick = (evt) => {
  evt.preventDefault();
  const currentTaskRender = taskRenderCount;
  taskRenderCount += RENDER_TASK_COUNT;
  tasks.slice(currentTaskRender, taskRenderCount).forEach((task) => renderTemplate(boardTasks, createTaskCardTemplate(task), `beforeend`));

  if (tasks.length <= taskRenderCount) {
    moreButton.remove();
  }
};

moreButton.addEventListener(`click`, onMoreButtonClick);
