import './App.css'
import 'components/FontawesomeIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TreeView from 'components/TreeView'
import GlobalStyle from 'styles/globalStyle'
import { getModels } from './api'

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        App component
        <FontAwesomeIcon icon="caret-right" />
      </div>
      <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
      <TreeView cb={getModels} />
    </>
  )
}

export default App
