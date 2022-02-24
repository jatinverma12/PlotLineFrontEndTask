import { Text, Editor, Transforms } from 'slate'
export function toggleUnderlineMark(editor) {
  const isActive = isUnderlineMarkActive(editor)
  Transforms.setNodes(
    editor,
    { underline: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  )
}

export function isUnderlineMarkActive(editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      console.log(n)
      return n.underline === true
    },
    universal: true,
  })

  return !!match
}
