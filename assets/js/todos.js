//array that will hold all todo objects
var todos = [];

//div with class row click event listener to signal the task is completed
//when div with class row is clicked inside existing on load ul
$("ul").on("click", "div.row", function(){
    $(this).toggleClass("done");
});

//drag and drop properties on the ul
$("ul").sortable({});
$("ul").disableSelection();

//X click event listener
//when span.trash is clicked inside existing on load ul
$("ul").on("click", "span.trash", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

//todo input field event listener, event.which = keycode
$("#todoInput").on("keypress", function(event){
    //switch for keycode
    switch(event.which){
        case 13:
            //value/text of the todo input field
            var todoText = $(this).val();

            //reset inputbox value to empty string
            $(this).val("");

            //add new li to ul, with the trashcan as a span included
            $("ul").append("<div class='row'><span class='trash'><i class='far fa-trash-alt'></i></span> " + todoText + "<i class='fas fa-angle-down'></i> <div class='description'> <input class='descriptionInput' type='text' placeholder='Description'></div></div>");

            //push a new object to the array of todos, empty description as default
            todos.push({title: todoText, description: ""});
            break;
    }
});

//seperate click event listener on the description input
$("ul").on("click", ".descriptionInput", function(event){
    //stop propagation to prevent the click from bubbling to the row div (would add .done to to-do)
    event.stopPropagation();
});

//description input field event listener
$("ul").on("keypress", ".descriptionInput", function(event){
    switch(event.which){
        case 13:
            //value/text of the description input field
            var descriptionText = $(this).val();
            
            //event -> description div -> row div
            let div = event.target.parentNode.parentNode;

            //get the index of the div(parent row) inside the list of all divs with class row inside a ul
            var index = $("ul div.row").index(div);

            //text of the row(todo) itself, trim whitespace so it matches the to-do object title
            var rowText = ($(div).text().trim());

            //deselect the input to visualise 'setting' the description
            $(this).blur();

            //loop through all todo objects, match titles to figure out what index to add the description to
            for(var i = 0; i < todos.length; i++){
                if (todos[i].title === rowText){
                    todos[i].description = descriptionText;
                }
            }
            break;
    }
});


$("ul").on("click", "i[class='fas fa-angle-down']", function(event){
    //select next element in the same scope, which is the description div itself
    let description = $(this).next("div.description");
    description.fadeToggle(300);
    event.stopPropagation();
});

//add click event listener to the + icon
//fadeToggle the input to make it vanish/reappear
$("i[class='fas fa-plus']").on("click", function(){
    $("input[type='text']").fadeToggle(300);
});

