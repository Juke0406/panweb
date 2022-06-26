const navAdmin = {
    items: [
        {
            name: 'Home Page',
            url: '/home_page',
            icon: 'icon-home',
        },
        {
            name: 'Statistics',
            url: '/statistics',
            icon: 'icon-chart'
        },
        {
            name: 'Suggestion Box',
            url: '/suggestion',
            icon: 'icon-social-dropbox'
        },
        {
            name: 'About Us',
            url: '/about_page',
            icon: 'icon-magnifier',
        }
    ]
}

const navGuest = {
    items: [
        {
            name: 'Home Page',
            url: '/home_page',
            icon: 'icon-home',
        },
        {
            name: 'Dates',
            url: '/dates',
            icon: 'icon-calendar',
        },
        {
            name: 'Location Generator',
            url: '/location_generator',
            icon: 'icon-directions'
        },
        {
            name: 'Suggestion Box',
            url: '/suggestion',
            icon: 'icon-social-dropbox'
        },
        {
            name: 'About Us',
            url: '/about_page',
            icon: 'icon-magnifier',
        }
    ]
}

const NavItems = () => {
    switch(localStorage.getItem(`${window.location.host}-role`)) {
        case ('1') : 
        case ('2') : {
            return navAdmin
        }
        case ('0') : {
            return navGuest
        }
        default:{
            return navGuest
        }
    }
}

export default NavItems