App = {
    web3Provider: null,
    contracts: {},
    account: 0x0,
    loading: false,
  
    init: async () =>  {
      return App.initWeb3();
    },

    initWeb3: async () =>  {
        // initialize web3
        
        if(typeof web3 !== 'undefined') {
          //reuse the provider of the Web3 object injected by Metamask
          App.web3Provider = web3.currentProvider;
        } else {
          //create a new provider and plug it directly into our local node
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
    
        App.displayAccountInfo();
    
        App.initContract();

        //console.log(App.contracts);



      },

      displayAccountInfo: async () =>  {
        web3.eth.getCoinbase(function(err, account) {
          if(err === null) {
            App.account = account;
            $('#account').text(account);
            web3.eth.getBalance(account, function(err, balance) {
              if(err === null) {
                $('#accountBalance').text(web3.fromWei(balance, "ether") + " ETH");
              }
            })
          }
        });
      },

      initContract: async () => {
        return $.getJSON('/build/contracts/etherProfile.json', etherProfileArtifact => {
          App.contracts.etherProfile = TruffleContract(etherProfileArtifact);
          App.contracts.etherProfile.setProvider(web3.currentProvider);
          
          App.contractMessage();
          
          })
        
    },

    contractMessage: async () => {
      const etherProfileInstance = await App.contracts.etherProfile.deployed();
      var mess = await etherProfileInstance.getMessage();
      // to test front end
      //const receipt = await etherProfileInstance.addProfile("test@gmail.com","someURL");
      const profile1 =  await etherProfileInstance.profiles(1);
      const email1 = profile1[2];
      console.log(email1)
      $('#mess').text(email1);
    },


}

$(function() {
    $(window).load(function() {
      App.init();
    });
});