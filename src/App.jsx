import Main from './features/email/main/Main';
import FilterEmail from './components/filter-email/FilterEmail';
import PageButtons from './components/page-buttons/PageButtons';

function App() {
  return (
    <div className="App">
      <div className="header">
        <FilterEmail />
        <PageButtons />
      </div>
      <Main />
    </div>
  )
}

export default App
