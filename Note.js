        if (localStorage.getItem('loggedIn') === 'true') {
            showNotes();
        } else {
            showLoginForm();
        }

        function showLoginForm() {
            document.getElementById('loginForm').style.display = 'block';
        }

        function login(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Basic authentication, replace with a secure authentication method in a real application
            if (username === 'mohamed' && password === 'Mohamed') {
                localStorage.setItem('loggedIn', 'true');
                showNotes();
            } else {
                alert('Invalid username or password');
            }
        }

        function showNotes() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'inline-block';

            const noteList = document.getElementById('noteList');
            noteList.innerHTML = '';

            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            savedNotes.forEach((note, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${note}</span>
                    <div class="action-buttons">
                        <button onclick="editNote(${index})">Edit</button>
                        <button onclick="deleteNote(${index})">Delete</button>
                    </div>
                `;
                noteList.appendChild(li);
            });
        }

        function addNote() {
            const noteInput = document.getElementById('noteInput');
            const newNote = noteInput.value.trim();

            if (newNote !== '') {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
                savedNotes.push(newNote);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                noteInput.value = '';
                showNotes();
            }
        }

        function editNote(index) {
            const editedNote = prompt('Edit note:', '');
            if (editedNote !== null) {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
                savedNotes[index] = editedNote.trim();
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                showNotes();
            }
        }

        function deleteNote(index) {
            const confirmDelete = confirm('Are you sure you want to delete this note?');
            if (confirmDelete) {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
                savedNotes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                showNotes();
            }
        }

        function logout() {
            localStorage.setItem('loggedIn', 'false');
            document.getElementById('logoutBtn').style.display = 'none';
            showLoginForm();
        }