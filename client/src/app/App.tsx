import { AppProvider } from './providers/AppProvider';
import { Bootstrap } from './Bootstrap';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

function App() {
  return (
    <AppProvider>
      <Bootstrap>
        <RouterProvider router={router} />
      </Bootstrap>
    </AppProvider>
  );
}

export default App;
