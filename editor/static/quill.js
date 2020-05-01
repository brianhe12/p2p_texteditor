/* eslint-env browser */
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import styles from './quill.css'

Quill.register('modules/cursors', QuillCursors)

window.addEventListener('load', () => {
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:1234', 'quill', ydoc)
    const type = ydoc.getText('quill')
    const editorContainer = document.createElement('div')
    editorContainer.setAttribute('id', 'editor')
    document.body.insertBefore(editorContainer, null)

    // create editor
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

    // grab document data
    const axios = require('axios')
    axios.get('http://127.0.0.1:5000/get_text')
        .then(response => {
            let d = JSON.parse(response.data.data).contents.ops;
            if (type.length === 0) {
                editor.setContents(d);
            }
        })
        .catch(error => console.log(error))

    // get and set username if provided
    axios.get('http://127.0.0.1:5000/get_user')
        .then(response => {
            let user = response.data.user;
            if (user.length != 0) {
                provider.awareness.setLocalStateField('user', {
                name: user
              })
            }
        })
        .catch(error => console.log(error))

  // detect right before users exits window
  window.onbeforeunload = function (e) {
      // send contents for encryption
      const axios = require('axios')
      axios
          .post('http://127.0.0.1:5000/set_text', {
            contents: editor.getContents()
          })
          .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
          })
          .catch(error => {
            console.error(error)
          })
  };

  window.example = { provider, ydoc, type, binding }
})