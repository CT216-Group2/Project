  <template>
    <link rel="stylesheet" href="src/assets/bootstrap.css">
    <link rel="stylesheet" href="src/assets/bootstrap-grid.css">
    <link rel="stylesheet" href="src/assets/bootstrap-reboot.css">


    <div class="container">
        <div class="posts">
          <div class="title">Posts</div>
          <div class="col-sm" >
          <div class="card" style="width: 18rem;">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdownloadhdwallpapers.in%2Fwp-content%2Fuploads%2F2018%2F01%2FLuxury-Home-at-Night-1920x1200.jpg&f=1&nofb=1&ipt=c79a61f27097d9ee5784a87ae265dca2ee3d1207638bba8b19798f78b0b4b70c&ipo=images" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
              <a href="/" target="_blank" style="#0f8fef : white">See More</a>
            </div>

          </div>
          </div>
          <div class="col-sm">
          <div class="card" style="width: 18rem;">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdownloadhdwallpapers.in%2Fwp-content%2Fuploads%2F2018%2F01%2FLuxury-Home-at-Night-1920x1200.jpg&f=1&nofb=1&ipt=c79a61f27097d9ee5784a87ae265dca2ee3d1207638bba8b19798f78b0b4b70c&ipo=images" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
              <a href="/" target="_blank" style="#0f8fef: white">See More</a>
            </div>

          </div>
          </div>
          <div class="col-sm">
          <div class="card" style="width: 18rem;">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdownloadhdwallpapers.in%2Fwp-content%2Fuploads%2F2018%2F01%2FLuxury-Home-at-Night-1920x1200.jpg&f=1&nofb=1&ipt=c79a61f27097d9ee5784a87ae265dca2ee3d1207638bba8b19798f78b0b4b70c&ipo=images" class="card-img-top" alt="...">
            <div class="card-body" >
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
              <a href="/" target="_blank" style="#0f8fef : white">See More</a>
            </div>

          </div>
          </div>
        </div>



        <div class="messages">

          <div class="row-cols-1">

          <div class="col-sm-2">
          <div class="message-card">
            <div class="message-card-body">
              <h5 class="card-title">Person Name</h5>
              <h6 class="card-subtitle" style="font-size: 1em;">07/02/2023</h6>
              <a href="#" class="card-link" style="color: white">Reply</a>
              <a href="#" class="card-link" style="color: white">Block</a>
            </div>
          </div>
          </div>
          <div class="col-sm-2">
          <div class="message-card">
            <div class="message-card-body">
              <h5 class="card-title">Person Name</h5>
              <h6 class="card-subtitle" style="font-size: 1em;">07/02/2023</h6>
              <a href="#" class="card-link" style="color: white">Reply</a>
              <a href="#" class="card-link" style="color: white">Block</a>
            </div>
          </div>
          </div>
          <div class="col-sm-2">
          <div class="message-card">
            <div class="message-card-body">
              <h5 class="card-title">Person Name</h5>
              <h6 class="card-subtitle" style="font-size: 1em;">07/02/2023</h6>
              <a href="#" class="card-link" style="color: white">Reply</a>
              <a href="#" class="card-link" style="color: white">Block</a>
            </div>
          </div>
          </div>
          <div class="col-sm-2">
          <div class="message-card">
            <div class="message-card-body">
              <h5 class="card-title">Person Name</h5>
              <h6 class="card-subtitle" style="font-size: 1em;">07/02/2023</h6>
              <a href="#" class="card-link" style="color: white">Reply</a>
              <a href="#" class="card-link" style="color: white">Block</a>
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>


  </template>

  <script>
  export default {
    name: "Account.vue"
}
  </script>
  <style scoped>

  .container{
    margin-left: 0%;
    margin-top: 20vh;
    position: relative;
    height: 65vh;
    width: 100vw;
  }

  .posts{
    padding: 0%;
    position: relative;
  }
  .messages{
    position: relative;
  }
  .card{
    height: fit-content;
    background-color:#790404;
    padding: 0%;
    margin: 1%;
  }
  .card-img-top{
    border-radius: 5%;
    padding:2%;
  }

  .title{
    margin: auto;
    padding-left: 5vw;
    margin-top: 0px;
    padding-top: 0px;
    font-weight: bold;
    font-size: 2em;
  }
  .title2{
    font-size: 2em;
  }
  .card-title{
    color: white;
  }
.card-subtitle{
  color: #0f8fef ;
}

.card-text{
  color: white;
}
  .message-card{
    font-size:.8em;
    margin: 2%;
    background-color: #790404;
    border-radius: 4%;
    border: solid;

  }
  .col-sm{
    width: fit-content;
    display: inline;
    float: left;
  }

  .col-sm-2{
    display: inline;
    float: right;
  }
  </style>