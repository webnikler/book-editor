import moment from 'moment';

const required = 'Поле обязательно для заполнения!';
const maxLength = num => `Поле должно содержать не больше ${num} символов!`;
const minValue = num => `Значение поля должно быть больше ${num}!`;
const maxValue = num => `Значение поля должно быть меньше ${num}!`;
const minDate = date => `Дата должна быть не раньше ${moment(date).format('DD.MM.YYYY')}!`;

export default {
  title: {
    required,
    maxLength: maxLength(30),
  },
  firstName: {
    required,
    maxLength: maxLength(20),
  },
  secondName: {
    required,
    maxLength: maxLength(20),
  },
  pagesCount: {
    required,
    minValue: minValue(1),
    maxValue: maxValue(10000),
  },
  publisherName: {
    maxLength: maxLength(30),
  },
  publicationYear: {
    minValue: minValue(1800),
  },
  releaseDate: {
    minValue: minDate('01.01.1800'),
  },
};
