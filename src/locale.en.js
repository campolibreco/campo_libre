export const login = {
    campo_libre: 'C A M P O  L I B R E',
    tagline: "It's time to get out there...",
    login_as_guest: "Continue as guest",
    login_with_facebook: "Log in with Facebook",
    errors: {
        auth: "Email and Password combination not recognized",
        general: "There was an error",
        try_again: "Please try again"
    }
};

export const campsite = {
    nav_header: 'Share a site, Get a site',
    click_for_maps: 'Click to open me in Google Maps',
    upload: 'Upload Campsite',
    cancel: 'Cancel',
    update: 'Update',
    reject: 'Reject',
    approve: 'Approve',
    admin_options: 'Admin Options',
    campsite_form: {
        reset: 'Reset',
        site_image: 'Site Image',
        latitude: 'Latitude',
        latitude_placeholder: 'Add latitude',
        longitude: 'Longitude',
        longitude_placeholder: 'Add longitude',
        add_site_title: 'Add site title',
        add_site: 'Add a Site',
        add_a_campsite: 'Add a Campsite',
        edit_site: 'Edit Site',
        edit_campsite: {
            approved: 'Edit Existing',
            pending_approval: 'Approve or Reject'
        },
        site_info: 'Site Info',
        description: 'Description',
        description_placeholder: 'Add description',
        directions: 'Directions',
        directions_placeholder: 'Add descriptive directions',
        optional: '(Optional)',
        alternate_sites: 'Alternate sites',
        alternate_sites_placeholder: 'Any good backup sites nearby?',
        nearest_town: 'Nearest town',
        nearest_town_placeholder: 'Enter nearest town',
        here_now: 'I am here now',
        accessibility: 'Accessibility',
        facilities: 'Facilities',
        price: 'Price',
        reserve_now: 'Reserve now: ',
        rec_dot_gov: 'recreation.gov',
        features: 'Features',
        cell_service: 'Cell Service',
        county: 'County',
        forest: 'Forest',
        mvum: 'Motor Vehicle Use Map',
        fire_ban_info: 'Fire Ban Info',
        price_options: {
            blank: '',
            free: 'Free',
            paid: 'Paid',
            paid_reservable: 'Paid & Reservable',
            permit: 'Permit'
        },
        facilities_options: {
            restrooms: 'Restrooms',
            potable_water: 'Potable Water',
            showers: 'Showers',
            metal_firepit: 'Metal Fire Pit',
            tables: 'Tables',
            none: 'None'
        },
        accessibility_options: {
            blank: '',
            paved_road: "Paved Road",
            dirt_road: "Dirt Road",
            uneven_terrain: "Uneven Terrain",
            fourbyfour: "High Clearance",
            fourbyfour_clearence: "4X4 Required",
            hike_access: "Hike Access"
        },
        features_options: {
            evergreens: 'Evergreens',
            color_changing_trees: 'Aspen/Color-Changing Trees',
            lake_view: 'Lake View',
            river_view: 'River/Creek View',
            secluded: 'Secluded',
            mountain_views: 'Mountain Views',
            winter_access: 'Accessible in Spring',
            easy_access: 'Easy Access from Town'
        },
        filter: {
            any_of_these: 'Any of these',
            exactly_these: 'Exactly these'
        },
        cell_provider_options: {
            blank: '',
            att: 'AT&T',
            sprint: 'Sprint',
            verizon: 'Verizon',
            other: 'Other'
        },
        cell_strength_options: {
            blank: '',
            none: 'No Service',
            low: '1x',
            mid: '3G',
            high: 'LTE'
        }
    }
};

export const reducerAlerts = {
    site_upload_success: 'Successfully uploaded your site. Thanks!',
    site_upload_error: 'Sorry, there was an error uploading your site. Please try again later.'
};

export const search_screen = {
    title: 'Search',
    header_title: 'Find a Site',
    filter: 'Filter',
    filtered: 'Filtered'
};

export const site_detail_screen = {
    pending_upload: 'Pending Upload',
    pending_approval: 'Pending Approval'
};

export const filter_screen = {
    results: 'Results'
};

