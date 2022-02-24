import { Text, Editor, Transforms } from 'slate'
export function toggleCenterIndent(editor) {
  const isActive = isCenterIndentActive(editor)
  console.log(isActive)
  Transforms.setNodes(
    editor,
    { type: isActive ? null : 'center-item' },
    {
      match: (n) => {
        console.log('second')
        console.log(n)
        return Text.isText(n)
      },
    }
  )
}
export function isCenterIndentActive(editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      console.log('first')
      console.log(n)
      return n.type === 'center-item'
    },
    universal: true,
  })

  return !!match
}
