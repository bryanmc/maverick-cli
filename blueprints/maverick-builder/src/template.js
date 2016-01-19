<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/yeti/bootstrap.min.css">
<link href="https://shopifill.herokuapp.com/app/_js/prism/prism.css" rel="stylesheet">
<script src="https://shopifill.herokuapp.com/app/_js/prism/prism.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<style>
    #maverick-builder-wrapper { 
        width:100%;
        height:100%;
        position: absolute;
        top: 0; left: 0;
        background: #fff;
        z-index: 1000;
    }
    pre { background: #272822 none repeat scroll 0% 0%; }
    h4 { font-weight: bold; }
</style>

<div id="maverick-builder-wrapper"> 
    
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">About</a></li>
            <li role="presentation"><a href="#">Contact</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">Maverick Builder</h3>
      </div>
      
      <hr />

      <div class="jumbotron">
        <h1>Welcome to Maverick Builder</h1>
        <p class="lead">A project to help get your Ember CLI app off the ground in record time with all the latest and greatest technologies.</p>
        <p class="hide"><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
      </div>

      <div class="row marketing">
        <div class="col-lg-6">
          <h4>Update Bower Ember & Ember Data Version</h4>
          <p>Once you're done here, click the button below to completely remove any remnants of Maverick Builder.</p>
          <pre><code class="language-bash">$ ember g update-ember</code></pre>
          <span class="file-name">ember cli</span>
          
          <h4>Destroy Maverick Builder</h4>
          <p>Once you're done here, click the button below to completely remove any remnants of Maverick Builder.</p>
          <button {{action "MB_destroyBuilder"}} class="hide btn btn-block btn-danger btn-large">Destroy Maverick Builder</button>
          
          <pre><code class="language-bash">$ ember g maverick-builder</code></pre>
          <span class="file-name">ember cli</span>
        </div>

        <div class="col-lg-6">
          <h4>Coming Soon...</h4>
          <p>A feature that is soon to come of course...</p>
          
        </div>
      </div>

      <footer class="hide footer">
        <p>&copy; 2015 Market Zero, LLC.</p>
      </footer>

    </div> <!-- /container -->
    
    
    {{outlet}}

</div>