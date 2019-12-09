import {MONTH_NAMES} from './../../../const.js';
import {formatTime, castTimeFormat, createElement} from './../../../utils.js';

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

const createTaskCardTemplate = (task) => {
  const hashtagsMarkup = createHashtagsMarkup([...task.tags]);

  const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
  const color = isExpired ? DEADLINE_COLOR : task.color;
  const deadlineClass = isExpired ? DEADLINE_CLASS : ``;
  const repeatClass = Object.values(task.repeatingDays).some(Boolean) ? REPEAT_CLASS : ``;

  const isDueDate = task.dueDate instanceof Date;
  const date = isDueDate ? `${castTimeFormat(task.dueDate.getDate())} ${MONTH_NAMES[task.dueDate.getMonth()].toUpperCase()}` : ``;
  const time = isDueDate ? `${formatTime(task.dueDate).toUpperCase()}` : ``;

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
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

export default class TaskCard {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskCardTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
