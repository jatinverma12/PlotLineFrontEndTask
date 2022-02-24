// Import React dependencies.
import React, { useState, useMemo, useCallback, useEffect } from 'react'
// Import the Slate editor factory.
import {
  Editable,
  withReact,
  Slate,
  useSlateStatic,
  ReactEditor,
} from 'slate-react'
import { Text, Editor, Transforms, createEditor, Element } from 'slate'
const createImageNode = (href, text) => ({
  type: 'image',
  href,
  children: [{ text }],
})
const toolbaricon = { cursor: 'pointer', margin: '7px' }
const insertImage = (editor, url) => {
  if (!url) return

  const { selection } = editor
  const image = createImageNode('Image', url)

  ReactEditor.focus(editor)

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus?.path
    )

    if (editor.isVoid(parentNode)) {
      // Insert the new image node after the void node or a node with content
      Transforms.insertNodes(editor, image, {
        at: Path.next(parentPath),
        select: true,
      })
    } else {
      // If the node is empty, replace it instead
      Transforms.removeNodes(editor, { at: parentPath })
      Transforms.insertNodes(editor, image, { at: parentPath, select: true })
    }
  } else {
    // Insert the new image node at the bottom of the Editor when selection
    // is falsey
    Transforms.insertNodes(editor, image, { select: true })
  }
}
const ImageAssets = () => {
  const editor = useSlateStatic()

  const handleInsertImage = () => {
    const url = prompt('Enter an Image URL') // For simplicity
    insertImage(editor, url) // will be implemented later
  }

  return (
    <span
      style={{
        ...toolbaricon,
        background: 'url(/image.png)',
        width: '19.98px',
        height: '16px',
      }}
      onClick={handleInsertImage}
    ></span>
  )
}

export default ImageAssets
