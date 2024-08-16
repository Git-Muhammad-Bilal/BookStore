import { Container, ThemeProvider, createTheme } from "@mui/material";
import store from "./booksApp/rtkquery/Store";
import { Provider } from "react-redux";
import BookToBuy from "./booksApp/routes/BookToBuy";


const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#263238',
    },
  },

})

function App() {
  return (
    <div className="b-app-cont">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BookToBuy />
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default App

