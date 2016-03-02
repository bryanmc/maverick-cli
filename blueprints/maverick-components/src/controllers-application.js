import Ember from 'ember';

export default Ember.Controller.extend({
    appName:'Maverick App',
    auth: Ember.inject.service('authentication'),
    hideLayout: false,
    isLogged: Ember.computed(function() {
        let auth = this.get('auth');
        return auth.currentUser;
    }),
    components: {
        mavNavHorizontal: {
            logo: Ember.String.htmlSafe('<span>SH<i class="ion-pricetags"></i>PIFILL</span>'),
            searchBar: {
                disabled: true,
                placeholder: "Search App..."
            },
            notifications: {
                disabled: true
            },
            profile: {
                disabled: false
            },
            menuItems: [
                {
                    type: "basic",
                    parent: {
                        label: "Projects",
                        route: null
                    },
                    children: [
                        {
                            label: "All Projects",
                            route: "projects"
                        },
                        {
                            label: "Create Project",
                            route: "projects"
                        }
                    ]
                },
                {
                    type: "basic",
                    parent: {
                        label: "Stores",
                        route: null
                    },
                    children: [
                        {
                            label: "All Stores",
                            route: "projects"
                        },
                        {
                            label: "Create New Store",
                            route: "projects"
                        }
                    ]
                },
            ]//,
            
        }
    }
});



// menuItems: {
//                 [
//                     {
//                         type: "basic",
//                         parent: {
//                             label: "Projects",
//                             route: null
//                         },
//                         children: [
//                             {
//                                 label: "All Projects",
//                                 route: "projects"
//                             },
//                             {
//                                 label: "Create Project",
//                                 route: "projects"
//                             }
//                         ]
//                     }
//                 ]
//             }