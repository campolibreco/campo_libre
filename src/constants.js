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
    google_maps_offline_url: 'https://support.google.com/maps/answer/6291838'
};

export const mvum_links = {
    gunnison_north: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd514897.pdf',
    gunnison_south: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd514900.pdf',
    leadville: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd496304.pdf',
    salida: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd555442.pdf',
    pike: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd574084.pdf',
    south_park: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd544977.pdf'
};

export const approval_state = {
    APPROVED: 'approved',
    PENDING: 'pending',
    DENIED: 'denied'
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