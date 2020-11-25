
export default {
    
    state: {
        drawer: false,
        links:[
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
                roles: ['admin']
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