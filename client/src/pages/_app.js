import '@/styles/globals.css'
import {Provider} from "react-redux";
import store from "@/store";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {BindingSpring} from "@/components/UI/BindingSpring";
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return(
      <>
      <Provider store={store}>
          <BindingSpring/>
              <Component {...pageProps}/>
              <div id={"overlay-root"}></div>
      </Provider>
      </>
      )
}