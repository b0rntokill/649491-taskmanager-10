import {COLORS_LIST} from './../const.js';

const DESCRIPTION_LIST = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const TAGS_LIST = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const ARRAY_ELEMENT_FIRST = 0;
const DAY_WEEK_FIRST = 0;
const MIN_TAGS = 0;
const DAY_WEEK_LAST = 7;
const MAX_TAGS = 3;
const TASK_COUNT = 22;

const repeatingDaysDefault = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

const getRandomValue = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (array) => {
  return array[getRandomValue(ARRAY_ELEMENT_FIRST, array.length - 1)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const shift = Math.random() > 0.5 ? 1 : -1;
  const dateShift = getRandomValue(DAY_WEEK_FIRST, DAY_WEEK_LAST) * shift;
  targetDate.setDate(targetDate.getDate() + dateShift);
  return targetDate;
};

const getRandomTagsSet = (array) => {
  const randomTags = array.filter(() => Math.random() > 0.5).slice(MIN_TAGS, MAX_TAGS);
  return new Set(randomTags);
};

const getRepeatingDays = () => {
  return Object.keys(repeatingDaysDefault).reduce((acc, cur) =>
    Object.assign(acc, {[cur]: Math.random() > 0.5}), {});
};

const getDueDate = () => {
  return Math.random() > 0.5 ? null : getRandomDate();
};

const getRandomBooleanValue = () => {
  return Math.random() > 0.5;
};

const getRandomTask = () => {
  const dueDate = getDueDate();
  return {
    description: getRandomArrayItem(DESCRIPTION_LIST),
    dueDate,
    repeatingDays: dueDate ? repeatingDaysDefault : getRepeatingDays(),
    tags: getRandomTagsSet(TAGS_LIST),
    color: getRandomArrayItem(COLORS_LIST),
    isFavorite: getRandomBooleanValue(),
    isArchive: getRandomBooleanValue()
  };
};

const getRandomTasks = (count) => {
  return new Array(count).fill(``).map(getRandomTask);
};

const tasks = getRandomTasks(TASK_COUNT);

export {tasks};
