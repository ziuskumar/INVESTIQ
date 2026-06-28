import '../styles/globals.css';
import ThemeProvider from '../components/ThemeProvider';
import { HistoryProvider } from '../context/HistoryContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <Component {...pageProps} />
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default MyApp;
