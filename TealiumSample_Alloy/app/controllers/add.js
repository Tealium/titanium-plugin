function addItem() {
    var todos = Alloy.Collections.todo;

    // Create a new model for the todo collection
    var task = Alloy.createModel('Todo', {
        item : $.itemField.value,
        done : 0
    });

    // add new model to the global collection
    todos.add(task);

    // save the model to persistent storage
    task.save();

    // reload the tasks
    todos.fetch();

	// *** TEALIUM *** - Track event
	Tealium.trackControlEvent('Item added');
	
    closeWindow();
}

function focusTextField() {
    $.itemField.focus();
    
    // *** TEALIUM *** - Track focus change
    Tealium.onFocus();
}

function closeKeyboard(e) {
    e.source.blur();
    
    // *** TEALIUM *** - Track blur change
    Tealium.onBlur();
}

function closeWindow() {
    $.addWin.close();
}