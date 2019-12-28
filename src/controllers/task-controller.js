import TaskCardEditComponent from '../components/board/card/card-edit.js';
import TaskCardComponent from '../components/board/card/card.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskCardComponent(task);
    this._taskEditComponent = new TaskCardEditComponent(task);

    const onEditButtonClick = (evt) => {
      evt.preventDefault();
      this._replaceTaskToTaskEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    };

    const onFavoritesButtonClick = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    };

    const onArchiveButtonClick = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      this._replaceTaskEditToTask();
    };

    this._taskComponent.setEditButtonClickHandler(onEditButtonClick);
    this._taskComponent.setFavoritesButtonClickHandler(onFavoritesButtonClick);
    this._taskComponent.setArchiveButtonClickHandler(onArchiveButtonClick);

    this._taskEditComponent.setSubmitHandler(onEditFormSubmit);

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container.getElement(), this._taskComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceTaskEditToTask();
    }
  }

  _replaceTaskToTaskEdit() {
    this._onViewChange();

    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _replaceTaskEditToTask() {
    // Вот тут пока не понятно. Зачем резет и что будет если его не сделать.
    this._taskEditComponent.reset();

    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      this._replaceTaskEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
