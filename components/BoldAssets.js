import { Text, Editor, Transforms } from 'slate'

export function isBoldMarkActive(editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.bold === true,
    universal: true,
  })

  return !!match
}

export function toggleBoldMark(editor) {
  const isActive = isBoldMarkActive(editor)
  Transforms.setNodes(
    editor,
    { bold: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  )
}