export const add_site_screen = {
    title: 'Add a Site',
    header_title: 'Your Submitted Sites',
    must_log_in_detail: 'Only logged in users can upload new sites. Log in and start sharing your favorites!',
    no_pending_sites_header: 'No Submitted Sites',
    no_pending_sites_detail: 'Your submitted sites will go here. Why don\'t you give it a try by submitting a site above?',
    pending_sites_header: 'Pending Review',
    pending_upload_sites_header: 'Pending Upload',
    pending_upload_sites_description: 'These sites will automatically upload soon!',
    pending_upload_sites_waiting: 'Waiting on Wifi or 4G connection to upload...',
    pending_sites_description: 'These submitted sites are pending admin review.',
};

export const more_screen = {
    title: 'More',
    header_title: 'More Info',
    right_nav: 'Log Out',
    camping_tips: {
        title: 'Camping Tips',
        car_camping_checklist: 'Car Camping Checklist',
        google_maps_offline: 'Google Maps Offline Access'
    },
    fire_safety_section: {
        title: 'Fire Safety',
        co_fire_bans: 'Colorado Fire Bans',
        build_a_safe_fire: 'Make a Great (and Safe!) Bonfire',
    },
    wilderness_safety: {
        title: 'Wilderness Safety',
        general_safety_guidelines: 'General Camping Safety Tips',
        camping_bear_safe: 'Camping Bear Safe',
        safe_winter_camping: 'Guide to Safe Snow Camping',
        forest_service_contact_info: 'U.S. Forest Service Contact Information'
    },
    app_info: {
        title: 'Application Info',
        version: 'Version'
    },
    user_info: {
        title: 'User Info',
        name: 'Name:',
        email: 'Email:'
    }
};

export const submit_form = {
    submit: 'submit',
    force_submit: 'Force Submit',
    submitted: 'submitted',
    give_me_credit_title: 'Can We Give You Credit?',
    give_me_credit_detail: 'An example of the credit is below',
    give_me_credit_example: 'Uploaded By: ',
    uploaded_by_title: 'Uploaded By',
    anonymous_user: 'Anonymous user'
};

export const common = {
    title: 'Title',
    location: 'Location',
    back: 'Back',
    must_log_in: 'Must Log In'
};

export const permissions = {
    reminder_for_ls_access: 'Sorry, we need permission to access your location. Please go into Settings/Campo Libre and enable Location Services',
    reminder_for_camera_roll_access: 'Sorry, we need permission to access your Camera Roll. Please go into Settings/Campo Libre and enable Camera Roll access',
    reminder_for_camera_access: 'Sorry, we need permission to access your Camera. Please go into Settings/Campo Libre and enable Camera access'
};

export const favorites = {
    add_favorite_error: 'Sorry, there was a problem adding this site to your Favorites.',
    remove_favorite_error: 'Sorry, there was a problem removing this site from your Favorites',
    no_favorites_header: 'No Favorites',
    no_favorites_detail: 'Add some Favorite Sites and they\'ll appear here!',
    must_log_in_detail: 'Only logged in users can save Favorite Sites. Log in and start saving all your favorites!'
};

export const counties = {
    blank: '',
    adams: 'Adams',
    alamosa: 'Alamosa',
    arapahoe: 'Arapahoe',
    archuleta: 'Archuleta',
    baca: 'Baca',
    bent: 'Bent',
    boulder: 'Boulder',
    broomfield: 'Broomfield',
    chaffee: 'Chaffee',
    cheyenne: 'Cheyenne',
    clear_creek: 'Clear Creek',
    conejos: 'Conejos',
    costilla: 'Costilla',
    crowley: 'Crowley',
    custer: 'Custer',
    delta: 'Delta',
    denver: 'Denver',
    dolores: 'Dolores',
    douglas: 'Douglas',
    eagle: 'Eagle',
    el_paso: 'El Paso',
    elbert: 'Elbert',
    fremont: 'Fremont',
    garfield: 'Garfield',
    gilpin: 'Gilpin',
    grand: 'Grand',
    gunnison: 'Gunnison',
    hinsdale: 'Hinsdale',
    huerfano: 'Huerfano',
    jackson: 'Jackson',
    jefferson: 'Jefferson',
    kiowa: 'Kiowa',
    kit_carson: 'Kit Carson',
    lake: 'Lake',
    la_plata: 'La Plata',
    larimer: 'Larimer',
    las_animas: 'Las Animas',
    lincoln: 'Lincoln',
    logan: 'Logan',
    mesa: 'Mesa',
    mineral: 'Mineral',
    moffat: 'Moffat',
    montezuma: 'Montezuma',
    montrose: 'Montrose',
    morgan: 'Morgan',
    otero: 'Otero',
    ouray: 'Ouray',
    park: 'Park',
    phillips: 'Phillips',
    pitkin: 'Pitkin',
    prowers: 'Prowers',
    pueblo: 'Pueblo',
    rio_blanco: 'Rio Blanco',
    rio_grande: 'Rio Grande',
    routt: 'Routt',
    saguache: 'Saguache',
    san_juan: 'San Juan',
    san_miguel: 'San Miguel',
    sedgwick: 'Sedgwick',
    summit: 'Summit',
    teller: 'Teller',
    washington: 'Washington',
    weld: 'Weld',
    yuma: 'Yuma'
};

