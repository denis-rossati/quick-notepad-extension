const submitButton = document.getElementById('save-button');
const deleteButton = document.getElementById('remove-note');

const reduceTitle = (string) => `${string.split('').slice(0, 10).join('')}...`;

const updateNoteListButtons = () => {
  const arrayNotes = JSON.parse(localStorage.getItem('quickNotePad'));
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  arrayNotes.forEach(({ titleContent }) => {
    const reducedTitle = reduceTitle(titleContent);
    const button = document.createElement('button');
    button.innerText = reducedTitle;
    button.id = titleContent;
    notesList.appendChild(button);
  });
};

/*  \/ to add a note */

const setNoteInLocalStorage = (note) => {
  if (!localStorage.getItem('quickNotePad')) {
    const newLocalStorageArray = [note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  } else {
    const oldLocalStorageArray = JSON.parse(localStorage.getItem('quickNotePad'));
    const newLocalStorageArray = [...oldLocalStorageArray, note];
    localStorage.setItem('quickNotePad', JSON.stringify(newLocalStorageArray));
  }
};

const manageNote = (evt) => {
  evt.preventDefault();
  const titleContent = document.getElementById('title-field').value;
  const noteContent = document.getElementById('notes-input').value;
  const noteInfo = {
    titleContent,
    noteContent,
  };
  setNoteInLocalStorage(noteInfo);
  updateNoteListButtons();
};

/* \/ to remove note */

const removeNote = () => {
  const oldLocalStorageArray = JSON.parse(localStorage.getItem('quickNotePad'));
  const titleOfNote = document.getElementById('title-field').value;
  const newNotes = oldLocalStorageArray.filter(({ titleContent }) => titleContent !== titleOfNote);
  localStorage.removeItem('quickNotePad');
  localStorage.setItem('quickNotePad', JSON.stringify(newNotes));
  updateNoteListButtons();
};

window.onload = () => {
  submitButton.addEventListener('click', manageNote);
  deleteButton.addEventListener('click', removeNote);
  updateNoteListButtons();
};
