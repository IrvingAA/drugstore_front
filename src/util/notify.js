import { Notify } from 'quasar';

const error = (title, message) => {
	Notify.create({
		color: 'negative',
		message: title,
		caption: message,
	});
};

const success = (title, message) => {
	Notify.create({
		color: 'positive',
		message: title,
		caption: message,
	});
};
const warning = (title, message) => {
  Notify.create({
    color: 'warning',
    message: title,
    caption: message,
  });
};
export default {
	error,
	success,
  warning
};
