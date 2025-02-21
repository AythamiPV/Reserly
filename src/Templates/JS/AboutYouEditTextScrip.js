document.getElementById('edit-icon').addEventListener('click', enableEditing);

function enableEditing() {
    const editableText = document.getElementById('editable-text');
    editableText.contentEditable = "true";
    editableText.focus();
    editableText.addEventListener('blur', () => {
        editableText.contentEditable = "false";
    });
}
