import '@/styles/globals.css'
import Container from "@/components/UI/Container";
import {Provider} from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps }) {
  return(
      <Container>
          <Provider store={store}>
            <Component {...pageProps} />
              <div id={"overlay-root"}></div>
          </Provider>
      </Container>
      )
}
