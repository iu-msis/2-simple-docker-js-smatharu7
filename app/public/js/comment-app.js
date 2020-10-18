var myApp = new Vue({
  //points to a CSS selector
  el: '#commentApp',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    comments: [{
      id:'',
      commentText:''

    }],

    newComment:{
      commentText:''
    }


  },
  //created is the first thing browser recognizes when you launch application
  created(){
    this.fetchComments();

  },

  methods: {
      // fetchUser: function(){
      fetchComments(){
      console.log("data");
      fetch('api/comments/index.php')
      .then(response => response.json())
      .then(data => {
        this.comments = data;
        console.log(this.comments);

      });
    },
    addComment() {

     // TODO: Validate the data!

     fetch('api/comments/create.php', {
       method:'POST',
       body: JSON.stringify(this.newComment),
       headers: {
         "Content-Type": "application/json; charset=utf-8"
       }
     })
     .then( response => response.json() )
     .then( json => {
       console.log("Returned from post:", json);
       // TODO: test a result was returned!
       this.comments.push(json[0]);
       this.newComment = this.newCommentData();
     });

     console.log("Creating (POSTing)...!");
     console.log(this.newComment);
   },

  }
})
