import type { IMenuItem } from '@/types/user'
type TTreeMenuItem = {
  label: string
  url: string
  children?: TTreeMenuItem[]
}

function transformMenu(nodes: IMenuItem[]) {
  return nodes.map((node) => {
    const transformedNode: TTreeMenuItem = { label: node.name, url: node.url }
    if (node.children) {
      transformedNode.children = transformMenu(node.children)
    }
    return transformedNode
  })
}

export { type TTreeMenuItem, transformMenu as default }
