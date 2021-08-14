const submitButton = document.getElementById('save-button');

const minifyTitle = (string) => `${string.split('').slice(0, 10).join('')}...`;

const updateNoteListButtons = () => {
  const arrayNotes = JSON.parse(localStorage.getItem('quickNotePad'));
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  arrayNotes.forEach(({ titleContent }) => {
    const minifiedTitle = minifyTitle(titleContent);
    const button = document.createElement('button');
    button.innerText = minifiedTitle;
    button.id = titleContent;
    notesList.appendChild(button);
  });
};

const addNoteToLocalStorage = (note) => {
  if (!localStorage.getItem('quickNotePad')) {
    const newLocalStorageArray = [note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  } else {
    const oldLocalStorageArray = JSON.parse(localStorage.getItem('quickNotePad'));
    const newLocalStorageArray = [...oldLocalStorageArray, note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  }
};

const createNoteObject = (evt) => {
  evt.preventDefault();
  const titleContent = document.getElementById('title-field').value;
  const noteContent = document.getElementById('notes-input').value;
  const noteInfo = {
    titleContent,
    noteContent,
  };
  addNoteToLocalStorage(noteInfo);
  updateNoteListButtons();
};

window.onload = () => {
  submitButton.addEventListener('click', addNote);
  updateNoteListButtons();
};
