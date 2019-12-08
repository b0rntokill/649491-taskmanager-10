import {MONTH_NAMES, COLORS_LIST, DAYS} from './../../../const.js';
import {formatTime, castTimeFormat, createElement} from './../../../utils.js';

const REPEAT_CLASS = `card--repeat`;
const ANSWER_NO = `no`;
const ANSWER_YES = `yes`;

const createColorsMarkup = (colors, currentColor) => {
  return colors.map((color) => {
    return `<input
              type="radio"
              id="color-${color}-4"
              class="card__color-input card__color-input--${color} visually-hidden"
              name="color"
              value="${color}"
              ${currentColor === color ? `checked` : ``}
            />
            <label
              for="color-${color}-4"
              class="card__color card__color--${color}"
              >${color}</label
            >`;
  }).join(``);
};

const createHashtagsMarkup = (tags) => {
  return tags.map((tag) => {
    return `<span class="card__hashtag-inner">
              <input
                type="hidden"
                name="hashtag"
                value="#${tag}"
                class="card__hashtag-hidden-input"
              />
              <p class="card__hashtag-name">
                #${tag}
              </p>
              <button type="button" class="card__hashtag-delete">
                delete
              </button>
            </span>`;
  }).join(``);
};

const createRepeatingDayMarkup = (days, repeatingDays) => {
  return days.map((day) => {
    const isChecked = repeatingDays[day];
    return `<input
              class="visually-hidden card__repeat-day-input"
              type="checkbox"
              id="repeat-${day}-4"
              name="repeat"
              value="${day}"
              ${isChecked ? `checked` : ``}
            />
            <label class="card__repeat-day" for="repeat-${day}-4"
              >${day}</label
            >`;
  }).join(``);
};

const createTaskCardEditTemplate = (task) => {
  const isRepeat = Object.values(task.repeatingDays).some(Boolean);
  const repeatClass = isRepeat ? REPEAT_CLASS : ``;
  const repeatQuestion = isRepeat ? ANSWER_YES : ANSWER_NO;

  const isDueDate = task.dueDate instanceof Date;
  const dateQuestion = isDueDate ? ANSWER_YES : ANSWER_NO;
  const date = isDueDate ? `${castTimeFormat(task.dueDate.getDate())} ${MONTH_NAMES[task.dueDate.getMonth()].toUpperCase()}` : ``;
  const time = isDueDate ? `${formatTime(task.dueDate).toUpperCase()}` : ``;

  const hashtagsMarkup = createHashtagsMarkup([...task.tags]);
  const repeatingDaysMarkup = createRepeatingDayMarkup(DAYS, task.repeatingDays);
  const colorsMarkup = createColorsMarkup(COLORS_LIST, task.color);

  return `<article class="card card--edit card--${task.color} ${repeatClass}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >Here is a card with filled data</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${dateQuestion}</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${date} ${time}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${repeatQuestion}</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${repeatingDaysMarkup}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${hashtagsMarkup}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsMarkup}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
};

class TaskCardEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskCardEditTemplate(this._task);
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

export {TaskCardEdit as default};
