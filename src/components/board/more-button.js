
import AbstractComponent from './../abstract-component.js';

const createBoardMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class MoreButton extends AbstractComponent {
  getTemplate() {
    return createBoardMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
