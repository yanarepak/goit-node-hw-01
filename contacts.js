const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacs = await fs.readFile(contactsPath, "utf-8");
    console.log(contacs);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsId = JSON.parse(contacts).filter((contact) => {
      return contact.id == contactId;
    });
    console.log(contactsId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContacts = JSON.parse(contacts).filter(({ id }) => {
      return id != contactId;
    });
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.log(`delete contact: ${contactId}`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsArray = JSON.parse(contacts);

    const newContact = {
      id: `${contactsArray.length + 1}`,
      name,
      email,
      phone,
    };

    contactsArray.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    console.log(`${name} added to contacts`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
