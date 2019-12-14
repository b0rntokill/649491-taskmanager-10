import {FILTER_NAMES} from './../../const.js';
import AbstractComponent from './../abstract-component.js';

const filterCountMap = {
  "all": (tasksArray) => tasksArray.length,
  "overdue": (tasksArray) => tasksArray.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length,
  "today": (tasksArray) => tasksArray.filter((task) => task.dueDate instanceof Date && task.dueDate === Date.now()).length,
  "favorites": (tasksArray) => tasksArray.filter((task) => task.isFavorite).length,
  "repeating": (tasksArray) => tasksArray.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length,
  "tags": (tasksArray) => tasksArray.filter((task) => task.tags.size).length,
  "archive": (tasksArray) => tasksArray.filter((task) => task.isArchive).length
};

const generateFilters = (filters, tasksArray) => {
  return filters.map((filter) => {
    return {
      name: filter,
      count: filterCountMap[filter](tasksArray),
    };
  });
};

const createFiltersMarkup = (filters, isChecked) => {
  return filters.map((filter) => {
    const {name, count} = filter;
    return `<input
              type="radio"
              id="filter__${name}"
              class="filter__input visually-hidden"
              name="filter"
              ${isChecked ? `checked` : ``}
            />
            <label for="filter__${name}" class="filter__label">${name} <span class="filter__${name}-count">${count}</span></label
            >`;
  }).join(``);
};

const createMainFilterTemplate = (tasks) => {
  const filters = generateFilters(FILTER_NAMES, tasks);
  const filtersMarkup = createFiltersMarkup(filters);
  return `<section class="main__filter filter container">${filtersMarkup}</section>`;
};

export default class MainFilter extends AbstractComponent {
  constructor(tasks) {
    super();
    this._tasks = tasks;
  }

  getTemplate() {
    return createMainFilterTemplate(this._tasks);
  }
}
