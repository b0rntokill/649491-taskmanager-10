import {formatTime, formatDate} from '../../../utils/common.js';
import AbstractComponent from '../../abstract-component.js';

const DEADLINE_COLOR = `red`;
const DEADLINE_CLASS = `card--deadline`;
const REPEAT_CLASS = `card--repeat`;

const createHashtagsMarkup = (hastags) => {
  return hastags.map((hashtag) => {
    return `<span class="card__hashtag-inner">
              <span class="card__hashtag-name">
                #${hashtag}
              </span>
            </span>`;
  }).join(``);
};

const createButtonMarkup = (name, isActive) => {
  return `<button type="button" class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}">
            ${name}
          </button>`;
};

const createTaskCardTemplate = (task) => {
  const hashtagsMarkup = createHashtagsMarkup([...task.tags]);

  const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
  const color = isExpired ? DEADLINE_COLOR : task.color;
  const deadlineClass = isExpired ? DEADLINE_CLASS : ``;
  const repeatClass = Object.values(task.repeatingDays).some(Boolean) ? REPEAT_CLASS : ``;

  const editButton = createButtonMarkup(`edit`, true);
  const archiveButton = createButtonMarkup(`archive`, task.isArchive);
  const favoritesButton = createButtonMarkup(`favorites`, task.isFavorite);

  const isDueDate = task.dueDate instanceof Date;
  const date = isDueDate ? formatDate(task.dueDate) : ``;
  const time = isDueDate ? formatTime(task.dueDate) : ``;

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  ${editButton}
                  ${archiveButton}
                  ${favoritesButton}
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${task.description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${date}</span>
                          <span class="card__time">${time}</span>
                        </p>
                      </div>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                      <span class="card__hashtag-inner">
                        ${hashtagsMarkup}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`;
};

export default class TaskCard extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskCardTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}
