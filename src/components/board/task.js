import AbstractComponent from './../abstract-component.js';

const createBoardTaskTemplate = () => {
  return `<div class="board__tasks">
  </div>`;
};

export default class BoardTask extends AbstractComponent {
  getTemplate() {
    return createBoardTaskTemplate();
  }
}
