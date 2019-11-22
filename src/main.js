import {createMainConrolTemplate} from './components/main/control.js';
import {createMainFilterTemplate} from './components/main/filter.js';
import {createBoardTemplate} from './components/board/board.js';
import {createBoardFilterTemplate} from './components/board/card/card-filter.js';
import {createBoardTaskTemplate} from './components/board/task.js';
import {createTaskCardEditTemplate} from './components/board/card/card-edit.js';
import {createTaskCardTemplate} from './components/board/card/card.js';
import {createBoardMoreButtonTemplate} from './components/board/more-button.js';

const TASK_COUNT = 3;
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

renderTemplate(boardTasks, createTaskCardEditTemplate(), `afterbegin`);

const repeat = (count, fn) => {
  Array(count).fill(``).forEach(fn);
};

repeat(TASK_COUNT, () => {
  renderTemplate(boardTasks, createTaskCardTemplate());
});