export const forest_names = {
    blank: '',
    arapaho: 'Arapaho National Forest',
    grand_mesa: 'Grand Mesa National Forest',
    gunnison: 'Gunnison National Forest',
    pike: 'Pike National Forest',
    rio_grande: 'Rio Grande National Forest',
    roosevelt: 'Roosevelt National Forest',
    routt: 'Routt National Forest',
    san_isabel: 'San Isabel National Forest',
    san_juan: 'San Juan National Forest',
    uncompahgre: 'Uncompahgre National Forest',
    white_river: 'White River National Forest'
};

export const mvum_names = {
    blank: '',

    arapaho_national_forest_divider: 'Arapaho National Forest Divider',
    clear_creek: 'Clear Creek Ranger District',
    sulphur_north: 'Sulphur Ranger District - North',
    sulphur_south: 'Sulphur Ranger District - South',

    grand_mesa_national_forest_divider: 'Grand Mesa National Forest Divider',
    grand_mesa_visitors_center: 'Grand Mesa Visitors Center',

    gunnison_national_forest_divider: 'Gunnison National Forest Divider',
    gunnison_north: 'Gunnison Ranger District - North',
    gunnison_south: 'Gunnison Ranger District - South',
    paonia: 'Paonia Ranger District',

    pike_national_national_forest_divider: 'Pike National Forest Divider',
    pike: 'Pikes Peak Ranger District',
    south_park: 'South Park Ranger District',
    south_platte_front: 'South Platte Ranger District - Front',
    south_platte_back: 'South Platte Ranger District - Back',

    rio_grande_national_forest_divider: 'Rio Grande National Forest Divider',
    conejos_peak_east: 'Conejos Peak Ranger District - East',
    conejos_peak_west: 'Conejos Peak Ranger District - West',
    divide_east: 'Divide Ranger District - East',
    divide_west: 'Divide Ranger District - West',
    saguache_east: 'Saguache Ranger District - East',
    saguache_west: 'Saguache Ranger District - West',

    roosevelt_national_forest_divider: 'Roosevelt National Forest Divider',
    boulder_north: 'Boulder Ranger District - North',
    boulder_south: 'Boulder Ranger District - South',
    canyon_lakes_north: 'Canyon Lakes Ranger District - North',
    canyon_lakes_south: 'Canyon Lakes Ranger District - South',

    routt_national_forest_divider: 'Routt National Forest Divider',
    hahns_peak_bears_ears: 'Hahns Peak/Bears Ears Ranger District',
    routt_parks: 'Parks Ranger District',
    yampa: 'Yampa Ranger District',

    san_isabel_national_forest_divider: 'San Isabel National Forest Divider',
    leadville: 'Leadville Ranger District',
    san_carlos_front: 'San Carlos Ranger District - Front',
    san_carlos_back: 'San Carlos Ranger District - Back',
    salida: 'Salida Ranger District',

    san_juan_national_forest_divider: 'San Juan National Forest Divider',
    columbine: 'Columbine Ranger District',
    pagosa: 'Pagosa Ranger District',
    dolores: 'Dolores Ranger District',

    uncompahgre_national_forest_divider: 'Uncompahgre National Forest Divider',
    uncompahgre_plateau_division: 'Uncompahgre National Forest: Plateau Division',
    uncompahgre_mountain_division: 'Uncompahgre National Forest: Mountain Division',

    white_river_national_forest_divider: 'White River National Forest Divider',
    aspen_sopris: 'Aspen Sopris Ranger District',
    dillon: 'Dillon Ranger District',
    eagle_holy_cross_front: 'Eagle Holy Cross Ranger District - Front',
    eagle_holy_cross_back: 'Eagle Holy Cross Ranger District - Back',
    flat_tops: 'Flat Tops Ranger District',
    rifle: 'Rifle Ranger District',
};
