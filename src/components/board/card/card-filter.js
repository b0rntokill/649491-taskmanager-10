import AbstractComponent from '../../abstract-component.js';

const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const createBoardFilterTemplate = () => {
  return `<div class="board__filter-list">
            <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
            <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
            <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
          </div>`;
};

export default class BoardFilter extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createBoardFilterTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}

export {SortType};
