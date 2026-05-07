import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './providers/app.provider';
import { Bootstrap } from './Bootstrap';

function App() {
  return (
    <AppProvider>
      <Bootstrap />
    </AppProvider>
  );
}

export default App;
