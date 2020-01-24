// Import pre-defined behaviors from src/behavior.
import edit from '../../behavior/edit';
import measure from '../../behavior/measure';
import rememberLayer from '../../behavior/rememberLayer';


/**
 * Add a behavior by name.
 */
export function addBehavior(name, options = {}) {
  const behaviors = {
    edit,
    measure,
    rememberLayer,
  };
  this.attachBehavior(behaviors[name], options);
}

/**
 * Attach a behavior to the farmOS-map instance.
 */
export function attachBehavior(behavior, options = {}) {
  behavior.attach(this, options);
}