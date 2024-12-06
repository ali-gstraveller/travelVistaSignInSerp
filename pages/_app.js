import { SessionProvider } from "next-auth/react";
import "@/styles/Home.module.css";
import { Provider } from 'react-redux';
import { store } from '../store';



export default function App({Component,pageProps: { session, ...pageProps },}){
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}