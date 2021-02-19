import React from 'react';

import Login from '../Views/login';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import Cadastro from '../Views/cadastro';
import Rotas from './rotas';

class App extends React.Component {
  render(){
    return(
      <div>
        <Rotas />
      </div>
    )
  }

}

export default App;
