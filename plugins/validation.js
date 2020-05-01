import drippy from '~/assets/js/drippy-api'

export default ({ redirect, route }) => {
    drippy.validate().then(() => {
        if (!route.name.startsWith('index')) redirect('/');
    }).catch(() => redirect('/auth/login'));
}