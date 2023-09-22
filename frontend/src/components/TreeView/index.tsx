import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { styled } from 'styled-components'
import { useQuery } from 'react-query'

type folderIconType = {
  icon?: string
  openIcon?: string
  color?: string
}
type itemIconType = {
  icon?: string
  color?: string
}
type TreeNodeType = {
  id: number
  name: string
  isFolder?: boolean
  parent?: number
  folderIconSettings?: folderIconType
  itemIconSettings?: itemIconType
}

type TreeNodePropsType = {
  cb: (parent?: number) => Promise<Array<TreeNodeType>>
  node: TreeNodeType
}
type TreeViewPropsType = {
  cb: (parent?: number) => Promise<Array<TreeNodeType>>
  parent?: number
  folderIconSettings?: folderIconType
  itemIconSettings?: itemIconType
}
const TreeViewStyled = styled.div`
  padding-left: 10px;
`
const Icon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop != 'iconColor',
})<{ iconColor: string }>`
  margin-right: 5px;
  color: ${(props) => props.iconColor};
`
/** Default settings for the tree */
const defaultTreeViewProps = {
  folderIconSettings: {
    icon: 'folder',
    openIcon: 'folder-open',
    color: 'yellowgreen',
  },
  itemIconSettings: {
    icon: 'file',
    color: '#cccccc',
  },
}
/** Component renders the tree of elements  */
const TreeView = ({
  cb,
  parent,
  folderIconSettings,
  itemIconSettings,
}: TreeViewPropsType) => {
  if (!folderIconSettings) {
    folderIconSettings = defaultTreeViewProps.folderIconSettings
  } else {
    folderIconSettings = {
      ...defaultTreeViewProps.folderIconSettings,
      ...folderIconSettings,
    }
  }

  if (!itemIconSettings) {
    itemIconSettings = defaultTreeViewProps.itemIconSettings
  } else {
    itemIconSettings = {
      ...defaultTreeViewProps.itemIconSettings,
      ...itemIconSettings,
    }
  }
  const treeQuery = useQuery(['tree', parent], () => cb(parent), {
    staleTime: 1000 * 60,
  })

  return (
    <>
      {treeQuery.isLoading && !treeQuery.isIdle ? (
        <p>Loading...</p>
      ) : (
        <TreeViewStyled>
          <ul>
            {treeQuery.data &&
              treeQuery.data.map((tree: TreeNodeType) => (
                <TreeNode
                  key={tree.id}
                  cb={cb}
                  node={{
                    ...tree,
                    folderIconSettings: {
                      ...folderIconSettings,
                      ...tree.folderIconSettings,
                    },
                    itemIconSettings: {
                      ...itemIconSettings,
                      ...tree.itemIconSettings,
                    },
                  }}
                />
              ))}
          </ul>
        </TreeViewStyled>
      )}
    </>
  )
}

const TreeNodeStyled = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  padding-left: 10px;
`
/** Component renders node of the tree and their children of folder is open recurcively */
const TreeNode = ({ cb, node }: TreeNodePropsType) => {
  const [childVisible, setChildVisiblity] = useState<boolean>(false)

  return (
    <li>
      <TreeNodeStyled onClick={() => setChildVisiblity((v) => !v)}>
        {node.isFolder ? (
          <Icon iconColor={node.folderIconSettings!.color!}>
            <FontAwesomeIcon
              icon={
                childVisible
                  ? (node.folderIconSettings!.openIcon as IconProp)
                  : (node.folderIconSettings!.icon as IconProp)
              }
            />
          </Icon>
        ) : (
          <Icon iconColor={node.itemIconSettings!.color!}>
            <FontAwesomeIcon icon={node.itemIconSettings!.icon as IconProp} />
          </Icon>
        )}

        <div>{node.name}</div>
      </TreeNodeStyled>

      {node.isFolder && childVisible && (
        <div>
          <ul>
            <TreeView
              cb={cb}
              parent={node.id}
              folderIconSettings={node.folderIconSettings}
              itemIconSettings={node.itemIconSettings}
            />
          </ul>
        </div>
      )}
    </li>
  )
}
export type { TreeNodePropsType, TreeViewPropsType }
export default TreeView
