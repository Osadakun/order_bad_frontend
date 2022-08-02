import './App.css';
import { Box} from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Box with Flex props
        </Box>
      </header>
    </div>
  );
}

export default App;
