//variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners

eventListeners();

function eventListeners() {
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones

//para añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    console.log('Formulario enviado');
    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar. 'a' significa que va a ser un link
    const botonBorrar = document.createElement('a');
    //añade el boton al tweet
    botonBorrar.classList = 'borrar-tweet';
    //la X aparece roja por los estilos de css previamente aplicados por el profe
    botonBorrar.innerText = 'X';

    //crear elemento y añadirlo a la lista. 'li' significa que vamos a hacer una linea
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);   

    //añadir a localstorage
    agregarTweetLocalStorage(tweet);
}

//para borrar tweets del dom
function borrarTweet (e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet')
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        alert('Tweet eliminado');

}

//añador tweet al localstorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //añadir nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para localstorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

//comprobar que haya elementos en localstorage
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos localstorage
    if (localStorage.getItem('tweets') === null) 
        tweets = [];
    else
        tweets = JSON.parse(localStorage.getItem('tweets'));
    return tweets;
}


//Mostrar datos de localsotrage listo
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {
        //crear boton de eliminar. 'a' significa que va a ser un link
        const botonBorrar = document.createElement('a');
        //añade el boton al tweet
        botonBorrar.classList = 'borrar-tweet';
        //la X aparece roja por los estilos de css previamente aplicados por el profe
        botonBorrar.innerText = 'X';

        //crear elemento y añadirlo a la lista. 'li' significa que vamos a hacer una linea
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });   
}

//eliminar tweet del localsotrage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
             tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}