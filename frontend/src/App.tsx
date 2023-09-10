
import './App.css'
import "components/FontawesomeIcons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import TreeView from 'components/TreeView'
import {treeData} from 'components/TreeView/mockTreeData'
import GlobalStyle from 'styles/globalStyle'

function App() {

  return (
    <>
    <GlobalStyle />
      <div>
        App component<FontAwesomeIcon icon="caret-right" />
      </div>
      <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
      <TreeView data={treeData} folderIconSettings={{color: "#333333"}}/>
     
    </>
  )
}

export default App
