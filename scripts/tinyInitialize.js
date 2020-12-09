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
    plugins: 'quickbars lists textpattern',
    textpattern_patterns: [
        {start: '*', end: '*', format: 'italic'},
        {start: '_', end: '_', format: 'italic'},
        {start: '**', end: '**', format: 'bold'},
        {start: '__', end: '__', format: 'bold'},
        {start: '#', format: 'h1'},
        {start: '##', format: 'h2'},
        {start: '###', format: 'h3'},
        {start: '####', format: 'h4'},
        {start: '#####', format: 'h5'},
        {start: '######', format: 'h6'},
        {start: '1. ', cmd: 'InsertOrderedList'},
        {start: '* ', cmd: 'InsertUnorderedList'},
        {start: '- ', cmd: 'InsertUnorderedList'}
    ],
	quickbars_selection_toolbar: 'bold italic underline strikethrough | numlist bullist | quickimage',
    quickbars_insert_toolbar: false,
    placeholder: 'Enter note here'
});

console.log('tjenixen')
