const submitButton = document.getElementById('save-button');

const minifyTitle = (string) => string.split('').slice(10).join('') + '...';

const createNoteListButtons = () => {
  const arrayNotes = JSON.parse(localStorage.getItem('quickNotePad'));
  const 
  arrayNotes.forEach(({ titleContent }) => {
    const minifiedTitle = minifyTitle(titleContent);
    const button = document.createElement('button');
    button.innerText = minifiedTitle;
    button.id = titleContent;

  });
};

const localStorageHandler = (note) => {
  if (!localStorage.getItem('quickNotePad')) {
    const newLocalStorageArray = [note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  } else {
    const oldLocalStorageArray = JSON.parse(localStorage.getItem('quickNotePad'));
    const newLocalStorageArray = [...oldLocalStorageArray, note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  }
};

const addNote = (evt) => {
  evt.preventDefault();
  const titleContent = document.getElementById('title-field').value;
  const noteContent = document.getElementById('notes-input').value;
  const noteInfo = {
    titleContent,
    noteContent,
  };
  localStorageHandler(noteInfo);
};

window.onload = () => {
  submitButton.addEventListener('click', addNote);
};
