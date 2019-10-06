import {
  required,
  maxLength,
  minValue,
  maxValue,
} from 'vuelidate/lib/validators';
import moment from 'moment';

export default {
  book: {
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
      minValue: minValue(moment('1800-01-01').valueOf()),
    },
  },
};
