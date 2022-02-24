import { Text, Editor, Transforms } from 'slate'
export function toggleItalicMark(editor) {
  const isActive = isItalicMarkActive(editor)
  console.log(isActive)
  Transforms.setNodes(
    editor,
    { italic: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  )
}

export function isItalicMarkActive(editor) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.italic === true,
    universal: true,
  })

  return !!match
}
