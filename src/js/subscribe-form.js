import iziToast from 'izitoast';
import { ApiError, ApiService } from './services.js';

const SUBSCRIBE_FORM = document.querySelector('.subscribe-form');
const EMAIL_INPUT = document.querySelector('.subscribe-form__input');

function subscribeForm() {
  SUBSCRIBE_FORM.addEventListener('submit', async(event) => {
    event.preventDefault();
    const EMAIL_VALUE = EMAIL_INPUT.value;

    if (validateEmail(EMAIL_VALUE)) {
      try {
        const res = await ApiService.addSubscription(EMAIL_VALUE);

        if (EMAIL_INPUT.classList.contains('invalid')) {
          EMAIL_INPUT.classList.remove('invalid');
        }

        EMAIL_INPUT.value = '';

        iziToast.success({
          message:  res.message,
          position: 'bottomCenter',
        });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.statusCode === 409) {
            iziToast.warning({
              message: 'Provided email is already subscribed!',
              position: 'bottomCenter',
            });
          }
        }
      }
    }
    else {
      EMAIL_INPUT.classList.add('invalid');

      iziToast.warning({
        message: 'Provided email is not valid!',
        position: 'bottomCenter',
      });
    }
  })
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

subscribeForm();
