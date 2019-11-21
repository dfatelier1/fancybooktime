/*
send cursorData
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'pub-c-f43d558a-b1ef-4b77-9ce6-502bc838c539';
let subKey = 'sub-c-50f2b19e-0bac-11ea-af5a-1a72d7432d4b';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "cursor";

function setup() 
{
  
  createCanvas(windowWidth,windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.subscribe({channels: [channelName]});

setInterval(cursorPosition,200);  ///execute the cursorPosition function at a specific rate
}

function draw() 
{


}


///uses built in mouseClicked function to send the data to the pubnub server
function cursorPosition() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        x: mouseX,       //get the value from the text box and send it as part of the message   
        y: mouseY
      }
    });

}

