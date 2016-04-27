function getSuper(success, failure) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://gateway.marvel.com:80/v1/public/characters?apikey=b2db95a2d77f292758fa7e2bf5bf93c4');
    req.onload = function() {
        if (req.status === 200) {
            var response = JSON.parse(req.responseText);
            success(response.data.results);
        } else {
            failure({
                code: req.status,
                message: 'No response',
            });
        }
    };
    req.send();
}

window.addEventListener('load', function() {
    var parent = document.getElementById('hero-list');
    var heroes = new Promise(getSuper);

    //Get all the heroes and then render them into the DOM
    heroes.then(function(data) {
        var gen = _.template(document.getElementById('list-item-template').textContent);

        for (let hero of data) {
            var html = gen({
                name: hero.name,
                image: hero.thumbnail.path + '.' + hero.thumbnail.extension,
                events: hero.events,
            });
            var el = document.createElement('div');
            el.addEventListener('click', function(){
                console.log(hero.name);
                console.log(hero.events);
            });
            el.innerHTML = html;
            parent.appendChild(el);

        }
    });
});
