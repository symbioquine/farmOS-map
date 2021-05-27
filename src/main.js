// Import farmOS-map CSS.
import './styles.css';

import MapInstanceManager from './MapInstanceManager';

const INSTANCE = new MapInstanceManager();

window.farmOS = window.farmOS || {};
window.farmOS.map = INSTANCE;

// Export the default farmOS-map object
export default INSTANCE;
