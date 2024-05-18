document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const emailInput = document.getElementById('email get');
  const todoList = document.getElementById('todo-list');


  function createContactBox(name, email) {
      
      const contactBox = document.createElement('div');
      contactBox.classList.add('contact-box');

    
      const namePara = document.createElement('p');
      namePara.textContent = `Name: ${name}`;

    
      const emailPara = document.createElement('p');
      emailPara.textContent = `Email: ${email}`;

     
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', function () {
          
          contactBox.remove();
         
          removeFromLocalStorage(name, email);
      });
 contactBox.appendChild(namePara);
      contactBox.appendChild(emailPara);
      contactBox.appendChild(deleteBtn);

      return contactBox;
  }

  function saveToLocalStorage(name, email) {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push({ name, email });
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  function removeFromLocalStorage(name, email) {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts = contacts.filter(contact => contact.name !== name && contact.email !== email);
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  function displayContactsFromLocalStorage() {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.forEach(contact => {
          const { name, email } = contact;
          const contactBox = createContactBox(name, email);
          todoList.appendChild(contactBox);
          const lineBreak = document.createElement('hr');
          todoList.appendChild(lineBreak);
      });
  }

  
  displayContactsFromLocalStorage();

  todoForm.addEventListener('submit', function (event) {
      event.preventDefault(); 
      const name = todoInput.value.trim();
      const email = emailInput.value.trim();

      
      if (name !== '' && email !== '') {
          
          const contactBox = createContactBox(name, email);

          
          todoList.appendChild(contactBox);

         
          const lineBreak = document.createElement('hr');
          todoList.appendChild(lineBreak);

        
          saveToLocalStorage(name, email);

          
          todoInput.value = '';
          emailInput.value = '';
      }
  });
});
