
window.addEventListener('load', function() {
  
    var results = document.getElementById('results');
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
        results.innerHTML = 'hola<br/>mundo <div style="background-color:blue;">como estas</div>';  
    });
    
});