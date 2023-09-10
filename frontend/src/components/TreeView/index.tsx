import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { styled } from 'styled-components'

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
  key: string
  label: string
  title: string
  icon?: string,
  folderIconSettings?: folderIconType
  itemIconSettings?: itemIconType
  children?: Array<TreeNodeType>
}
type TreeNodePropsType = {
  node: TreeNodeType,
}
type TreeViewPropsType = {
  key?: string,
  label?: string,
  title?: string,
  data: Array<TreeNodeType>,
  folderIconSettings?: folderIconType
  itemIconSettings?: itemIconType
}
const TreeViewStyled = styled.div`
  padding-left: 10px;
`
const Icon = styled.div<{ iconColor: string  }>`
  margin-right: 5px;
  color: ${props => props.iconColor};
`
const defaultTreeViewProps = {
  folderIconSettings: {
    icon: 'folder',
    openIcon: 'folder-open',
    color: 'yellowgreen'
  },
  itemIconSettings: {
    icon: 'file',
    color: "#cccccc"
  }
} 

const TreeView = ({data=[],folderIconSettings,itemIconSettings}: TreeViewPropsType) => {

  if(!folderIconSettings) {
    folderIconSettings=defaultTreeViewProps.folderIconSettings
  } else {
    /* folderIconSettings = {
      icon: folderIconSettings.icon?folderIconSettings.icon:defaultTreeViewProps.folderIconSettings.icon,
      openIcon: folderIconSettings.openIcon?folderIconSettings.openIcon:defaultTreeViewProps.folderIconSettings.openIcon,
      color: folderIconSettings.color?folderIconSettings.color:defaultTreeViewProps.folderIconSettings.color,
    } */
    folderIconSettings = {...defaultTreeViewProps.folderIconSettings, ...folderIconSettings}
  }

  if(!itemIconSettings) {
    itemIconSettings=defaultTreeViewProps.itemIconSettings
  } else {
    /* itemIconSettings={
      icon: itemIconSettings.icon?itemIconSettings.icon:defaultTreeViewProps.itemIconSettings.icon,
      color: itemIconSettings.color?itemIconSettings.color:defaultTreeViewProps.itemIconSettings.color
    } */
    itemIconSettings={...defaultTreeViewProps.itemIconSettings, ...itemIconSettings}
  }

  return (
    <TreeViewStyled>
      <ul>
        {data.map((tree:TreeNodeType) => (
          <TreeNode node={{...tree, folderIconSettings:{...folderIconSettings, ...tree.folderIconSettings}, itemIconSettings:{...itemIconSettings, ...tree.itemIconSettings}}} />
        ))}
      </ul>
    </TreeViewStyled>
  )
}

const TreeNodeStyled = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  padding-left: 10px;
`

const TreeNode = ({ node }: TreeNodePropsType) => {
  const [childVisible, setChildVisiblity] = useState(false)

  const hasChild = node.children ? true : false

  return (
    <li>
      <TreeNodeStyled onClick={() => setChildVisiblity((v) => !v)}>
        {hasChild ? (
          <Icon iconColor={node.folderIconSettings!.color!}>
            <FontAwesomeIcon icon={childVisible ? node.folderIconSettings!.openIcon as IconProp : node.folderIconSettings!.icon as IconProp}/>
          </Icon>
        ) : (
          <Icon iconColor={node.itemIconSettings!.color!}>
            <FontAwesomeIcon icon={node.itemIconSettings!.icon as IconProp} />
          </Icon>
        )}

        <div>{node.label}</div>
      </TreeNodeStyled>

      {hasChild && childVisible && (
        <div>
          <ul>
            <TreeView data={node.children!} />
          </ul>
        </div>
      )}
    </li>
  )
}
export type { TreeNodeType, TreeNodePropsType, TreeViewPropsType }
export default TreeView
