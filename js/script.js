document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('main').appendChild(mainConstructor());
    document.getElementById('aside').appendChild(asideConstructor());
    listeners.init();
});
