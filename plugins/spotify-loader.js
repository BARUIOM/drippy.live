import drippy from '../assets/js/drippy-api'

export default () => {
    return drippy.getToken().catch(() => { return });
}