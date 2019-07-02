let user=[
    {
        name:'javier',
        gender:'M',
        hobby:'sports',
        avatar:'avatar3.png'
    },
    {
        name:'eva',
        gender:'F',
        hobby:'pets',
        avatar:'avatar1.png'
    },
    {
        name:'criss',
        gender:'F',
        hobby:'party',
        avatar:'avatar2.png'
    },
    {
        name:'chicho',
        gender:'M',
        hobby:'sports',
        avatar:'avatar3.png'
    },
    {
        name:'leodan',
        gender:'M',
        hobby:'pets',
        avatar:'avatar1.png'
    }
];

window.addEventListener('load', function () {
    console.log("cargado compadre");

   
    let searchBtn = document.getElementById('searchBtn');

    var results=document.getElementById('results');
    
    function bsucar() {
        //console.log('has dado click');
        //results.innerHTML='hello';


        let hobbyfield=document.getElementById('hobby');
        let hobby=hobbyfield.value;
        console.log(hobby);


        // get gender
        let genderfield =document.getElementById('gender');
        let select=genderfield.selectedIndex;
        let gender=genderfield.options[select].value;
        console.log(gender);

        let resultshtml='';
        for(let i=0; i<user.length;i++){

            if(gender=='A' || gender==user[i].gender){
                if(hobby=='' || hobby==user[i].hobby){
            resultshtml +='<div class="person-row">\
                <img src="images/'+user[i].avatar+'" alt="">\
                <div class="person info">\
                    <div>'+ user[i].name +'</div>\
                    <div>'+ user[i].hobby +'</div>\
                </div>\
                <button>Add as friend</button>\
                </div>'
            }
            }
        }
        results.innerHTML=resultshtml;
    }

    searchBtn.addEventListener('click', bsucar);        

    bsucar();
        

    
    //console.log(searchBtn);

    
});