
export default {
    
    state: {
        drawer: false,
        links:[
            {
                name: 'Account',
                icon: 'mdi-account',
                to: '/account'
            },
            {
                name: 'Users',
                icon: 'mdi-account-multiple',
                to: '/users'
            },
            {
                name: 'Roles',
                icon: 'mdi-lock',
                to: '/roles'
            },
            {
                name: 'Documentation',
                icon: 'mdi-file',
                to: '/documentation'
            },
        ]
    },

    getters: {
        links: (state) => state.links,
    },
}