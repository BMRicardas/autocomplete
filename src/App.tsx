import AutocompleteInput from './components/AutocompleteInput/AutocompleteInput';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <AutocompleteInput id="character" label="Enter Breaking Bad character name" />
    </Layout>
  );
};

export default App;
