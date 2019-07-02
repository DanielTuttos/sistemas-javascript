
window.addEventListener('load', function() {
  
    var results = document.getElementById('results');
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
        results.innerHTML = 'hola<br/>mundo <div style="background-color:blue;">como estas</div>';  
    
        //get hobby
        var hobbyField = document.getElementById('hobby');
        var hobby = hobbyField.value;
        console.log(hobby);
        
        //get gender
        var genderField = document.getElementById('gender');
        var selected = genderField.selectedIndex;
        var gender = genderField.options[selected].value;
        console.log(gender);
    });
    
});