import HomeView from './pages/home';
import HomeController from './pages/_home';

export default {
  '/': {
    component: HomeView,
    controller: HomeController,
  }
}