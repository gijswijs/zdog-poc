import './styles/component.css'

export default () => {
  const element = document.createElement("canvas")
  element.className = 'zdog-canvas'
  element.setAttribute('width','700')
  element.setAttribute('height','600')
  return element;  
};
