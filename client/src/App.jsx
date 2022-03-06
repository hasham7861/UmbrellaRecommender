import './App.css';
import { CreateCustomerForm, ModifyCustomerForm, TopCustomersChart, AppHeader } from './components'

function App() {
  return (
    <div>
      <AppHeader />
      <CreateCustomerForm />
      <ModifyCustomerForm />
      <TopCustomersChart />
    </div>
  );
}

export default App;
