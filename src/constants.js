export const map = {
    SearchOptions: {
        MAP: 'map',
        LIST: 'list'
    }
};

export const tokens = {
    GUEST: 'guest',
    USER_TOKEN: 'user_token'
};

export const navKeys = {
    LOGIN: 'login',
    AUTH: 'auth',
    MAIN: 'main',
    SEARCH: 'search',
    FAVORITES: 'favorites',
    ADD_SITE: 'addSite',
    EDIT_SITE: 'editSite',
    ADD_SITE_FORM: 'addSiteForm',
    MORE: 'more',
    FILTER: 'filter',
    SITE_DETAIL: 'siteDetail',
    SITE_DETAIL_MAP_VIEW: 'siteDetailMapView',
    SITE_IMAGE_GALLERY: 'siteImageGallery',
    MVUM_INSPECTOR: 'mvumInspector'
};

export const permissionResponses = {
    GRANTED: 'granted',
    DENIED: 'denied',
    UNDETERMINED: 'undetermined'
};

export const imageSourceTypes = {
    CAMERA: 'camera',
    CAMERA_ROLL: 'camera_roll'
};

export const facilityIconDetails = {
    restrooms: {name: 'human-male-female', type: 'material-community'},
    potable_water: {name: 'cup-water', type: 'material-community'},
    showers: {name: 'shower', type: 'font-awesome'},
    metal_firepit: {name: 'md-bonfire', type: 'ionicon'},
    tables: {name: 'chair-school', type: 'material-community'},
    none: {name: 'not-interested'}
};

export const featureIconDetails = {
    evergreens: {name: 'tree', type: 'font-awesome'},
    color_changing_trees: {name: 'tree', type: 'entypo'},
    lake_view: {name: 'weather-sunset', type: 'material-community'},
    river_view: {name: 'waves', type: 'material-community'},
    secluded: {name: 'user-secret', type: 'font-awesome'},
    mountain_views: {name: 'mountains', type: 'foundation'},
    winter_access: {name: 'snowflake-o', type: 'font-awesome'},
    easy_access: {name: 'road', type: 'font-awesome'},
};

export const external_links = {
    co_fire_bans_url: 'http://www.coemergency.com/p/fire-bans-danger.html',
    build_a_safe_fire_url: 'https://www.nps.gov/articles/campfires.htm',
    camping_bear_safe_url: 'http://www.campoutcolorado.com/camping-with-bears-in-colorado/',
    general_safety_guidelines_url: 'https://www.fs.fed.us/visit/know-before-you-go/camping',
    winter_camping_safely_url: 'https://www.reserveamerica.com/outdoors/what-you-need-to-know-for-winter-camping.htm',
    car_camping_checklist_url: 'https://www.uncovercolorado.com/car-camping-checklist/',
    forest_service_contact_url: 'http://cpw.state.co.us/thingstodo/Pages/USFSContactInfo.aspx',
    google_maps_offline_url: 'https://support.google.com/maps/answer/6291838',
    rec_dot_gov_reservations_url: 'https://www.recreation.gov/unifSearch.do'
};

export const mvum_links = {
    arapaho_national_forest_divider: '',
    clear_creek: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd570785.pdf',
    sulphur_north: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5339604.pdf',
    sulphur_south: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5339603.pdf',

    grand_mesa_national_forest_divider: '',
    grand_mesa_visitors_center: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3841427.pdf',

    gunnison_national_forest_divider: '',
    gunnison_north: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd514897.pdf',
    gunnison_south: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd514900.pdf',
    paonia: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3838524.pdf',

    pike_national_national_forest_divider: '',
    pike: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd574084.pdf',
    south_park: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd544977.pdf',
    south_platte_front: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd575444.pdf',
    south_platte_back: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd575443.pdf',

    rio_grande_national_forest_divider: '',
    conejos_peak_east: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518837.pdf',
    conejos_peak_west: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518836.pdf',
    divide_east: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518835.pdf',
    divide_west: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518832.pdf',
    saguache_east: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518833.pdf',
    saguache_west: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd518828.pdf',

    roosevelt_national_forest_divider: '',
    boulder_north: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd522665.pdf',
    boulder_south: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd530033.pdf',
    canyon_lakes_north: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5165781.pdf',
    canyon_lakes_south: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5165783.pdf',

    routt_national_forest_divider: '',
    hahns_peak_bears_ears: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5166245.pdf',
    routt_parks: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5166251.pdf',
    yampa: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5166250.pdf',

    san_isabel_national_forest_divider: '',
    leadville: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd496304.pdf',
    san_carlos_front: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd553152.pdf',
    san_carlos_back: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd553153.pdf',
    salida: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd555442.pdf',

    san_juan_national_forest_divider: '',
    columbine: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd492994.pdf',
    pagosa: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd538717.pdf',
    dolores: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd493002.pdf',

    uncompahgre_national_forest_divider: '',
    uncompahgre_plateau_division: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd511370.pdf',
    uncompahgre_mountain_division: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd511371.pdf',

    white_river_national_forest_divider: '',
    aspen_sopris: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd506000.pdf',
    dillon: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd505800.pdf',
    eagle_holy_cross_front: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd506006.pdf',
    eagle_holy_cross_back: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd514242.pdf',
    flat_tops: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd506001.pdf',
    rifle: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd506015.pdf',
};

export const approval_state = {
    APPROVED: 'approved',
    PENDING_UPLOAD: 'pending_upload',
    PENDING_APPROVAL: 'pending_approval',
    REJECTED: 'rejected'
};

export const site_form_type = {
    ADD: 'add',
    EDIT: 'edit',
    APPROVE: 'approve'
};

export const campsite_collections = {
    APPROVED: 'campsites',
    PENDING: 'pending_campsites',
    REJECTED: 'not_approved_campsites'
};

export const connection_type = {
    NONE: 'none',
    WIFI: 'wifi',
    CELL: 'cellular',
    UNKNOWN: 'unknown'
};

export const effective_connection_type = {
    TWO_G: '2g',
    THREE_G: '3g',
    FOUR_G: '4g',
    UNKNOWN: 'unknown'
};

