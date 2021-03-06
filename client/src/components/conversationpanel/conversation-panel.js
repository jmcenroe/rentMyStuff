import React, { Component } from "react";
import API from '../../utils/API';
import Message from '../../pages/message1';
import './conversation-panel.css';




class ConversationPanel extends Component {
  
    constructor(props) {
      super(props);
      this.props = props;
  }
  
  state = {
      userid: undefined,
      clearInterval: null,
      auth: false,
      conversations: [],
      activeConversation: null
  }
  
  componentWillMount() {
      API.checkAuth()
          .then((data)=> {
              if(data.data.auth) {
                  this.setState({
                      userid: data.data.id,
                      auth: true
                  }, () => {
                      console.log('getting here');
                      this.checkData();
  
                  });
              }
              
          })
      
  
      //Set up db listener via setInterval
      if (this.state.clearInterval === null){
  
          let intervalVar = setInterval(this.checkData.bind(this),10000);
  
          this.setState({
              clearInterval: intervalVar
          });
      }
  
      
      
  }
  
  componentWillUnmount() {
      clearInterval(this.state.clearInterval);
  }
  
  checkData () {
      
      API.getAllConversations(this.state.userid)
          .then(data => {
              if (this.state.conversations.length < data.data.length) {
                  this.setState({
                      conversations: data.data
                  })
              }
          })
  }

  goToConversation = event => {
      this.setState({
          activeConversation: parseInt(event.target.getAttribute('data-id'),10)
      })
      
  }

  clear() {
      this.setState({
          activeConversation: null
      })
  }
  
  displayConversations() {
    //   return <div>Here I am</div>;
      return this.state.conversations.map((item, index) => {
          //Determine if user info is user1 or user2
          const isUser1 = item.user1.id === this.state.userid;
          return <div className="oneMessenger" key={index} data-id={item.id} onClick={this.goToConversation.bind(this)}>
                  <img className="panelAva" src={isUser1 ? item.user2.imageURL : item.user1.imageURL} data-id={item.id} alt='profile'/> 
                  {isUser1 ? item.user2.displayName : item.user1.displayName}
                  </div>;
      });
  }
  
  
  
  
  
  
  
  
    render() {
      
      return (
          <div className = "container-fluid" id="convoPanel">
            {this.state.auth ? 
               <div>
                    <div id="messengerNames"> 
                        {this.state.conversations.length>0 ? this.displayConversations() : 'No conversations to display'} 
                    </div>
                <div id="messageNames"> 
                  {this.state.activeConversation ? 
                  <Message 
                    conversationId={this.state.activeConversation}
                    userid={this.state.userid}
                    clear={this.clear.bind(this)} /> : ''} 
                </div>
                
                
                </div>
                  : 'You must be signed in to use messenger'}
          
          </div>
        );
    }
  }
  
  export default ConversationPanel;