

// This is the APIController class.

const APIController = (function() {

    /// global variables
    const clientId = '817f19d004b24d22a03c939e112b4ac5';
    const clientSeceret = '8f6419b7c2e74b4297a7ab07045604f3';


    //private methods, using async keyword. 
    const _getToken = async () => {

        const result = await fetch('https://accounts/spotify.com/api/token',{ //we used javascript method fetch to get the spotify API token.  
            method: 'POST', // needs to be a POST request.
            headers: {
                'Content-Type' : 'application/x-www-form-urlcoded',
                'Authorization' : 'Basic' + btoa(clientId + ':' + clientSeceret)
            },
            body: 'grant_typ= client_credentials'
        });

        const data = await result.json(); // create variable of json result
        return data.access_token; //store json result into data and return the value data 
    }




    // We now want to get Spotify endpoints. These basically allow us to get genres, tracks(songs), username and anything the Spotify API can grab.

    // I will grab the username first!
    const _getUsername = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/users/${user_id}`, { //need to paste in the endpoint url from Web API website. Must be  `` not ''.
        method: 'GET',  //Getting information from the API                                  //add the $ sign here. 
        headers: {'Authorization' : 'Bearer' + token}
        });

        const data = await result.json();
        return data.display_name;
    }


    // need a return section! Getters you could say. 
    return {
        getToken(){
            return _getToken();
        },
        getUsername(token){
            return _getUsername(token);
        }
    }
})(); 

// will create the UI Module section to work with these function calls. Will populate the area. 
const UIController = (function(){

    //create object to hold references to html selectors, do this to avoid having to type the specific selector type as we code.  
    const DOMElements = {
        userNameHere: '#userName',  //these are elements on our ProfileViewingPage
        hfToken: '#hidden_token'
    }

    // Public methods, will eventually be called by our main controller 
    return{

        //method to get input fields
        inputField() {
            return {
                uName: document.querySelector(DOMElements.userNameHere),
            }
        },

        // need methods to create a username
        createUsername(name){

            const node = document.querySelector(DOMElements.userNameHere);

            node.innerHTML = '';

            const html = `<h2 id = "userName"> ${name} </h2>`;

            node.insertAdjacentHTML('beforeend',html);
           /*
            const html = 
            `
            <h2 id = "userName"> ${name} </h2>
            `; //line of code from my ProfileViewingPage and then add dollar sign to where u want the userName to appear and add {} around it.
            document.querySelector(DOMElements.userNameHere).insertAdjacentHTML('beforeend', html); // will insert before this line of code. 
            */
        },

        resetUsername(){
            this.inputField().userNameHere.innerHTML = '';
        }
    
    }   
    
})();


// OUR MAIN CONTROLLER
// We have two separate modules, one for UI and one for API.This module will utilize both the API and UI module to handle retreiving data from spotify and populate our ui fields with data. 
const APPCOntroller = (function(UICtrl, APICtrl){

    // get input fields object ref
    const DOMInputs = UICtrl.inputField();
    

    //get genres on page load.
    const loadUsername  = async() => { //need to use async to use await 

        //get the token 
        const token = await APICtrl.getToken(); // WE CALL THE getter FUNCTION getUsername from the first module(class) we made. 
        //Store the token onto the page
        UICtrl.storeToken(token);
        
        //get the userName
        const user = await APICtrl.getUsername(token);

        // We now call the createFunctions.Populate our genres select element. 
        user.forEach(element => UICtrl.createUsername(element.name));
    }
    

    // create username change event listener
    DOMInputs.uName.addEventListener('change', async () =>{

        // when the user changes their username, we will need to reset the subsequent fields
        UICtrl.resetUsername();

        //get the token, add method to store the token on the page so we we dont have to keep hitting the api for the token. 
        const token = UICtrl.getStoredToken().token;

        // get the username select field
        const usernameSelect = UICtrl.inputField().token; // getStoredToken is created by itself. 

        // get the selected username id
        const usernameid = usernameSelect.options[usernameSelect.selectedIndex].value;
        
    });

})();






// ETHANS/EDDIE'S WAY!!!!


// (); will make the function run immediately!

    // Gets me an access token!!
    /*var authOptions = {    
        method: 'POST',     
        headers: {  
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + window.btoa(clientID + ':' +  clientSeceret),        
            'Accept': 'application/json'     
        }, 
        body: 'grant_type=client_credentials' 

    };
    */

    /*
    const usernameContainer = document.getElementById("user-name");

    async function getUsername(){
        username = 'smedjan'
        // await will not havea random jason object floating there
        // fetch is what retrieves the response object. 
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
        const token = tokenResponse.json().access_token; // this gets me the token. 
        console.log(token);
        const response = await fetch(`https://api.spotify.com/v1/me`, {
        method: "GET",
        headers:{ Authorization: 'Bearer ${token}'}
    }); //<- keys right here at the end means it will run immediately.


    // response is raw data, this line of code turn raw data into usable code. 
    const data = await response.json();
    console.log(data.display_name);

    const display_Name = data.display_name;

    const userCard = document.createElement('div');

    //list, will add a classname to the div im creating if 
    userCard.classList.add("userName"); // class name 
    


    // created the inner html for the div. Will do it for you, no longer need a return statement. 
    userCard.innerHTML = `<h2> ${display_Name} </h2>`;
    console.log(display_Name);

    usernameContainer.appendChild(userCard);

    )
    */
    


//getUsername();