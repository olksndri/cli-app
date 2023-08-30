const fs = require("fs").promises;
const path = require("path");
const idGenerator = require("./own_modules/idGenerator");

const contactsPath = path.format({
  dir: `${__dirname}\\db`,
  base: "contacts.json",
});

async function listContacts() {
  try {
    const byteQueue = await fs.readFile(contactsPath);
    const contacts = JSON.parse(byteQueue.toString());
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const byteQueue = await fs.readFile(contactsPath);
    const contacts = JSON.parse(byteQueue.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact ? contact : null;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const targetContact = await getContactById(contactId);
    if (!targetContact) {
      return null;
    } else {
      const newContacts = contactsList.filter(
        (contact) => contact.id !== contactId
      );
      const removingResult = await fs
        .writeFile(contactsPath, JSON.stringify(newContacts))
        .then(() => {
          return targetContact;
        })
        .catch((err) => {
          console.log(err.message);
        });
      return removingResult;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: idGenerator(),
    name,
    email,
    phone,
  };
  const contactsList = await listContacts()
    .then((res) => [newContact, ...res])
    .catch((err) => console.log(err.message));
  const addingResult = await fs
    .writeFile(contactsPath, JSON.stringify(contactsList))
    .then(() => newContact)
    .catch((err) => console.log(err.message));
  return addingResult;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
