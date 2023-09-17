import './App.css'
import 'components/FontawesomeIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TreeView from 'components/TreeView'
import { treeData } from 'components/TreeView/mockTreeData'
import GlobalStyle from 'styles/globalStyle'
import { useQuery } from 'react-query'
import { getModels } from './api'

function App() {
  const treeQuery = useQuery([], () => getModels())
  const newData = treeQuery.data

  return (
    <>
      <GlobalStyle />
      <div>
        <h1>Test React Query</h1>
        {treeQuery.isLoading ? 'Loading...' : JSON.stringify(newData)}
      </div>
      <div>
        App component
        <FontAwesomeIcon icon="caret-right" />
      </div>
      <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
      <TreeView data={treeData} />
    </>
  )
}

export default App
