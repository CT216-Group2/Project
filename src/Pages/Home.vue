<template>
  <body class="fullPage">
  <div class="head">
    <h1 class="mainFont ">Our Goal at Accommodate<a class="secondaryColour">Me</a> is to bring landlords and students together on one platform.</h1>
  </div>


  <div class="display-box" id="accordion-holder">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <b>Welcome to AccommodateMe!</b>
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Here at <i>AccommodateMe</i> we try to bridge the gap between Students searching for accommodation and Landlords searching for tenants. <br>
            You will need either a <i>Student Account</i> or <i>Owner Account</i> to proceed. <br>
            You can Create an Account or Login Below. <br><br>

            Want to know more <a href="/About"><u>About Us?</u></a>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            <b>Student Account Options</b>
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">In order to proceed as a <i>Student</i> you will need an Account. <br>
            Would you like to <a href="/StudentSignUp"><u>Create a Student Account</u></a> or <a href="/StudentLogin"><u>Login as a Student</u></a>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            <b>Owner Account Options</b>
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            In order to proceed as an <i>Owner</i> you will need an Account. <br>
            Would you like to <a href="/OwnerSignUp"><u>Create an Owner Account</u></a> or <a href="/OwnerLogin"><u>Login as an Owner</u></a>
          </div>
        </div>
      </div>
    </div>

  </div>
  </body>


</template>

<script>
export default {
  name: "Home.vue"
}
</script>

<style scoped>
body {
  background-image: url("https://img.rasset.ie/0015a355-1600.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: auto;
}
.fullPage{
  font-family:  Roboto Slab, serif;
}
.head {
  width: 100%;
  background: #FFFDD0cc;
  text-align: center;
  padding: 20px;
  position: absolute;
  top: 5%;
}
.accordion {
  background-color: #FFFDD0cc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 70vw;
}
.accordion-header{
  border-radius: 5px;
  border: 2px solid #adacac;
  width: auto;
}
#accordion-holder {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40%; /* set the distance from the bottom */
  left: 50%; /* center the div horizontally */
  transform: translateX(-50%) translateY(50%);
}
.accordion-body, .accordion-item{
  border-radius: 5px;
}
</style>