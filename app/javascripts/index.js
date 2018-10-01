import App from './components/App';

const { h, render } = window.preact;

export default () => {
  render(h(App), document.getElementById('App'));
};
