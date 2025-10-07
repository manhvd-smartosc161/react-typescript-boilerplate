import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import AppRouter from './routes';
import { queryClient } from './lib/queryClient';

const AppContent = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
