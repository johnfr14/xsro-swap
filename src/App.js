import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage, ERC20Page, FaucetPage, AccountPage } from "./Pages";
import { Web3Context } from "web3-hooks";
import { useContext, React } from "react";

function App() {
  const [web3State] = useContext(Web3Context);

  return (
    <>
      <Switch>
        {web3State.isLogged && (
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/ERC20" component={ERC20Page} />
            <Route exact path="/Faucet" component={FaucetPage} />
            <Route exact path="/Account" component={AccountPage} />
            <Redirect to="/" />
          </>
        )}
        {!web3State.isLogged && (
          <>
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
          </>
        )}
      </Switch>
    </>
  );
}

export default App;

// TODO : Gerer le redirect quand page error : Refresh = Redirect Home
