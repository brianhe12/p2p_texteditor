/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import styles from './quill.css'

Quill.register('modules/cursors', QuillCursors)

window.addEventListener('load', () => {
    console.log("hello")
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:1234', 'quill', ydoc)
    const type = ydoc.getText('quill')
    const editorContainer = document.createElement('div')
    editorContainer.setAttribute('id', 'editor')
    document.body.insertBefore(editorContainer, null)
    // editorContainer.className = styles['my-class']


    var editor = new Quill(editorContainer, {
        modules: {
            cursors: true,
            toolbar: [
                [{header: [1, 2, false]}],
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

    const axios = require('axios')
    axios.get('http://127.0.0.1:5000/testGet')
        .then(response => {
            let d = response.data.data;
            console.log(d);
        })
        .catch(error => console.log(error))



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
//      var content = editor.getContents()
      // 2. Encrypt Contents
    
      // 3. Insert into database

       var about = document.querySelector('input[name=text]');
      // here we enter the contents for encryption
      // let data = JSON.stringify(editor.getContents());
      const axios = require('axios')
      axios
          .post('http://127.0.0.1:5000/test', {
            todo: editor.getContents()
          })
          .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
          })
          .catch(error => {
            console.error(error)
          })

      return "Please click 'Stay on this Page' and we will give you candy";
  };

  // TODO:  When would we want to set contents? 
     // Send GET request to http://localhost:5000/getData to grab saved contents from database
     // use setContents to set contents of saved editor text

//  window.onload = function (e) {
    //need to retrieve the data from database ... 
    // $.ajax({
          //   type: "POST",
          //   url: "/getData",
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
//  }


  window.example = { provider, ydoc, type, binding }
})

//filler functions to using the python functions
