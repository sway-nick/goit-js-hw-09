const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

// alias for formState as referenced in the task specification
const formState = formData;

const form = document.querySelector('.feedback-form');

populateForm();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const fieldName = event.target.name;
  if (fieldName in formData) {
    formData[fieldName] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) {
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing stored form data:', error);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formState);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
}
