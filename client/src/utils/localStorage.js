export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const deleteBook = (deletedId) => {
  const savedBooks = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBooks) {
    return false;
  }

  const updatedSavedBooks = savedBooks?.filter((savedBook) => savedBook !== deletedId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBooks));

  return true;
};
