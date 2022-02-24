import { Text, Editor, Transforms } from 'slate'
export function toggleListItem(editor) {
  const isActive = isListItemActive(editor)
  console.log(isActive)
  Transforms.setNodes(
    editor,
    { type: isActive ? null : 'List-item' },
    {
      match: (n) => {
        console.log('second')
        console.log(n)
        return Text.isText(n)
      },
    }
  )
}

export function isListItemActive(editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      console.log('first')
      console.log(n)
      return n.type === 'List-item'
    },
    universal: true,
  })

  return !!match
}
