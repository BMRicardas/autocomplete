import AutocompleteInput from './ui/AutocompleteInput/AutocompleteInput';
import Layout from './ui/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <AutocompleteInput id="character" label="Enter Breaking Bad character name" />
    </Layout>
  );
};

export default App;
