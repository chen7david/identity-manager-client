
export default {
    
    state: {
        drawer: false,
        links:[
            {
                name: 'Movies',
                icon: 'mdi-movie',
                to: '/movies',
                roles: []
                
            },
            {
                name: 'Shows',
                icon: 'mdi-monitor',
                to: '/shows',
                roles: []
            },
            {
                name: 'Account',
                icon: 'mdi-account',
                to: '/account',
                roles: []
            },
            {
                name: 'Users',
                icon: 'mdi-account-multiple',
                to: '/users',
                roles: ['admin']
            },
            {
                name: 'Devices',
                icon: 'mdi-monitor-multiple',
                to: '/devices',
                roles: []
            },
            {
                name: 'Roles',
                icon: 'mdi-lock',
                to: '/roles',
                roles: ['admin']
            },
            {
                name: 'Documentation',
                icon: 'mdi-file',
                to: '/documentation',
                roles: ['admin']
            },
        ]
    },

    getters: {
        links: (state) => state.links,
    },
}