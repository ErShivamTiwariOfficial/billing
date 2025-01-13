import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import BillForm from "./components/BillForm";

// Expiration logic
function App() {
  const expirationDate = new Date('2025-01-14'); // Set this to 1 year from now
  const currentDate = new Date();

  if (currentDate > expirationDate) {
      return (
          <div className="expired-app">
              <h1 class="LimitWarning-h">Application Expired</h1>
            <p class="LimitWarning-p" >This billing application has expired. Please contact the <a href="https://wa.me/+918953015086?text=Hello%21%20I%20need%20help%20with%20your%20services." target="_blank" rel="noreferrer"> Er. Shivam Tiwari </a> for further assistance.</p>
          </div>
      );
  }

  return (
      <div className="app-container">
          <Container>
        <BillForm />
      </Container>
      </div>
  );
}




// const App = () => {
//   return (
//     <div className="App d-flex flex-column align-items-center justify-content-center w-100">
//       <Container>
//         <BillForm />
//       </Container>
//     </div>
//   );
// };

export default App;
