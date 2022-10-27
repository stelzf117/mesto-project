export function isLoading(poupForm, submitButtonSelector, loading) {
  const button = poupForm.querySelector(submitButtonSelector);
  if (loading) {
    button.textContent = 'Сохранение...'
  }
  else {
    button.textContent = 'Сохранить'
  }
}