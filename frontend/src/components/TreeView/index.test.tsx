import '@testing-library/jest-dom'
import { logRoles, render, screen } from '@testing-library/react'
import TreeView from 'components/TreeView'
import { treeData } from 'components/TreeView/mockTreeData'
import 'components/FontawesomeIcons'

describe('TreeView settings', () => {
  test('tree has 3 closed folders initially with default icons', () => {
    const { container } = render(<TreeView data={treeData} />)
    logRoles(container)
    expect(container.querySelectorAll("[data-icon='folder']").length).toEqual(3)
  })
  test('root folders have proper names', () => {
    render(<TreeView data={treeData} />)
    let folderElement = screen.getByText('Documents').closest('div')
    expect(folderElement?.getElementsByTagName('svg')).toBeDefined()
    expect(folderElement?.getElementsByTagName('svg')).toHaveAttribute(
      'data-icon',
      'folder',
    )

    folderElement = screen.getByText('Desktop').closest('div')
    expect(folderElement?.getElementsByTagName('svg')).toBeDefined()
    folderElement = screen.getByText('Downloads').closest('div')
    expect(folderElement?.getElementsByTagName('svg')).toBeDefined()
  })
})
