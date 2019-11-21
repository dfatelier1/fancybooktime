/*
 *PubNub 
 * remote controller that sends a variable to all the listening devices
 */

// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'pub-c-f43d558a-b1ef-4b77-9ce6-502bc838c539';
let subKey = 'sub-c-50f2b19e-0bac-11ea-af5a-1a72d7432d4b';

//input variables

let nextButton;
let slideNumber=0;
let totalImages = 4;


//name used to sort your messages. used like a radio station. can be called anything
let channelName = "powerpoint";

function setup() 
{

  createCanvas(windowWidth, windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  

  //create the button
 
  sendButton = createButton('NEXT');
  sendButton.position(0, 0);
  sendButton.mousePressed(sendTheMessage);
  sendButton.size(windowWidth,windowHeight);

}

function draw() 
{


}


//sends from the button press
function sendTheMessage() 
{

slideNumber = ((slideNumber+1)<=(totalImages-1)) ? slideNumber+=1 : 0; //shorthand for conditional assignment


//console.log(slideNumber);

  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        slide: slideNumber       
      }
    });

}


