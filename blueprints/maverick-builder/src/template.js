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
        <p class="lead">A project to help get your Ember CLI app off the ground in record time with all the latest and greatest technologies baked in for you.</p>
        <p class="hide"><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
      </div>

      <div class="row marketing">
        <div class="col-lg-7">
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
                    <p class="label label-primary" style="margin: 10px 0 20px 0;">
                        <a style="color:white;" target="_blank" href="https://github.com/bryanmc/maverick-cli/tree/master/blueprints/maverick-setup-ui">
                        Source Code</a>
                    </p>
                    <hr />
                    
                    <p>Adds Twitter bootstrap and related UI elements to the project.</p>
                    <ul class="well step-checklist-items"> 
                        <li>Installs Ember <a target="_blank" href="https://www.npmjs.com/package/ember-bootstrap">Bootstrap addon</a></li>
                        <li>Installs Ember <a target="_blank" href="https://www.npmjs.com/package/ember-toastr">Toastr addon</a></li>
                        <li>Installs Ember <a target="_blank" href="https://github.com/martndemus/ember-cli-font-awesome">Font-Awesome addon</a></li>
                    </ul>
                    
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
            
            <div class="row">
                <div class="col-lg-6">
                    <h4>Implement Maverick Core</h4>
                    <p class="label label-primary" style="margin: 10px 0 20px 0;">
                        <a style="color:white;" target="_blank" href="https://github.com/bryanmc/maverick-cli/tree/master/blueprints/maverick-implement-core">
                        Source Code</a>
                    </p>
                    <hr />
                    
                    <p>Generates the Maverick services, utilities (eg, core and authentication)</p>
                    <ul class="well step-checklist-items">
                        <li>Creates the service: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/service.js" target="_blank">Maverick</a></li>
                        <li>Creates the utility: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/utility.js" target="_blank">Maverick</a></li>
                        <li>Creates the service: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/service-authentication.js" target="_blank">Authentication</a></li>
                        <li>Creates the initializer: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/initializer-maverick.js" target="_blank">Maverick</a></li>
                        <li>Creates the initializer: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/initializer-router.js" target="_blank">Router</a></li>
                        <li>Creates the adapter: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/adapter-application.js" target="_blank">Application</a></li>
                        <li>Creates the serializer: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/serializer-application.js" target="_blank">Application</a></li>
                    </ul>
                    
                </div>
                <div class="col-lg-6">
                    <button {{action "MB_setupMaverickCore"}} class="btn btn-block btn-large {{if check_setupMaverickCore "btn-success" "btn-default"}}" style="margin-top:10px;">Setup Maverick Core</button>
                    <p style="margin-top:10px;"><strong>Status:</strong> {{#if check_setupMaverickCore}}Completed{{else}}Incomplete{{/if}}</p>
                </div>
                <div class="col-lg-12">
                    <pre><code class="language-bash">$ ember g maverick-file-check &#x3C;path,comma_separated&#x3E; &#x3C;file name&#x3E;</code></pre>
                    <hr />
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-6">
                    <h4>Install Maverick Components</h4>
                    <p class="label label-primary" style="margin: 10px 0 20px 0;">
                        <a style="color:white;" target="_blank" href="https://github.com/bryanmc/maverick-cli/tree/master/blueprints/maverick-implement-core">
                        Source Code</a>
                    </p>
                    <hr />
                    
                    <p>Installs all core Maverick components</p>
                    <ul class="well step-checklist-items">
                        <li>Creates the component: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/service.js" target="_blank">Login</a></li>
                        <li>Creates the controller: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/utility.js" target="_blank">Login</a></li>
                        <li>Creates the route: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/service-authentication.js" target="_blank">Login</a></li>
                        <li>Creates the route: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/initializer-maverick.js" target="_blank">Logout</a></li>
                        <li>Creates the controller: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/initializer-maverick.js" target="_blank">Index</a></li>
                        <li>Creates the route: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/initializer-maverick.js" target="_blank">Index</a></li>
                    </ul>
                    
                </div>
                <div class="col-lg-6">
                    <button {{action "MB_installMaverickComponents"}} class="btn btn-block btn-large {{if check_installMaverickComponents "btn-success" "btn-default"}}" style="margin-top:10px;">Install Maverick Components</button>
                    <p style="margin-top:10px;"><strong>Status:</strong> {{#if check_installMaverickComponents}}Completed{{else}}Incomplete{{/if}}</p>
                </div>
                <div class="col-lg-12">
                    <pre><code class="language-bash">$ ember g maverick-components</code></pre>
                    <hr />
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-6">
                    <h4>Environment Setup</h4>
                    <p class="label label-primary" style="margin: 10px 0 20px 0;">
                        <a style="color:white;" target="_blank" href="https://github.com/bryanmc/maverick-cli/tree/master/blueprints/maverick-implement-core">
                        Source Code</a>
                    </p>
                    <hr />
                    
                    <p>Sets up the environment (eg, config files)</p>
                    <ul class="well step-checklist-items">
                        <li>Updates the config file: <a href="https://github.com/bryanmc/maverick-cli/blob/484acd7453326396da241b2a2b7f2a080bfd6224/blueprints/maverick-implement-core/src/service.js" target="_blank">Environment.js</a></li>
                    </ul>
                    
                </div>
                <div class="col-lg-6">
                    <button {{action "MB_setupEnvironment"}} class="btn btn-block btn-large {{if check_setupEnvironment "btn-success" "btn-default"}}" style="margin-top:10px;">Setup Environment</button>
                    <p style="margin-top:10px;"><strong>Status:</strong> {{#if check_setupEnvironment}}Completed{{else}}Incomplete{{/if}}</p>
                </div>
                <div class="col-lg-12">
                    <pre><code class="language-bash">$ ember g maverick-environment</code></pre>
                    <hr />
                </div>
            </div>
          
        </div>

        <div class="col-lg-5">
          <h4>Maverick Builder API URL References</h4>
          <hr />
          <p><a href="http://localhost:4200/api/maverick/action/update-ember" target="_blank">Action: Update Ember</a></p>
          <p><a href="http://localhost:4200/api/maverick/check/update-ember" target="_blank">Check: Update Ember</a></p>
          <p><a href="http://localhost:4200/api/maverick/action/maverick-setup-ui" target="_blank">Action: Setup UI</a></p>
          <p><a href="http://localhost:4200/api/maverick/maverick-file-check/setup-ui" target="_blank">Check: Setup UI</a></p>
          <p><a href="http://localhost:4200/api/maverick/action/maverick-implement-core" target="_blank">Action: Implement Core</a></p>
          <p><a href="http://localhost:4200/api/maverick/maverick-file-check/app,services/maverick.js" target="_blank">Check: Implement Core</a></p>
          <p><a href="http://localhost:4200/api/maverick/action/maverick-components" target="_blank">Action: Install Components</a></p>
          <p><a href="http://localhost:4200/api/maverick/maverick-file-check/app,components/login-form.js" target="_blank">Check: Install Components</a></p>
        </div> 
      </div>

      <footer class="hide footer">
        <p>&copy; 2015 Market Zero, LLC.</p>
      </footer>

    </div> <!-- /container -->
    
    
    {{outlet}}

</div>