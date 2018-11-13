render() {
    if (this.state.isLoggingIn === false && this.state.isSigningUp === false && !!localStorage.token === false) {
      return (
        <div>
          <HomePage handleClick={this.handleClick}/>
        </div>
      )
    } else if (this.state.isLoggingIn === true && this.state.isSigningUp === false) {
      return (<LoginPage changeLoginState={this.changeLoginState}/>)
    } else if (this.state.isSigningUp === true && this.state.isLoggingIn === false) {
      return (<SignUpPage changeIsSignedUp={this.changeIsSignedUp}/>)
    } else if (!!localStorage.token === true)  {
      return (
        <div>
          <PoliticianListAppBar logOutClick={this.logOutClick}/>
          <PoliticianList userPoliticianList={this.state.userPoliticianList}/>
        </div>
      )}
    
  }