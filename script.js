document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentText = document.getElementById('comment-text');
    const commentsContainer = document.getElementById('comments-container');

    // Cargar comentarios desde localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Función para mostrar los comentarios
    function renderComments() {
        commentsContainer.innerHTML = ''; // Limpiar comentarios previos
        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p><strong>${comment.name}:</strong> ${comment.text}</p>
                <button onclick="editComment(${index})">Editar</button>
                <button onclick="deleteComment(${index})">Eliminar</button>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }

    // Función para agregar un comentario
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newComment = {
            name: 'Usuario', // Puedes modificar esto para incluir un campo de nombre
            text: commentText.value
        };
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments)); // Guardar comentarios en localStorage
        commentText.value = ''; // Limpiar campo de texto
        renderComments();
    });

    // Función para editar un comentario
    window.editComment = function(index) {
        const newText = prompt('Edita tu comentario:', comments[index].text);
        if (newText !== null) {
            comments[index].text = newText;
            localStorage.setItem('comments', JSON.stringify(comments)); // Guardar cambios en localStorage
            renderComments();
        }
    };

    // Función para eliminar un comentario
    window.deleteComment = function(index) {
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            comments.splice(index, 1);
            localStorage.setItem('comments', JSON.stringify(comments)); // Guardar cambios en localStorage
            renderComments();
        }
    };

    // Inicializar y mostrar los comentarios guardados
    renderComments();
});
