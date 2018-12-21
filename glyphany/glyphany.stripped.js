(function () {
    var myCSS, myStyleNode,
        myHTML, myHTMLNode,
        myScriptNode;
    var sayHello;

    /* add the css */
    myCSS  = '#my_unique_id, #my_unique_id *{font-family:Courier,"Courier New",color:#333;line-height:1.5em;font-size:15px;margin:0;padding:0;}';
    myCSS += '#my_unique_id {position:fixed;top:0;right:300px;}';
    myCSS += '#my_unique_id .c {width:200px; padding:20px;}';
    myCSS += '#my_unique_id h1 {font-size: 20px; margin-bottom:0.5em;color:#0080C0}';
    myCSS += '#my_unique_id p {margin-bottom:0.5em;}';
    /* then insert it */
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.head.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML = '<div class="c">';
    myHTML += '<h1>Boring Widget</h1>';
    myHTML += '<p>That does say hello when you click it.</p>';
    myHTML += '</div>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.innerHTML = myHTML;

    /* add js functionality to it */
    sayHello = function(
      var who = window.prompt('who?'); alert('hello '+who);
    );
    
    if (myHTMLNode.addEventListener) {
      myHTMLNode.addEventListener('click', sayHello, false);
    } else if (el.attachEvent) {
      myHTMLNode.attachEvent('onclick', sayHello);
    }
    
    document.body.appendChild(myHTMLNode);
    
    /* to add MORE scripts */
    myScriptNode=document.createElement('script');
    myScriptNode.setAttribute('src','http://some.js/file.more.js');
    document.head.appendChild(myScriptNode);
  
}());