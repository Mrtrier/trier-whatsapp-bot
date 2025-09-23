import config from "../config.json"

export function isEnabled(feature) {
  return config[feature] === true
}