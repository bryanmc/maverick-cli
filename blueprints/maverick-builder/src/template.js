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
    ul.step-checklist-items li { margin: 0 0 15px 15px; }
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
            <div class="row">
                <div class="col-lg-6">
                    <h4>Update Bower Ember & Ember Data Version</h4>
                    <p class="label label-primary" style="margin: 10px 0 20px 0;">
                        <a style="color:white;" target="_blank" href="https://github.com/bryanmc/maverick-cli/tree/master/blueprints/update-ember">
                        Source Code</a>
                    </p>
                    <hr />
                    
                    <p>Takes care of some critical setup errands.</p>
                    <ul class="well step-checklist-items">
                        <li>Updates `ember` and `ember-data` version to 2.2.0</li>
                        <li>Fixes jQuery depenency version / ember bug</li>
                        <li>Adds jQuery Cookie as a dependency in bower.json</li>
                        <li>Runs `bower install` to install updated / missing deps</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <button {{action "MB_updateEmber"}} class="btn btn-block btn-large {{if check_updateEmber "btn-success" "btn-default"}}" style="margin-top:10px;">Update Ember</button>
                    <p style="margin-top:10px;"><strong>Status:</strong> {{#if check_updateEmber}}Completed{{else}}Incomplete{{/if}}</p>
                </div>
                <div class="col-lg-12">
                    <pre><code class="language-bash">$ ember g update-ember</code></pre>
                    <hr />
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-6">
                    <h4>UI Setup</h4>
                    <p>Adds Twitter bootstrap and related UI elements to the project.</p>
                </div>
                <div class="col-lg-6">
                    <button {{action "MB_setupUi"}} class="btn btn-block btn-large {{if check_setupUi "btn-success" "btn-default"}}" style="margin-top:10px;">Setup UI & Frameworks</button>
                    <p style="margin-top:10px;"><strong>Status:</strong> {{#if check_setupUi}}Completed{{else}}Incomplete{{/if}}</p>
                </div>
                <div class="col-lg-12">
                    <pre><code class="language-bash">$ ember g maverick-setup-ui</code></pre>
                    <hr />
                </div>
            </div>
          
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