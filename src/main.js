import MainControlComponent from './components/main/control.js';
import MainFilterComponent from './components/main/filter.js';
import BoardComponent from './components/board/board.js';
import {tasks} from './mock/mock-task.js';
import {render, RenderPosition} from './utils/render.js';

import BoardController from './controllers/board-controller.js';

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, new MainControlComponent(), RenderPosition.BEFOREEND);
render(main, new MainFilterComponent(tasks), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(main, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
