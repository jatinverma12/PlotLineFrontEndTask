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
import ImageAssets from './ImageAssets'
import { toggleBoldMark, isBoldMarkActive } from './BoldAssets'
import { toggleItalicMark, isItalicMarkActive } from './ItalicAssets'
import { toggleUnderlineMark, isUnderlineActive } from './UnderlineAssets'
import { toggleListItem, isListItemActive } from './ListAssets'
import { toggleCenterIndent, isCenterIndentActive } from './AlignCenterAssets'

const Image = ({ attributes, element, children }) => {
  console.log(element.children[0].text)
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.children[0].text}
          alt={element.children[0].text}
          style={{ height: '400px', width: '400px' }}
        />
      </div>
      {children}
    </div>
  )
}

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive,
  isListItemActive,
  isCenterIndentActive,
  isItalicMarkActive,
  isUnderlineActive,
  toggleBoldMark,
  toggleListItem,
  toggleItalicMark,
  toggleUnderlineMark,
  toggleCenterIndent,
}

const toolbaricon = { cursor: 'pointer', margin: '7px' }
export const Myeditor = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const editor = useMemo(() => withReact(createEditor()), [])
  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'image':
        return <Image {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem('content')) {
      editor.children = JSON.parse(localStorage.getItem('content'))
      setValue(JSON.parse(localStorage.getItem('content')))
    }
  }, [])

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value)
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
          }
        }}
      >
        <div className='toolbar'>
          <span
            className='boldIcon'
            onClick={() => {
              CustomEditor.toggleBoldMark(editor)
            }}
          ></span>
          <span
            className='italicIcon'
            onClick={() => {
              CustomEditor.toggleItalicMark(editor)
            }}
          ></span>
          <span
            className='underlineIcon'
            onClick={() => {
              CustomEditor.toggleUnderlineMark(editor)
            }}
          ></span>

          <span
            className='centerIcon'
            onClick={() => {
              CustomEditor.toggleCenterIndent(editor)
            }}
          ></span>
          <span
            className='listIcon'
            onClick={() => {
              CustomEditor.toggleListItem(editor)
            }}
          ></span>
          <ImageAssets />
        </div>

        <Editable
          style={{ padding: '10px 0' }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }

              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}
        />
      </Slate>
    </>
  )
}

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component to render leaves the desire format.
const Leaf = (props) => {
  if (props.leaf.bold) {
    console.log('bold')
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  } else if (props.leaf.italic) {
    console.log('italic')
    return (
      <span
        {...props.attributes}
        style={{ fontStyle: props.leaf.italic ? 'italic' : 'normal' }}
      >
        {props.children}
      </span>
    )
  } else if (props.leaf.underline) {
    console.log('underline')
    return (
      <span
        {...props.attributes}
        style={{
          textDecorationLine: props.leaf.underline ? 'underline' : 'normal',
        }}
      >
        {props.children}
      </span>
    )
  } else if (props.leaf.type === 'List-item') {
    console.log('list-item')
    console.log(props.leaf)

    return (
      <ol {...props.attributes}>
        <li>{props.children}</li>
      </ol>
    )
  } else if (props.leaf.type === 'center-item') {
    console.log('center=-item')
    return (
      <div
        {...props.attributes}
        style={{
          textAlign: props.leaf.type === 'center-item' ? 'center' : 'normal',
        }}
      >
        {props.children}
      </div>
    )
  }

  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: 'normal',
      }}
    >
      {props.children}
    </span>
  )
}
