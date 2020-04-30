/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://localhost:1234', 'quill', ydoc)
  const type = ydoc.getText('quill')
  const editorContainer = document.createElement('div')
  editorContainer.setAttribute('id', 'editor')
  document.body.insertBefore(editorContainer, null)

  var editor = new Quill(editorContainer, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      history: {
        userOnly: true
      }
    },
    placeholder: 'Start collaborating...',
    theme: 'snow' // or 'bubble'
  })
  
  const binding = new QuillBinding(type, editor, provider.awareness)

  /*
  // Define user name and user name
  // Check the quill-cursors package on how to change the way cursors are rendered
  provider.awareness.setLocalStateField('user', {
    name: 'Typing Jimmy',
    color: 'blue'
  })
  */

  // Detect right before users exits window -> We need to find a way to detect when ALL USERS exit window
  window.onbeforeunload = function (e) {
      // 1. Get Contents
      console.log(editor.getContents())
      var content = editor.getContents()
      // 2. Encrypt Contents
    
      // 3. Insert into database

      // Commented out because this piece of code breaks function appartently

      // var about = document.querySelector('input[name=text]');
      // about.value = JSON.stringify(quillOne.getContents());

      // $.ajax({
      //   type: "POST",
      //   url: "/process",
      //   contentType: "application/json",
      //   data: about.value,
      //   dataType: "json",
      //   success: function(response) {
      //       console.log(response);
      //   },
      //   error: function(err) {
      //       console.log(err);
      //   }
      // });

      return "Please click 'Stay on this Page' and we will give you candy";
  };

  // TODO:  When would we want to set contents? 
     // Send GET request to http://localhost:5000/getData to grab saved contents from database
     // use setContents to set contents of saved editor text

  const connectBtn = document.getElementById('y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  window.example = { provider, ydoc, type, binding }
})
