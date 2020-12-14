console.log('tjenixen')
tinymce.init({
    init_instance_callback: function(editor) {
        editor.on('input', function() {
            saveNote();
        });
    },
    selector: '#body-text-area',
    inline: true,
    toolbar: false,
    menubar: false,
    plugins: 'quickbars',
    quickbars_insert_toolbar: false,
    placeholder: 'Enter note here'
});